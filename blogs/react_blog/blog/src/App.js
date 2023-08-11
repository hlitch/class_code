import React, { Component } from 'react'
import UserComponent from './userComponent';
import PostsComponent from './postsComponent';
//import { Routes, Route, Link } from "react-router-dom";

export default class App extends Component {
  state = {
    userArray: [],
    showing: 'users'
  }
  
  async loadJson(url) {
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
  async getUsers() {
    const userInfo = await this.loadJson('https://jsonplaceholder.typicode.com/users');

    userInfo.map(user => {
      const { name, catchPhrase, bs } = user.company;
      return { userName: user.name, userWebsite: user.website, userCompany: name, catchPhrase, bs }
    })

    console.log(userInfo);
    return userInfo;
  }

  async componentDidMount() {
    const allUsers = await this.getUsers();
    console.log(allUsers);

    this.setState({
      userArray: allUsers,
      showing: 'users'
    });

  }
  render() {
    const gotUsers = this.state.userArray.map(users => <UserComponent user={users} show={this.state.showing} />)
    return (
      <>
        {gotUsers}
      </>
    )
  }
}

        /*user={gotUsers }
        <Routes>
          <Route index element={<UserComponent />} />
        </Routes> 
        */















































/*import React, { useState } from "react";
import UserComponent from "./userComponent";

export default function App() {

  const [userState, setUserState] = useState({ usersArray:[]  });

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
  
  */

  /*async function getAgain() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      //const users = await response.json();
      //console.log(users);
      const userInfo = await response.json();
      userState.usersArray = userInfo.map(user => {
        const { name, catchPhrase, bs } = user.company;
        return { userName: user.name, userWebsite: user.website, userCompany: name, catchPhrase, bs }
      })
      //userState.usersArray = userInfo;
      return userInfo;
    }
    catch (e) {
      console.error('oops', e);
    }

    /*console.log('showing that im using state', userState.usersArray);
    

  }*/
  //setUserState(getAgain);
  /*function getUserInfo() {

    const userInfo = getJson('https://jsonplaceholder.typicode.com/users');


    userState.usersArray = userInfo.map(user => {
      const { name, catchPhrase, bs } = user.company;
      return { userName: user.name, userWebsite: user.website, userCompany: name, catchPhrase, bs }
    })
    console.log('showing that im using state', userState.usersArray);
    return userState.usersArray;
  }*/
  /*sgetUserInfo();
 console.log();
 // console.log(useState.usersArray);
let something = getAgain();

  something.map(user => {
        const { name, catchPhrase, bs } = user.company;
        return { userName: user.name, userWebsite: user.website, userCompany: name, catchPhrase, bs }
      })
  userState.usersArray = getAgain();
  return (

    <>
      <div>Hello World again</div>
      <UserComponent users={userState.usersArray} />
    </>
  )
}
etUserState({...userState, usersArray: getUserInfo})*/