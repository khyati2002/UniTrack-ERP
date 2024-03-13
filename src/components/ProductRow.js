import { useContext } from "react"
import UserContext from "../utils/UserContext"
import { Link } from "react-router-dom";
import { EDIT_ICON_URL, DELETE_ICON_URL } from "../utils/constants";

const TableRow = ({ product }) => {

    const { products, setProductInfo } = useContext(UserContext);

    const handleDelete = (product) => {
        const updatedProducts = products.filter((item) => (
            item.productName !== product.productName
        ))
        setProductInfo(updatedProducts)
    }

    
    return <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {product.productName}
        </th>
        <td class="px-6 py-4">
            {product.brand}
        </td>
        <td class="px-6 py-4">
            {product.price}
        </td>
        <td class="px-6 py-4">
            {product.quantity}
        </td>
        <td class="px-6 py-4 flex">
            <div className="flex flex-row justify-center items-center">
                <Link to="/add" state={{ data: product }}><button className="md:p-2 font-bold text-lg" ><img src={EDIT_ICON_URL} alt="📝"></img></button></Link>
                <button className="md:p-2 font-bold text-lg" onClick={() => handleDelete(product)}><img src= {DELETE_ICON_URL} alt="🗑️"></img></button>
            </div>
        </td>
    </tr>
}

export default TableRow