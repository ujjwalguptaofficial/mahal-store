import { Godam } from "godam";

// tslint:disable-next-line
export const Expression = (key: string, room?: string): MethodDecorator => {
    if (room) {
        key = key + "@" + room;
    }
    return ((target: any, methodName: string, descriptor: PropertyDescriptor) => {
        const store: Godam = target._app.store;
        if (!store) {
            throw "store not registered";
        }
        const setValue = () => {
            target.setState(methodName, store.eval(key));
        }
        store.on("expression." + key, () => {
            setValue();
        });
        setValue();
    });
};