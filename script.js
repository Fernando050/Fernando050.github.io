// ===== WhatsApp config =====
let numero = "50946067866"; // mete nimewo ou

let message = "Salut 😊 mwen sot wè ti site ou voye a... li vrèman touche kèm 💖";

// Kreye link WhatsApp
let url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(message);

// Mete link la sou bouton an
document.getElementById("whatsappBtn").href = url;


// ===== Bouton Wi / Non =====
function yes() {
    document.getElementById("response").innerHTML =
    "😍 Ou fè m pi kontan jodi a! Klike sou bouton WhatsApp la pou pale avè m ❤️";
}

function no() {
    document.getElementById("response").innerHTML =
    "😢 Ok... men mwen pap sispann apresye w...";
}