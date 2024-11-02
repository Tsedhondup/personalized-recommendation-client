import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.scss";
const ProductList = (props) => {
  const [currentProductLists, setCurrentProductLists] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/currentData`)
      .then((respond) => {
        setCurrentProductLists(respond.data.parsedData);
        console.log(respond.data.parsedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (props.productLists.length > 0) {
    return (
      <div>
        <div className="products">
          {props.productLists.map((item) => {
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
  }
  if (currentProductLists.length > 0) {
    return (
      <div>
        <div className="products">
          {currentProductLists.map((item) => {
            return (
              <div key={item.position} className="">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="product-image"
                />
                <h1>{item.title}</h1>
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
  }
  if (!currentProductLists.length > 0 && !props.productLists.length > 0) {
    return <div></div>;
  }
};
export default ProductList;
