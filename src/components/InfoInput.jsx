import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const InfoInput = ({ content, onRemove, onChange }) => {
  // logic
  const { id, label, text } = content;
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const userValue = event.target.value;
    // 사용자 입력값으로 value state 변경
    setValue(userValue);
    // 부모에게 사용자 입력값 올려주기
    onChange(userValue, id);
  };

  // view
  return (
    <div className="py-2 first:pt-0 last:pb-0 ">
      <div className="relative">
        <label
          htmlFor={label}
          className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                      absolute"
        >
          {text}
        </label>
        <input
          type={"text"}
          id={label}
          name={label}
          placeholder={"남은 재료를 입력해주세요"}
          className="border placeholder-gray-400 focus:outline-none
                      focus:border-black w-full pt-4 pr-9 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                      border-chef-gray-200 rounded-2xl placeholder:text-chef-gray-200"
          value={value}
          onChange={handleChange}
        />
        <button
          type="button"
          className="absolute right-3 inset-y-0 flex items-center px-1"
          onClick={() => onRemove(id)}
        >
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default InfoInput;
