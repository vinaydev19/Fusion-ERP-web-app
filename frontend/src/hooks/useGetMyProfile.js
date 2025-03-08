import { getMyProfile } from "../redux/userSlice";
import { USER_API_END_POINT } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetMyProfile = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        const res = await axios.get(
          `${USER_API_END_POINT}/get-current-user/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log(res);
        dispatch(getMyProfile(res.data.data.user));

      } catch (error) {
        console.error("Error fetching profile:", error);
        console.log(error);
      }
    };

    fetchMyProfile();
  }, [id]);
};

export default useGetMyProfile;
