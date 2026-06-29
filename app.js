import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
getDatabase,
ref,
set,
get,
push,
onChildAdded
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

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

let currentUser = "";
let chatId = "";

/* UI */
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
  showLogin();
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

/* CONNECT CHAT */
window.startChat = () => {

  const other = targetUser.value;

  if(!other){
    alert("Antre ID moun");
    return;
  }

  chatId = [currentUser, other].sort().join("_");

  messages.innerHTML = "";

  loadMessages();
};

/* SEND MESSAGE */
window.sendMessage = () => {

  const text = msgInput.value;

  if(!text) return;

  push(ref(db,"chats/"+chatId+"/messages"),{
    sender:currentUser,
    text:text,
    time:Date.now()
  });

  msgInput.value="";
};

/* LOAD */
function loadMessages(){

  onChildAdded(ref(db,"chats/"+chatId+"/messages"), (data)=>{

    const m = data.val();

    const div = document.createElement("div");
    div.classList.add("msg");

    if(m.sender === currentUser){
      div.classList.add("me");
    }

    div.innerHTML = `<b>${m.sender}</b><br>${m.text}`;

    messages.appendChild(div);

    messages.scrollTop = messages.scrollHeight;
  });
}

/* LIVE TYPING PREVIEW */
msgInput.addEventListener("input", ()=>{
  typingText.innerText = msgInput.value ? "Ou ap ekri: " + msgInput.value : "";
});

/* LOGOUT */
window.logout = () => location.reload();