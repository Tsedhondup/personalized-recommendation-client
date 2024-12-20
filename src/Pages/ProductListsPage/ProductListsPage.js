import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductListsPage.scss";
import SearchForm from "../../Components/SearchForm/SearchForm";
const ProductListsPage = () => {
  const navigate = useNavigate();
  const productRef = useRef(null);
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
  const [currentProductSearchOrigin, setCurrentProductSearchOrigin] =
    useState("");
  const [hasLoaded, setHasLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/currentSearchData`, {
        params: {
          currentSearchId: data,
          sessionId: JSON.parse(localStorage.getItem("pprSID*")).sessionId,
        },
      })
      .then((respond) => {
        setCurrentProductLists(respond.data[0].searchData);
        setCurrentProductSearchOrigin(respond.data[0].searchOrigin);
      })
      .then(() => {
        setHasLoaded(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location.search]);

  const handleNavigateToProductDetailPage = (event, productId) => {
    // const productListsObject = {
    //   productListsId: String(data.productListsId),
    //   currentProductId: productId,
    // };
    // navigate(
    //   `/productDetailPage?data=${encodeURIComponent(
    //     JSON.stringify(productListsObject)
    //   )}`
    // );
    console.log(productRef.current.dataset);
  };

  if (hasLoaded) {
    return (
      <div>
        <SearchForm />
        <div className="products">
          {currentProductLists.map((item) => {
            return (
              <div
                key={item.id}
                ref={productRef}
                data-searchorigin={currentProductSearchOrigin}
                className=""
                onClick={(event) => {
                  handleNavigateToProductDetailPage(event, item.product_id);
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="product-image"
                />
                <h1>{item.title}</h1>
                <h2>price: {item.price}</h2>
                <h2>
                  {item.source}
                  <img
                    src={item.source_logo}
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
