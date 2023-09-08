import { Godam } from "godam";
import { Component, emitStateChange, getDataype } from "mahal";
import { ARRAY_METHODS_TO_WATCH, OBJECT_METHODS_TO_WATCH } from "../constants";

export const state = function (key: string, room?: string): PropertyDecorator {
    let keyWithRoom = key;
    if (room) {
        keyWithRoom = key + "@" + room;
    }

    return (target: any, propName: string) => {
        const stateFlag = `__storeState_${propName}_Subscribed__`;
        Object.defineProperty(target, propName, {
            get() {
                const comp: Component = this;
                const store: Godam = comp.global.store;
                if (process.env.NODE_ENV !== "production") {
                    if (store == null) {
                        throw "store is not defined, please install 'mahal-store' plugin.";
                    }
                }
                const valueFromStore = store.get(keyWithRoom);
                if (comp[stateFlag]) {
                    return valueFromStore
                }
                const emitChange = emitStateChange.bind(this);

                const onceCb = (newValue, oldValue) => {
                    emitChange(propName, newValue, oldValue);
                };
                store.watch(keyWithRoom, onceCb);
                let methodToWatch: string[] = [];
                switch (getDataype(valueFromStore)) {
                    case "array":
                        methodToWatch = ARRAY_METHODS_TO_WATCH;
                        break;
                    case "object":
                        methodToWatch = OBJECT_METHODS_TO_WATCH;
                        break;
                }
                comp[stateFlag] = new Map();
                methodToWatch.forEach(methodName => {
                    let arrayKey = `${key}.${methodName}`;
                    if (room) {
                        arrayKey += `@${room}`
                    }
                    const watchCb = (newValue) => {
                        emitChange(arrayKey, newValue);
                    }
                    store.watch(arrayKey, watchCb);
                    (comp[stateFlag] as Map<string, Function>).set(arrayKey, watchCb);
                })

                comp.on("destroy", () => {
                    // unwatch state key
                    store.unwatch(keyWithRoom, onceCb);
                    // unwatch array methods
                    (comp[stateFlag] as Map<string, Function>).forEach((method, arrayKey) => {
                        store.unwatch(arrayKey, method);
                    });
                })

                return valueFromStore;
            }
        })
    }

};