const { EventEmitter } = require("events");
const mine = new EventEmitter();
console.log("Red")
mine.on("change", () => {
    console.log("The colour just changed to", lights[i].color);
});

// Structuring data
const lights = [
    { color: "green", duration: 5000 },
    { color: "yellow", duration: 5000 },
    { color: "red", duration: 2000 },
];

let i = 0;

// Create a change color method
function changeColor() {
    setTimeout(() => {
        mine.emit('change');
        i++;

        if (i == 3) {
            i = 0;
        }
        changeColor();
    }, lights[i].duration);
}

// Start the color-changing process
changeColor();
