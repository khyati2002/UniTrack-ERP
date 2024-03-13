const Item = ({ item }) => {

    return <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item?.name}
        </th>
        <td class="px-6 py-4">
            {item?.quantity}
        </td>
        <td class="px-6 py-4">
            {item?.price}
        </td>
        <td class="px-6 py-4">
            {parseInt(item?.price) * parseInt(item?.quantity)}
        </td>
    </tr>
}

export default Item