import React, { useState } from "react";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="flex flex-col justify-center items-center gap-5 h-screen w-full">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="font-bold text-3xl">Change Your Password</h1>
      </div>
      <form className="flex border-2 p-5  rounded-xl flex-col gap-5 w-3/4 md:w-[35%]">
        <div className="flex flex-col gap-2">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            placeholder="Enter your Old Password"
            required
            className="outline-none rounded-xl px-3 py-2 road border-2"
            id="oldPassword"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            placeholder="Enter your Password"
            required
            className="outline-none rounded-xl px-3 py-2 road border-2"
            id="Password"
            name="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            placeholder="Enter your Confirm Password"
            required
            className="outline-none rounded-xl px-3 py-2 road border-2"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <button className="flex justify-center items-center gap-2 bg-blue-700 p-3 text-white rounded-xl">
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
