
import { Plugin, Mahal, Component } from "mahal";
import { Godam } from "godam";

export * from "./decorators";


declare module "mahal" {
    export interface Component {
        store: Godam;
    }
}

export default class MahalStore extends Plugin {
    setup(app: Mahal, store) {
        app.global.store = store;
    }
}