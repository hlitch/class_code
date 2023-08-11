import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';

export default function CommentsDisplay(props) {
    const { postId, name, email, body } = props.commenters;
    const { id } = useParams();
    console.log('whats this id?', id);
    console.log('does this work', props.postNum);

    console.log('I doubt this works but lets try', email);
    return (
        <>
            <div className='eachComment'>
                <hr></hr>
                postId: <div>{postId}</div>
                Name:<h3>{name}</h3>
                Email: <h5>{email}</h5>
                Comment: <h4>{body}</h4>
            </div>

        </>
    )
}
//<button onClick={() => setCommentsShowing(!commentsShowing)}>{commentsShowing ? 'hide' : 'show'} comments</button>
 //const [commentsShowing, setCommentsShowing] = useState(false);          <Link to={`/bloggers/${postId}`}> <div><button>Go back to posts</button></div></Link>