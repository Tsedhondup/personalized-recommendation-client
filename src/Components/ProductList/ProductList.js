import "./ProductList.scss";
const ProductList = (props) => {
  //   const baseURL = process.env.REACT_API_URL;

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
  } else {
    return (
      <div>
        <h1>Loading.....</h1>
      </div>
    );
  }
};
export default ProductList;
