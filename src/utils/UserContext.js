import { createContext } from "react";

const UserContext = createContext({
    products: [],
    orders: [],
})

export default UserContext