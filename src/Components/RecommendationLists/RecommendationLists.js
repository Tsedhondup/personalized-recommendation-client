import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RecommendationLists.scss";
const RecommendationLists = () => {
  const navigate = useNavigate();
  const [recommendationLists, setRecommendationLists] = useState([]);
  const handleNavigateToProductDetailPage = (event) => {
    const productListsObject = {
      source: "mainPersonalized",
      currentProductId: event.target.key,
    };
    navigate(
      `/productDetailPage?data=${encodeURIComponent(
        JSON.stringify(productListsObject)
      )}`
    );
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8080/mainPersonalized`, {
        params: {
          userId: JSON.parse(localStorage.getItem("pprSID*")).clientId,
          sessionId: JSON.parse(localStorage.getItem("pprSID*")).sessionId,
        },
      })
      .then((respond) => {
        setRecommendationLists(respond.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!recommendationLists.length > 0) {
    return (
      <div>
        <h1>loading </h1>
      </div>
    );
  } else {
    return (
      <div className="recommendations">
        {recommendationLists.map((item) => {
          return item.productData.map((product) => {
            return (
              <div
                className="recommendations__item"
                key={product.id}
                href={product.link}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => {
                  handleNavigateToProductDetailPage(event);
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
          });
        })}
      </div>
    );
  }
};
export default RecommendationLists;
