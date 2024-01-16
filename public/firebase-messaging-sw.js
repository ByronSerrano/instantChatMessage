const { initializeApp } = require("firebase/app")
const { getMessaging, getToken } = require("firebase/messaging")

//Configuration of Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCBtRz4TqmKOnVIeVbeyoqCeFqNM6NP6dw",
    authDomain: "chatgroup-165ac.firebaseapp.com",
    projectId: "chatgroup-165ac",
    storageBucket: "chatgroup-165ac.appspot.com",
    messagingSenderId: "682691025425",
    appId: "1:682691025425:web:9500f588595ca6f603efb0",
    measurementId: "G-18BYMG6LV4"
  }



//Permission
function requestPermission() {
    console.log('Requesting permission...')
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.')
        // Initialize Firebase
        const fireBasApp = initializeApp(firebaseConfig)
        // Initialize Firebase Cloud Messaging and get a reference to the service
        const messagingFirebase = getMessaging(fireBasApp)

        //Obtain the Token
        getToken(messagingFirebase, {
            vapidKey: 
                "1-UcsQUv3rp539NfHm2dRhFivmAs7CP8hchtzfPQTxI",
        }).then((currentToken) => {
            if (currentToken) {
                console.log("currentToken:", currentToken)
            } else {
                console.log("Can't get the currentToken")
            }
        })
        } else {
            console.log("Permissions denied")
        }
    })
}
requestPermission()

module.exports = { requestPermission }

// ------------------------TEST --------------------------

// const admin = require("firebase-admin")

// const firebaseConfig = {
//     apiKey: "AIzaSyCBtRz4TqmKOnVIeVbeyoqCeFqNM6NP6dw",
//     authDomain: "chatgroup-165ac.firebaseapp.com",
//     projectId: "chatgroup-165ac",
//     storageBucket: "chatgroup-165ac.appspot.com",
//     messagingSenderId: "682691025425",
//     appId: "1:682691025425:web:9500f588595ca6f603efb0",
//     measurementId: "G-18BYMG6LV4"
//   }



// const key = "BGLZR56Z1X2_DN9heTfZCoEmnVaYGnDw0jgXmVSivuPofd9eBiDjjaRlQ8pJQRERT7DL6ntduvuJHYxt5x9KRsQ"

// function initFirebase() {
//     admin.initializeApp(firebaseConfig)
// }


// initFirebase()

// function sendPushToOneClient(notification) {
//     const message = {
//         token: notification.tokenId,
//         data: {
//             message: notification.message
//         }
//     }
//     sendMessage(message)
// }

// module.exports = { sendPushToOneClient }

// function sendMessage(message) {
//     admin.messagging().send(message)
//     .then((respone) => {
//         console.log("Notification send")
//     })
//     .catch((error) => {
//         console.log("Error sending the notification", error)
//     })
// }
