# Pinia Storage

![npm license](https://img.shields.io/npm/l/@ctechhindi/pinia-storage.svg)
![npm download](https://img.shields.io/npm/dm/@ctechhindi/pinia-storage.svg)
![GitHub top language](https://img.shields.io/github/languages/top/ctechhindi/pinia-storage.svg)
![GitHub issues](https://img.shields.io/github/issues/ctechhindi/pinia-storage.svg)
[![npm package](https://img.shields.io/npm/v/@ctechhindi/pinia-storage.svg)](https://www.npmjs.com/package/@ctechhindi/pinia-storage)

> Store Vue 3 Store data in the browser LocalStorage

- [GitHub](https://github.com/ctechhindi/Pinia-Storage)

## Requirements

- Vue.js `^3.0.0`

## Installation

### npm

```
npm i @ctechhindi/pinia-storage
```

## Usage

**`main.js`**

```js
import piniaStorage from "@ctechhindi/pinia-storage";
const pinia = createPinia();
pinia.use(piniaStorage);
```

**`\stores\{sites}-store.js`**

```js
import { defineStore } from "pinia";

export const useUsersStore = defineStore({
  id: "users-store",
  state: () => ({
    name: {
      first: "",
      last: "",
    },
  }),
  conserve: {
    enabled: true,
    strategies: [
      { storage: localStorage, states: ["name"] }, // Save custom state
      // { storage: localStorage, }, // Save all state
      // { storage: sessionStorage, states: ['name'] },
    ],
  },
  getters: {},
  actions: {},
});
```

### Custom LocalStorage

**`\stores\{sites}-store.js`**

```js
import { defineStore } from "pinia";

// Custom
const secureStorage = {
  setItem(key, state) {
    localStorage.setItem(key, state)
  },
  getItem(key) {
    localStorage.getItem(key, state)
  },
}

export const useUsersStore = defineStore({
  id: "users-store",
  state: () => ({
    name: {
      first: "",
      last: "",
    },
  }),
  conserve: {
    enabled: true,
    strategies: [
      { storage: secureStorage, states: ["name"] }, // Save custom state
    ],
  },
  getters: {},
  actions: {},
});
```

# License

[MIT License](https://opensource.org/licenses/MIT)
