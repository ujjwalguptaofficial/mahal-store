import { Godam } from "godam";
import { Component } from "mahal";

export const task = (key: string, room?: string): PropertyDecorator => {
    if (room) {
        key = key + "@" + room;
    }
    return ((target: any, methodName: string) => {
        target[methodName] = function (...payload) {
            const comp: Component = this;
            const store: Godam = comp.global.store;
            return store.do(key, ...payload);
        }
    });
};