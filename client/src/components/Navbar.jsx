import "./css/navbar.css";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header>
      <Link to="/">
        <h3>Within Aide</h3>
      </Link>

      <nav>
        <Link to="/profile">
          {currentUser ? (
            <img src={currentUser.profilePicture} alt="profile" className="h-7 w-7 rounded-full object-cover" />
          ) : (
            <Button type="primary">Sign In</Button>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
