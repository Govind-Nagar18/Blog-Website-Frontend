import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config';

export default function Editblog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [name, setname] = useState('');
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');

  const handleform = async (e) => {
    e.preventDefault();

    const data = {
      name,
      title,
      desc,
    };

    try {
      const res = await axios.put(`${API_URL}/blog/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      alert("Blog Updated Successfully..");
      navigate('/profile');
    } catch (err) {
      console.log("Something Went Wrong", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form onSubmit={handleform} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
          name="name"
          placeholder="Enter blog name"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          name="title"
          placeholder="Enter blog title"
          className="w-full mb-3 p-2 border rounded"
        />
        <textarea
          name="desc"
          placeholder="Enter blog description"
          value={desc}
          onChange={(e) => setdesc(e.target.value)}
          className="w-full mb-3 p-2 border rounded h-32 resize-none"
        ></textarea>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
