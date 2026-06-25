import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
  runTransaction
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyALLxdmnYGgzoCCdQVPjbbzfCdHFmGrK-o",
  authDomain: "love-chat-e5514.firebaseapp.com",
  databaseURL: "https://love-chat-e5514-default-rtdb.firebaseio.com",
  projectId: "love-chat-e5514",
  storageBucket: "love-chat-e5514.firebasestorage.app",
  messagingSenderId: "760950261434",
  appId: "1:760950261434:web:6c9d01efd8b1f86bf5e483"
};

// init Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 👤 USER
let user = prompt("Ou se A oswa B?").toUpperCase();

// 🔐 SLOT LOCK (ANTI DOUBLE CLAIM)
const lockRef = ref(db, "locks/" + user);

await runTransaction(lockRef, (current) => {
    if (current === true) {
        alert("Slot sa deja pran!");
        throw "locked";
    }
    return true;
}).catch(() => {
    location.reload();
});

// 💬 CHAT REF (SIMPLE ROOM)
const chatRef = ref(db, "chat");

const chatBox = document.getElementById("chat");

// 📤 SEND MESSAGE
document.getElementById("sendBtn").onclick = () => {
    let text = document.getElementById("text").value;

    if (!text.trim()) return;

    push(chatRef, {
        user: user,
        text: text,
        time: Date.now()
    });

    document.getElementById("text").value = "";
};

// 📥 RECEIVE MESSAGE
onChildAdded(chatRef, (data) => {
    let msg = data.val();

    let div = document.createElement("div");
    div.classList.add("msg");

    div.classList.add(msg.user === user ? "me" : "other");

    div.innerText = msg.user + ": " + msg.text;

    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
});

// 📱 PWA SERVICE WORKER
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
