import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Authenticate from "./components/Authenticate";
import SignUp from "./components/SignUp";
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from "./components/SignIn";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
        <ToastContainer /> {/* Add this line */}
      </div>
    </Router>
  );
}

export default App;
