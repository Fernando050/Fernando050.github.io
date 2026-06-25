import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyALLxdmnYGgzoCCdQVPjbbzfCdHFmGrK-o",
  authDomain: "love-chat-e5514.firebaseapp.com",
  databaseURL: "https://love-chat-e5514-default-rtdb.firebaseio.com",
  projectId: "love-chat-e5514",
  storageBucket: "love-chat-e5514.firebasestorage.app",
  messagingSenderId: "760950261434",
  appId: "1:760950261434:web:6c9d01efd8b1f86bf5e483"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 👤 USER SIMPLE
let user = prompt("Ou se A oswa B?").toUpperCase();

// 💬 CHAT SIMPLE
const chatRef = ref(db, "chat");
const chatBox = document.getElementById("chat");

// SEND
document.getElementById("sendBtn").onclick = () => {
  let text = document.getElementById("text").value;
  if (!text.trim()) return;

  push(chatRef, {
    user,
    text,
    time: Date.now()
  });

  document.getElementById("text").value = "";
};

// RECEIVE
onChildAdded(chatRef, (data) => {
  let msg = data.val();

  let div = document.createElement("div");
  div.classList.add("msg");
  div.classList.add(msg.user === user ? "me" : "other");

  div.innerText = msg.user + ": " + msg.text;

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});
