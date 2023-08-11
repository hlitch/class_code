import React from 'react'
import { Link } from 'react-router-dom';
import './header.css';

export default function Header() {
    return (
        <>
            <h1 className='head'>Ugly Json Blogs</h1>
            <div className='link'><Link to='/'>Bloggers List</Link></div>
            <hr></hr>
        </>
    )
}
