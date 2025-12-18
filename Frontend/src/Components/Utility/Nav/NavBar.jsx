import React, { useEffect } from "react";
import { useAuth } from "../../../Contexts/AuthContext";
import { GrHomeRounded } from "react-icons/gr";
import { Link } from "react-router-dom";

function NavBar() {
  const { profileData, UserProfile } = useAuth();
  useEffect(() => {
    UserProfile();
  }, []);

  return (
    profileData && (
      <nav className="fixed bottom-0 w-full bg-white h-[10vh] flex gap-1 p-1">
        <Link
          to={"/list"}
          className="flex-1 flex justify-center items-center flex-col text-xs"
        >
          <div className="text-xl">
            <GrHomeRounded />
          </div>
        </Link>
        <Link
          to={"/user"}
          className="flex-1 flex justify-center items-center flex-col text-xs"
        >
          <img
            src={profileData?.profilePhoto}
            alt={profileData?.profilePhoto}
            className="h-[5vh] w-[5vh] object-cover rounded-full"
          />
        </Link>
      </nav>
    )
  );
}

export default NavBar;
