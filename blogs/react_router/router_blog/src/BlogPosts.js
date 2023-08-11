import React, { useEffect, useState } from 'react'

import DisplayBlogposts from './DisplayBlogposts';
import { useParams } from 'react-router-dom';
import Comments from './Comments';

export default function BlogPosts() {
    const [blogPosts, setBlogPosts] = useState([]);

    const { id } = useParams();
    useEffect(() => {
        async function getBlogPosts() {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                const posts = await response.json();
                //console.log(posts)
                setBlogPosts(posts);
            }
            catch (e) {
                console.error('failed to load', e);
            }
        }
        getBlogPosts();
    }, [id])

    const bloggerPosts = blogPosts.map(post => <DisplayBlogposts posters={post} />)
    //const toGivePostId = blogPosts.map(blog => <Comments bId={`${id}`} />)<div>{toGivePostId}</div>
    return (
        <>
            <div>{bloggerPosts}</div>
        </>
    )
}
