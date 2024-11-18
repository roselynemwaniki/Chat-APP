import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./PagesInMain/Home";
import UserProfile from "./PagesInMain/Profile"; 
import Navbar from './components/Navbar';
import "./App.css";
import SignUpForm from './PagesInMain/signupform';

function App() {
  return (
    <Router>
      <div>
        <h3>Purple Chat-Space</h3>
        
        {/* Render the Navbar */}
        <Navbar />
        
        {/* Define the Routes */}
        <Routes>
          <Route path="/" element={<SignUpForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;