import axios from 'axios';
import React, { useState } from 'react';

const Upload = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image",image)

    const result = await axios.post(
      "http://localhost:8000/upload",
      formData,
      {
        headers: {"Content-Type": "multipart/form-data"}
      }
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Upload Image</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Select Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
