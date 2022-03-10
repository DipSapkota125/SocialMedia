import React, { Fragment,useEffect } from 'react';
import "./Home.css";
import { CgMouse } from 'react-icons/all';
import Product from './Product';
import MetaData from '../layout/MetaData';
import { clearErrors,getProduct } from "../../Actions/productAction";
import {useSelector,useDispatch} from "react-redux";
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';



const Home = () => {
    const alert=useAlert();
    const disptach = useDispatch();
    const { loading, error, products} = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        if (error){
             alert.error(error);
            disptach(clearErrors());
        }
        disptach(getProduct());
      
    }, [disptach,error,alert]);

    return (
        <Fragment>
            {loading ? (
                 <Loader />
                 ) : (
                 <Fragment>
            <MetaData title="E-COMMERCE" />
            <div className="banner">
                <p>Welcome to E-commerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>

            <h2 className="homeHeading">Featured Products</h2>

            <div className="container" id="container">
               {products && products.map((product) => (
                    <Product key={product._id} product={product}/>))}

            </div>
            
        </Fragment>
                 )}

        </Fragment>
    );
};

export default Home
