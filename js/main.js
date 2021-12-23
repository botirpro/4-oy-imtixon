//Users
const elUsersList = document.querySelector('.users__list');
const elUserTemplate = document.querySelector('.users__template').content;
//Post
const elPostList = document.querySelector('.post__list');
const elPostTemplate = document.querySelector('.post__template').content;
//Comments
const elCommentsList = document.querySelector('.comments__list');
const elCommentsTemplate = document.querySelector('.comments__template').content;

// renderUsers
function renderUsers(arr, node) {
    node.innerHTML = null;
    const usersFragment = document.createDocumentFragment();
    arr.forEach(row => {
        const usersTemplate = elUserTemplate.cloneNode(true);
        usersTemplate.querySelector('.users__item').dataset.userId = row.id;
        usersTemplate.querySelector('.users__item__id').textContent = row.id;
        usersTemplate.querySelector('.users__item__headding').textContent = row.name;
        usersTemplate.querySelector('.users__item__username').textContent = row.username;
        usersTemplate.querySelector('.users__item__email').textContent = row.email+"/ ";
        usersTemplate.querySelector('.users__item__email').href = row.email;
        usersTemplate.querySelector('.users__item__address').textContent =
            row.address.street +
            " " +
            row.address.suite +
            " " +
            row.address.city +
            " " +
            row.address.zipcode;
        usersTemplate.querySelector('.user__item__address-link').href =
            "https://www.google.com/maps/place/" + row.address.geo.lat + ' ' + row.address.geo.lng;
        usersTemplate.querySelector('.users__item__number').textContent = row.phone;
        usersTemplate.querySelector('.users__item__website').textContent = " / " + row.website;
        usersTemplate.querySelector('.user__company__name').textContent = row.company.name;
        usersTemplate.querySelector('.user__company__catchPhrase').textContent = row.company.catchPhrase;
        usersTemplate.querySelector('.user__company__bs').textContent = row.company.bs;

        usersFragment.appendChild(usersTemplate);
    });
    node.appendChild(usersFragment)
}
// fetch Users
async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    if (data) {
        renderUsers(data, elUsersList);
    }
}
fetchUsers();




// render post
function renderPost(arr, node) {
    node.innerHTML = null;

    const postFragment = document.createDocumentFragment();
    arr.forEach(row => {
        const postTemplate = elPostTemplate.cloneNode(true);

        postTemplate.querySelector('.post__item').dataset.postId = row.id;
        postTemplate.querySelector('.post__item__headding').textContent = row.title.split(' ').slice(0,5).join(' ')+'...';
        postTemplate.querySelector('.post__item__text').textContent = row.body;

        postFragment.appendChild(postTemplate);
    });
    node.appendChild(postFragment);
}


//fetch Post
async function fetchPost() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    elUsersList.addEventListener('click', (evt) => {
        if (evt.target.closest('.users__item')){
            const postId = Number(evt.target.closest('li').dataset.userId);
            const foundId = data.filter(user => user.userId === postId);
            elCommentsList.innerHTML = null;
            renderPost(foundId, elPostList);
        };
    })
}

fetchPost();

//render comments
function renderComments(arr, node) {
    node.innerHTML = null;
    const commentsFragment = document.createDocumentFragment();
    arr.forEach(row => {
        const commeetsTemplate = elCommentsTemplate.cloneNode(true);
        commeetsTemplate.querySelector('.comments__item__headding').textContent = row.name.split(' ').slice(0,5).join(' ')+'...';;
        commeetsTemplate.querySelector('.comments__item__text').textContent = row.body;
        commeetsTemplate.querySelector('.comments__item__email').textContent = row.email;

        commentsFragment.appendChild(commeetsTemplate);
    });
    node.appendChild(commentsFragment);
}

//fetch Comments
async function fetchComments() {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    const data = await response.json();
    elPostList.addEventListener('click', (evt) => {
        if (evt.target.closest('.post__item')) {
            const postId = Number(evt.target.closest('li').dataset.postId);
            const foundId = data.filter(post => post.postId === postId);
            renderComments(foundId, elCommentsList);
        } 
        
    })

}
fetchComments();

