import axios from "axios";
import { useEffect, useState } from "react";
import "./ProductList.scss";
const ProductList = () => {
  //   const baseURL = process.env.REACT_API_URL;
  const [productList, setProductList] = useState([]);

  const handleProductList = () => {
    axios
      .get(`http://localhost:8080/products`, {
        params: {
          productName: "ramen",
        },
      })
      .then((respond) => {
        setProductList(respond.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (productList.length) {
    return (
      <div>
        <div className="products">
          {productList.map((item) => {
            return (
              <div key={item.position} className="">
                <h1>{item.title}</h1>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="product-image"
                />
                <h2>price: {item.price}</h2>
                <h2>
                  {item.source}
                  <img
                    src={item.source_icon}
                    alt="source-icon"
                    className="source-icon"
                  />
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <di>
          <h1>Loading.....</h1>
        </di>
      </>
    );
  }
};
export default ProductList;
