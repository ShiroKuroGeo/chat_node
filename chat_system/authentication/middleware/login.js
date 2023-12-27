const registerBtn = document.getElementById('loginbtn');

registerBtn.addEventListener("click", handleLogin);

function handleLogin(e){

    e.preventDefault();

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    const userObj = {
        username: username,
        password: password
    };

    sendData(userObj);
}

function sendData(userObj){

    const url = "http://localhost:4000/login";
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
        if(data.message == 'Success'){
            window.location.href = `http://localhost:4000/chat?name=${data.codeNumber}`;
        }
        else{
            alert(data.message);
        }
    
    });
}