import React, { useEffect } from "react";
import { LiaEdit } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import { CiLogout } from "react-icons/ci";

function Profile() {
  const { LogoutUser,profileData ,UserProfile} = useAuth();

  
  return (
    <main className="h-full flex flex-col w-full items-start">
      <button
        onClick={() => {
          LogoutUser();
        }}
        className="p-2 px-4 flex gap-2 rounded-md   items-center "
      >
        <div className="text-xl border p-2 rounded-full">
          <CiLogout />
        </div>
        Logout
      </button>

      <section className="w-full flex flex-col justify-end items-center  flex-[2]">
        <picture className=" relative  h-[100%] w-[98%] rounded-3xl bg-slate-300 overflow-hidden">
          <img src={profileData?.profilePhoto} alt={profileData?.profilePhoto} className='h-full w-full object-cover' />
          <Link
            to={"/edit"}
            className="text-2xl bg-white absolute top-2 right-2 p-1 pb-2 pl-2 rounded-full"
          >
            <LiaEdit />
          </Link>
        </picture>
      </section>
      <section className="w-full flex flex-col flex-1 py-4 items-center">
        <article className="w-[98%] ">
          <h1 className="text-3xl font-semibold">{profileData?.name}</h1>
          <p className="">{profileData?.email}</p>
          <p className="text-sm">Account created in {profileData?.createdAt}</p>
        </article>
      </section>
    </main>
  );
}

export default Profile;
