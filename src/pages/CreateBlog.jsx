import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { userStore } from "../Global/Store/store";
import { useNavigate } from "react-router-dom";
import { useCreateBlog } from "../Hooks/blog";
import { useQueryClient } from "@tanstack/react-query";

const CreateBlog = () => {
  const loginUser = userStore((store) => store.loginUser);
  const [tags, setTags] = useState([]);
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const initialState = {
    title: "",
    blogImg: {},
    author_name: loginUser.name,
    hashTag: [],
    content: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [selectedImage, setSelectedImage] = useState(null);

  // Save values change in every input
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add Hash Tags
  const handleHashTag = (e) => {
    const value = e.target.value.trim();

    // Check if the "Enter" key is pressed or if the input ends with a space or a comma
    if (e.key === "Enter" || value.endsWith(" ") || value.endsWith(",")) {
      e.preventDefault();

      if (value !== "") {
        const trimmedValue =
          value.endsWith(" ") || value.endsWith(",")
            ? value.slice(0, -1)
            : value;

        setTags((prevTags) => [...prevTags, trimmedValue]);

        setFormData((prevFormData) => ({
          ...prevFormData,
          hashTag: [...(prevFormData.hashTag || []), trimmedValue],
        }));

        e.target.value = ""; // Clear the input field
      }
    }
  };

  // Image input file save and show image in form
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Create a FileReader
      const reader = new FileReader();

      reader.onload = () => {
        // Set the selected image to the data URL
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }

    setFormData({
      ...formData,
      blogImg: file,
    });
  };
  const {
    mutateAsync: createBlog,
    isSuccess,
    isPending,
  } = useCreateBlog(queryClient);

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append all other form data fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "hashTag") {
        // Convert hashTag array to a comma-separated string
        const conString = value.join(",");
        data.append(key, conString);
      } else {
        data.append(key, value);
      }
    });

    createBlog(data);
  };
  if (isSuccess) nav("/");
  return (
    <div>
      <h1>CreateBlog</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* content input */}
        {/* Image Input */}
        <div className="flex flex-col gap-y-2">
          <label className="flex flex-col relative border border-gray-300 rounded-md shadow-lg group">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="object-contain"
              />
            ) : (
              <div className="flex flex-col h-full items-center justify-center py-7">
                <BiImageAdd className="text-4xl" />
                <p className="text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                  Upload Main Image
                </p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              id="blogImg"
              name="blogImg"
              onChange={handleFileChange}
              // required
              className="opacity-0 absolute"
            />
          </label>
        </div>
        {/* Title */}
        <div className="flex flex-col gap-y-2">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            className="customInput"
            onChange={handleChangeInput}
          />
          {/* <span className="text-red-500">{errors?.name}</span> */}
        </div>
        {/* HashTag */}
        <div className="flex flex-col gap-y-2 w-full">
          <label htmlFor="hashTag">HashTag</label>
          <div className="flex gap-3">
            {tags?.map((tag, i) => (
              <div key={i} className="bg-gray-300 rounded-md p-2">
                <span>{tag}</span>
              </div>
            ))}
          </div>

          <input
            id="hashTag"
            name="hashTag"
            type="text"
            placeholder="hashTags"
            className="customInput"
            onKeyDown={handleHashTag}
          />

          <span className="text-sm text-gray-500">
            Press Enter or ( , ) twice to add hashtag
          </span>
        </div>
        {/* Content */}
        <div className="flex flex-col gap-y-2">
          <label htmlFor="content">Content</label>
          <input
            id="content"
            name="content"
            type="text"
            placeholder="content"
            className="customInput"
            onChange={handleChangeInput}
          />
          {/* <span className="text-red-500">{errors?.email}</span> */}
        </div>
        <div className="flex flex-col gap-y-5 md:gap-0 md:flex-row justify-between items-center">
          {/* submit btn */}
          <button disabled={isPending} className="px-5 py-2 self-start primaryBtn">
            {isPending ? "Posting..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
