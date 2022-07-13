let rangeSlider = document.getElementById("rs-range-line");
let rangeBullet = document.getElementById("rs-bullet");

rangeSlider.addEventListener("input", onRangeUpdate, false);
alert("Bienvenido/a!");

function onRangeUpdate() {
    rangeBullet.innerHTML = rangeSlider.value;
    let bulletPosition = (rangeSlider.value / rangeSlider.max);
    rangeBullet.style.left = (bulletPosition * 578) + "px";
}

const pages1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const pages2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const allPages = pages1.concat(pages2);
console.log(allPages);