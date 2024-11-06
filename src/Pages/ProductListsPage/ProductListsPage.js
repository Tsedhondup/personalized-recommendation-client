import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./ProductListsPage.scss";
const ProductListsPage = () => {
  const { search } = useLocation(); // extract search part of the URL
  const [currentProductLists, setCurrentProductLists] = useState([]);
  useEffect(() => {
    const query = new URLSearchParams(search); // parses query string
    /*
     * fetches value associated with key "data"
     * decode URL-encoded string,
     * parse and converted back into Object
     */
    const data = JSON.parse(decodeURIComponent(query.get("data")));
    axios
      .get(`http://localhost:8080/getCurrentProducts`, {
        params: {
          productListsId: String(data.productListsId),
        },
      })
      .then((respond) => {
        setCurrentProductLists(respond.data.products[0].productLists);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="products">
        {currentProductLists.map((item) => {
          return (
            <Link to={`/${item.product_id}`} key={item.product_id} className="">
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
  );
};
export default ProductListsPage;
