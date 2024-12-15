import { useEffect, useState } from "react";
import axios from "axios";
import "./RecommendationLists.scss";
const RecommendationLists = () => {
  const [recommendationLists, setRecommendationLists] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/getRecommendations`, {
        params: {
          userId: sessionStorage.getItem("userId"),
        },
      })
      .then((respond) => {
        // console.log(respond.data);
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
          return (
            <a
              className="recommendations__item"
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noreferrer"
            >
              <h2>{item.title}</h2>
              <img
                src={item.image}
                alt="img"
                className="recommendations__item--thumbnail"
              />
              <h2>
                {item.source}{" "}
                <img
                  src={item.source_logo}
                  alt="logo"
                  className="recommendations__item--logo"
                />
              </h2>
              <h3>{item.price}</h3>
              <p>{item.review}</p>
              <p>{item.snippet}</p>
            </a>
          );
        })}
      </div>
    );
  }
};
export default RecommendationLists;
