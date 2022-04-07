const DEFAULT_SIZE = 16;




function initiateGrid (size) {
    const gridContainer = document.getElementById('gridContainer')
    const pixel = document.createElement('div')
    

    for (let i = 0; i < size ** 2; i++) {
        pixel.classList.add("pixel")
        gridContainer.appendChild(pixel);
    }
}


window.onLoad = () => {
    initiateGrid(DEFAULT_SIZE)
}