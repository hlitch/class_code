import React from 'react';
import { Link } from 'react-router-dom';
import './displayBlogger.css'

export default function DisplayBloggers(props) {

    const { id, name, website, company: { name: companyName, catchPhrase, bs } } = props.bloggers;

    return (
        <Link to={`/bloggers/${id}`} className='blogger'>
            <div className='xblogger'>
                <div>{id}</div>
                <h2 >Name: {name}</h2>
                <h3 >Website: {website}</h3>
                <h4 >Company:</h4><div>{companyName}</div>
                catchPhrase:  <div>{catchPhrase}</div>
                BS: <div>{bs}</div>
            </div>
        </Link>
    )
}
//