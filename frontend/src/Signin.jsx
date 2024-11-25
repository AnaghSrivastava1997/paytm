import React,{useState} from 'react'
import Heading from '../Components/Heading'
import SubHeading from '../Components/Heading'
import Input from '../Components/Input'
import Button from '../Components/Button'
import BottomWarning from '../Components/BottomWarning'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function Signin() {

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async () => {
    console.log("inside handlesignup function");
    setLoading(true);
    try {
      // Validate inputs
      console.log(Email + " " + Password);
      if (!Email || !Password) {
        alert("All fields are required!");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(Email)) {
        alert("Please enter a valid Email address.");
        return;
      }

      // API Call
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
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
          <Heading label={"Sign In"} />
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <SubHeading label={"Log In an account"} />
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
               <Button buttonName={loading ? "Logging in..." : "Log in Account"} onClick={handleSignup} disabled={loading} />
                <BottomWarning sentence={"Don't have an account?"} to={"/signup"} buttonWarning={"Sign up here"} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
