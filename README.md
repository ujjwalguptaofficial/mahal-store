[![OSNFT](https://img.shields.io/badge/OSNFT-Buy%20NFT-yellowgreen)](https://osnft.app/nft/mahal-store@ujjwalguptaofficial)
[![npm version](https://badge.fury.io/js/@mahaljs%2Fstore.svg)](https://badge.fury.io/js/@mahaljs%2Fstore)
[![TEST](https://github.com/ujjwalguptaofficial/mahal-store/actions/workflows/test.yml/badge.svg)](https://github.com/ujjwalguptaofficial/mahal-store/actions/workflows/test.yml)

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



