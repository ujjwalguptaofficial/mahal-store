import { Plugin, Mahal, Component } from "mahal";

export class MahalStore extends Plugin {
    setup(app: Mahal, store) {
        app.global['store'] = store;
    }
}
