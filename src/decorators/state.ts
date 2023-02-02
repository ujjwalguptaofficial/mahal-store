import { Godam } from "godam";
import { Component, emitStateChange, getDataype } from "mahal";
import { ARRAY_METHODS_TO_WATCH, OBJECT_METHODS_TO_WATCH } from "../constants";

export const state = function (key: string, room?: string): PropertyDecorator {
    if (room) {
        key = key + "@" + room;
    }
    let methods = [];
    let isEventSubscribed = false;
    return (target: any, propName: string) => {
        Object.defineProperty(target, propName, {
            get() {
                const comp: Component = this;
                const store: Godam = comp.global.store;
                if (process.env.NODE_ENV !== "production") {
                    if (store == null) {
                        throw "store is not defined, please install 'mahal-store' plugin.";
                    }
                }
                const valueFromStore = store.get(key);
                if (isEventSubscribed) {
                    return valueFromStore
                }
                const emitChange = emitStateChange.bind(this);

                const onceCb = (newValue, oldValue) => {
                    emitChange(propName, newValue, oldValue);
                };
                store.watch(key, onceCb);
                let methodToWatch: string[] = [];
                switch (getDataype(valueFromStore)) {
                    case "array":
                        methodToWatch = ARRAY_METHODS_TO_WATCH;
                        break;
                    case "object":
                        methodToWatch = OBJECT_METHODS_TO_WATCH;
                        break;
                }
                methodToWatch.forEach(methodName => {
                    const arrayKey = `${key}.${methodName}`;
                    const watchCb = (newValue) => {
                        emitChange(arrayKey, newValue);
                    }
                    store.watch(arrayKey, watchCb);
                    methods.push(watchCb);
                })

                comp.on("destroy", () => {
                    store.unwatch(key, onceCb);
                    methodToWatch.forEach((methodName, i) => {
                        const arrayKey = `${key}.${methodName}`;
                        store.unwatch(arrayKey, methods[i]);
                    });
                    methods = [];
                    isEventSubscribed = false;
                })
                isEventSubscribed = true;
                return valueFromStore;
            }
        })
    }

};