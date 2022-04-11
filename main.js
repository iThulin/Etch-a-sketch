const DEFAULT_SIZE = 16;




function initiateGrid (size) {
    var gridContainer = document.getElementById('gridContainer')

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
        pixel.style.height = `${pixelHeight}px`;
        pixel.style.width = `${pixelWidth}px`;
        gridContainer.appendChild(pixel);
    }
}


window.onload = () => {
    initiateGrid(DEFAULT_SIZE)
}