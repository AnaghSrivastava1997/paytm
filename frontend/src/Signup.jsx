import React, { useState } from 'react';
import Heading from '../Components/Heading';
import SubHeading from '../Components/Heading';
import Input from '../Components/Input';
import Button from '../Components/Button';
import BottomWarning from '../Components/BottomWarning';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [First_Name, setFirst_Name] = useState("");
  const [Second_Name, setSecond_Name] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    console.log("inside handlesignup function");
    setLoading(true);
    try {
      // Validate inputs
      console.log(First_Name + " " + Second_Name + " " + Email + " " + Password);
      if (!First_Name || !Second_Name || !Email || !Password) {
        alert("All fields are required!");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(Email)) {
        alert("Please enter a valid Email address.");
        return;
      }

      // API Call
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        First_Name,
        Second_Name,
        Email,
        Password,
      });

      // Store token and navigate to dashboard
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error.response?.data || error.message);
      alert("Signup failed! Please try again.");
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Heading label={"Sign Up"} />
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <SubHeading label={"Create an account"} />
              <Input
                name="First_Name"
                heading="First Name"
                placeholder="John"
                value={First_Name}
                onChange={(e) => setFirst_Name(e.target.value)}
              />
              <Input
                name="Second_Name"
                heading="Second Name"
                placeholder="Smith"
                value={Second_Name}
                onChange={(e) => setSecond_Name(e.target.value)}
              />
              <Input
                name="Email"
                heading="Email"
                placeholder="JohnSmith@gmail.com"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                name="Password"
                heading="Password"
                placeholder="**********"
                type="Password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button buttonName={loading ? "Signing up..." : "Create an Account"} onClick={handleSignup} disabled={loading} />
              <BottomWarning sentence={"Already have an account?"} to={"/signin"} buttonWarning={"Login here"} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
