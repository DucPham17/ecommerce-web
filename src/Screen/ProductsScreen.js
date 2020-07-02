import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { saveProduct, listProducts, deleteProduct } from "../actions/productActions.js";
function ProductsScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [_id,setId] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [countInStock, setCountInStock] = useState("")
    const [description, setDescription] = useState("")
    const productList = useSelector(state => state.productList)
    const productSave = useSelector(state => state.productSave)
    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
    const { loading, products, error } = productList;
    const dispatch = useDispatch();
  //  console.log(productList);
  //  console.log(_id)
    useEffect(() => {
        if(successSave){
            setModalVisible(false);
        }
        dispatch(listProducts())
        return () => {

        }

    }, [successSave, successDelete])

    const openModal = (product) => {
        setModalVisible(true)
        setId(product._id)
        setName(product.name)
        setDescription(product.description)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const product = {
            _id: _id,
            name: name,
            price: price,
            image: image,
            brand: brand,
            category: category,
            countInStock: countInStock,
            description: description,
        }
        dispatch(saveProduct(product))
    }

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product))
    }



    return (


        <div className="content content-margined">
            <div className="product-header">
                <h3>Products</h3>
                <button className="button primary" onClick= {() => openModal({})}>Create Product</button>
            </div>
            {modalVisible? <div className="form">
                <form method="POST" onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h3>Create Product</h3>
                        </li>
                        <li>{loadingSave ? <div>Loading...</div> : null}
                            {errorSave ? <div>There is an error</div> : null}</li>
                        <li >
                            <label htmlFor="name">Name: </label>
                            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name"></input>
                        </li>
                        <li >
                            <label htmlFor="price">Price: </label>
                            <input type="text" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Product Price"></input>
                        </li>
                        <li >
                            <label htmlFor="image">Image: </label>
                            <input type="text" name="image" id="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Product Image"></input>
                        </li>
                        <li >
                            <label htmlFor="brand">Brand: </label>
                            <input type="text" name="brand" id="brand" value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Product Brand"></input>
                        </li>
                        <li >
                            <label htmlFor="category">Category: </label>
                            <input type="text" name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Product Category"></input>
                        </li>
                        <li >
                            <label htmlFor="countInStock">Count In Stock: </label>
                            <input type="text" name="countInStock" id="countInStock" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} placeholder="Product Count In Stock"></input>
                        </li>
                        <li >
                            <label htmlFor="description">Description: </label>
                            <input type="text" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product Description"></input>
                        </li>


                        <li><button type="submit" className="button primary">{_id?"Update": "Create"}</button></li>
                        <li><button type="button" className="button secondary" onClick={() => setModalVisible(false)}>Back</button></li>
                    </ul>
                </form>
            </div> : null}
            
        <div className="product-list">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (<tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                            <button className="button" onClick={() => openModal(product)}>Edit</button>
                            <button className="button" onClick={() => deleteHandler(product)}>Delete</button>
                        </td>
                    </tr>))}
                </tbody>
            </table>
        </div>
        </div >
        
            
         
    )
}

export default ProductsScreen;