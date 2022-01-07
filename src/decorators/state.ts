import { Godam } from "godam";
import { Component, LIFECYCLE_EVENT, nextTick } from "mahal";

const arrayMethodsToWatch = ["push", "pop", "splice"];

// tslint:disable-next-line
export const State = function (key: string, room?: string): PropertyDecorator {
    console.log("thisdd", this);
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
                const valueFromStore = store.get(key);
                if (isEventSubscribed) {
                    return valueFromStore
                }

                const onceCb = (newValue) => {
                    comp.setState(propName, newValue);
                };
                store.watch(key, onceCb);
                if (Array.isArray(valueFromStore)) {
                    arrayMethodsToWatch.forEach(methodName => {
                        const arrayKey = `${key}.${methodName}`;
                        const method = (newValue) => {
                            comp.setState(arrayKey, newValue);
                        }
                        store.watch(arrayKey, method);
                        methods.push(method);
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