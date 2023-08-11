/* global $ */
(function () {
    'use strict';
    const content = $('#myContent');
    const homeButton = $('<button class="homeButton">Go to Home Page</button>');
    const commentSpace = $('#commentsSpot');
    async function getJson(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        }
        catch (e) {
            console.error('oops', e);
        }
    }

    async function getUsers() {
        const blogUsers = await getJson('https://jsonplaceholder.typicode.com/users');
        console.log(blogUsers);
        blogUsers.map(user => createUserInfo(user));
    }

    function createUserInfo(user) {
        const { name, website, company: { name: companyName, catchPhrase, bs } } = user;

        const userList = $(`
        
        <div class="users">
          <h3 class="name">${name}</h3>
          <div class="website">${website}</div>
          Company: 
          <div class="company">${companyName}</div>
          <div>${catchPhrase}</div>
          <div>${bs}</div>
          </div>
        </div>`);
        content.append(userList);
        userList.on('click', () => {
            content.empty();
            content.append(`<div class="postAuthor">${name}'s Blog Posts</div><hr>`);
            getPosts(user);
        })
    }

    async function getPosts(user) {
        const blogPosts = await getJson(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
        console.log(blogPosts)
        blogPosts.map(post => displayBlogPosts(post));
        content.prepend(homeButton);
        backToHome();
    }

    function backToHome() {
        homeButton.on('click', () => {
            content.empty();
            commentSpace.empty();
            getUsers();
            console.log('user being clicked and I might not know what Im doing')
        })
    }
    
    function displayBlogPosts(poster) {
        const { title, body } = poster;
        const blogPost = $(`
        <div class="posts">
        <div class=title"><div><em>Title:</em></div> ${title}</div>
        <div class="body"><div><em>Body:</em></div> ${body}</div>
        <button class="commentButton">show Comments</button>
        </div>
        `);
        blogPost.appendTo(content);
        let showingComments = false;
        const commentButton = blogPost.find('.commentButton');
        commentButton.on('click', () => {
            //content.empty();
            //content.prepend(homeButton);
            //backToHome();
            
            if (!showingComments) {
                showingComments = true;//
                commentSpace.empty()
                commentButton.text('hide Comments');
                //
            } else {
                showingComments = false;
                //blogPost.appendTo(content);
                blogPost.append(getComments(poster.id));
            }
        })
        showingComments = false;
    }

    async function getComments(postId) {
        const comments = await getJson(`https://jsonplaceholder.typicode.com/comments?comments=${postId}`);

        let filteredArray = comments.filter(comment => comment.postId === Number(postId));
        filteredArray.map(comment => displayComments(comment));
    }

    function displayComments(comment) {
        const { id, postId, name, email, body } = comment;
        const eachComment = $(`
        <div class="aComment">
        <div>id: ${id}</div>
        <div>postId: ${postId}</div>
        <div>Name: ${name}</div>
        <div>Email: ${email}</div>
        <div>Body: ${body}</div>
        </div>`);

        commentSpace.append(eachComment);
    }

    getUsers();

})();