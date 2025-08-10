
const usersObject ={
    user1:{username: 'qosai', password: 'pass1' },
    user2:{username:'ali',password:'pass2'},
    user3:{users:'hamzah',password:'pass3'}
};

localStorage.setItem('users',JSON.stringify(usersObject ))
 
const users=JSON.parse(localStorage.getItem('users')||'{}')

function login(){
    let name=document.getElementById('username').value
    let pass=document.getElementById('password').value

    if(!name){
        document.getElementById('message').innerHTML='username is required'
    return;
    }
    if(!pass){
        document.getElementById('message').innerHTML='password is required'
    return;
    }
    for(let key in users){
        if(users[key].username==name&&users[key].password==pass){
            localStorage.setItem('lastuser',name)
           location.href='Dashboard.html';
        }else{
        document.getElementById('message').innerHTML='Invalid username or password'
        }
    } 
}

function logout(){
    localStorage.removeItem('lastuser')
    location.href='login.html'
}


