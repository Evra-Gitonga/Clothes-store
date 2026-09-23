import { Link } from "react-router";
function NavBar() {
  return (
    <nav className="navBar">
      <Link className="navLink" to="/">
        Home
      </Link>
      <Link className="navLink" to="/shop">
        Shop
      </Link>

      <Link className="navLink" to="/sell">
        Sell
      </Link>
    </nav>
  );
}
export default NavBar;
