import React from "react"
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet, Route } from 'react-router-dom';
import Header from "./components/Header";
import Body from "./components/Body";
import Orders from "./components/Orders";
import Products from "./components/Products";
import UserContext from "./utils/UserContext";
import { useState } from 'react';
import AddProduct from "./components/AddProduct";
import products from './utils/products.json';
import orders from './utils/orders.json'
import ViewOrder from "./components/ViewOrder";
import AppCalendar from "./components/Calendar";
import ErrorPage from "./components/ErrorPage";

const App = () => {

  const [productInfo, setProductInfo] = useState(products?.data);
  const [orderInfo, setOrderInfo] = useState(orders?.data);

  return <UserContext.Provider value={{ products: productInfo, setProductInfo, orders: orderInfo, setOrderInfo }}>
    <div >
      <Header />
      <Outlet className="mb-10" />
    </div>
  </UserContext.Provider>
}


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/add',
        element: <AddProduct />
      },
      {
        path: '/view/:id',
        element: <ViewOrder />
      },
      {
        path: '/calendar',
        element: <AppCalendar />
      }
    ],
    errorElement : < ErrorPage />

  }

]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter}></RouterProvider>)

