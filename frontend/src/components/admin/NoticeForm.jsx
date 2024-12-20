import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NoticeForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("all");
  const [branch, setBranch] = useState("CSE");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const navigate = useNavigate();

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("branch", branch);
    if (image) formData.append("imageOrVideo", image);
    if (video) formData.append("imageOrVideo", video);
  
    try {
      console.log("Sending request to create notice...");
      const response = await fetch("http://localhost:8080/api/admin/post", {
        method: "POST",
        body: formData,
      });
  
      // Log the response for debugging
      console.log("Response Status:", response.status);
      const responseData = await response.json();
      console.log("Response Data:", responseData);
  
      if (!response.ok) {
        const errorMessage =
          responseData?.message || `HTTP Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      
      navigate("/admin/dashboard/succesfull")
    } catch (error) {
      console.error("Error adding notice:", error.message);
      alert(`Error adding notice: ${error.message}`);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-4 border border-gray-300 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create New Notice</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Branch
          </label>
          <select
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value="CSE">CSE</option>
            <option value="CSM">CSM</option>
            <option value="CSD">CSD</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full mt-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Video
          </label>
          <input
            type="file"
            onChange={handleVideoChange}
            className="w-full mt-1 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit Notice
        </button>
      </form>
    </div>
  );
};

export default NoticeForm;
