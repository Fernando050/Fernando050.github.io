import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
getDatabase,
ref,
set,
get,
push,
onChildAdded,
remove
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

/* FIREBASE */
const firebaseConfig = {
  apiKey: "AIzaSyBo18YIHppmFTmwYpAueQKKwKP3GiGhwVU",
  authDomain: "shadowchat-7fc89.firebaseapp.com",
  databaseURL: "https://shadowchat-7fc89-default-rtdb.firebaseio.com",
  projectId: "shadowchat-7fc89",
  storageBucket: "shadowchat-7fc89.firebasestorage.app",
  messagingSenderId: "597195787056",
  appId: "1:597195787056:web:f8394aa1d27a76388a56f5"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/* 🔊 SOUND */
const notifSound = new Audio("https://actions.google.com/sounds/v1/notifications/notification_beep.ogg");

let currentUser = "";
let chatId = "";

/* UI SWITCH */
window.showRegister = () => {
  loginBox.classList.add("hidden");
  registerBox.classList.remove("hidden");
};

window.showLogin = () => {
  registerBox.classList.add("hidden");
  loginBox.classList.remove("hidden");
};

/* REGISTER */
window.register = () => {

  set(ref(db,"users/"+regId.value),{
    id:regId.value,
    password:regPass.value
  });

  alert("Account created ✔");
};

/* LOGIN */
window.login = () => {

  get(ref(db,"users/"+loginId.value)).then((snap)=>{

    if(snap.exists() && snap.val().password === loginPass.value){

      currentUser = loginId.value;

      loginBox.classList.add("hidden");
      chatBox.classList.remove("hidden");

    } else {
      alert("Wrong login");
    }
  });
};

/* START CHAT */
window.startChat = () => {

  const other = targetUser.value;

  chatId = [currentUser, other].sort().join("_");

  messages.innerHTML = "";

  loadMessages();
};

/* SEND */
window.sendMessage = () => {

  if(!msgInput.value) return;

  push(ref(db,"chats/"+chatId+"/messages"),{
    sender:currentUser,
    text:msgInput.value,
    time:Date.now()
  });

  msgInput.value="";
};

/* LOAD + SOUND + DELETE */
function loadMessages(){

  onChildAdded(ref(db,"chats/"+chatId+"/messages"), (data)=>{

    const m = data.val();
    const key = data.key;

    const div = document.createElement("div");
    div.classList.add("msg");

    if(m.sender === currentUser){
      div.classList.add("me");
    } else {
      notifSound.play().catch(()=>{});
    }

    div.innerHTML = `<b>${m.sender}</b><br>${m.text}`;

    if(m.sender === currentUser){

      const btn = document.createElement("button");
      btn.innerText = "x";
      btn.className = "deleteBtn";

      btn.onclick = () => {
        remove(ref(db,"chats/"+chatId+"/messages/"+key));
        div.remove();
      };

      div.appendChild(btn);
    }

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  });
}

/* LOGOUT */
window.logout = () => location.reload();
