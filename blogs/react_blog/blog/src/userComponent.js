import React, { useState } from 'react'
import './userComponent.css';
import PostsComponent from './postsComponent';
import PostPoster from './PostPoster';
export default function UserComponent(props) {

    const [postState, setPostState] = useState([]);

    console.log('trying to show showing', props.show)
    const { id, name, website, company } = props.user;
    console.log(props.user);
    console.log(name);
    console.log(website);
    console.log(company);
    console.log('getting id', id);



    async function getJson(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const users = await response.json();
            console.log(users);
            return users;

        }
        catch (e) {
            console.error('oops', e);
        }
    }

    /**/async function getPosts(uId) {
        const usersPosts = await getJson(`https://jsonplaceholder.typicode.com/posts?userId=${uId}`)
        console.log('trying to get posts', usersPosts);

        setPostState(usersPosts);
        //setShowingUsers(usersPosts);
    }
    function onClick() {
        getPosts(id);
        console.log('im being clicked');
        console.log('trying to get state posts', postState);
    }
    const posts = postState.map(post => <PostsComponent userPosts={post} />);

    const { name: companyName, catchPhrase, bs } = company;

    return (

        <>
            <div className='user' onClick={onClick}>
                <h5>Click to read posts by this user</h5>
                <h2 >Name: {name}</h2>
                <h3 >Website: {website}</h3>
                <h4 >Company:<div>{companyName}</div>
                    catchPhrase:  <div>{catchPhrase}</div>
                    BS: <div>{bs}</div>
                </h4><div>{posts}</div>
            </div>
        </>
    )
}

/*  <div>{posts}</div> showing: <div>{ props.show }</div>*/





/*{showingPosts &&}setShowinPosts(showingPosts);{showingUsers &&}postShowing={() => setShowinPosts(showingPosts)}
<button onClick={()=>setShowing(!showing)}>lets see</button>
const {userName, userWebsite, userCompany } = props.users;
    //const whattt = props.users.map(user => {return  <div><h2>{user.userName}</h2><h3>{user.userWebsite}</h3><h4>{user.userCompany}</h4></div> })
    console.log('checking if props working', props.users);
    console.log('again', props.users);
    //const { userName, userWebsite, userCompany } = props.users;
    console.log(userName)
    console.log(userWebsite);*/
    //const { users } = await props;
        //props.users.id.map(u => <h2>{u.id}</h2>);//let letsSee = users.map(user => { return <div><h2>{user.userName}</h2><h3>{user.userWebsite}</h3><h4>{user.userCompany}</h4></div> });
    //const { users } = props;
//console.log('checking props!!!!', userWebsite);{users.map(user =>  <div><h2>{user.userName}</h2><h3>{user.userWebsite}</h3><h4>{user.userCompany}</h4></div> )}
    //props.users.map(user => <div><h2>{user.userName}</h2><h3>{user.userWebsite}</h3><h4>{user.userCompany}</h4></div>)