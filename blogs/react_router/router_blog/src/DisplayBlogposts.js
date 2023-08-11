import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Comments from './Comments';
import CommentsDisplay from './CommentsDisplay';
import './postDisplay.css';

export default function DisplayBlogposts({ posters: { id, title, body } }) {

    return (
        <div className='postDisplay'>
            {/**/}
<nav>
                <ul>
                    <li><Link to={`/comments/${id}`}>Go to Comments</Link></li>
                </ul>
            </nav>
            {/**/}

            <div>

                <div>id of the post{id}</div>
                Title: <h3>{title}</h3>
                Post: <h4>{body}</h4>
            </div>

            <hr></hr>

        </div>
    )
}
