import React, { useState } from "react";

function ChangeEmail() {
  const [Email, setEmail] = useState("");

  return (
    <div className="flex flex-col justify-center items-center gap-5 h-screen w-full">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="font-bold text-3xl">Verify Your Email</h1>
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
          Change Email
        </button>
      </form>
    </div>
  );
}

export default ChangeEmail;
