import React from 'react'
import './css/navbar.css';
import { Link } from 'react-router-dom'
import { Button } from "antd";


const Navbar = () => {
  return (
    <header>
        <h3>E-Assistant</h3>
        <nav>
            <Link to='/auth'>
            <Button type="primary">Sign In</Button>
            </Link>
        </nav>
    </header>
  )
}

export default Navbar

