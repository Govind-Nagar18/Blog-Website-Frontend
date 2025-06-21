import React from 'react'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-2 text-blue-600">BlogApp</h2>
          <p className="text-sm text-gray-600">
            Discover amazing stories, share your ideas, and connect with a vibrant community of writers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-600">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:underline hover:text-blue-500 transition">Home</Link></li>
            <li><Link to="/addblog" className="hover:underline hover:text-blue-500 transition">Add Blog</Link></li>
            <li><Link to="/feed" className="hover:underline hover:text-blue-500 transition">Feed</Link></li>
            <li><Link to="/signup" className="hover:underline hover:text-blue-500 transition">Sign Up</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-blue-600">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500 transition">
              <Facebook />
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              <Twitter />
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              <Instagram />
            </a>
            <a href="#" className="hover:text-blue-500 transition">
              <Linkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-600 mt-8">
        © {new Date().getFullYear()} BlogApp. All rights reserved.
      </div>
    </footer>
  )
}
