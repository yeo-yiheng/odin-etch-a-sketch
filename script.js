const playGrid = document.querySelector(".playGrid");
const width = playGrid.offsetWidth;
const height = playGrid.offsetHeight;
const colorWheel = document.querySelector(".colorWheel");
const clearButton = document.querySelector(".clearButton");
console.log(`width: ${width}\nheight: ${height}`);

let resolution = 16; // Allow user to pick in the future
let isMouseDown = false;
let colorMode = 0; // 0 for black, 1 for rainbow, 2 for custom

function draw() {
    playGrid.textContent = "";
    const dimension = height / resolution;
    console.log(`dimension: ${dimension}\nresolution:${resolution}`);
    for (let i = 0; i < resolution; i++) {
        const rowGrid = document.createElement("div");
        rowGrid.setAttribute("style", "display:flex;")
        for (let k = 0; k < resolution; k++) {
            const singleGrid = document.createElement("div");
            singleGrid.setAttribute("style", `width:${dimension}px; height:${dimension}px;`);
            singleGrid.classList.add("singleGrid");
            singleGrid.addEventListener("mousedown", e => {
                assignColor(e);
                console.log("here with colormode " + colorMode);
                isMouseDown = true;
            });
            singleGrid.addEventListener("mouseup", () => {
                isMouseDown = false;
            });
            singleGrid.addEventListener("mouseover", e => {
                if (isMouseDown) {
                   assignColor(e);
                }
            });
            rowGrid.append(singleGrid);
        }
        playGrid.append(rowGrid);
    }
}

const resizeButton = document.querySelector(".resizer");
resizeButton.addEventListener("submit", e => {
    e.preventDefault();
    let formData = new FormData(resizeButton);
    let input = formData.get("Value");
    if (input == "") {
        input = 16;
    } else if (input > 100) {
        input = 100;
    }
    resolution = input;
    console.log(`input: ${input}`);
    draw();
});

document.querySelectorAll(".radioOption").forEach(option => {
    option.addEventListener("change", () => {
        const colorValue = document.querySelector("input[name='color']:checked").value;
        colorMode = colorValue;
        if (colorMode == 2) {
            colorWheel.style.visibility = 'visible';
        } else {
            colorWheel.style.visibility = 'hidden';
        }
        console.log(`color value: ${colorValue}`);
    });
});

function assignColor(event) {
    if (colorMode == 0) {
        event.target.style.backgroundColor = 'black';
    } else if (colorMode == 1) {
        const randColor = () =>  {
            return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
        }
        event.target.style.backgroundColor = randColor();
    } else if (colorMode == 2) {
        event.target.style.backgroundColor = colorWheel.value;
    }
}

clearButton.addEventListener("click", () => { 
    document.querySelectorAll(".singleGrid").forEach(grid => {
        grid.style.backgroundColor = "white";
    })
});

draw();
