import "./css/navbar.css";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);

  
  return (
    <header>
      <Link to='/'>
        <h3>E-Assistant</h3>
      </Link>

      <nav>
        <Link to="/signin">
          <Button type="primary">Sign In</Button>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
