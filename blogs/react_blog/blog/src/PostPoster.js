import React from 'react'

export default function PostPoster(props) {
  const { id, title, body } = props.userPosts;
  
  return (
    <>
      <div className='postDisplay'>
        Title: <h3>{title}</h3>
        Post: <h4>{body}</h4>
      </div>
    </>
  )
}