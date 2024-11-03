import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PreferencesFormPage.scss";
const PreferencesFormPage = () => {
  const navigate = useNavigate();
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const [preferedProducts, setPreferedProducts] = useState([]);
  const [picksHeaderClass, setPicksHeaderClass] = useState("");
  const [typeInput, setTypeInput] = useState("");
  const [agreementElClass, setAgreementELClass] = useState("");
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
  };

  // HANDLE AGREEMENT ELEMENT CLASS
  const handleAgreementElClass = () => {
    setAgreementELClass("js-agreement-show");
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
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input
            type="text"
            value={typeInput}
            placeholder="Search types"
            onChange={(event) => {
              handleTypeInputValue(event);
            }}
          ></input>
          <button
            onClick={() => {
              handleProductTypes(typeInput);
            }}
          >
            add
          </button>
        </form>
        <div className="type-container__picks">
          <h2 className={`${picksHeaderClass} type-container__picks-header`}>
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
        {/* ADD PREFEREENCES AND START SHOPPING */}
        <div>
          <button
            onClick={() => {
              handleAgreementElClass();
            }}
          >
            continue
          </button>
          <button
            onClick={() => {
              navigate("/shop");
            }}
          >
            skip
          </button>
        </div>
        <div className={`${agreementElClass} agreement-container`}>
          <div className="agreement-container__content">
            <h2 className="agreement-container__header">
              Your preferences will be cleared upon closing the current browser
              tab
            </h2>
            <div className="agreement-container__button-container">
              <button
                className="agreement-container__button-container--button"
                onClick={() => {
                  navigate("/shop");
                }}
              >
                continue
              </button>
            </div>
          </div>
        </div>
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
};
export default PreferencesFormPage;
