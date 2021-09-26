import { Godam } from "godam";

// tslint:disable-next-line
export const Mutation = (key: string, room?: string): PropertyDecorator => {
    if (room) {
        key = key + "@" + room;
    }
    return ((target: any, methodName: string) => {
        target[methodName] = function (...payload) {
            this.store.set(key, ...payload);
        }
    });
};