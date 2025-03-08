import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import useGetMyProfile from "@/hooks/useGetMyProfile";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import avatarImg from "../../assets/avatar.jpeg"

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, profile } = useSelector((state) => state.user);
  const { id } = useParams();

  useGetMyProfile(id);


  const [profileData, setProfileData] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNo: "",
    companyName: "",
    profilePic: avatarImg, // Default image if not available
  });

  useEffect(() => {
    if (profile) {
      setProfileData({
        fullName: profile.fullName || "",
        username: profile.username || "",
        email: profile.email || "",
        phoneNo: profile.phoneNo || "",
        companyName: profile.companyName || "",
        profilePic: profile.profilePic || avatarImg,
      });
    }
  }, [profile]);

  // Handle Input Change
  const handleChange = (e) => {
    // Prevent updating the profile object directly
  };

  // Toggle Edit Mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">My Profile</h1>
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col items-center">
          {/* Profile Picture */}
          <div className="relative w-24 h-24 mb-4">
            <img
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
              src={profileData.profilePic}
              alt="Profile"
              onClick={handleClickOpen}
            />
          </div>

          {/* Profile Picture Update Dialog */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update Profile Pic</DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>Update</Button>
              <Button onClick={handleClose} autoFocus>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          {/* Profile Info */}
          <form className="w-full space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md ${
                    isEditing ? "border-blue-500 bg-white" : "bg-gray-100"
                  }`}
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={profileData.username}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md ${
                    isEditing ? "border-blue-500 bg-white" : "bg-gray-100"
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md ${
                    isEditing ? "border-blue-500 bg-white" : "bg-gray-100"
                  }`}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNo"
                  value={profileData.phoneNo}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md ${
                    isEditing ? "border-blue-500 bg-white" : "bg-gray-100"
                  }`}
                />
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={profileData.companyName}
                  readOnly={!isEditing}
                  className={`w-full px-3 py-2 border rounded-md ${
                    isEditing ? "border-blue-500 bg-white" : "bg-gray-100"
                  }`}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-4">
              {isEditing ? (
                <button
                  type="button"
                  onClick={toggleEdit}
                  className="w-1/2 px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  type="button"
                  onClick={toggleEdit}
                  className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                >
                  Edit Profile
                </button>
              )}
              {isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-1/2 ml-3 px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
