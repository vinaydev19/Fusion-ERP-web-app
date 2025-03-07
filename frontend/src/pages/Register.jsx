import React, { useRef, useState } from "react";
import logo from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constants";
import Loading from "../components/commen/Loading";
import toast from "react-hot-toast";

function Register() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const registerFormHandle = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        {
          fullName,
          username,
          email,
          phoneNo,
          companyName,
          password,
          confirmPassword,
          profilePic,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      navigate("/register/user-verification");
      setIsLoading(false);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(`error on register page || ${error}`);
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex w-full ">
        <div className="w-2/4 bg-[#f0eefe] hidden md:flex md:justify-center md:flex-col md:items-center">
          <img className="p-5 " src={logo}></img>
        </div>
        <div className="flex flex-col mt-5 justify-center w-full md:w-2/4 items-center gap-2">
          <h1 className="font-bold text-3xl">Create your account</h1>
          <p className="text-[#9e9c9c]">Enter your details to get started</p>
          <form
            onSubmit={registerFormHandle}
            className="flex flex-col gap-5 w-[70%]"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                className="outline-none rounded-xl px-3 py-2  border-2"
                placeholder="Enter your Full Name"
                required
                id="fullName"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="Username">Username</label>
              <input
                type="text"
                placeholder="Enter your Username"
                required
                className="outline-none rounded-xl px-3 py-2 road border-2"
                id="Username"
                name="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                placeholder="Enter your Email"
                required
                className="outline-none rounded-xl px-3 py-2 road border-2"
                id="Email"
                name="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phoneNo">Phone Number</label>
              <input
                type="text"
                className="outline-none rounded-xl px-3 py-2 road border-2"
                placeholder="Enter your Phone Number"
                required
                id="phoneNo"
                name="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="CompanyName">Company Name</label>
              <input
                type="text"
                className="outline-none rounded-xl px-3 py-2 road border-2"
                placeholder="Enter your Company Name"
                required
                id="CompanyName"
                name="CompanyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="outline-none rounded-xl px-3 py-2 road border-2"
                placeholder="Enter your Password"
                required
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="outline-none rounded-xl px-3 py-2 road border-2"
                placeholder="Enter your Confirm Password"
                required
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="profilePic">Profile Picture</label>
              <input
                type="file"
                className="outline-none rounded-xl px-3 py-2 road border-2"
                required
                id="profilePic"
                name="profilePic"
                onChange={(e) => setProfilePic(e.target.files[0])}
              ></input>
            </div>
            {isLoading ? (
              <button
                disabled
                className="flex justify-center items-center gap-2 bg-blue-700 p-3 text-white rounded-xl"
              >
                <Loading color="#000" />
              </button>
            ) : (
              <button className="flex hover:cursor-pointer justify-center items-center gap-2 bg-blue-700 p-3 text-white rounded-xl">
                Create Account
              </button>
            )}
          </form>
          <div className="flex gap-1 pb-5">
            <p>Already have an account?</p>
            <Link to="/login" className="text-blue-700 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
