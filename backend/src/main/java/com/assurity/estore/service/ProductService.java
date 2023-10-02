package com.assurity.estore.service;

import com.assurity.estore.model.Product;

import java.util.List;

public interface ProductService {
    Product addProduct(Product product);

    void deleteProduct(Long id);

    List<Product> getAllProducts();
}
