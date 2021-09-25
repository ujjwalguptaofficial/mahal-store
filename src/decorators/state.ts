import { Godam } from "godam";

// tslint:disable-next-line
export const State = (key: string, room?: string): MethodDecorator => {
    if (room) {
        key = key + "@" + room;
    }
    return ((target: any, methodName: string, descriptor: PropertyDescriptor) => {
        const store: Godam = target._app.store;
        if (!store) {
            throw "store not registered";
        }
        const setValue = () => {
            target.setState(methodName, store.get(key));
        }
        store.on(key, (newValue) => {
            setValue();
        });
        setValue();
    });
};