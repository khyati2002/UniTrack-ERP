import { useContext } from "react";
import UserContext from "../utils/UserContext";
import OrderRow from "./OrderRow";

const Orders = () => {

    const { orders } = useContext(UserContext)
    return <div>
        <div className="flex justify-between">
            <div className="ml-4 p-10 text-2xl font-semibold">Manage Orders : </div>
        </div>

        <div class="relative overflow-x-auto md:px-10">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Order ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Customer Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Order Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Order Status
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Expected Delivery Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.map((order) => (
                        <OrderRow order={order} />
                    ))}
                </tbody>
            </table>
        </div>
    </div>
}

export default Orders;