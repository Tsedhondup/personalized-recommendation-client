import "./MainPersonalizedDetails.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const MainPersonalizedDetails = (props) => {
  const navigate = useNavigate();
  const [personalizedLists, setPersonalizedLists] = useState([]);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  const handleNavigateToProductDetailPage = (productId) => {
    const productListsObject = {
      src: "mainPersonalized",
      pId: productId,
    };
    navigate(
      `/productDetailPage?data=${encodeURIComponent(
        JSON.stringify(productListsObject)
      )}`
    );
  };
  useEffect(() => {
    axios
      .get("http://localhost:8080/currentMainPersonalized", {
        params: {
          sessionId: JSON.parse(localStorage.getItem("pprSID*")).sessionId,
        },
      })
      .then((respond) => {
        setCurrentProduct(
          respond.data.map((item) => {
            return item.productData.filter((product) => {
              return product.id === props.queryData.pId;
            });
          })
        );
        setPersonalizedLists(respond.data);
      })
      .then(() => {
        setHasLoaded(true);
      });
  }, []);

  if (hasLoaded) {
    return (
      <div>
        <div>
          <div className="recommendations">
            {currentProduct.map((product) => {
              return product.map((item) => {
                return (
                  <div
                    className="recommendations__item"
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={item.image}
                      alt="img"
                      className="recommendations__item--thumbnail"
                    />
                    <h2>{item.title}</h2>
                    <h2>
                      {item.source}
                      <img
                        src={item.source_logo}
                        alt="logo"
                        className="recommendations__item--logo"
                      />
                    </h2>
                    <h3>{item.price}</h3>
                    <h3>rating: ${item.rating}</h3>
                  </div>
                );
              });
            })}
          </div>
        </div>
        <div className="recommendations">
          {personalizedLists.map((item) => {
            return item.productData.map((product) => {
              if (product.id !== props.queryData.pId) {
                return (
                  <div
                    className="recommendations__item"
                    key={product.id}
                    href={product.link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      handleNavigateToProductDetailPage(product.id);
                    }}
                  >
                    <img
                      src={product.image}
                      alt="img"
                      className="recommendations__item--thumbnail"
                    />
                    <h2>{product.title}</h2>
                    <h2>
                      {product.source}
                      <img
                        src={product.source_logo}
                        alt="logo"
                        className="recommendations__item--logo"
                      />
                    </h2>
                    <h3>{product.price}</h3>
                    <h3>rating: ${product.rating}</h3>
                  </div>
                );
              }
            });
          })}
        </div>
      </div>
    );
  }
};
export default MainPersonalizedDetails;
