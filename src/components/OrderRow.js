import { useContext, useState } from "react"
import UserContext from "../utils/UserContext";
import { Link } from "react-router-dom"
import { EDIT_ICON_URL, DELETE_ICON_URL, VIEW_ICON_URL } from "../utils/constants";

const OrderRow = ({ order }) => {

    const { orders, setOrderInfo } = useContext(UserContext)
    const [editing, setEditing] = useState(false);
    const [orderStatus, setOrderStatus] = useState(order.orderStatus)

    const handleStatusChange = (e) => {
        setOrderStatus(e.target.value);
    }

    const handleEdit = () => {
        setEditing(true);

    }

    const handleDone = (e) => {
        setEditing(false);
    }

    const handleDelete = (order) => {
        const updatedOrders = orders.filter((item) => (
            item.id !== order.id
        ))
        setOrderInfo(updatedOrders)
    }



    return <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <Link to={"/view/" + order.id} state={{ order: order }}><th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {order.id}
        </th></Link>
        <td class="px-6 py-4">
            {order.name}
        </td>
        <td class="px-6 py-4">
            {order.orderDate}
        </td>
        <td class="px-6 py-4">
            {editing ?
                <select value={orderStatus} onChange={handleStatusChange}>
                    <option value="Packed">Packed</option>
                    <option value="Order-Placed">Order-Placed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                </select> : orderStatus
            }
        </td>

        <td class="px-6 py-4">
            {order.eda}
        </td>

        <td class="px-6 py-4 flex flex-col md:flex-row">

            <Link to={"/view/" + order.id} state={{ order: order }}><button className="md:p-2 p-1 font-bold text-lg justify-start"><img src= {VIEW_ICON_URL} alt="view"></img></button></Link>
            {!editing ? <button className="ml-1 md:p-2 md:ml-0 p-1 font-bold text-lg justify-start" onClick={handleEdit}><img src={EDIT_ICON_URL} alt="📝"></img></button> : <button className=" mr-2 md:p-2 md:mr-0 p-1 font-bold text-lg justify-start" onClick={handleDone}>✔️</button>}
            <button className="md:p-2 p-1 font-bold text-lg justify-start" onClick={() => handleDelete(order)}><img src={DELETE_ICON_URL} alt="🗑️"></img></button>
        </td>
    </tr>
}

export default OrderRow;