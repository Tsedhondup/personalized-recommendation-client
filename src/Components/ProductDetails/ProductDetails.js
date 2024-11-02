import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
const ProductDetails = () => {
  const [productLists, setProductLists] = useState([]);
  const { productId } = useParams();
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
      .get(`http://localhost:8080/currentData`)
      .then((respond) => {
        setProductLists(respond.data.parsedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (productLists.length > 0) {
    return (
      <div className="product-detail">
        <div className="product-detail__current-product">
          {productLists.map((item) => {
            if (item.product_id === productId) {
              return (
                <div className="current-product-item" key={item.product_id}>
                  <div className="current-product-item__image">
                    <img src={item.thumbnail} alt="product-image" />
                  </div>
                  <div className="current-product-item__info">
                    <h1>{item.title}</h1>
                    <h2>{`Brand: ${item.source}`}</h2>
                    <h2>{`Rating: ${item.rating}`}</h2>
                    <img src={item.source_icon} alt="brand-logo" />
                    <h2>{item.price}</h2>
                    <a
                      href={item.product_link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => {
                        handlePreferences(item.title);
                      }}
                    >
                      Buy
                    </a>
                    <h2>{`Delivery: ${item.delivery}`}</h2>
                    <h2>{`Reviews: ${item.reviews}`}</h2>
                    <button
                      onClick={() => {
                        handlePreferences(item.title);
                      }}
                    >
                      Add to card
                    </button>
                    <button
                      onClick={() => {
                        handlePreferences(item.title);
                      }}
                    >
                      like
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="product-detail__next-products">
          <div className="products">
            {productLists.map((item) => {
              return (
                <Link
                  to={`/${item.product_id}`}
                  key={item.product_id}
                  className=""
                  onClick={() => {
                    handlePreferences(item.title);
                  }}
                >
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
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};
export default ProductDetails;
