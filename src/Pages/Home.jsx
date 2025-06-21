import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home({ SearchValue }) {
  let [AllBlogs, setAllBlogs] = useState([]);

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
  console.log(AllBlogs);

  const filterdata = AllBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(SearchValue.toLowerCase())
  );

  console.log(filterdata);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between container mx-auto px-6 py-12">
        {/* Text Section */}
        <motion.div
          className="md:w-1/2 mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
            Welcome to <span className="text-pink-500">BlogApp</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Discover amazing stories, share your ideas, and connect with a
            vibrant community of writers.
          </p>
          <Link
            to="/addblog"
            className="inline-block px-6 py-3 bg-pink-500 text-white font-semibold rounded-full shadow-lg hover:bg-pink-600 transition"
          >
            Start Writing
          </Link>
        </motion.div>

        {/* Image or Illustration */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="https://firstsiteguide.com/wp-content/uploads/2020/11/How-to-Write-a-Blog-Post.png"
            alt="Blog Illustration"
            className="rounded-lg shadow-lg w-120 h-60 pl-20"
          />
        </motion.div>
      </section>

      <section className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Blogs</h2>
        {filterdata.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filterdata.map((blog) => (
              <motion.div
                key={blog._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-700 mb-2">{blog.desc}</p>
                <p className="text-sm font-bold text-black">
                  By: {blog.user?.name || "Unknown"}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 font-bold text-center">
            No blogs found for "{SearchValue}"
          </p>
        )}
      </section>
    </div>
  );
}
