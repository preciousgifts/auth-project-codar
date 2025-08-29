import Product from "../utils/productSchema.js";
import express from "express";

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find({});
    if (allProducts.length > 0) {
      res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: allProducts,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Products not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching products",
      error: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, vendor } = req.body;
    if (!name || !price || !image) {
      res.status(400).json({
        success: false,
        message: "Name, price, and image are required fields",
      });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      image,
      category,
      vendor,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfullly",
      data: savedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating the product",
      error: error.message,
    });
  }
};
export { getAllProducts, createProduct };
