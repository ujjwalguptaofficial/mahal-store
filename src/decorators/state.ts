import { Godam } from "godam";
import { nextTick } from "mahal";

// tslint:disable-next-line
export const State = function (key: string, room?: string): PropertyDecorator {
    console.log("thisdd", this);
    if (room) {
        key = key + "@" + room;
    }
    return (target: any, propName: string) => {
        Object.defineProperty(target, propName, {
            get() {
                const onceCb = (newValue) => {
                    this.store.unwatch(key, onceCb);
                    this.setState(propName, newValue);
                };
                this.store.watch(key, onceCb);
                return this.store.get(key);
            }
        })
    }
    // const desc = (target: any, methodName: string) => {
    //     nextTick(() => {
    //         target.on('create', () => {
    //             const store: Godam = target._app.store;
    //             if (!store) {
    //                 throw "store not registered";
    //             }
    //             const setValue = () => {
    //                 target.setState(methodName, store.get(key));
    //             }
    //             store.on(key, (newValue) => {
    //                 setValue();
    //             });
    //             setValue();
    //         })
    //     })
    // };
    // return desc;
};