'use strict';

const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

// let userUsername = document.querySelector('#userUsername');
// let userPassword = document.querySelector('#userPassword');
// let userUsernameLogin = document.querySelector('#userUsernameLogin');
// let userPasswordLogin = document.querySelector('#userPasswordLogin');

let btnSignup = document.getElementById('btnSignup');
let btnLogin = document.getElementById('btnLogin');

let containerBtn = document.getElementById('container-btn');
let containerSignup = document.getElementById('container-form signup');
let containerLogin = document.getElementById('container-form login');

btnSignup.addEventListener('click',function(e){
    e.preventDefault();
    containerBtn.style.display = "none";
    containerSignup.setAttribute('class','container-form signup active');
})

btnLogin.addEventListener('click',function(e){
    e.preventDefault();
    containerBtn.style.display = "none";
    containerLogin.setAttribute('class','container-form login active');
})

signupForm.addEventListener('submit',function(e){
    e.preventDefault();

    let signupFormData = new FormData(signupForm);

    let newUserObj = convertNewUserToObj(signupFormData);
    console.log(newUserObj);
    saveNewUser(newUserObj);
});

function convertNewUserToObj(signupFormData){
    let userName = signupFormData.get('userName');
    let userEmail = signupFormData.get('userEmail');
    let userUsername = signupFormData.get('userUsername');
    let userPassword = signupFormData.get('userPassword');

    return {
        'userName': userName,
        'userEmail': userEmail,
        'userUsername': userUsername,
        'userPassword': userPassword
    }
}

function saveNewUser(newUserObj){
    fetch('http://localhost:3000/users', {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(newUserObj),
    });
}

loginForm.addEventListener('submit',function(e){
    e.preventDefault();

    let loginFormData = new FormData(loginForm);

    let registeredUserObj = convertRegisteredUserToObj(loginFormData);
    getRegisteredUser(registeredUserObj);
});

function convertRegisteredUserToObj(loginFormData){
    let userUsernameLogin = loginFormData.get('userUsernameLogin');
    let userPasswordLogin = loginFormData.get('userPasswordLogin');
    return {
        'userUsernameLogin': userUsernameLogin,
        'userPasswordLogin': userPasswordLogin
    }
}

function getRegisteredUser(registeredUserObj){
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => validUser(data, registeredUserObj))
    .catch(function(){
        console.log('Failed to load data');
    })
}

function validUser(users, registeredUserObj){
    // console.log(users);

    console.log(registeredUserObj);
    let newUserUsernameLogin = registeredUserObj.userUsernameLogin;
    let newUserPasswordLogin = registeredUserObj.userPasswordLogin;

    users.forEach(element => {
        console.log(element);
        let newUserUsername = element.userUsername;
        let newUserPassword = element.userPassword;

        if(newUserUsernameLogin == newUserUsername){
            if(newUserPasswordLogin == newUserPassword){
                alert('Login was successful!')
            }
            else{
                alert('The password is incorrect')
            }
        }
        else{
            alert('User not found')
        }
    });
}