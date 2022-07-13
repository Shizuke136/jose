function loadMsg(info) {
    const chatBox = document.querySelector("main")
    chatBox.innerHTML = ""

    for (let i = 0; i < (info.data).length; i++) {

        if ((info.data[i].type) === "status") {
            chatBox.innerHTML += `
            <div class = 'msg'>
                <div class= 'status'>
                    <span class = 'time'>(${info.data[i].time})</span>
                    <span class = 'user'>${info.data[i].from}</span>
                    <span class = 'text'>${info.data[i].text}</span>
                </div>
            </div class = 'msg'>`
        }

        if ((info.data[i].type === "message")) {
            chatBox.innerHTML += `
            <div class="msg">
                <div class="normal">
                    <span class = "time">(${info.data[i].time})</span>
                    <span class = "user">   <strong>${info.data[i].from}</strong> para <strong>Todos &nbsp</strong></span>
                    <span class = "text">${info.data[i].text}</span>
                </div>
            </div>`
        }

        if ((info.data[i].type === "private_message") && info.data[i].to === user) {
            chatBox.innerHTML +=
                `<div class="msg">
                    <div class="reserved">
                        <span class = "time">(${info.data[i].time})</span>
                        <span class = "user">${info.data[i].user}</span>
                        <span class = "to">Reservadamente para <strong>${info.data[i].to}</strong></span>
                        <span class = "text">${info.data[i].text}</span>
                    </div>
                </div>`
        }
    }
    const messages = document.querySelectorAll(".msg")
    messages[messages.length-1].classList.add("last-msg")
    messages[messages.length-1].scrollIntoView()
}

function update(){
    const msg = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    msg.then(loadMsg)
}

function isOnline(){
    const onlineUser = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", user)
    onlineUser.catch(() => console.log("Vê se fez tudo certo aí, animal"))
}

function sendMessage(){
    let text = document.querySelector("input").value
    let userMessage =   {
        from: user.name,
        to: "Todos",
        text: text,
        type: "message",
        time: time,
      }
    const sendMessage = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", userMessage)
    sendMessage.catch(() => console.log("Algo deu errado"))
    
    document.querySelector("input").value = ""

    console.log(text)
}

function login(){
    user = {name: prompt("Qual seu lindo nome ?")}
    const participants = axios.get("https://mock-api.driven.com.br/api/v6/uol/participants")
    participants.then((info) => {
        for(let i = 0; i < (info.data).length; i++){
            if((info.data[i]).name === user.name){
                login()
            }
        }
    })

    const sendUser = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", user)
    return user
}

user = login()

const msg = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
msg.then(loadMsg)

setInterval(update, 3000)
setInterval(isOnline, 5000)

let date = new Date
let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

console.log(time)

const button = document.querySelector("button")
button.addEventListener("click", sendMessage)