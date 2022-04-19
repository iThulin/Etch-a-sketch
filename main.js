const DEFAULT_SIZE = 20;
const DEFAULT_COLOR = '#000000';
const DEFAULT_BACKGROUND = '#CECFD1';

var gridContainer = document.getElementById('gridContainer')
let selectedColor = DEFAULT_COLOR;
let backgroundColor = DEFAULT_BACKGROUND;
let tempSelectedColor = '';

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

//Toggle eraser
const toggleEraserButton = document.querySelector('#toggleEraser');
toggleEraserButton.addEventListener('click', function () {
    var toggleState = toggleEraserButton.className;
    switch (toggleState) {
        case 'button':
            //eraser is on
            toggleEraserButton.classList.add('toggled');
            return selectedColor = backgroundColor;
        case 'button toggled':
            //eraser is off
            toggleEraserButton.classList.remove('toggled');
            return selectedColor = DEFAULT_COLOR;
    };
});

//Toggle Rainbow Mode
const toggleRainbowButton = document.querySelector('#toggleRainbow');
toggleRainbowButton.addEventListener('click', function () {
    var toggleState = toggleRainbowButton.className;
    
    switch (toggleState) {
        case 'button':
            //rainbow mode is on
            toggleRainbowButton.classList.add('toggled');
            setTempColor();
            return selectedColor = 'RAINBOW';
        case 'button toggled':
            //rainbow mode is on
            toggleRainbowButton.classList.remove('toggled');
            return selectedColor = tempSelectedColor;
    };
});

//Pen color input
const penColorInput = document.querySelector('#penColor')
penColorInput.value = DEFAULT_COLOR;
penColorInput.addEventListener('input', function () {
    selectedColor = penColorInput.value;
});

//Background color input
const backgroundColorInput = document.querySelector('#backgroundColor')
backgroundColorInput.value = DEFAULT_BACKGROUND;
backgroundColorInput.addEventListener('input', function () {
    backgroundColor = backgroundColorInput.value;
});

//Color swatches
const colorSwatch = document.querySelectorAll('.swatch');
document.querySelector('#defaultPen').style.backgroundColor.value = selectedColor;
colorSwatch.forEach(colorSwatch => 
    colorSwatch.addEventListener('click', function () {
        this.style.backgroundColor = selectedColor;
    }));
colorSwatch.forEach(colorSwatch => 
    colorSwatch.addEventListener('auxclick', function (e) {
        // if button clicked is the middle mouse button
        if (e.button == 1) {
            console.log('middle click')
            let backgroundRGB = this.style.backgroundColor;
            penColorInput.value = convertToHex(backgroundRGB);
            return selectedColor = convertToHex(backgroundRGB);
    }}));

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
        allPixels.style.backgroundColor = backgroundColor);
};

function removePixels() {
    while(gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild)
    };
};

function colorPixel() {
    let pixelColor = selectedColor;

    if (selectedColor == 'RAINBOW') {
        let r = generateRandomRGB(0, 255);
        let g = generateRandomRGB(0, 255);
        let b = generateRandomRGB(0, 255);

        let rgb = convertToHex(r + ", " + g + ", " + b);
        
        this.style.backgroundColor = `${rgb}`
    }
    else this.style.backgroundColor = `${pixelColor}`;
};

function convertToHex(rgbComb) {
    // pass a variable in the form rgb(###, ###, ###), strip off rgb(), 
    //convert the three integers to hexadecimal and return in the form '#rrggbb'
        let cleanedRGB = rgbComb.replace('rgb(', '')
        cleanedRGB = cleanedRGB.replace(')', '')
    
        let rgbArray = cleanedRGB.split(', ')
        
        let r = parseInt(rgbArray[0]).toString(16);
        let g = parseInt(rgbArray[1]).toString(16);
        let b = parseInt(rgbArray[2]).toString(16);
    
        if(r.length == 1) {r = "0" + r};
        if(g.length == 1) {g = "0" + g};
        if(b.length == 1) {b = "0" + b};
    
        return "#" + r + g + b;
    };

function generateRandomRGB(min, max) {
    //min & max are both inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

    function setTempColor() {
        if (selectedColor != 'RAINBOW') {
            return tempSelectedColor = selectedColor;
        }
    }
    
window.onload = () => {
    initiateGrid(DEFAULT_SIZE)
};