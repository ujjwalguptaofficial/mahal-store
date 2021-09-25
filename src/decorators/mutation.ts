import { Godam } from "godam";

// tslint:disable-next-line
export const Mutation = (key: string, room?: string): MethodDecorator => {
    if (room) {
        key = key + "@" + room;
    }
    return ((target: any, methodName: string, descriptor: PropertyDescriptor) => {
        const store: Godam = target._app.store;
        if (!store) {
            throw "store not registered";
        }
        target[methodName] = (...payload) => {
            store.set(key, ...payload);
        }
    });
};