import { useEffect } from "react";
import MainPersonalizedDetails from "../../Components/MainPeronalizedDetails/MainPersonalizedDetails";
import { useLocation } from "react-router-dom";
const MainPersonalizedDetailPage = () => {
  // PARSING DATA FROM URL
  const { search } = useLocation(); // extract search part of the URL
  const query = new URLSearchParams(search); // parses query string
  /*
   * fetches value associated with key "data"
   * decode URL-encoded string,
   * parse and converted back into Object
   */
  const queries = JSON.parse(decodeURIComponent(query.get("data")));
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <MainPersonalizedDetails queries={queries} />;
};
export default MainPersonalizedDetailPage;
