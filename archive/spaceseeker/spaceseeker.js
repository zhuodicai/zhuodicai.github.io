const canvas = document.getElementById('spaceseekercanvas');
const ctx = canvas.getContext('2d');

// Dot properties
const dotRadius = 50;
const dotColor = 'blue';
const clickDotColor = 'red'; // Color for the clicked dots

// Initial position for blue dots (all start from 0, 0)
let blueDots = []; // Array to store all blue dots

// Speed of movement (controls how fast the dot moves)
const speed = 10;

// Variable to store the clicked red dot's position
let clickDot = null; // Initially no red dot

// Variable to track whether the blue dots have stopped moving
let isBlueDotStopped = false;


// Resize the canvas on window resize
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    redrawDot(); // Redraw everything after resizing
}

// Function to redraw the moving dots at their current positions
function redrawDot() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw all blue dots
    blueDots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
        ctx.closePath();
    });

    // If there's a red dot, draw it
    if (clickDot) {
        ctx.beginPath();
        ctx.arc(clickDot.x, clickDot.y, dotRadius / 2, 0, Math.PI * 2); // Smaller size for the clicked dot
        ctx.fillStyle = clickDotColor;
        ctx.fill();
        ctx.closePath();
    }
}

// Function to move each blue dot towards its target position
function moveDots() {
    // Move each blue dot
    blueDots.forEach(dot => {
        if (dot.isStopped) return; // Skip if this dot has already stopped

        // Calculate the difference in position
        const dx = dot.target.x - dot.x;
        const dy = dot.target.y - dot.y;

        // Calculate distance to the target
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If the distance is small enough, stop moving
        if (distance < speed) {
            dot.x = dot.target.x;
            dot.y = dot.target.y;
            dot.isStopped = true; // Mark this dot as stopped
            reportBlueDotPos();
            return; // Stop the animation for this dot
        }

        // Move the dot towards the target position
        const angle = Math.atan2(dy, dx);
        dot.x += Math.cos(angle) * speed;
        dot.y += Math.sin(angle) * speed;
    });

    redrawDot(); // Redraw all dots

    requestAnimationFrame(moveDots); // Keep moving all the dots
}

// Function to add a new blue dot
function addBlueDot() {
    const newBlueDot = {
        x: 0, // Starting at (0, 0)
        y: 0,
        target: {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        },
        isStopped: false
    };
    blueDots.push(newBlueDot);
}

function reportBlueDotPos() {
    // Log the positions of all blue dots
    console.log('🔵Blue dot positions:');
    blueDots.forEach(dot => {
        console.log(`x: ${dot.x}, y: ${dot.y}`);
    });
}

// Function to calculate the average distance between the red dot and all blue dots
function calculateAverageDistance() {
    if (!clickDot || blueDots.length === 0) return 0; // If there's no red dot or no blue dots, return 0

    let totalDistance = 0;

    // Loop through each blue dot and calculate the distance to the red dot
    blueDots.forEach(dot => {
        const dx = clickDot.x - dot.x;
        const dy = clickDot.y - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        totalDistance += distance;
    });

    // Calculate the average distance
    const averageDistance = totalDistance / blueDots.length;
    return averageDistance;
}

// Start by resizing the canvas and creating the first blue dot
resizeCanvas();
addBlueDot();
moveDots();

// Redraw everything after resizing
window.addEventListener('resize', resizeCanvas);


// Click event to confirm the red dot position
canvas.addEventListener('click', function (event) {
    // Only allow moving the red dot if the blue dots have stopped
    if (blueDots.some(dot => !dot.isStopped)) return;

    const x = event.offsetX;
    const y = event.offsetY;

    // If there's no red dot, create one at the clicked position
    if (!clickDot) {
        clickDot = { x, y };
        // Log the position of red dot
        console.log('🔴Red dot positions:');
        console.log(`x: ${x}, y: ${y}`);
        console.log('--------------------');
    } else {
        clickDot.x = x;
        clickDot.y = y;
        // Log the position of red dot
        console.log('🔴Red dot positions:');
        console.log(`x: ${x}, y: ${y}`);
        console.log('--------------------');
    }

    redrawDot(); // Redraw everything

    // After clicking, add a new blue dot and start moving it
    addBlueDot(); // Add new blue dot

    // Calculate the average distance and update the distance in the DOM
    const averageDistance = calculateAverageDistance();
    document.getElementById('distance').textContent = averageDistance.toFixed(2);
});
