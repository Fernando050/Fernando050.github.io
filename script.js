window.addEventListener("scroll", ()=>{

  const header = document.querySelector("header");

  if(window.scrollY > 50){
    header.style.background = "rgba(0,0,0,0.7)";
  }else{
    header.style.background = "rgba(0,0,0,0.3)";
  }

});
