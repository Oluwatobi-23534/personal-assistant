import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Authenticate from "./components/Authenticate";
import SignUp from "./components/SignUp";
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div>
          <Routes>
            <Route path="/signin" element={<Authenticate />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
        <ToastContainer /> {/* Add this line */}
      </div>
    </Router>
  );
}

export default App;
