import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
  set
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

// 👤 USER (A-Z)
let user = prompt("Chwazi lettre ou (A-Z)").toUpperCase();

// 🔥 PAIRS (13 SALLES)
const pairs = {
  A:"B", B:"A",
  C:"D", D:"C",
  E:"F", F:"E",
  G:"H", H:"G",
  I:"J", J:"I",
  K:"L", L:"K",
  M:"N", N:"M",
  O:"P", P:"O",
  Q:"R", R:"Q",
  S:"T", T:"S",
  U:"V", V:"U",
  W:"X", X:"W",
  Y:"Z", Z:"Y"
};

let other = pairs[user];
let room = "room_" + [user, other].sort().join("_");

// 💬 CHAT REF (PRIVATE ROOM)
const chatRef = ref(db, "chats/" + room + "/messages");

// 🔐 CREATE MEMBERS (PRIVATE ACCESS)
set(ref(db, "chats/" + room + "/members"), {
  [user]: true,
  [other]: true
});

// 📤 SEND MESSAGE
window.send = () => {
  let text = document.getElementById("text").value;

  if (!text.trim()) return;

  push(chatRef, {
    user: user,
    text: text
  });

  document.getElementById("text").value = "";
};

// 📥 RECEIVE MESSAGE
const chatBox = document.getElementById("chat");

onChildAdded(chatRef, (data) => {
  let msg = data.val();

  let div = document.createElement("div");
  div.classList.add("msg");

  div.classList.add(msg.user === user ? "me" : "other");

  div.innerText = msg.user + ": " + msg.text;

  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
});


// ❤️ HEART ANIMATION (UNCHANGED)
function createHeart(){
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤️";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (10 + Math.random() * 20) + "px";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createHeart, 500);
