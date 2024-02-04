import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../Global/Store/store";
import { editUserRoute } from "../Global/API/userRoute";
import { toast } from "react-toastify";
import axios from "axios";
import { useGetUserDetail } from "../Hooks/user";
import { useQueryClient } from "@tanstack/react-query";

const EditUser = () => {
  const queryClient = useQueryClient();
  const loginUser = userStore((store) => store.loginUser);
  const nav = useNavigate();
  const { mutateAsync } = useGetUserDetail(queryClient);

  const initialState = {
    _id: loginUser?._id,
    name: loginUser?.name,
    email: loginUser?.email,
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState();

  // Save values change in every input
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Register Validation
    // const { validationErrors, valid } = registerValidate(formData);
    // setErrors(validationErrors);

    // If valid send data

    await axios
      .put(editUserRoute, formData)
      .then((res) => {
        console.log(res);
        res.status === 200 && nav(-1);
        toast.success("Successfully edit your account.");
      })
      .catch((err) => toast.error(err?.response?.data?.message));
  };


  
  return (
    <div className="max-w-lg border border-lightWhite rounded p-5">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          {/* header */}
          <h1 className="text-2xl font-bold uppercase">Edit 📝</h1>
          <h3 className="font-light">Enter your information to register</h3>
        </div>
        {/* content input */}
        {/* Name */}
        <div className="flex flex-col gap-y-2">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            className="customInput"
            value={formData.name}
            onChange={handleChangeInput}
          />
          <span className="text-red-500">{errors?.name}</span>
        </div>
        {/* Email */}
        <div className="flex flex-col gap-y-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            className="customInput"
            value={formData.email}
            onChange={handleChangeInput}
          />
          <span className="text-red-500">{errors?.email}</span>
        </div>

        <div className="flex flex-col gap-y-5 md:gap-0 md:flex-row justify-between items-center">
          {/* submit btn */}
          <button className="px-5 py-2 self-start primaryBtn">Edit</button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
