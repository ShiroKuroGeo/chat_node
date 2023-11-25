const registerBtn = document.getElementById('registerBtn');

registerBtn.addEventListener("click", handleLogin);

function handleLogin(e){

    e.preventDefault();

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    const cpassword = document.getElementById("cpassword").value;

    const userObj = {
        username: username,
        password: password
    };

    if(cpassword == password){
        sendData(userObj);
    }else{
        alert("Password Not Match!");
    }
}

function sendData(userObj){

    const url = "http://localhost:4000/register";
    const options = {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    }
    
    fetch(url, options)
    .then((response) =>{
        return response.json();
    })
    .then((data) =>{
        alert(data.message);
    });
}