import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  // Check if the user has already signed up
  useEffect(() => {
    const isSignedUp = localStorage.getItem("isSignedUp");
    if (isSignedUp) {
      navigate("/home"); // Redirect to the home page if signed up
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      Swal.fire("Invalid Email", "Please enter a valid email address.", "error");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      Swal.fire("Invalid Phone", "Enter a 10-digit phone number.", "error");
      return;
    }
    if (!/^(?=.*\d).{6,}$/.test(password)) {
      Swal.fire(
        "Weak Password",
        "Password must be at least 6 characters long and include a number.",
        "error"
      );
      return;
    }

    // If validation passes
    Swal.fire("Success!", "Sign up successful!", "success").then(() => {
      localStorage.setItem("isSignedUp", "true"); // Save signup status
      navigate("/home"); // Redirect to the home page
    });
  };

  return (
    <div style={{ width: "300px", margin: "0 auto" }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
