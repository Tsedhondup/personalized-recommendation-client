import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ProductList.scss";
const ProductList = (props) => {
  const [currentProductLists, setCurrentProductLists] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  // CREATE/UPDATE PREFERENCE SCORE
  const handlePreferences = (productName) => {
    axios
      .post(`http://localhost:8080/preferences`, {
        productName: productName.toLocaleLowerCase(),
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8080/currentSearchData`)
      .then((respond) => {
        // setCurrentProductLists(respond.data);
        console.log(respond.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (hasLoaded) {
    if (props.productLists.length > 0) {
      return (
        <div>
          <div className="products">
            {props.productLists.map((item) => {
              return (
                <Link
                  to={`/${item.product_id}`}
                  key={item.product_id}
                  className=""
                  onClick={() => {
                    handlePreferences(item.title);
                  }}
                >
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
                </Link>
              );
            })}
          </div>
        </div>
      );
    } else {
      return <h1>Loading....</h1>;
    }
  }
};
export default ProductList;
