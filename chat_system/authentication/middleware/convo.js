const socket = io();

socket.on("connect", ()=>{
    const url = window.location.href + "/1";
    fetch(url, {method: "GET"})
    .then((response)=>{
        return response.json();
    })
    .then((data) =>{
        data.forEach(element => {
            let friends = document.createElement('span');
            friends.innerHTML += `
            <a href="/chat" class="card border border-bottom text-reset">
                <div class="card-body">
                    <div class="row gx-5">
                        <div class="col">
                            <div class="d-flex align-items-center mb-3">
                                <h5 class="me-auto mb-0">${element.username}</h5>
                                <span class="text-muted extra-small ms-2">12:45 PM</span>
                            </div>

                            <div class="d-flex align-items-center">
                                <div class="line-clamp me-auto">
                                    Hello! Yeah, I'm going to meet my friend of mine at the
                                    departments stores now.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
            `;

            document.getElementById('friendListing').appendChild(friends);
        });
    })
});

       
socket.on("chat", (messageObj)=>{

    const li = document.createElement("LI");
    li.classList.add(`bot__output`);
    li.classList.add(`bot__output--standard`);
    
    li.textContent = messageObj.message_text;

    document.querySelector("#chatlist").appendChild(li);

    console.log(messageObj);

});

const li = `<li class="bot__output bot__output--standard">Hey, I'm Navvy!</li>`;

const chatBox = document.querySelector("#chatbox");
const sendBtn = document.querySelector("#sendbtn");

chatBox.addEventListener("keydown", handleSend);
sendBtn.addEventListener("click", handleClick);

function handleSend(e){

    
    
}

function handleClick(e){
    e.preventDefault();

    const { user_id, user_name } = JSON.parse(localStorage.getItem("user"));



    const chatBoxContent = document.querySelector("#chatbox").value;

    console.log(chatBoxContent);

    const messageObj = {
        user_id: user_id,
        user_name: user_name,
        message_text: chatBoxContent
    }

    socket.emit("chat", messageObj);
}