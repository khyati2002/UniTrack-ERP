import { useContext } from "react"
import TableRow from "./ProductRow"

import UserContext from "../utils/UserContext"
import { Link } from "react-router-dom"
const Products = () => {

    const { products } = useContext(UserContext)

    return <div>
        <div className="flex justify-between">
            <div className="ml-4 p-10 text-2xl font-semibold">Manage Products : </div>
            <Link to="/add"><button className="m-10 border border-black text-2xl rounded-2xl w-14 h-10 content-center" >+</button></Link>
        </div>

        <div class="relative overflow-x-auto px-10">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Brand
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((item) => (
                        <TableRow product={item} />
                    ))}

                </tbody>
            </table>
        </div>

    </div>
}

export default Products