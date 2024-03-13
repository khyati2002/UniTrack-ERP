import { useLocation } from "react-router-dom";
import Item from "./ViewOrderItem";

const ViewOrder = () => {

  let { state } = useLocation()


  const calculateTotal = () => {
    let total = 0;
    state.order.items.forEach((element) => {
      total += parseFloat(element.price) * parseInt(element.quantity);
    });
    return total;
  }

  return <div>

    <h1 className="p-2 ml-10 mb-5 text-2xl font-semibold">Order Details :</h1>
    <div className="flex flex-col ml-10 mb-5">

      <h1 className="p-2 ml-4">Customer Name : {state.order.name}</h1>
      <h1 className="p-2 ml-4">Order Status : {state.order.orderStatus}</h1>

    </div>

    <div class="relative overflow-x-auto ml-10 mr-10">

      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Product
            </th>
            <th scope="col" class="px-6 py-3">
              Quantity
            </th>
            <th scope="col" class="px-6 py-3">
              Price
            </th>
            <th scope="col" class="px-6 py-3">
              Total Price
            </th>

          </tr>
        </thead>
        <tbody>

          {state.order.items && state.order.items.map((element) => (
            <Item item={element} />
          ))}


        </tbody>
      </table>

      <div className="md:p-2 md:m-4 text-xl  flex justify-end md:mr-[266]"> Total :  {calculateTotal(state.order.items)}</div>
    </div>

  </div>
}

export default ViewOrder;