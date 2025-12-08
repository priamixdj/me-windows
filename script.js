// Selettori finestre
const windows = document.querySelectorAll('.window');
let maxZIndex = 2;

// inizializzazione finestre
windows.forEach(windowEl => {

    // Pulsante close
    const exit = windowEl.querySelector('.close-btn');
    exit.addEventListener('click', () => toggleWindow(windowEl));

    // Drag
    dragElement(windowEl);

    // Focus quando clicchi
    windowEl.addEventListener('mousedown', setFocus);
});


// ----------------------------
// gestione focus e z-index
// ----------------------------
function setFocus() {
    const currentWindow = this;

    windows.forEach(w => {
        w.classList.remove('active');
    });

    maxZIndex++;
    currentWindow.style.zIndex = maxZIndex;
    currentWindow.classList.add('active');
}


// ----------------------------
// drag delle finestre
// ----------------------------
function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = elmnt.querySelector(".window-header");

    if (header) header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();

        // porta in primo piano durante il drag
        elmnt.dispatchEvent(new Event('mousedown'));

        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


// ----------------------------
// trigger dalla barra
// ----------------------------
const triggers = document.querySelectorAll('.trigger_window');

triggers.forEach(trigger => {
    trigger.addEventListener('click', function () {

        const targetSelector = this.dataset.target;  // es: "#window1"
        const targetDiv = document.querySelector(targetSelector);

        targetDiv.classList.toggle('active');
        targetDiv.classList.remove('close');

        targetDiv.style.zIndex = maxZIndex;

        dragElement(targetDiv);
    });
});


// ----------------------------
// funzione Close
// ----------------------------
function toggleWindow(w) {
    w.classList.remove('active');
    w.classList.add('close');
}
