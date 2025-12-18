import React, { useEffect, useState } from "react";
import InputBlock from "../Auth/InputBlock";
import { IoSaveOutline } from "react-icons/io5";
import { useAuth } from "../../Contexts/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const { profileData, EditProfile } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({
    profilePhoto: profileData?.profilePhoto || "",
    name: profileData?.name || "",
  });
  useEffect(() => {
    setData({
      profilePhoto: profileData?.profilePhoto || "",
      name: profileData?.name || "",
      file: null,
    });
  }, [profileData]);
  const { profilePhoto, name } = data;

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    setData({ ...data, [name]: value });
    if (type === "file") {
      const file = files[0];
      const previewURL = URL.createObjectURL(file);
      setData({ ...data, profilePhoto: previewURL, file });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.file) {
      formData.append("profile", data.file); // file from input
    }
    navigate("/user");
    await EditProfile(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col w-full">
      <section className="w-full flex flex-col justify-end items-center  flex-[2]">
        <picture className=" relative  h-[90%] w-[98%] rounded-3xl bg-slate-300 overflow-hidden">
          <input
            type="file"
            name="profilePhoto"
            onChange={handleChange}
            id="displayPic"
            className=" hidden"
          />
          <label
            htmlFor="displayPic"
            className="h-full w-full flex  bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${profilePhoto})` }}
          ></label>

          <button className="text-2xl bg-white absolute top-2 right-2 p-1  rounded-full">
            <IoSaveOutline />
          </button>
        </picture>
      </section>
      <section className="w-full flex flex-col flex-1 py-4 items-center">
        <article className="w-[98%] ">
          <InputBlock
            labelVal="Create New Username"
            inType="text"
            placeName="Enter your name"
            idValue="name"
            value={name}
            onChange={handleChange}
          />

          <p className="">harsh@gmail.com</p>
          <p className="text-sm">Account created in 2025 nov</p>
        </article>
      </section>
    </form>
  );
}

export default EditProfile;
