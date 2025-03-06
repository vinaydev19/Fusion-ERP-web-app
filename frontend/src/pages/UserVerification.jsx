import React, { useState } from "react";

function UserVerification() {
  const [code, setCode] = useState("");

  return (
    <div className="flex flex-col justify-center items-center gap-5 h-screen w-full">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="font-bold text-3xl">Welcome back</h1>
        <p className="text-[#372929]">
          Sign in with the verification code sent to your email to continue.
        </p>
        <h1 className="">Don't see the code?</h1>
        <p className="text-[#372929]">
          Check your spam folder or request a new one.
        </p>
      </div>
      <form className="flex border-2 p-5  rounded-xl flex-col gap-5 w-3/4 md:w-[35%]">
        <div className="flex flex-col gap-2">
          <label htmlFor="code">Code</label>
          <input
            type="text"
            placeholder="Enter your code"
            required
            className="outline-none rounded-xl px-3 py-2 road border-2"
            id="code"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></input>
        </div>
        <button className="flex justify-center items-center gap-2 bg-blue-700 p-3 text-white rounded-xl">
          Login
        </button>
      </form>
      <div className="flex gap-1 pb-5">
        <p>Already have an account?</p>
        <p to="login" className="text-blue-700 hover:underline">
          Login
        </p>
      </div>
    </div>
  );
}

export default UserVerification;
