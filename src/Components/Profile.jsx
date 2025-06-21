import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Trash, Edit } from "lucide-react";

function Profile() {
  const [user, setUser] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const profileRes = await axios.get("http://localhost:5500/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(profileRes.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }

      try {
        const blogsRes = await axios.get("http://localhost:5500/blog/myblog", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserBlogs(blogsRes.data.myBlogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }

    if (token) fetchData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/authorization");
  };

  const handleAddBlog = () => navigate("/addblog");

  async function deletehandle(blogid)
  {
    try
    {
      const res = await axios.delete(`http://127.0.0.1:5500/blog/${blogid}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    console.log(res.data)
    }
    catch(err)
    {
      console.log({Message:"Something Went Wrong..",Error:err.Message})
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
        <div className="text-center space-y-4">
          <p className="text-xl text-gray-600 font-semibold">Loading user data...</p>
          <button onClick={() => navigate("/authorization")} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Login Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 px-4 py-10">
      {/* Profile Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 text-center mb-12 transition-transform hover:scale-[1.02] duration-300">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
          alt="User Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4 shadow-lg"
        />
        <h1 className="text-3xl font-extrabold text-blue-800 mb-1">{user.name}</h1>
        <p className="text-sm text-gray-600">{user.email}</p>

        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all shadow-sm"
          >
            Log Out
          </button>
          <button
            onClick={handleAddBlog}
            className="px-5 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-all shadow-sm"
          >
            Add Blog
          </button>
        </div>
      </div>

      {/* Blogs Section */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Blogs</h2>

        {userBlogs.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
            {userBlogs.map((blog, index) => (
              <div
                key={blog._id || index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300"
              >
                {/* User Info */}
                <div className="mb-3">
                  <h1 className="text-sm text-gray-500 font-medium">
                    Posted by:
                    <span className="text-gray-800 font-semibold ml-1">{blog.user.name}</span>
                  </h1>
                  <p className="text-xs font-mono text-gray-400 ml-1">{blog.user.email}</p>
                </div>

                {/* Blog Details */}
                <div className="bg-gray-100 rounded-xl p-4 mb-4 border border-gray-200">
                  <h3 className="text-lg font-semibold text-blue-600 mb-1">Title: {blog.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">Blog: {blog.desc}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 mt-2">
                  <button 
                  onClick={()=> navigate(`/editblog/${blog._id}`)}
                  className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition">
                    <Edit size={18} /> Edit
                  </button>
                  <button 
                  onClick={()=>deletehandle(blog._id)}
                  className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition">
                    <Trash size={18} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center shadow-lg mt-10">
            <p className="text-gray-600 mb-4">No blogs found.</p>
            <button
              onClick={handleAddBlog}
              className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
            >
              Add Blog
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
