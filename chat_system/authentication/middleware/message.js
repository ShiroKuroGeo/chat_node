const socket = io();

socket.on("connect", ()=>{
    const url = "http://localhost:4000/chat/2/1";
    fetch(url, {method: "GET"})
    .then((response)=>{
        return response.json();
    })
    .then((data) =>{
        data.forEach(element => {
            alert(element);
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
                                    ${element.message}.
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