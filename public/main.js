const socket = io("http://localhost:8000", {})

//elements of document html
const clientsTotal = document.getElementById("clients-total")

const messageContainer = document.getElementById("message-container")
const nameInput = document.getElementById("name-input")
const messageForm = document.getElementById("message-form")
const messageInput = document.getElementById("message-input")

messageForm.addEventListener("submit", (e) => {
    e.preventDefault()
    sendMessage()
})

//To see how manys users have the "chat"
socket.on("clients-total", (data) => {
    clientsTotal.innerText = 'Total Users: '+ data
})

//Function to send a Message
function sendMessage() {
    //to note put a void message
    if (messageInput.value === "") return
    // console.log(messageInput.value)

    //message information
    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date()
    }
    socket.emit("message", data)
    //to add own Message
    addMessageToUI(true, data)
    messageInput.value = ""
}
//To see the data of other sockets
socket.on("chat-message", (data) => {
    // console.log(data)
    addMessageToUI(false, data)
})

// moment(data.dateTime).fromNow(true)

//add the messague in the interface
function addMessageToUI(isOwnMessage, data) {
    clearFeedback()
    const element = `
        <li class="${isOwnMessage ? "message-right" : "message-left"}">
            <p class="message">
                ${data.message}
            <span>${data.name} • ${moment().calendar()}</span>
            </p>
        </li>`
    
    messageContainer.innerHTML += element
    scrollToBottom()
}

//automatic scroll screen
function scrollToBottom() {
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
}

//listen the typing
messageInput.addEventListener("focus", (e) => { 
    socket.emit("feedback", {
        feedback: `${nameInput.value} is typing`
    })
})
messageInput.addEventListener("keypress", (e) => { 
    socket.emit("feedback", {
        feedback: `${nameInput.value} is typing`
    })
})
messageInput.addEventListener("blur", (e) => { 
    socket.emit("feedback", {
        feedback: "",
    })
})

//format of typing in interface
socket.on("feedback", (data) => {
    clearFeedback()
    const element = `
    <li class="message-feedback">
        <p class="feedback" id="feedback">
            ${data.feedback}
        </p>
    </li>`

    messageContainer.innerHTML += element
})

//clear feedback message
function clearFeedback() {
    document.querySelectorAll("li.message-feedback").forEach(element => {
        element.parentNode.removeChild(element)
    })
}
