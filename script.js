// Selettori finestre
const windows = document.querySelectorAll('.window');
let maxZIndex = 2;

// inizializzazione finestre
windows.forEach(windowEl => {

    // Pulsante close
    const exit = windowEl.querySelector('.close-btn');
    exit.addEventListener('click', () => closeWindow(windowEl));

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

        if (targetDiv.classList.contains('active')) {
            closeWindow(targetDiv);
        } else {
            targetDiv.classList.toggle('active');
            targetDiv.classList.remove('close');

            targetDiv.style.zIndex = maxZIndex;
        }

       

        dragElement(targetDiv);
    });
});


// ----------------------------
// funzione Close
// ----------------------------
function closeWindow(w) {
    w.classList.remove('active');
    w.classList.add('close');
}





/*---------
    MAIL
------------*/
const form = document.querySelector('#contattami');
const mail = form.querySelector('#mail');
const subject = form.querySelector('#subject');
const nameField = form.querySelector('#name');
const message = form.querySelector('#message');

let name_validation = false;
let mail_validation = false;
let subject_validation = false
let message_validation = false;

// Funzione che controlla se deve comparire il bottone
function checkValidation() {
    if (mail_validation && name_validation && subject_validation && message_validation) {

        // Evitiamo di creare 100 bottoni se l'utente continua a scrivere
        if (!form.querySelector('.submit-btn')) {
            const btn = document.createElement('button');
            btn.classList.add('submit-btn');
            btn.type = "button";
            btn.textContent = "Invia";
            btn.onclick = function () {
                window.location.href =
                    `mailto:mix.pria@gmail.com?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(message.value)}`;
            };
            form.appendChild(btn);
        }

    } else {
        // Se non è valido, rimuoviamo il bottone se esiste
        const existing = form.querySelector('.submit-btn');
        if (existing) existing.remove();
    }
}

// Validazioni
mail.addEventListener('input', () => {
    mail_validation = mail.value.includes('@') && mail.value.includes('.');
    checkValidation();
});

nameField.addEventListener('input', () => {
    name_validation = nameField.value.length > 2;
    checkValidation();
});

subject.addEventListener('input', () => {
    subject_validation = subject.value.length > 2;
    checkValidation();
});

message.addEventListener('input', () => {
    message_validation = message.value.length > 2;
    checkValidation();
});
