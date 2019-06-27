let myImg = document.getElementById("myImg");
let clicked = false;
myImg.onclick = function () {
    if (clicked) {
        let myName = document.getElementById("myName");
        myName.innerHTML = "";
        clicked = !clicked;
    } else {
        let myName = document.getElementById("myName");
        myName.innerHTML = "Lubin Tu";
        clicked = !clicked;
    }
}