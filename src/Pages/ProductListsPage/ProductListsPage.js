import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductListsPage.scss";
import SearchForm from "../../Components/SearchForm/SearchForm";
const ProductListsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = useLocation(); // extract search part of the URL
  const query = new URLSearchParams(search); // parses query string
  /*
   * fetches value associated with key "data"
   * decode URL-encoded string,
   * parse and converted back into Object
   */
  const data = JSON.parse(decodeURIComponent(query.get("data")));
  //   const [queryString, setQueryString] = useState(location.search);
  const [currentProductLists, setCurrentProductLists] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/getCurrentProducts`, {
        params: {
          productListsId: String(data.productListsId),
        },
      })
      .then((respond) => {
        setCurrentProductLists(respond.data.products[0].productLists);
      })
      .then(() => {
        setHasLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location.search]);

  const handleNavigateToProductDetailPage = (productId) => {
    const productListsObject = {
      productListsId: String(data.productListsId),
      currentProductId: productId,
    };
    navigate(
      `/productDetailPage?data=${encodeURIComponent(
        JSON.stringify(productListsObject)
      )}`
    );
  };

  if (hasLoaded) {
    return (
      <div>
        <SearchForm />
        <div className="products">
          {currentProductLists.map((item) => {
            return (
              <div
                key={item.product_id}
                className=""
                onClick={() => {
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
          })}
        </div>
      </div>
    );
  }
};
export default ProductListsPage;
