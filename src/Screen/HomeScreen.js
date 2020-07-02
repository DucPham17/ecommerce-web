import React, { useEffect } from "react"
import Product from "../Product.js"
import { useSelector, useDispatch } from "react-redux"
import { listProducts } from "../actions/productActions.js"


function HomeScreen(props) {

    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();
    console.log(products)
    useEffect(() => {
        dispatch(listProducts())

        return () => {

        }

    }, [])

    return (
        loading ? <div>Loading...</div> :
            error ? <div>{error}</div> :
                products == null || !Array.isArray(products)  ? <div>Loading...</div> :
                    <ul className="products" >
                        {
                            products.map(product => {
                                return <li key={product._id}>
                                    <Product id={product._id} name={product.name} imgSrc={product.image} brand={product.brand}
                                        price={product.price} rating={product.rating} />
                                </li>;
                            }
                            )
                        }
                    </ul>

    )

}

export default HomeScreen;