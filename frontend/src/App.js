import "./App.css";
import axios from "axios"
import { useEffect, useState } from "react";
import React from "react";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignup from "./component/User/LoginSignup";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/User/Profile";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import store from "./store";
import { loadUser } from "./Actions/userAction";
import { useSelector } from "react-redux";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UserList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import NotFound from "./component/layout/NotFound/NotFound";
import WebFont from "webfontloader";
import ProtectedRoute from "./component/Route/ProtectedRoute";




function App() {


    const { isAuthenticated, user } = useSelector((state) => state.user);
    console.log('auth', isAuthenticated, user)

    const [stripeApiKey, setStripeApiKey] = useState("");

    async function getStripeApiKey(){
        const {data} = await axios.get("http://localhost:5000/api/v1/stripeapikey");

        setStripeApiKey(data.stripeApiKey);
    }

    useEffect(() => {
        WebFont.load({
          google: {
            families: ["Roboto", "Droid Sans", "Chilanka"],
          },
        });
    
        store.dispatch(loadUser());
    
        getStripeApiKey();
      }, []);

      window.addEventListener("contextmenu", (e) => e.preventDefault());
    

    return (
        <Router>
            
        <Header />
        
        
        {isAuthenticated && <UserOptions user={user} />}

        {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Route exact path="/process/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        </Elements>
      )}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignup />} />
        <Route exact path="/cart" element={<Cart />} />

        
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />

        <Route exact path="/account" element={<ProtectedRoute />} >
        <Route exact path="/account" element= {<Profile  /> }/>

        </Route>
       
        <Route exact path="/me/update" element={<ProtectedRoute />} >
       <Route exact path="/me/update" element={<UpdateProfile />} />
       </Route>

       <Route exact path="/password/update" element={<ProtectedRoute />} >
       <Route exact path="/password/update" element={<UpdatePassword />} />
       </Route>

     

       <Route exact path="/shipping" element={<ProtectedRoute />}>
       <Route exact path = "/shipping" element={<Shipping />}/>
       </Route>

       <Route exact path="/order/confirm" element={<ProtectedRoute />}>
       <Route exact path = "/order/confirm" element={<ConfirmOrder />}/>
       </Route>

       <Route exact path="/success" element={<ProtectedRoute />}>
       <Route exact path = "/success" element={<OrderSuccess />}/>
       </Route>

       
       <Route exact path="/orders" element={<ProtectedRoute />}>
       <Route exact path = "/orders" element={<MyOrders />}/>
       </Route>

       <Route exact path="/order/:id" element={<ProtectedRoute />}>
        <Route exact path="/order/:id" element={<OrderDetails />} />
       </Route>
      

       <Route exact path="/admin/dashboard"  element={<ProtectedRoute />} >
       <Route exact path="/admin/dashboard"  element={<Dashboard />} />
       </Route>

       <Route exact path="/admin/products" element={<ProtectedRoute />} >
       <Route exact path="/admin/products" element={<ProductList />} />
       </Route>


      <Route exact path="/admin/product" element={<ProtectedRoute />} >
       <Route
         exact
         path="/admin/product"
         isAdmin={true}
         element={<NewProduct />}
       />
       </Route>

      
      <Route exact path="/admin/product/:id" element={<ProtectedRoute />} >
     <Route
         exact
         path="/admin/product/:id"
         isAdmin={true}
         element={<UpdateProduct />}
       />
        </Route>

      <Route exact path="/admin/orders" element={<ProtectedRoute />} >
       <Route
         exact
         path="/admin/orders"
         isAdmin={true}
         element={<OrderList />}
       />
        </Route>

        <Route exact path="/admin/order/:id" element={<ProtectedRoute />} >
       <Route
         exact
         path="/admin/order/:id"
         isAdmin={true}
         element={<ProcessOrder />}
       />
        </Route>

      <Route exact path="/admin/users" element={<ProtectedRoute />} >
       <Route
         exact
         path="/admin/users"
         isAdmin={true}
         element={<UsersList />}
       />
       </Route>

      <Route exact path="/admin/user/:id" element={<ProtectedRoute />} >
       <Route
         exact
         path="/admin/user/:id"
         isAdmin={true}
         element={<UpdateUser />}
       />
        </Route>

        <Route exact path="/admin/reviews" element={<ProtectedRoute />} >
       <Route
         exact
         path="/admin/reviews"
         isAdmin={true}
         component={<ProductReviews />}
       />
        </Route>
      

        <Route
          element={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />

      
        </Routes>
        <Footer />
        </Router>
    
        
     
    );
  }

  export default App