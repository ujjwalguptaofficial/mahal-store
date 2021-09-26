

// tslint:disable-next-line
export const Expression = function (key: string, room?: string): PropertyDecorator {
    console.log("thisdd", this);
    if (room) {
        key = key + "@" + room;
    }
    return (target: any, propName: string) => {
        Object.defineProperty(target, propName, {
            get() {
                const watchKey = "expression." + key;
                const onceCb = (newValue) => {
                    this.store.unwatch(watchKey, onceCb);
                    this.setState(propName, newValue);
                };
                this.store.watch(watchKey, onceCb);
                return this.store.eval(key);
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