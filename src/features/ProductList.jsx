import React from "react";
import { useGetProductsQuery } from "./Products";

const ProductList = () => {
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
              <p className="card-text">{item.description}</p>
              <button
                //onClick={() => deletePost(item.id)}
                className="btn btn-outline-danger me-2"
              >
                Remove
              </button>
              <button
                //onClick={() => setPostData(item)}
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
        <form>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter Title</strong>
            </label>
            {/* <input
              value=""
              type="text"
              className="form-control"
              name="title"
              id="title"
              //onChange={inputsHandler}
            /> */}
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter content</strong>
            </label>
            {/* <textarea
              value=""
              className="form-control"
              rows="3"
              name="body"
              id="body"
              //onChange={inputsHandler}
            ></textarea> */}
          </div>
          <button className="btn btn-danger me-2" type="submit">
            Submit
          </button>
          <button
            //onClick={onEditData}
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
