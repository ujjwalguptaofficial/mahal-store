import { Godam } from "godam";
import { Component, emitStateChange } from "mahal";

export const expression = function (key: string, room?: string): PropertyDecorator {
    if (room) {
        key = key + "@" + room;
    }
    let isEventSubscribed = false;
    return (target: any, propName: string) => {
        Object.defineProperty(target, propName, {
            get() {
                const comp: Component = this;
                const store: Godam = comp.global.store;
                store.shouldCallExpression = false;
                const expressionValue = store.eval(key);
                store.shouldCallExpression = true;
                if (isEventSubscribed) {
                    return expressionValue;
                }
                const watchKey = "expression." + key;
                const cb = (newValue) => {
                    emitStateChange.call(comp, propName, newValue);
                };
                store.watch(watchKey, cb);
                comp.on("destroy", () => {
                    store.unwatch(watchKey, cb);
                    isEventSubscribed = false;
                })
                isEventSubscribed = true;
                return expressionValue;
            }
        })
    }
};