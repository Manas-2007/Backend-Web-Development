import React, { useState } from "react";
import {
  useNavigate,
  Routes,
  Route,
  useLocation
} from "react-router-dom";


// ================= DASHBOARD =================

const Dashboard = () => {
  const location=useLocation();
  const userName = location.state?.userName || "Guest";

  return (

   <div className="min-h-screen flex items-center justify-center bg-red-100">
      <h1 className="text-6xl font-bold text-red-600">
        Welcome, {userName} ❤️
      </h1>
    </div>

  );

};


// ================= HOME PAGE =================

const Home = () => {

  const navigate = useNavigate();

  // Registration State
  const [registerData, setRegisterData] = useState({
    name: "",
    bloodGroup: "",
    contact: "",
    city: ""
  });

  // Login State
  const [loginData, setLoginData] = useState({
    name: "",
    contact: "",
    bloodGroup: "",
    city: ""
  });

  // Handle Registration Inputs
  const handleRegisterChange = (e) => {

    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });

  };

  // Handle Login Inputs
  const handleLoginChange = (e) => {

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });

  };

  // Registration Submit
  const handleRegisterSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch("http://localhost:3000/mydata", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(registerData)

      });

      const data = await response.json();

      console.log("Registration Response:", data);

      alert(data.message);

    }

    catch (error) {

      console.log(error);

      alert("Registration Failed");

    }

  };

  // Login Submit
  const handleLoginSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch("http://localhost:3000/login", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(loginData)

      });

      const data = await response.json();

      console.log("Login Response:", data);

      // SUCCESS LOGIN
      if (data.success) {
     navigate('/dashboard', 
    { 
      state: 
      {
         userName: loginData.name 
        } 
    });
}

      // FAILED LOGIN
      else {

        alert(data.message);

      }

    }

    catch (error) {

      console.log(error);

      alert("Login Failed");

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200 p-6 flex items-center justify-center">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-7xl">

        {/* Registration Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-10">

          <h1 className="text-4xl font-bold text-center text-red-600 mb-3">
            Blood Donor Registration
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Register yourself as a lifesaver ❤️
          </p>

          <form
            onSubmit={handleRegisterSubmit}
            className="space-y-5"
          >

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Enter Full Name"
              onChange={handleRegisterChange}
              className="w-full border border-red-300 p-4 rounded-xl"
            />

            {/* Blood Group */}
            <select
              name="bloodGroup"
              onChange={handleRegisterChange}
              className="w-full border border-red-300 p-4 rounded-xl"
            >

              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="O+">O+</option>
              <option value="AB+">AB+</option>

            </select>

            {/* Contact */}
            <input
              type="text"
              name="contact"
              placeholder="Enter Contact"
              onChange={handleRegisterChange}
              className="w-full border border-red-300 p-4 rounded-xl"
            />

            {/* City */}
            <input
              type="text"
              name="city"
              placeholder="Enter City"
              onChange={handleRegisterChange}
              className="w-full border border-red-300 p-4 rounded-xl"
            />

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-4 rounded-xl font-bold"
            >
              Register
            </button>

          </form>

        </div>


        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-10">

          <h1 className="text-4xl font-bold text-center text-red-600 mb-3">
            Donor Login
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Login with registered details
          </p>

          <form
            onSubmit={handleLoginSubmit}
            className="space-y-5"
          >

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              onChange={handleLoginChange}
              className="w-full border border-red-300 p-4 rounded-xl"
            />

            {/* Blood Group */}
            <select
              name="bloodGroup"
              onChange={handleLoginChange}
              className="w-full border border-red-300 p-4 rounded-xl"
            >

              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="O+">O+</option>
              <option value="AB+">AB+</option>

            </select>

            {/* Contact */}
            <input
              type="text"
              name="contact"
              placeholder="Enter Contact"
              onChange={handleLoginChange}
              className="w-full border border-red-300 p-4 rounded-xl"
            />

            {/* City */}
            <input
              type="text"
              name="city"
              placeholder="Enter City"
              onChange={handleLoginChange}
              className="w-full border border-red-300 p-4 rounded-xl"
            />

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-4 rounded-xl font-bold"
            >
              Login
            </button>

          </form>

        </div>

      </div>

    </div>

  );

};


// ================= MAIN APP =================

const App = () => {

  return (

    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>

  );

};

export default App;