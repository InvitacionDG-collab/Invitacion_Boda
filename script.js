
/* =========================================
   1. ELEMENTOS
========================================= */

const envelope = document.getElementById("envelope");

const invitation = document.getElementById("invitation");

const scene = document.getElementById("scene");

const seal = document.getElementById("seal");


/* =========================================
   2. VARIABLES
========================================= */

let opened = false;

let startY = 0;


/* =========================================
   3. ABRIR INVITACIÓN
========================================= */


function openInvitation() {

    if (opened) return;

    opened = true;

    // 1. Abrir la solapa
    envelope.classList.add("opened");

    // 2. Esperar la animación
    setTimeout(() => {

        // 3. Desvanecer el sobre
        envelope.classList.add("finished");

        // 4. Mostrar la invitación
        invitation.classList.add("show");

        // 5. Habilitar desplazamiento
        document.body.style.overflowY = "auto";

        // 6. Colocar la página al inicio
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });

        // 7. Ocultar completamente la escena
        setTimeout(() => {

            scene.classList.add("finished");

        }, 900);

    }, 1500);

}




/* =========================================
   4. ABRIR CON EL SELLO
========================================= */

seal.addEventListener("click", openInvitation);


/* =========================================
   5. DETECTAR DESLIZAMIENTO
========================================= */

scene.addEventListener("pointerdown", (event) => {

    startY = event.clientY;

});


scene.addEventListener("pointerup", (event) => {

    if (opened) return;

    const endY = event.clientY;

    const distance = startY - endY;

    // Deslizar hacia arriba
    if (distance > 55) {

        openInvitation();

    }

});


/* =========================================
   6. CUENTA REGRESIVA
========================================= */

// Fecha de la boda:
// 24 de mayo de 2027

const weddingDate = new Date(
    "2027-05-24T00:00:00"
).getTime();


function updateCountdown() {

    const now = Date.now();

    const difference = weddingDate - now;

    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;

    }

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


// Actualizar cada segundo

updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================
   7. ESTADO INICIAL
========================================= */

document.body.style.overflowY = "hidden";





/* =========================================
   CARRUSEL IDA Y VUELTA - AUTOBÚS
========================================= */

const busSlides = document.querySelectorAll(".bus-slide");
const busDots = document.querySelectorAll(".bus-dot");

const busPrev = document.getElementById("busPrev");
const busNext = document.getElementById("busNext");

const busCarousel = document.querySelector(".bus-carousel");

let currentBusSlide = 0;


/* CAMBIAR DIAPOSITIVA */

function showBusSlide(index) {

    currentBusSlide = (index + busSlides.length) % busSlides.length;

    busSlides.forEach((slide, i) => {

        slide.classList.toggle(
            "active",
            i === currentBusSlide
        );

        slide.setAttribute(
            "aria-hidden",
            i !== currentBusSlide
        );

    });


    busDots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === currentBusSlide
        );

        dot.setAttribute(
            "aria-pressed",
            i === currentBusSlide
        );

    });

}


/* FLECHA IZQUIERDA */

busPrev.addEventListener("click", () => {

    showBusSlide(currentBusSlide - 1);

});


/* FLECHA DERECHA */

busNext.addEventListener("click", () => {

    showBusSlide(currentBusSlide + 1);

});


/* INDICADORES */

busDots.forEach((dot) => {

    dot.addEventListener("click", () => {

        showBusSlide(Number(dot.dataset.slide));

    });

});


/* DESLIZAMIENTO EN MÓVILES */

let busTouchStart = 0;

busCarousel.addEventListener("touchstart", (event) => {

    busTouchStart = event.changedTouches[0].screenX;

}, { passive: true });


busCarousel.addEventListener("touchend", (event) => {

    const busTouchEnd = event.changedTouches[0].screenX;

    const difference = busTouchStart - busTouchEnd;

    if (Math.abs(difference) > 50) {

        if (difference > 0) {

            showBusSlide(currentBusSlide + 1);

        } else {

            showBusSlide(currentBusSlide - 1);

        }

    }

}, { passive: true });


/* INICIAR EN IDA */

showBusSlide(0);




/* =====================================
   ABRIR Y CERRAR FORMULARIO RSVP
===================================== */

const rsvpModal = document.getElementById("rsvpModal");
const openRsvp = document.getElementById("openRsvp");
const closeRsvp = document.getElementById("closeRsvp");

// Guardar los estilos originales del desplazamiento
const html = document.documentElement;
const body = document.body;

const overflowOriginal = {
    html: html.style.overflow,
    body: body.style.overflow
};

// Guardar posición de la página
let scrollPosition = 0;


// ABRIR FORMULARIO

openRsvp.addEventListener("click", () => {

    scrollPosition = window.scrollY;

    rsvpModal.classList.add("show");
    rsvpModal.setAttribute("aria-hidden", "false");

    // Bloquear desplazamiento de toda la página
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

});


// CERRAR FORMULARIO

function closeRsvpModal() {

    rsvpModal.classList.remove("show");
    rsvpModal.setAttribute("aria-hidden", "true");

    // Recuperar los estilos originales
    html.style.overflow = overflowOriginal.html;
    body.style.overflow = overflowOriginal.body;

    // Recuperar la posición anterior
    window.scrollTo(0, scrollPosition);

}


// BOTÓN X

closeRsvp.addEventListener("click", closeRsvpModal);


// CERRAR AL PULSAR FUERA DEL FORMULARIO

rsvpModal.addEventListener("click", (event) => {

    if (event.target === rsvpModal) {
        closeRsvpModal();
    }

});



function closeRsvpModal() {

    // Cerrar visualmente el formulario
    rsvpModal.classList.remove("show");
    rsvpModal.setAttribute("aria-hidden", "true");

    // Liberar el desplazamiento
    document.documentElement.style.setProperty(
        "overflow-y", "auto", "important"
    );

    document.body.style.setProperty(
        "overflow-y", "auto", "important"
    );

    document.documentElement.style.removeProperty("position");
    document.body.style.removeProperty("position");

    // Recuperar la posición anterior
    window.scrollTo(0, scrollPosition);

}



// GENERAR CAMPOS DE ADULTOS

const adultosSelect = document.getElementById("adultos");

const adultosContainer = document.getElementById("adultosContainer");


function generarAdultos() {

    const cantidad = Number(adultosSelect.value);

    adultosContainer.innerHTML = "";

    for (let i = 1; i <= cantidad; i++) {

        adultosContainer.innerHTML += `
            <div class="adult-row">

                <div>
                    <label>Nombre y apellido / Adulto ${i}</label>

                    <input
                        type="text"
                        name="adulto_${i}"
                        placeholder="Nombre completo"
                        required
                    >
                </div>

                <div>
                    <label>Alergias / Intolerancias</label>

                    <input
                        type="text"
                        name="alergias_${i}"
                        placeholder="(Rellenar solo si procede)"
                    >
                </div>

            </div>
        `;
    }
}

adultosSelect.addEventListener("change", generarAdultos);

generarAdultos();


// FORMULARIO

document.getElementById("rsvpForm").addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        alert("¡Gracias por confirmar tu asistencia!");

        closeRsvpModal();

    }
);







/* =====================================
   SLIDER DE FOTOGRAFÍAS
===================================== */

const sliderImagenes = document.querySelectorAll(".slider-imagen");

const sliderPuntos = document.querySelectorAll(".slider-punto");

const sliderAnterior = document.getElementById("sliderAnterior");

const sliderSiguiente = document.getElementById("sliderSiguiente");

let imagenActual = 0;


// MOSTRAR FOTOGRAFÍA

function mostrarImagen(indice) {

    sliderImagenes.forEach((imagen, i) => {

        imagen.classList.remove("activa");
        sliderPuntos[i].classList.remove("activo");

    });

    imagenActual = (indice + sliderImagenes.length) %
                   sliderImagenes.length;

    sliderImagenes[imagenActual].classList.add("activa");

    sliderPuntos[imagenActual].classList.add("activo");

}


// FOTOGRAFÍA ANTERIOR

sliderAnterior.addEventListener("click", () => {

    mostrarImagen(imagenActual - 1);

});


// FOTOGRAFÍA SIGUIENTE

sliderSiguiente.addEventListener("click", () => {

    mostrarImagen(imagenActual + 1);

});


// INDICADORES

sliderPuntos.forEach((punto, indice) => {

    punto.addEventListener("click", () => {

        mostrarImagen(indice);

    });

});




const popupFinal = document.getElementById("popupFinal");
const cerrarPopup = document.getElementById("cerrarPopup");
const cronometro = document.querySelector(".countdown-section");

let popupMostrado = false;

if (popupFinal && cronometro) {
    window.addEventListener("scroll", () => {
        const posicion = cronometro.getBoundingClientRect();

        if (!popupMostrado && posicion.top < window.innerHeight * 0.7) {
            popupFinal.classList.add("mostrar");
            popupMostrado = true;
        }
    });
}

cerrarPopup.addEventListener("click", () => {
    popupFinal.classList.remove("mostrar");
});
