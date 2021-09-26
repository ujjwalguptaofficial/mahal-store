import { Godam } from "godam";

// tslint:disable-next-line
export const Expression = function (key: string, room?: string) {
    if (room) {
        key = key + "@" + room;
    }
    return (target: any, methodName: string) => {
        // console.log("descriptor", descriptor);
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
    };
};