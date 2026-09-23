import { Link } from "react-router";
import "../index.css";
function Home() {
  return (
    <div className="homePage">
      <div className="homePageContent">
        <h1>Welcome to our Clothes shop</h1>
        <p>We have all types of clothes</p>
        <Link className="link" to="/shop">
          {" "}
          Shop
        </Link>
      </div>
    </div>
  );
}
export default Home;
