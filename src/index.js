/**
 * Update Storage
 * @param {Object} conserve 
 * @param {Object} store 
 */
export const updateStorage = (conserve, store) => {
  const storage = conserve.storage || sessionStorage
  const storeKey = conserve.key || store.$id

  if (conserve.states) {
    const partialState = conserve.states.reduce((finalObj, key) => {
      finalObj[key] = store.$state[key];
      return finalObj;
    }, {})

    storage.setItem(storeKey, JSON.stringify(partialState))
  } else {
    storage.setItem(storeKey, JSON.stringify(store.$state))
  }
}

// Default
function piniaStorage({ options, store }) {
  if (options.conserve && options.conserve.enabled && options.conserve.strategies && options.conserve.strategies.length > 0) {

    // Get Storage and Set in the Store
    options.conserve.strategies.forEach((s) => {
      const storage = s.storage || sessionStorage
      const storeKey = s.key || store.$id
      const storageResult = storage.getItem(storeKey)

      if (storageResult) {
        store.$patch(JSON.parse(storageResult))
        updateStorage(s, store)
      }
    });

    store.$subscribe((mutations, state) => {
      options.conserve.strategies.forEach((s) => {
        updateStorage(s, store)
      })
    }, { detached: true });
  }
}

export default piniaStorage;