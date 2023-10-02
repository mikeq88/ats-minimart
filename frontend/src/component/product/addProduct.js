import { Modal } from "react-bootstrap";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Product from '../../model/product';
import ProductService from '../../service/product';

const AddProduct = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        showProductModal() {
            setShow(true);
        }
    }));

    useEffect(() => {
        setProduct(props.product);
    }, [props.product]);

    const [product, setProduct] = useState(new Product("", "", 0));
    const [submitted, setSubmitted] = useState(false);
    const [show, setShow] = useState(false);
    const [error, SetError] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const addProduct = (e) => {
        e.preventDefault();

        setSubmitted(true);

        if (!product.name || !product.description || !product.price) {
            return;
        };

        if (selectedFile) {
            product.img = selectedFile.name;
            ProductService.saveImage(selectedFile);
            setSelectedFile(null);
        }

        ProductService.saveProduct(product).then(res => {
            props.onSaved(res.data);
            setShow(false);
            setSubmitted(false);
        }).catch(err => {
            SetError("Unexpected error...");
            console.log(err);
        });
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setProduct((prev => {
            return {
                ...prev,
                [name]: value
            };
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    return (
        <Modal show={show}>
            <form
            className={submitted ? "was-validated" : ""}
            onSubmit={(e) => addProduct(e)} 
            noValidate>
                <div className="modal-header">
                    <h5 className="modal-title">Product Details</h5>
                    <button type="button" className="btn-close" onClick={() => setShow(false)} />
                </div>

                <div className="modal-body">
                    {error &&
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    }

                    <div className="form-group">
                        <label htmlFor="name">
                            Name:
                        </label>
                        <input type="text" name="name" placeholder="name" className="form-control" value={product.name}
                            onChange={(e) => handleChange(e)} required />
                        <div className="invalid-feedback">
                            Name is required
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">
                            Description:
                        </label>
                        <textarea name="description" placeholder="description" className="form-control" value={product.description}
                            onChange={(e) => handleChange(e)} required />
                        <div className="invalid-feedback">
                            Description is required
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">
                            Price:
                        </label>
                        <input type="number" min="1" name="price" placeholder="price" className="form-control" value={product.price}
                            onChange={(e) => handleChange(e)} required />
                        <div className="invalid-feedback">
                            Price is required
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">
                            Image:
                        </label>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="form-control" />
                        <div className="invalid-feedback">
                            Image is required
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>
                        Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Save Changes
                    </button>
                </div>
            </form>
        </Modal>
    )
});

export default AddProduct;
