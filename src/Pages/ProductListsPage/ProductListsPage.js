import { useLocation } from "react-router-dom";
const ProductListsPage = () => {
  const { search } = useLocation(); // extract search part of the URL
  const query = new URLSearchParams(search); // parses query string
  /*
   * fetches value associated with key "data"
   * decode URL-encoded string,
   * parse and converted back into Object
   */
  const data = JSON.parse(decodeURIComponent(query.get("data")));
  return (
    <div>
      <h1>Product Lists Id: {data.productListsId}</h1>
      <h1>Product Name: {data.productName}</h1>
    </div>
  );
};
export default ProductListsPage;
