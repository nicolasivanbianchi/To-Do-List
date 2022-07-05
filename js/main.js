let rangeSlider = document.getElementById("rs-range-line");
let rangeBullet = document.getElementById("rs-bullet");

rangeSlider.addEventListener("input", onRangeUpdate, false);
alert("Bienvenido/a!");

function onRangeUpdate() {
    rangeBullet.innerHTML = rangeSlider.value;
    let bulletPosition = (rangeSlider.value / rangeSlider.max);
    rangeBullet.style.left = (bulletPosition * 578) + "px";
}