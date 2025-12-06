// Select all ornaments
const ornaments = document.querySelectorAll(".ornament");

ornaments.forEach(o => {
    o.addEventListener("mousedown", startDrag);  
});

let current = null;
let offsetX = 0;
let offsetY = 0;

function startDrag(e) {
    // Create a copy of the ornament
    current = e.target.cloneNode(true);
    current.style.left = e.target.style.left;
    current.style.top = e.target.style.top;

    // Add to the DOM
    document.getElementById("game-container").appendChild(current);

    // Calculate offset so it grabs at the mouse pointer
    const rect = current.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Set higher z-index so it stays on top while dragging
    current.style.zIndex = 1000;

    // Move with mouse
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", drop);

    // Prevent default text/image dragging
    e.preventDefault();
}

function drag(e) {
    if (!current) return;

    // Smooth movement using offset
    current.style.left = e.clientX - offsetX + "px";
    current.style.top = e.clientY - offsetY + "px";
}

function drop() {
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", drop);

    // Optional: reset z-index
    if (current) current.style.zIndex = "";
    current = null;
}
