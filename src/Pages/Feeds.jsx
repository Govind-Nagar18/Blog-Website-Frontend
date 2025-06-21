import React, { useState, useEffect } from "react";
import axios from "axios";
import { Heart, Send, MessageCircle } from "lucide-react";

export default function Feeds() {
  const [allblogs, setAllBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://127.0.0.1:5500/blog/allblogs");
        setAllBlogs(res.data.blogs || res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 tracking-wide">
        Latest Blogs
      </h2>

      {allblogs.length === 0 ? (
        <p className="text-center text-gray-500">
          No blogs available yet. Start by adding one!
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {allblogs.map((blog, index) => (
            <div
              key={blog._id || index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {blog.user ? (
                <h1 className="text-sm select-none cursor-pointer text-gray-500">
                  Posted by:{" "}
                  <span className="font-bold text-gray-800">
                    {blog.user.name} <p className=" text-gray-500 mb-1 pl-17 font-mono"> {blog.user.email}</p>
                  </span>
                </h1>
              ) : (
                <p className="text-sm text-gray-500">Creator Unknown</p>
              )}

              <div className="border-1 border-gray-400 rounded-2xl h-55 mb-4 p-2">
              <h3 className="text-lg font-bold text-blue-600 mb-2">
               Title :  {blog.title}
              </h3>
              <h1 className="text-gray-700 font-bold text-sm mb-4">
               Blog :  {blog.desc}
              </h1>
              </div>


              {/* <div className="flex items-center space-x-4 mt-4">
                <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <Heart size={20} className="mr-1" />
                </button>
                <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <MessageCircle size={20} className="mr-1" />
                </button>
                <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <Send size={20} className="mr-1" />
                </button>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
