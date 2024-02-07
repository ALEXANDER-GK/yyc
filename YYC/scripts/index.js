// your-script-file.js

let prevScrollPos = window.pageYOffset;
const header = document.getElementById("site-header");
let currentScrollPos = 0;

window.onscroll = function () {
    currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
        header.classList.remove("hidden");
    } else {
        header.classList.add("hidden");
    }
    prevScrollPos = currentScrollPos;
};
