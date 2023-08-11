import React, { useEffect, useState } from 'react'
import DisplayBloggers from './DisplayBloggers';

export default function UserPage() {
    const [bloggers, setBloggers] = useState([]);

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

    useEffect(() => {
        async function getUsers() {
            const userInfo = await loadJson('https://jsonplaceholder.typicode.com/users');

            /**/userInfo.map(user => {
                const { name, catchPhrase, bs } = user.company;
                return { Id: user.id, userName: user.name,  userWebsite: user.website, userCompany: name, catchPhrase, bs }
            })

            console.log(userInfo);
            setBloggers(userInfo);
        }

        getUsers();
    }, [])

    ////getUsers();
    const gotUsers = bloggers.map(blogger => <DisplayBloggers key={blogger.id} bloggers={blogger} />)
    return (
        <div>{gotUsers}</div>
    )
}
