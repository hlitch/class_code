import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
//import { loadJson } from './UserPage';
import CommentsDisplay from './CommentsDisplay';

export default function Comments() {
    // {bId}
    //const { id } = props.bId;
    const { id } = useParams();
    console.log('trying to get params id', id);
    const [commentState, setCommentState] = useState([]);
    //const [commentsShowing, setCommentsShowing] = useState(false);

    async function loadJson(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const result = await response.json();
            return result;
        }
        catch (e) {
            console.error('oops', e);
        }
    }
    let imTrying = useRef();

    useEffect(() => {
        async function getComments(id) {
            const comments = await loadJson(`https://jsonplaceholder.typicode.com/comments?comments=${id}`)
            console.log(comments);
            let filteredArray = comments.filter(c => c.postId === Number(id));
            console.log(filteredArray);
            filteredArray.map(comment => {
                const { body, email, name } = comments;
                console.log('checking body', comment.body);
                return { commentName: name, commentEmail: email, commentBody: body }
            })
            imTrying.current = filteredArray;
            setCommentState(filteredArray);
        }
        getComments(id);
    }, [id])

    //getComments(id);
    /**/function showComments() {

        console.log('whats going on?');
    }

    const postComments = commentState.map(comment => <CommentsDisplay postId={Number(id)} commenters={comment} />)
    return (
        <>{/*<button onClick={showComments}>go to comments</button>*/}
            <div>{postComments}</div>
        </>
    )
}
//
//<button onClick={() => setCommentsShowing(!commentsShowing)}>{commentsShowing ? 'hide' : 'show'} comments</button>
/*comments.forEach(ofComment => {
           if (ofComment.postId === Number(postsId)) {
               ofComment.map(comment => {
                   const { body, email, name } = comments;
                   console.log('checking body', comment.body);
                   return { commentName: name, commentEmail: email, commentBody: body }
               })
               
           }
           
       });*/
/**/