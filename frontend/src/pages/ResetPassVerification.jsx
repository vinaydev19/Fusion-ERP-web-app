import React, { useState } from "react";
import { Link } from "react-router-dom";

function ResetPassVerification() {
  const [Email, setEmail] = useState("");

  return (
    <div className="flex flex-col justify-center items-center gap-5 h-screen w-full">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="font-bold text-3xl">Reset Your Password</h1>
        <p className="text-[#372929]">
          Forgot your password? No worries! First, verify your email address.
          Enter your email below, and we'll send you a verification code.
        </p>
        <h1 className="">Didn't receive the email?</h1>
        <p className="text-[#372929]">
          Check your spam folder or request a new one.
        </p>
      </div>
      <form className="flex border-2 p-5  rounded-xl flex-col gap-5 w-3/4 md:w-[35%]">
        <div className="flex flex-col gap-2">
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            placeholder="Enter your Email"
            required
            className="outline-none rounded-xl px-3 py-2 road border-2"
            id="Email"
            name="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <button className="flex justify-center items-center gap-2 bg-blue-700 p-3 text-white rounded-xl">
          Login
        </button>
      </form>
      <div className="flex gap-1 pb-5">
        <p>Already have an account?</p>
        <Link to="/login" className="text-blue-700 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}

export default ResetPassVerification;
