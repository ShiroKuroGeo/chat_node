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
       alert(data.message);
        // if(data.codeNumber == 1){

        //     const {user_id, user_name } = data.message[0];

        //     console.log(data);

        //     localStorage.setItem("user",JSON.stringify({user_id: user_id, user_name: user_name}));

        //     window.location.replace("http://localhost:4000/main");
        // }
        // else{
        //     alert(data.message);
        // }
    
    });
}