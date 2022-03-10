import { Godam } from "godam";
import { Component } from "mahal";

export class BaseComponent extends Component {

    constructor() {
        super();
    }

    get store() {
        return this.global.store as Godam;
    }
}