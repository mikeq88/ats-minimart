import { API_URL, MINIO_UPLOAD_PATH } from "../util/constants";
import axios from 'axios';

const PRODUCT_API_URL = API_URL + "/api/product";
const UPLOAD_API_URL = API_URL + `/${MINIO_UPLOAD_PATH}`;

class ProductService {

    getAllProducts() {
        return axios.get(PRODUCT_API_URL);
    }

    saveProduct(product) {
        return axios.post(PRODUCT_API_URL, product);
    }

    deleteProduct(product) {
        return axios.delete(PRODUCT_API_URL + "/" + product.id);
    }

    saveImage(file) {
        const formData = new FormData();
        formData.append('file', file);

        return axios.post(UPLOAD_API_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.error(error);
        });
    }
}

// eslint-disable-next-line
export default new ProductService();