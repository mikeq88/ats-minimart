import { useEffect, useRef, useState } from "react";
import Product from "../../model/product";
import ProductService from "../../service/product";
import AddProduct from "../../component/product/addProduct";
import { API_URL, MINIO_DOWNLOAD_PATH } from "../../util/constants";



const AdminLandingPage = () => {

    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(new Product(0, "", "", 0, ""));
    const [error, setError] = useState("");

    const saveComponent = useRef();

    useEffect(() => {
        ProductService.getAllProducts().then((res) => {
            setProductList(res.data);
        });
    }, []);

    const onAddProduct = () => {
        setSelectedProduct(new Product(0, "", "", 0, ""));
        saveComponent.current?.showProductModal();
    };

    const onProductSaved = (p) => {
        let index = productList.findIndex(item => item.id === p.id);

        if (index !== -1) {
            const newList = productList.map((item) => {
                if (item.id === p.id) {
                    return p;
                }
                return item;
            });
            setProductList(newList);
        } 
        else {
            const newProductList = productList.concat(p);
            setProductList(newProductList);
        }
    };

    const onEditProduct = (item) => {
        setSelectedProduct(Object.assign({}, item));
        saveComponent.current?.showProductModal();
    };

    const onDeleteProduct = (item) => {
        ProductService.deleteProduct(item).then(_ => {
            setProductList(productList.filter(p => p.id !== item.id));
        }).catch(err => {
            setError("Error!");
            console.log(err);
        });
    };

    return (
        <div>
            <div className="container">
                <div className="pt-5">

                    {error && 
                        <div className="alert alert-danver">
                            {error}
                        </div>
                    }

                    <div className="card">
                        <div className="card-header">
                            <div className="row bg-light">
                                <div className="col-6 mt-3 mb-3">
                                    <h3>All Products</h3>
                                </div>
                                <div className="col-6 text-end mt-3 mb-3">
                                    <button className="btn btn-info" onClick={() => onAddProduct()}>
                                        Add Product
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table table-hover mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productList.map((item, index) => 
                                        <tr key={item.id}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>{`$ ${item.price}`}</td>
                                            <td>
                                                <img 
                                                    src={`${API_URL}/${MINIO_DOWNLOAD_PATH}/${item.img}`}
                                                    alt={item.name}
                                                    style={{ width: "80px", height: "80px" }}
                                                />
                                            </td>
                                            <td>
                                                <button className="btn btn-outline-success rounded-pill me-1" onClick={() => onEditProduct(item)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-outline-danger" onClick={() => onDeleteProduct(item)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <AddProduct ref={saveComponent} product={selectedProduct} onSaved={(p) => onProductSaved(p)}/>
        </div>
    )
}

export default AdminLandingPage;