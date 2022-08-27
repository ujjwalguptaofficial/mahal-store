[![npm version](https://badge.fury.io/js/@mahaljs%2Fstore.svg)](https://badge.fury.io/js/@mahaljs%2Fstore)

# mahal-store

Store module for [mahal framework](https://github.com/ujjwalguptaofficial/mahal)

# Install

```
npm i @mahaljs/store
```

# Setup

```
import { Mahal } from "mahal";
import Main from "@/components/main.mahal";
import MahalStore from "@mahaljs/store";
import store from "@/store";

export const app = new Mahal(Main, '#app');

// add mahal store as plugin
app.extend.plugin(MahalStore, store);

app.create();

```

# Docs

https://mahaljs.com/docs/store/



