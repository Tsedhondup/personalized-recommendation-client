import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./PreferencesFormPage.scss";
const PreferencesFormPage = () => {
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [preferedProducts, setPreferedProducts] = useState([]);
  const [picksHeaderClass, setPicksHeaderClass] = useState("");
  const [typeInput, setTypeInput] = useState("");
  // HANDLE PRODUCT TYPES
  const handleProductTypes = (productType) => {
    const currentProducTypes = [...preferedProducts];
    if (currentProducTypes.includes(productType)) {
      setPreferedProducts(currentProducTypes);
    } else {
      currentProducTypes.push(productType);
      setPreferedProducts(currentProducTypes);
    }
    // TOGGLE PICKS HEADER CLASS
    currentProducTypes.length > 0
      ? setPicksHeaderClass("js-pick-header")
      : setPicksHeaderClass("");
  };

  // HANDLE TYPE INPUT VALUE
  const handleTypeInputValue = (event) => {
    const productType = event.target.value;
    setTypeInput(productType); // set input state variable
    handleProductTypes(productType); // update product type array
  };
  // PRODUCT TYPE
  const productTypes = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty & Personal Care",
    "Sports & Outdoors",
    "Toys & Games",
    "Health & Wellness",
    "Groceries & Food ",
    "Automotive",
    "Books & Media ",
  ];
  useEffect(() => {
    setTimeout(() => {
      setHasWelcomed(true);
    }, 100);
  }, []);
  if (hasWelcomed) {
    return (
      <div className="type-container">
        <h1>Please tell us what you like!</h1>
        <form>
          <input
            type="text"
            value={typeInput}
            placeholder="Search types"
            onChange={(event) => {
              handleTypeInputValue(event);
            }}
          ></input>
          <button>add</button>
        </form>
        <div className="type-container__picks">
          <h2 className={`${picksHeaderClass}type-container__picks-header`}>
            Your picks!
          </h2>

          {preferedProducts.map((item, index) => {
            return (
              <p key={index} className="type-container__picks--item">
                {item}
              </p>
            );
          })}
        </div>
        {/* PRODUCT TYPES */}
        <ul>
          {productTypes.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  handleProductTypes(item);
                }}
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  if (!hasWelcomed) {
    return (
      <div>
        <h1>Welcome to the World of Shopping</h1>
      </div>
    );
  }
  // Welcome Message
  // see if the user already fill the form using data in session storage
  // if already filled, navigate to shopping page
  // if not, render form and let user pick or choose product type and preferences
  // once click on finish form button
  // promt message saying "Data are only valid during current session and
  // they will erased once the brower closed"
  // click on okay/continue shoping will navigate to shopping page
};
export default PreferencesFormPage;
