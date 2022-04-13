const DEFAULT_SIZE = 20;

var gridContainer = document.getElementById('gridContainer')

//Clear
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearGrid);

//New Grid
const newGridButton = document.querySelector("#newGrid");
newGridButton.addEventListener('click', newGrid);

//Size slider and label
let sizeSelector = document.querySelector("#gridNumber");
sizeSelector.value = 20;
let sizeLabel = document.querySelector("#gridSize")
sizeLabel.textContent = sizeSelector.value;
sizeSelector.addEventListener('mousemove', function() {
    sizeLabel.textContent = sizeSelector.value;
})

// Functions
function initiateGrid(size) {
    /* Create a grid to hold the pixels. Width and Height are dictated by the 
    size passed into the function*/

    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`


    /* determine pixel size based on the grid container's interior area*/
    let pixelHeight = gridContainer.offsetHeight / size;
    let pixelWidth = gridContainer.offsetWidth / size;

    /* create a div with the pixel class for each pixel on the drawing board*/
    for (let i = 0; i < size ** 2; i++) {
        var pixel = document.createElement('div');
        pixel.classList.add("pixel");
        pixel.setAttribute('id', 'pixel');
        pixel.style.height = `${pixelHeight}px`;
        pixel.style.width = `${pixelWidth}px`;
        gridContainer.appendChild(pixel);
    }

    let pixelsInGrid = gridContainer.querySelectorAll('div');
    pixelsInGrid.forEach(pixelInGrid => pixelInGrid.addEventListener('mouseover', colorPixel));
}

function newGrid() {
    removePixels();
    let gridSize = sizeSelector.value;
    initiateGrid(gridSize);
    console.log("New Grid button pressed")
}

function clearGrid() {
    let allPixels = gridContainer.querySelectorAll('div');
    allPixels.forEach(allPixels => allPixels.style.backgroundColor = '#CECFD1');
}

function removePixels() {
    while(gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild)
    }
}

function colorPixel(color) {
    switch(color) {
        case 'reset': 
            this.style.backgroundColor = '#CECFD1';
        default:
            this.style.backgroundColor = '#0B2027';
    }  
}

window.onload = () => {
    initiateGrid(DEFAULT_SIZE)
}