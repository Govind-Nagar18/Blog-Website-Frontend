import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Addblogs() {

  let token = localStorage.getItem("token");
  let navigate = useNavigate();
 
  async function HandleForm(e) {
  e.preventDefault();
  try {
    const data = {
      name: e.target.name.value,
      title: e.target.title.value,
      desc: e.target.desc.value
    };
    let Res = await axios.post("http://127.0.0.1:5500/blog", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }); 
    navigate('/profile')
    alert("Blog Added...")
  } catch (err) {
    console.log(err, "Something went Wrong");
    alert(err.response ? err.response.data.message : "Something went wrong");
  }
  e.target.reset()
}


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Add New Blog
        </h2>
        <form onSubmit={HandleForm} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter blog title"
              className="w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <div>
            <label htmlFor="desc" className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              name="desc"
              id="desc"
              placeholder="Enter blog description"
              rows="4"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
              required
            ></textarea>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-full hover:bg-blue-700 transition"
          >
            Add Blog
          </motion.button>
          <button
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-full hover:bg-blue-700 transition"
           onClick={()=> navigate('/profile')}>Cancle</button>
        </form>
      </motion.div>
    </div>
  );
}
