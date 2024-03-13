import { useContext, useState } from "react"
import UserContext from "../utils/UserContext"
import { useLocation } from "react-router-dom"

const AddProduct = () => {

  let { state } = useLocation();

  const { products, setProductInfo } = useContext(UserContext)
  const initial = state !== null ? ({
    productName: state.data.productName,
    brand: state.data.brand,
    price: state.data.price,
    quantity: state.data.quantity
  }) : ({
    productName: "",
    brand: "",
    price: "",
    quantity: ""
  });
  
  const [obj, setObj] = useState(initial);

  const handleChangeName = (e) => {

    setObj((item) => ({
      ...item,
      productName: e.target.value
    })
    )

  }

  const handleChangeBrand = (e) => {
    setObj((item) => ({
      ...item,
      brand: e.target.value
    })
    )
  }

  const handleChangePrice = (e) => {
    if (e.target.value !== "" && isNaN(Number(e.target.value))) {
      alert("Please enter a valid number");
    }
    else {
      setObj((item) => ({
        ...item,
        price: e.target.value
      })
      )

    }
  }

  const handleChangeQuantity = (e) => {
    if (e.target.value !== "" && isNaN(Number(e.target.value))) {
      alert("Please enter a valid number");
    }
    else {
      setObj((item) => ({
        ...item,
        quantity: e.target.value
      })
      )
    }
  }

  const handleSubmit = (item) => {
    if (item.productName !== "" && item.quantity !== "" && item.brand !== "" && item.price !== "") {
      const ind = products.findIndex((element) => element.productName === item.productName);
      ind !== -1 ? (products[ind] = item, alert("Modified Product Successfully"), setProductInfo(products)) : (alert("Added Product Successfully"), setProductInfo([...products, item]))

    }
    else {
      alert("Please enter all the valid values")
    }

  }


  return <div className="m-10 px-10">
    <h1 className="text-2xl font-semibold m-2 p-2">Edit Details : </h1>
    <div>
      <label className="m-2 p-2">Product Name :</label>
      <br></br>
      <input placeholder="Enter the name of the product" value={obj.productName} className="m-3 p-2 border border-black w-5/12" onChange={handleChangeName}></input>
    </div>

    <div>
      <label className="m-2 p-2">Brand :</label>
      <br></br>
      <input placeholder="Enter the brand of the product" value={obj.brand} className="m-3 p-2 border border-black w-5/12" onChange={handleChangeBrand}></input>
    </div>

    <div>
      <label className="m-2 p-2">Price :</label>
      <br></br>
      <input placeholder="Enter the price of the product" value={obj.price} className="m-3 p-2 border border-black w-5/12" onChange={handleChangePrice}></input>
    </div>

    <div>
      <label className="m-2 p-2">Quantity :</label>
      <br></br>
      <input placeholder="Enter the quantity of the product" value={obj.quantity} className="m-3 p-2 border border-black w-5/12" onChange={handleChangeQuantity}></input>
    </div>

    <button className="mx-2 mt-4 p-2 border border-black rounded-lg bg-black text-white" onClick={() => handleSubmit(obj)}>Submit</button>

  </div>


}

export default AddProduct;