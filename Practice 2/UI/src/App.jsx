import React, { useState } from "react";

const App = () => {

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

      alert(data.message);

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
            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                onChange={handleRegisterChange}
                className="w-full border border-red-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
              />

            </div>

            {/* Blood Group */}
            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Blood Group
              </label>

              <select
                name="bloodGroup"
                onChange={handleRegisterChange}
                className="w-full border border-red-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
              >

                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>

              </select>

            </div>

            {/* Contact */}
            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Contact Number
              </label>

              <input
                type="tel"
                name="contact"
                placeholder="Enter contact number"
                onChange={handleRegisterChange}
                className="w-full border border-red-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
              />

            </div>

            {/* City */}
            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                City
              </label>

              <input
                type="text"
                name="city"
                placeholder="Enter city"
                onChange={handleRegisterChange}
                className="w-full border border-red-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
              />

            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl text-lg font-semibold transition"
            >
              Register Donor
            </button>

          </form>

        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col justify-center">

          <h1 className="text-4xl font-bold text-center text-red-600 mb-3">
            Donor Login
          </h1>

          <p className="text-center text-gray-500 mb-8">
            Login with your registered donor details
          </p>

          <form
            onSubmit={handleLoginSubmit}
            className="space-y-5"
          >

            {/* Name */}
            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter registered name"
                onChange={handleLoginChange}
                className="w-full border border-red-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
              />

            </div>

            {/* Contact */}
            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Contact Number
              </label>

              <input
                type="tel"
                name="contact"
                placeholder="Enter registered contact"
                onChange={handleLoginChange}
                className="w-full border border-red-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
              />

            </div>

            {/* Blood Group */}
            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                Blood Group
              </label>

              <select
                name="bloodGroup"
                onChange={handleLoginChange}
                className="w-full border border-red-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
              >

                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>

              </select>

            </div>

            {/* City */}
            <div>

              <label className="block mb-2 font-semibold text-gray-700">
                City
              </label>

              <input
                type="text"
                name="city"
                placeholder="Enter registered city"
                onChange={handleLoginChange}
                className="w-full border border-red-300 p-4 rounded-xl outline-none focus:ring-2 focus:ring-red-400"
              />

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl text-lg font-semibold transition"
            >
              Login
            </button>

          </form>

          {/* Info Card */}
          <div className="mt-8 bg-red-50 border border-red-200 p-5 rounded-2xl">

            <h2 className="text-xl font-bold text-red-600 mb-2">
              🩸 Save Lives
            </h2>

            <p className="text-gray-700 leading-relaxed">
              One blood donation can save multiple lives.
              Register and become someone’s hope today.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default App;