import { Link } from "react-router-dom"
import { useContext } from "react"
import UserContext from "../utils/UserContext"

const Body = () => {

    const { products, setProductInfo } = useContext(UserContext);
    const { orders, setOrderInfo } = useContext(UserContext);

    return <div className="flex flex-col md:flex-row justify-center items-center mt-24 md:space-x-10 ">
        <Link to="/products">
            <div className="m-4 p-4 bg-purple-200 rounded-xl w-60 md:w-72  md:h-44 flex flex-col justify-center items-center">
                <h1 className="m-2 px-2 text-2xl font-semibold  text-purple-900">Total Products :</h1>
                <h1 className="mx-2 px-2 text-4xl font-bold text-purple-900">{products.length}</h1>
            </div>
        </Link>

        <Link to="/Orders">
            <div className="m-4 p-4 bg-orange-200 rounded-xl w-60 md:w-72  md:h-44 flex flex-col justify-center items-center">
                <h1 className="m-2 px-2 text-2xl font-semibold text-orange-900">Total Orders :</h1>
                <h1 className="mx-2 px-2 text-4xl font-bold text-orange-900">{orders.length}</h1>
            </div>
        </Link>
    </div>
}

export default Body