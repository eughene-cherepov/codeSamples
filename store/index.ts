import { createContext, useContext } from "react"
import { configure } from "mobx"

import { AuthStore } from "./auth"

configure({
    enforceActions: "never",
})

interface Store {
    authStore: AuthStore
}

const store: Store = {
    authStore: new AuthStore(),
}

const storeContext = createContext(store)

export const useStore = () => useContext(storeContext)
