import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchForm from "../../Components/SearchForm/SearchForm";
import RecommendationLists from "../../Components/RecommendationLists/RecommendationLists";
import "./ProductDetailPage.scss";
const ProductDetailPage = () => {
  const [currentProductLists, setCurrentProductLists] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = useLocation(); // extract search part of the URL
  const query = new URLSearchParams(search); // parses query string
  /*
   * fetches value associated with key "data"
   * decode URL-encoded string,
   * parse and converted back into Object
   */
  const queryData = JSON.parse(decodeURIComponent(query.get("data")));
  // CREATE/UPDATE PREFERENCE SCORE
  const handlePreferences = (productName) => {
    axios
      .post(`http://localhost:8080/preferences`, {
        productName: productName.toLocaleLowerCase(),
        userId: sessionStorage.getItem("userId"),
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleNavigateToProductDetailPage = (productId) => {
    const productListsObject = {
      productListsId: String(queryData.productListsId),
      currentProductId: productId,
    };
    navigate(
      `/productDetailPage?data=${encodeURIComponent(
        JSON.stringify(productListsObject)
      )}`
    );
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8080/getCurrentProducts`, {
        params: {
          productListsId: String(queryData.productListsId),
        },
      })
      .then((respond) => {
        setCurrentProductLists(respond.data.products[0].productLists);
      })
      .then(() => {
        setHasLoaded(true);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location.search]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (hasLoaded) {
    return (
      <div>
        <SearchForm />
        <div className="product-detail">
          {currentProductLists.map((item) => {
            if (item.product_id === queryData.currentProductId) {
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
          <div className="product-detail__next-products">
            <div className="products">
              {currentProductLists.map((item) => {
                if (item.product_id !== queryData.currentProductId) {
                  return (
                    <div
                      key={item.product_id}
                      className=""
                      onClick={() => {
                        handlePreferences(item.title);
                        handleNavigateToProductDetailPage(item.product_id);
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
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default ProductDetailPage;
