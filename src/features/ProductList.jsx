import React, { useState } from "react";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useAddNewProductMutation,
  useUpdateProductMutation,
} from "./Products";

const ProductList = () => {
  const [deleteProduct] = useDeleteProductMutation();
  const [addNewProduct, response] = useAddNewProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [inputField, setInputField] = useState({
    id: "",
    title: "",
    price: 0,
    description: "",
  });

  const inputsHandler = (e) => {
    setInputField((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const setProductData = (data) => {
    setInputField({
      id: data.id,
      title: data.title,
      price: data.price,
      description: data.description,
    });
  };

  const onEditData = () => {
    updateProduct({
      id: inputField.id,
      title: inputField.title,
      price: inputField.price,
      description: inputField.description,
    });

    setInputField(() => ({
      id: "",
      title: "",
      price: 0,
      description: "",
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { title, price, description } = e.target.elements;

    setInputField((inputField) => ({
      ...inputField,
      [e.target.name]: e.target.value,
    }));

    let formData = {
      title: title.value,
      price: price.value,
      description: description.value,
      published: true,
    };

    addNewProduct(formData)
      .unwrap()
      .then(() => {
        setInputField(() => ({
          id: "",
          title: "",
          price: 0,
          description: "",
        }));
      })
      .then((error) => {
        console.log(error);
      });
  };

  const {
    data: products,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getError,
  } = useGetProductsQuery({ refetchOnMountOrArgChange: true });

  let productContent;
  if (isGetLoading) {
    productContent = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  } else if (isGetSuccess) {
    productContent = products.map((item) => {
      return (
        <div className="col-lg-12 mb-3" key={item.id}>
          <div className="card alert alert-secondary">
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <h6>{item.price}</h6>
              <p className="card-text">{item.description}</p>
              <button
                onClick={() => deleteProduct(item.id)}
                className="btn btn-outline-danger me-2"
              >
                Remove
              </button>
              <button
                onClick={() => setProductData(item)}
                className="btn btn-outline-primary"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      );
    });
  } else if (isGetError) {
    productContent = (
      <div className="alert alert-danger" role="alert">
        {getError}
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-4 offset-md-*">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter Title</strong>
            </label>
            <input
              value={inputField.title}
              type="text"
              className="form-control"
              name="title"
              id="title"
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter Price</strong>
            </label>
            <input
              value={inputField.price}
              type="number"
              className="form-control"
              name="price"
              id="price"
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter desc</strong>
            </label>
            <textarea
              value={inputField.description}
              className="form-control"
              rows="3"
              name="description"
              id="description"
              onChange={inputsHandler}
            ></textarea>
          </div>
          <button className="btn btn-danger me-2" type="submit">
            Submit
          </button>
          <button
            onClick={onEditData}
            className="btn btn-primary"
            type="button"
          >
            Update
          </button>
        </form>
      </div>
      <div className="col-lg-8">
        <div className="row">{productContent}</div>
      </div>
    </div>
  );
};

export default ProductList;
