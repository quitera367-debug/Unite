import React from "react";
import { useHome } from "../../Contexts/HomeContext";
import { MdOutlinePassword } from "react-icons/md";
import { IoText } from "react-icons/io5";

function InputBlock({ labelVal, inType, placeName, massage, idValue, digit,value ,onBlur,onChange}) {
  const { seePassword, setSeePassword } = useHome();

  return (
    <article className="w-full flex flex-col">
      <label htmlFor={idValue} className="text-sm leading-[1]">
        {labelVal}
      </label>
      <div className="w-full  relative flex items-center ">
        <input
          id={idValue}
          type={
            inType != "password" ? inType : seePassword ? "password" : "text"
          }
          className="w-full border-b-2 outline-none border-b-[#616161] py-2 bg-transparent"
          placeholder={placeName}
          maxLength={digit}
          value={value}
          name={idValue}
          onBlur={onBlur}
          onChange={onChange}
        />
        {inType == "password" && (
          <div
            onClick={() => setSeePassword(!seePassword)}
            className=" absolute right-3 text-xl"
          >
            {seePassword ? <IoText /> : <MdOutlinePassword />}
          </div>
        )}
      </div>
      <p className="text-xs text-[orange]">{massage && massage != "Required" && massage}</p>
    </article>
  );
}

export default InputBlock;
