import { Mahal } from "mahal";
import Main from "./components/main.mahal";
import MahalStore from "mahal-store";
import store from "../store";

export const app = new Mahal(Main, '#app');
app.extend.plugin(MahalStore, store);
if (process.env.BUILD_ENV !== "test") {
    app.create();
}
