import React from 'react'

export default function CommentsComponent(props) {
    const { name, email, body } = props.postedComments;
    console.log('I doubt this works but lets try', email);
    return (
        <>
            <div className='eachComment'>
                <hr></hr>
                Name:<h3>{name}</h3>
                Email: <h5>{email}</h5>
                Comment: <h4>{body}</h4>
            </div>

        </>
  )
}
