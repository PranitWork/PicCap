import React from 'react'

const Footer = () => {
  return (
       <footer className="py-6 text-center bg-black text-gray-500 text-sm">
        © {new Date().getFullYear()} PicCap. All rights reserved.
      </footer>
  )
}

export default Footer