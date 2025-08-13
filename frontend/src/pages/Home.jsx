import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  return (
     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">

      {/* Hero Banner */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 lg:py-32">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">Transform Images into Words with <span className="text-indigo-400">PicCap</span></h1>
        <p className="text-gray-300 max-w-3xl text-lg md:text-2xl mb-10">
          Your smart AI assistant that instantly generates engaging and relevant image captions to tell your story better.
        </p>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <Link to="/process">
            <button className="px-8 py-3 rounded bg-white text-gray-900 font-bold hover:bg-gray-300 transition duration-200">
              Start Now
            </button>
          </Link>
          <Link to="/process">
            <button className="px-8 py-3 rounded border border-white text-white font-semibold hover:bg-white hover:text-gray-900 transition duration-200">
              Explore Features
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-900 py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">What Makes PicCap Powerful?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-left">
            <div>
              <h3 className="text-2xl font-semibold mb-2">📤 Seamless Upload</h3>
              <p className="text-gray-400">Effortlessly upload images with a user-friendly drag-and-drop interface or click to browse.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">⚡ AI Captioning</h3>
              <p className="text-gray-400">Generate accurate, descriptive captions using state-of-the-art AI models—instantly and reliably.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">📱 Mobile First</h3>
              <p className="text-gray-400">Designed to be fully responsive and fluid across all devices from phones to desktops.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">🔐 Privacy Protected</h3>
              <p className="text-gray-400">Your data remains yours. We never store or share your files without your explicit permission.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">🎯 User Friendly</h3>
              <p className="text-gray-400">A clean and intuitive interface makes captioning accessible to everyone—no tech skills needed.</p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">🌍 Multilingual Support</h3>
              <p className="text-gray-400">Generate captions in multiple languages, expanding your reach and global engagement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gray-800 text-center">
        <h2 className="text-4xl font-bold mb-4">Start Capturing Smarter Today</h2>
        <p className="text-gray-300 mb-8">Join thousands of creators using PicCap to turn images into engaging stories.</p>
        <Link to="/auth">
          <button className="px-10 py-4 bg-white text-gray-900 font-bold text-lg rounded hover:bg-gray-300 transition">
            Try PicCap Now
          </button>
        </Link>
      </section>


    </div>
  );
}


export default Home