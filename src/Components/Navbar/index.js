import React from 'react'
import { FaHome } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import './styles.css'
function Navbar() {
  return (
    <div className='navbar'>
      <div className='left'>
          <FaHome/>
          <CiEdit/>
      </div>
      <div className='right'>
          <CgProfile />
      </div>
    </div>
  )
}

export default Navbar
