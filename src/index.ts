
import { Plugin, Mahal, Component } from "mahal";
import { Godam } from "godam";

export * from "./decorators";


// declare module "mahal" {
//     class Component {
//         store: Godam;
//     }
// }

export class MahalStore extends Plugin {
    setup(app: Mahal, store) {
        app.global['store'] = store;
    }
}

export default MahalStore;