const DEFAULT_SIZE = 20;
const DEFAULT_COLOR = '#000000';
const BACKGROUND_COLOR = '#CECFD1';

var gridContainer = document.getElementById('gridContainer')
let selectedColor = DEFAULT_COLOR;

//Size slider and label
let sizeSelector = document.querySelector('#gridNumber');
sizeSelector.value = 20;
let sizeLabel = document.querySelector('#gridSize')
sizeLabel.textContent = `Pixels per row: ${sizeSelector.value}`;
sizeSelector.addEventListener('mousemove', function() {
    sizeLabel.textContent = `Pixels per row: ${sizeSelector.value}`;
});

//New Grid
const newGridButton = document.querySelector('#newGrid');
newGridButton.addEventListener('click', newGrid);

//Clear
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearGrid);

//Toggle grid
const toggleGridButton = document.querySelector('#toggleGrid');
toggleGridButton.addEventListener('click', function () {
    var toggleState = toggleGridButton.className;
    let allPixels = gridContainer.querySelectorAll('div');

    switch (toggleState) {
        case 'button':
            toggleGridButton.classList.add('toggled');
            allPixels.forEach(allPixels => 
                allPixels.style.outline = '1px solid #666666');
            break;
        case 'button toggled':
            toggleGridButton.classList.remove('toggled');
            allPixels.forEach(allPixels => 
                allPixels.style.outline = '1px solid transparent');
            break;
    };
});

//Toggle eraser
const toggleEraserButton = document.querySelector('#toggleEraser');
toggleEraserButton.addEventListener('click', function () {
    var toggleState = toggleEraserButton.className;
    switch (toggleState) {
        case 'button':
            //eraser is on
            toggleEraserButton.classList.add('toggled');
            return selectedColor = BACKGROUND_COLOR;
        case 'button toggled':
            //eraser is off
            toggleEraserButton.classList.remove('toggled');
            return selectedColor = DEFAULT_COLOR;
    };
});

//Toggle click to draw
const toggleClickToDraw = document.querySelector('#toggleClick');
toggleClickToDraw.addEventListener('click', function () {
    var toggleState = toggleClickToDraw.className;
    switch (toggleState) {
        case 'button':
            //click to draw is turned on
            toggleClickToDraw.classList.add('toggled');
            createPixelEvents('click');
            break;
        case 'button toggled':
            //click to draw is turned off
            toggleClickToDraw.classList.remove('toggled');
            createPixelEvents('mouse');
            break;
    };
});

// Functions
function initiateGrid(size) {
    /* Create a grid to hold the pixels. Width and Height are dictated by the 
    size passed into the function*/

    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`

    let pixelHeight = gridContainer.offsetHeight / size;
    let pixelWidth = gridContainer.offsetWidth / size;

    // Create a div with the pixel class for each pixel on the drawing board
    for (let i = 0; i < size ** 2; i++) {
        var pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.setAttribute('id', 'pixel');
        pixel.setAttribute('draggable', false);
        pixel.style.height = `${pixelHeight}px`;
        pixel.style.width = `${pixelWidth}px`;
        if (document.querySelector('#toggleGrid').className == 'button toggled') {
            pixel.style.outline = '1px solid #666666'
        };
        gridContainer.appendChild(pixel);
    };
    if (document.querySelector('#toggleClick').className == 'button toggled') {
        createPixelEvents('click');
    }
    else {
        createPixelEvents('mouse');
    };
};

function createPixelEvents(eventInitiator) {
    let pixelsInGrid = gridContainer.querySelectorAll('div');
    
    pixelsInGrid.forEach(pixelInGrid => 
        pixelInGrid.removeEventListener('mouseover', colorPixel));
    switch (eventInitiator) {
        case 'click':
            pixelsInGrid.forEach(pixelInGrid => 
                pixelInGrid.addEventListener('mousedown', colorPixel));
            break;
        case 'mouse':
            pixelsInGrid.forEach(pixelInGrid => 
                pixelInGrid.addEventListener('mouseover', colorPixel));
            break;
    };
};

function newGrid() {
    removePixels();
    let gridSize = sizeSelector.value;
    initiateGrid(gridSize);
};

function clearGrid() {
    let allPixels = gridContainer.querySelectorAll('div');
    allPixels.forEach(allPixels => 
        allPixels.style.backgroundColor = DEFAULT_COLOR);
};

function removePixels() {
    while(gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild)
    };
};

function colorPixel() {
    let pixelColor = selectedColor;
    this.style.backgroundColor = `${pixelColor}`;
};

window.onload = () => {
    initiateGrid(DEFAULT_SIZE)
};