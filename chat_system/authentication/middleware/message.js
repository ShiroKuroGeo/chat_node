const socket = io();


let urlParams = new URLSearchParams(window.location.search);
let pname = urlParams.get('name');
document.getElementById('myName').innerHTML = pname;

socket.on("connect", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const url = `http://localhost:4000/chat/${name}`;
    fetch(url, { method: "GET" })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            data.forEach(element => {
                let friends = document.createElement('span');
                friends.innerHTML += `
                                    <div class="d-flex flex-row justify-content-end my-4">
                                        <div>
                                            <p class="small text-end text-dark fw-bold text-capitalize">${element.username}</p>
                                            <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary px-5 py-4">${element.message}</p>
                                        </div>
                                    </div>
            `;

                document.getElementById('messages').appendChild(friends);
            });
        })
});

socket.on("chat", (data) => {
    const { username, message } = data;
    const span = document.createElement("p");
    span.innerHTML = `<div class="d-flex flex-row justify-content-end">
        <div>
            <p class="small text-end text-dark fw-bold text-capitalize ">${username}</p>
            <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary px-5 py-4">${message}</p>
        </div>
    </div>`;

    document.querySelector("#messages").appendChild(span);
});
document.querySelector("#send").addEventListener("click", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const msg = document.querySelector("#message").value;
    if(msg != ''){
        socket.emit("chat", { username: name, message: msg });
        document.querySelector("#message").value = '';
    }
});

