import { Mahal } from "mahal";
import Main from "./components/main.mahal";
import { MahalStore } from "mahal-store";
import store from "../store";
console.log("MahalStore", MahalStore)
// console.log("ex", Expression)
const app = new Mahal(Main, '#app');
app.extend.plugin(MahalStore, store);
app.create();