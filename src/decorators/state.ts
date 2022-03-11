import { Godam } from "godam";
import { Component, LIFECYCLE_EVENT, nextTick } from "mahal";

const arrayMethodsToWatch = ["push", "pop", "splice", "shift", "unshift", "reverse", "add"];

// tslint:disable-next-line
export const State = function (key: string, room?: string): PropertyDecorator {
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
                const emitChange = comp['__emitStateChange__'].bind(this);

                const onceCb = (newValue) => {
                    emitChange(propName, newValue);
                };
                store.watch(key, onceCb);
                if (Array.isArray(valueFromStore)) {
                    arrayMethodsToWatch.forEach(methodName => {
                        const arrayKey = `${key}.${methodName}`;
                        const watchCb = (newValue) => {
                            emitChange(arrayKey, newValue);
                            // comp.setState(arrayKey, newValue);
                        }
                        store.watch(arrayKey, watchCb);
                        methods.push(watchCb);
                    })
                }

                comp.on(LIFECYCLE_EVENT.Destroy, () => {
                    store.unwatch(key, onceCb);
                    arrayMethodsToWatch.forEach((methodName, i) => {
                        const arrayKey = `${key}.${methodName}`;
                        store.unwatch(arrayKey, methods[i]);
                    });
                    methods = [];
                })
                isEventSubscribed = true;
                return valueFromStore;
            }
        })
    }

};