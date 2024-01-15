const express = require("express")
const path = require("path")
const app = express()
const PORT = process.env.PORT || 8000
const server = app.listen(PORT, () => console.log('Server on port:', PORT))

const io = require("socket.io")(server)

app.use(express.static(path.join(__dirname, 'public')))

let socketsConnected = new Set()

io.on("connection", onConnected)

// Sockets Connections 
function onConnected(socket) {
    //New Sockert Connection
    console.log("Socket connected:",socket.id)
    //Add in Set socketsConnected
    socketsConnected.add(socket.id)
    //Trriged to clients-total document html
    io.emit("clients-total", socketsConnected.size)

    //Sockets disconnected
    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id)
        //Delete in Set socketsConnected
        socketsConnected.delete(socket.id)

        io.emit("clients-total", socketsConnected.size)
    })

    socket.on("message", (data) => {
        console.log(data)
        socket.broadcast.emit("chat-message", data)
    })

    socket.on("feedback", (data) => {
        socket.broadcast.emit("feedback", data)
    })
}
