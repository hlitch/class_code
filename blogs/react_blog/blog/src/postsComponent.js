import React, { useState } from 'react';
import './PostComponent.css';
import CommentsComponent from './CommentsComponent';
//import { Link, useParams } from 'react-router-dom'
import PostPoster from './PostPoster';

export default function PostsComponent(props) {

  const [commentState, setCommentState] = useState([]);

  const { id, title, body } = props.userPosts;

  console.log('trying to use props posts', props.userPosts);
  //console.log('trying to get title out of props', title);
  //const {postId}= useParams();

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

  async function getComments(post) {
    const comments = await loadJson(`https://jsonplaceholder.typicode.com/comments?comments=${post}`)
    console.log(comments);

    let filteredArray = comments.filter(comment => comment.postId === Number(post));

    filteredArray.map(comment => {
      const { body, email, name } = comments;
      console.log('checking body', comment.body);
      return { commentName: name, commentEmail: email, commentBody: body }
    })
    setCommentState(filteredArray);

  }

  function showComments() {
    getComments(id);
  }

  const comments = commentState.map(comment => <CommentsComponent postedComments={comment} />);

  return (

    <>
      
      <div className='postDisplay'>
        Title: <h3>{title}</h3>
        Post: <h4>{body}</h4>
        <button onClick={showComments}>go to comments</button>
        <div>{comments}</div>
      </div>
    </>
  )
}

/*<div></div>let filteredArray = comments.filter(comment => comment.postId === Number(post));const { setShowingPosts } = props.postShowing;setShowingPosts(false);
console.log('filteredArray', filteredArray);*/
/*<Link to={`/comments/${id}`}>Go to Comments</Link>*/