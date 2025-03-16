import React, { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import avatarImg from "../../assets/avatar.jpeg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import useGetMyProfile from "@/hooks/useGetMyProfile";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constants";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { getMyProfile, getUser } from "@/redux/userSlice";

const Navbar = () => {
  const { user, profile } = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  useGetMyProfile();

  const [profileData, setProfileData] = useState({
    profilePic: avatarImg,
  });

  useEffect(() => {
    if (profile) {
      setProfileData({
        profilePic: profile.profilePic || avatarImg,
      });
    }
  }, [profile]);


  const logoutBtn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token"); // Get token from storage
      const res = await axios.post(
        `${USER_API_END_POINT}/logout`,
        {}, // No body needed
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in headers
          },
          withCredentials: true, // Include cookies if using cookie-based auth
        }
      );

      localStorage.removeItem("token"); // Remove token after logout
      navigate("/login");
      dispatch(getUser(null));
      dispatch(getMyProfile(null));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <nav className="h-16 bg-gray-900 text-white backdrop-blur-md shadow-md flex justify-between items-center px-5">
      {/* Title */}
      <div>
        <h1 className="text-xl font-semibold">
          <Link to="/dashboard" className="hover:text-gray-200 transition">
            Dashboard Overview
          </Link>
        </h1>
      </div>

      {/* Right Section */}
      <div className="">
        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:cursor-pointer">
            <img
              className="w-10 h-10 rounded-full border-2 border-gray-600"
              src={profileData.profilePic}
              alt="User"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" bg-gray-900 text-white shadow-lg rounded-lg w-44 mr-2">
            <DropdownMenuLabel className="font-semibold text-center p-2">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-gray-200 p-2  hover:cursor-pointer rounded-lg transition">
              <Link to={`profile`}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-200 p-2 hover:cursor-pointer  rounded-lg transition">
              <Link to="change-password">Change Password</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-200 p-2  hover:cursor-pointer rounded-lg transition">
              <Link to="change-email">Change Email</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-red-500 hover:cursor-pointer  hover:text-white p-2 rounded-lg transition text-center cursor-pointer">
              {
                isLoading ? (
                  <button className="hover:cursor-pointer" onClick={logoutBtn}><Loading color="#000" /></button>
                ) : (
                  <button className="hover:cursor-pointer" onClick={logoutBtn}>Logout</button>
                )
              }
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
