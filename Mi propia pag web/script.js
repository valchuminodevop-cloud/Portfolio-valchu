/* ============================================================
   🌻 PORTFOLIO VALCHU
   JavaScript principal
   Jardín vivo + interacción + UX + Cyber Lab
   ============================================================ */


/* ============================================================
   1. HELPERS
   ============================================================ */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* ============================================================
   2. ELEMENTOS PRINCIPALES
   ============================================================ */

const body = document.body;
const ambiente = $("#ambiente");

const sol = $("#sol");
const rayos = $("#rayos");
const luna = $("#luna");
const estrellasOriginales = $("#estrellas");
const mariposasOriginales = $("#mariposas");
const hojasOriginales = $("#hojas");
const nieblaOriginal = $("#niebla");
const luciernagasOriginales = $("#luciernagas");

const modoCampo = $("#modoCampo");
const modoLocura = $("#modoLocura");

const idiomaBtn = $("#idiomaBtn");

const modoPresentacion = $("#modoPresentacion");
const modoAccesible = $("#modoAccesible");

const abrirBuscador = $("#abrirBuscador");
const buscador = $("#buscador");
const cerrarBuscador = $("#cerrarBuscador");
const campoBusqueda = $("#campoBusqueda");
const resultadosBusqueda = $("#resultadosBusqueda");

const barraLectura = $("#barraLectura");

const toast = $("#toast");
const easterEgg = $("#easterEgg");


/* ============================================================
   3. ESTADO GLOBAL
   ============================================================ */

let momento =
    localStorage.getItem("portfolioMomento") || "jardin";

let jardinLoco = false;

let accesible =
    localStorage.getItem("portfolioAccesible") === "true";

let idioma =
    localStorage.getItem("portfolioIdioma") || "es";

let presentacion = false;

let toastTimer = null;

let mouseX = 0;
let mouseY = 0;

let suavizadoX = 0;
let suavizadoY = 0;

let scrollActual = 0;


/* ============================================================
   4. CSS DINÁMICO
   ============================================================

   Esta parte es importante.

   En lugar de depender de que cada animación esté escrita
   manualmente en style.css, JavaScript agrega una capa
   adicional de CSS para crear el jardín vivo.
   ============================================================ */

const estiloDinamico = document.createElement("style");

estiloDinamico.id = "jardinDinamicoCSS";

estiloDinamico.textContent = `

/* ------------------------------------------------------------
   CAPA DINÁMICA
------------------------------------------------------------ */

#ambiente .vidaDinamica {
    position:absolute;
    inset:0;
    pointer-events:none;
    overflow:hidden;
}


/* ------------------------------------------------------------
   NUBES
------------------------------------------------------------ */

.nubeViva {
    position:absolute;
    left:-30vw;
    width:180px;
    height:55px;
    border-radius:999px;
    background:
        radial-gradient(
            circle at 30% 60%,
            rgba(255,255,255,.95) 0 28%,
            transparent 29%
        ),
        radial-gradient(
            circle at 48% 40%,
            rgba(255,255,255,.92) 0 34%,
            transparent 35%
        ),
        radial-gradient(
            circle at 68% 60%,
            rgba(255,255,255,.88) 0 30%,
            transparent 31%
        );
    filter:blur(1px);
    opacity:.65;
    animation:nubesCruzan linear infinite;
    will-change:transform;
}

@keyframes nubesCruzan {

    0% {
        transform:translateX(-25vw);
    }

    100% {
        transform:translateX(145vw);
    }

}


/* ------------------------------------------------------------
   NUBES GRANDES
------------------------------------------------------------ */

.nubeViva.grande {
    width:300px;
    height:85px;
    opacity:.42;
    filter:blur(2px);
}


/* ------------------------------------------------------------
   NIEBLA
------------------------------------------------------------ */

.bancoNiebla {
    position:absolute;
    left:-35vw;
    width:170vw;
    height:90px;
    border-radius:50%;
    background:
        radial-gradient(
            ellipse,
            rgba(255,255,255,.38),
            rgba(255,255,255,.08) 45%,
            transparent 72%
        );
    filter:blur(18px);
    animation:nieblaViajera linear infinite;
    opacity:.55;
}

@keyframes nieblaViajera {

    0% {
        transform:translateX(-15vw) scaleX(1);
    }

    50% {
        transform:translateX(15vw) scaleX(1.08);
    }

    100% {
        transform:translateX(45vw) scaleX(1);
    }

}


/* ------------------------------------------------------------
   MARIPOSAS INDIVIDUALES
------------------------------------------------------------ */

.mariposaViva {
    position:absolute;
    left:-80px;
    font-size:var(--tamano);
    filter:
        drop-shadow(0 0 5px rgba(255,255,255,.7))
        drop-shadow(0 0 12px rgba(255,216,77,.35));
    animation:
        mariposaViaje var(--duracion) linear infinite,
        mariposaAleteo .65s ease-in-out infinite alternate;
    animation-delay:var(--delay);
    will-change:transform;
}

@keyframes mariposaViaje {

    0% {
        transform:
            translate3d(-10vw,0,0)
            rotate(-8deg);
    }

    20% {
        transform:
            translate3d(20vw,-70px,0)
            rotate(10deg);
    }

    40% {
        transform:
            translate3d(45vw,40px,0)
            rotate(-7deg);
    }

    60% {
        transform:
            translate3d(70vw,-100px,0)
            rotate(8deg);
    }

    80% {
        transform:
            translate3d(95vw,50px,0)
            rotate(-8deg);
    }

    100% {
        transform:
            translate3d(125vw,-40px,0)
            rotate(5deg);
    }

}

@keyframes mariposaAleteo {

    from {
        scale:1 .78;
    }

    to {
        scale:1 1;
    }

}


/* ------------------------------------------------------------
   HOJAS
------------------------------------------------------------ */

.hojaViva {
    position:absolute;
    top:-80px;
    left:var(--inicio);
    font-size:var(--tamano);
    opacity:.8;
    animation:
        hojaCaida var(--duracion) linear infinite,
        hojaGiro 2.5s ease-in-out infinite alternate;
    animation-delay:var(--delay);
    will-change:transform;
}

@keyframes hojaCaida {

    0% {
        transform:
            translate3d(0,-100px,0)
            rotate(0deg);
    }

    25% {
        transform:
            translate3d(100px,25vh,0)
            rotate(120deg);
    }

    50% {
        transform:
            translate3d(-80px,50vh,0)
            rotate(240deg);
    }

    75% {
        transform:
            translate3d(120px,75vh,0)
            rotate(330deg);
    }

    100% {
        transform:
            translate3d(-40px,120vh,0)
            rotate(480deg);
    }

}

@keyframes hojaGiro {

    from {
        scale:1;
    }

    to {
        scale:.8 1.15;
    }

}


/* ------------------------------------------------------------
   POLEN / PARTÍCULAS
------------------------------------------------------------ */

.particulaViva {
    position:absolute;
    width:var(--tamano);
    height:var(--tamano);
    border-radius:50%;
    background:rgba(255,240,155,.9);
    box-shadow:
        0 0 5px rgba(255,255,255,.8),
        0 0 14px rgba(255,216,77,.6);
    animation:
        particulaFlota var(--duracion) ease-in-out infinite;
    animation-delay:var(--delay);
}

@keyframes particulaFlota {

    0% {
        transform:
            translate3d(0,110vh,0);
        opacity:0;
    }

    15% {
        opacity:.8;
    }

    50% {
        transform:
            translate3d(
                var(--movimiento),
                45vh,
                0
            );
    }

    85% {
        opacity:.7;
    }

    100% {
        transform:
            translate3d(
                calc(var(--movimiento) * -1),
                -20vh,
                0
            );
        opacity:0;
    }

}


/* ------------------------------------------------------------
   LUCIÉRNAGAS
------------------------------------------------------------ */

.luciernagaViva {
    position:absolute;
    width:5px;
    height:5px;
    border-radius:50%;
    background:#fff5a3;
    box-shadow:
        0 0 5px #fff,
        0 0 12px #ffe66d,
        0 0 25px rgba(255,216,77,.8);
    animation:
        luciernagaVuela var(--duracion) ease-in-out infinite,
        luciernagaBrilla 1.5s ease-in-out infinite alternate;
    animation-delay:var(--delay);
}

@keyframes luciernagaVuela {

    0% {
        transform:translate(0,0);
    }

    25% {
        transform:translate(80px,-40px);
    }

    50% {
        transform:translate(-50px,-100px);
    }

    75% {
        transform:translate(100px,-140px);
    }

    100% {
        transform:translate(0,-200px);
    }

}

@keyframes luciernagaBrilla {

    from {
        opacity:.25;
        scale:.7;
    }

    to {
        opacity:1;
        scale:1.6;
    }

}


/* ------------------------------------------------------------
   ESTRELLAS
------------------------------------------------------------ */

.estrellaViva {
    position:absolute;
    color:white;
    text-shadow:
        0 0 5px white,
        0 0 12px #fff;
    animation:
        estrellaParpadea var(--duracion) ease-in-out infinite alternate;
    animation-delay:var(--delay);
}

@keyframes estrellaParpadea {

    from {
        opacity:.15;
        transform:scale(.7);
    }

    to {
        opacity:1;
        transform:scale(1.35);
    }

}


/* ------------------------------------------------------------
   ONDAS AL HACER CLICK
------------------------------------------------------------ */

.ondaClick {
    position:fixed;
    width:20px;
    height:20px;
    border:2px solid rgba(255,216,77,.9);
    border-radius:50%;
    pointer-events:none;
    z-index:9999;
    animation:ondaExpande .8s ease-out forwards;
}

@keyframes ondaExpande {

    from {
        transform:translate(-50%,-50%) scale(.3);
        opacity:1;
    }

    to {
        transform:translate(-50%,-50%) scale(8);
        opacity:0;
    }

}


/* ------------------------------------------------------------
   BRILLO DEL CURSOR
------------------------------------------------------------ */

.brilloCursor {
    position:fixed;
    width:120px;
    height:120px;
    border-radius:50%;
    pointer-events:none;
    z-index:1;
    background:
        radial-gradient(
            circle,
            rgba(255,230,109,.13),
            transparent 70%
        );
    transform:translate(-50%,-50%);
    transition:
        width .3s ease,
        height .3s ease;
}


/* ------------------------------------------------------------
   MODO JARDÍN LOCO
------------------------------------------------------------ */

body.jardinLoco .mariposaViva {
    animation-duration:
        calc(var(--duracion) * .45),
        .28s;
}

body.jardinLoco .hojaViva {
    animation-duration:
        calc(var(--duracion) * .55),
        1s;
}

body.jardinLoco .nubeViva {
    animation-duration:18s;
}

body.jardinLoco .particulaViva {
    animation-duration:
        calc(var(--duracion) * .5);
}

body.jardinLoco section {
    animation:
        seccionLoca 3s ease-in-out infinite alternate;
}

@keyframes seccionLoca {

    from {
        filter:
            drop-shadow(
                0 0 0 rgba(255,216,77,0)
            );
    }

    to {
        filter:
            drop-shadow(
                0 0 20px rgba(255,216,77,.18)
            );
    }

}


/* ------------------------------------------------------------
   PRESENTACIÓN
------------------------------------------------------------ */

body.presentacion #herramientas,
body.presentacion #idiomaBtn {
    opacity:.15;
    transition:.4s;
}

body.presentacion header {
    min-height:80vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
}

body.presentacion main {
    max-width:1250px;
}

body.presentacion section {
    min-height:65vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
}


/* ------------------------------------------------------------
   ACCESIBILIDAD
------------------------------------------------------------ */

body.accesible {
    font-size:1.08rem;
}

body.accesible *,
body.accesible *::before,
body.accesible *::after {
    animation-duration:.01ms !important;
    animation-iteration-count:1 !important;
    transition-duration:.01ms !important;
}

body.accesible button:focus,
body.accesible a:focus,
body.accesible summary:focus,
body.accesible input:focus {
    outline:4px solid #000;
    outline-offset:5px;
}


/* ------------------------------------------------------------
   RESULTADOS DE BÚSQUEDA
------------------------------------------------------------ */

.resultadoBusqueda {
    display:block;
    width:100%;
    text-align:left;
    background:rgba(255,255,255,.65);
    margin:8px 0;
}


/* ------------------------------------------------------------
   RESULTADO LABORATORIO
------------------------------------------------------------ */

.resultadoActivo {
    animation:
        resultadoAparece .5s ease;
}

@keyframes resultadoAparece {

    from {
        opacity:0;
        transform:translateY(10px);
    }

    to {
        opacity:1;
        transform:translateY(0);
    }

}


/* ------------------------------------------------------------
   CYBER MODE
------------------------------------------------------------ */

body.cyber {
    --verde:#00ff9c;
    --verde-claro:#00e5ff;
    --amarillo:#00ff9c;
    --naranja:#00d9ff;

    background:
        radial-gradient(
            circle at 50% 0%,
            rgba(0,255,160,.15),
            transparent 35%
        ),
        #020b09;
    color:#caffed;
}

body.cyber section,
body.cyber header {
    background:
        linear-gradient(
            135deg,
            rgba(0,255,160,.08),
            rgba(0,100,100,.12)
        );
    border-color:rgba(0,255,160,.25);
}

body.cyber .nubeViva {
    opacity:.08;
}

body.cyber .particulaViva {
    background:#00ff9c;
    box-shadow:
        0 0 8px #00ff9c,
        0 0 20px #00ff9c;
}

body.cyber .mariposaViva {
    filter:
        grayscale(1)
        sepia(1)
        hue-rotate(90deg)
        drop-shadow(0 0 10px #00ff9c);
}


/* ------------------------------------------------------------
   RESPONSIVE
------------------------------------------------------------ */

@media (max-width:700px) {

    .jardinElementos {
        grid-template-columns:
            repeat(2,1fr);
    }

    #herramientas {
        right:8px;
        top:8px;
    }

    #herramientas button {
        width:40px;
        height:40px;
    }

    .nubeViva {
        transform:scale(.7);
    }

    .mariposaViva {
        font-size:22px;
    }

}


/* ------------------------------------------------------------
   REDUCIR MOVIMIENTO
------------------------------------------------------------ */

@media (prefers-reduced-motion:reduce) {

    *,
    *::before,
    *::after {
        animation-duration:.01ms !important;
        animation-iteration-count:1 !important;
        scroll-behavior:auto !important;
        transition-duration:.01ms !important;
    }

}

`;

document.head.appendChild(estiloDinamico);


/* ============================================================
   5. CREAR CAPAS DINÁMICAS
   ============================================================ */

function crearCapa(nombre) {

    const capa =
        document.createElement("div");

    capa.className =
        `vidaDinamica ${nombre}`;

    capa.setAttribute(
        "aria-hidden",
        "true"
    );

    ambiente.appendChild(capa);

    return capa;
}


const capaNubes =
    crearCapa("capaNubes");

const capaNiebla =
    crearCapa("capaNiebla");

const capaMariposas =
    crearCapa("capaMariposas");

const capaHojas =
    crearCapa("capaHojas");

const capaParticulas =
    crearCapa("capaParticulas");

const capaLuciernagas =
    crearCapa("capaLuciernagas");

const capaEstrellas =
    crearCapa("capaEstrellas");


/* ============================================================
   6. GENERADOR DE NÚMEROS ALEATORIOS
   ============================================================ */

function random(min, max) {

    return Math.random() *
        (max - min) +
        min;

}


/* ============================================================
   7. CREAR NUBES
   ============================================================ */

function crearNubes() {

    const cantidad =
        window.innerWidth < 700
            ? 5
            : 9;


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const nube =
            document.createElement("div");

        nube.className =
            "nubeViva";


        if (Math.random() > .65) {

            nube.classList.add(
                "grande"
            );

        }


        nube.style.top =
            `${random(5,48)}%`;


        nube.style.animationDuration =
            `${random(35,75)}s`;


        nube.style.animationDelay =
            `${random(-70,0)}s`;


        nube.style.opacity =
            random(.25,.7);


        capaNubes.appendChild(
            nube
        );

    }

}


/* ============================================================
   8. CREAR BANCOS DE NIEBLA
   ============================================================ */

function crearNiebla() {

    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const banco =
            document.createElement("div");

        banco.className =
            "bancoNiebla";


        banco.style.top =
            `${random(55,95)}%`;


        banco.style.height =
            `${random(60,150)}px`;


        banco.style.animationDuration =
            `${random(25,50)}s`;


        banco.style.animationDelay =
            `${random(-40,0)}s`;


        banco.style.opacity =
            random(.15,.45);


        capaNiebla.appendChild(
            banco
        );

    }

}


/* ============================================================
   9. CREAR MARIPOSAS
   ============================================================ */

function crearMariposas() {

    const cantidad =
        window.innerWidth < 700
            ? 7
            : 14;


    const tipos = [
        "🦋",
        "🦋",
        "🦋",
        "🦋"
    ];


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const mariposa =
            document.createElement("span");

        mariposa.className =
            "mariposaViva";


        mariposa.textContent =
            tipos[
                Math.floor(
                    Math.random() *
                    tipos.length
                )
            ];


        mariposa.style.top =
            `${random(15,80)}%`;


        mariposa.style.setProperty(
            "--tamano",
            `${random(18,40)}px`
        );


        mariposa.style.setProperty(
            "--duracion",
            `${random(16,32)}s`
        );


        mariposa.style.setProperty(
            "--delay",
            `${random(-30,0)}s`
        );


        capaMariposas.appendChild(
            mariposa
        );

    }

}


/* ============================================================
   10. CREAR HOJAS
   ============================================================ */

function crearHojas() {

    const tipos = [
        "🍃",
        "🍂",
        "🍁",
        "🌿"
    ];


    const cantidad =
        window.innerWidth < 700
            ? 12
            : 24;


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const hoja =
            document.createElement("span");

        hoja.className =
            "hojaViva";


        hoja.textContent =
            tipos[
                Math.floor(
                    Math.random() *
                    tipos.length
                )
            ];


        hoja.style.setProperty(
            "--inicio",
            `${random(0,100)}vw`
        );


        hoja.style.setProperty(
            "--tamano",
            `${random(15,32)}px`
        );


        hoja.style.setProperty(
            "--duracion",
            `${random(10,22)}s`
        );


        hoja.style.setProperty(
            "--delay",
            `${random(-25,0)}s`
        );


        capaHojas.appendChild(
            hoja
        );

    }

}


/* ============================================================
   11. CREAR PARTÍCULAS
   ============================================================ */

function crearParticulas() {

    const cantidad =
        window.innerWidth < 700
            ? 25
            : 55;


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const particula =
            document.createElement("span");

        particula.className =
            "particulaViva";


        particula.style.left =
            `${random(0,100)}%`;


        particula.style.setProperty(
            "--tamano",
            `${random(1,4)}px`
        );


        particula.style.setProperty(
            "--movimiento",
            `${random(-160,160)}px`
        );


        particula.style.setProperty(
            "--duracion",
            `${random(12,28)}s`
        );


        particula.style.setProperty(
            "--delay",
            `${random(-30,0)}s`
        );


        capaParticulas.appendChild(
            particula
        );

    }

}


/* ============================================================
   12. CREAR LUCIÉRNAGAS
   ============================================================ */

function crearLuciernagas() {

    const cantidad =
        window.innerWidth < 700
            ? 14
            : 28;


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const luz =
            document.createElement("span");

        luz.className =
            "luciernagaViva";


        luz.style.left =
            `${random(5,95)}%`;


        luz.style.top =
            `${random(45,90)}%`;


        luz.style.setProperty(
            "--duracion",
            `${random(5,12)}s`
        );


        luz.style.setProperty(
            "--delay",
            `${random(-12,0)}s`
        );


        capaLuciernagas.appendChild(
            luz
        );

    }

}


/* ============================================================
   13. CREAR ESTRELLAS
   ============================================================ */

function crearEstrellas() {

    const cantidad =
        window.innerWidth < 700
            ? 30
            : 65;


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        const estrella =
            document.createElement("span");

        estrella.className =
            "estrellaViva";


        estrella.textContent =
            Math.random() > .5
                ? "✦"
                : "·";


        estrella.style.left =
            `${random(0,100)}%`;


        estrella.style.top =
            `${random(2,65)}%`;


        estrella.style.fontSize =
            `${random(8,22)}px`;


        estrella.style.setProperty(
            "--duracion",
            `${random(1.5,4)}s`
        );


        estrella.style.setProperty(
            "--delay",
            `${random(-5,0)}s`
        );


        capaEstrellas.appendChild(
            estrella
        );

    }

}


/* ============================================================
   14. INICIAR EL JARDÍN
   ============================================================ */

if (ambiente) {

    crearNubes();
    crearNiebla();
    crearMariposas();
    crearHojas();
    crearParticulas();
    crearLuciernagas();
    crearEstrellas();

}


/* ============================================================
   15. TOAST
   ============================================================ */

function mostrarToast(mensaje) {

    if (!toast) return;


    toast.textContent =
        mensaje;


    toast.classList.add(
        "mostrar"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "mostrar"
                );

            },
            2600
        );

}


/* ============================================================
   16. MOMENTOS DEL DÍA
   ============================================================ */

function aplicarMomento(nuevoMomento) {

    momento =
        nuevoMomento;


    body.classList.remove(
        "jardin",
        "atardecer",
        "noche",
        "cyber"
    );


    body.classList.add(
        nuevoMomento
    );


    localStorage.setItem(
        "portfolioMomento",
        nuevoMomento
    );


    /*
       Visibilidad de elementos
    */

    if (nuevoMomento === "jardin") {

        if (sol) sol.style.opacity = "1";
        if (rayos) rayos.style.opacity = ".3";

        if (luna) luna.style.opacity = "0";

        if (estrellasOriginales)
            estrellasOriginales.style.opacity = "0";

        if (luciernagasOriginales)
            luciernagasOriginales.style.opacity = "0";

        if (nieblaOriginal)
            nieblaOriginal.style.opacity = "0";

        capaEstrellas.style.opacity = "0";
        capaLuciernagas.style.opacity = "0";

    }


    if (nuevoMomento === "atardecer") {

        if (sol) sol.style.opacity = ".8";
        if (rayos) rayos.style.opacity = ".15";

        if (luna) luna.style.opacity = ".25";

        if (estrellasOriginales)
            estrellasOriginales.style.opacity = ".15";

        if (nieblaOriginal)
            nieblaOriginal.style.opacity = ".25";

        capaEstrellas.style.opacity = ".25";
        capaLuciernagas.style.opacity = ".45";

    }


    if (nuevoMomento === "noche") {

        if (sol) sol.style.opacity = "0";
        if (rayos) rayos.style.opacity = "0";

        if (luna) luna.style.opacity = "1";

        if (estrellasOriginales)
            estrellasOriginales.style.opacity = "1";

        if (nieblaOriginal)
            nieblaOriginal.style.opacity = ".45";

        if (luciernagasOriginales)
            luciernagasOriginales.style.opacity = "1";

        capaEstrellas.style.opacity = "1";
        capaLuciernagas.style.opacity = "1";

    }


    if (nuevoMomento === "cyber") {

        if (sol) sol.style.opacity = ".1";
        if (rayos) rayos.style.opacity = "0";

        if (luna) luna.style.opacity = ".4";

        if (estrellasOriginales)
            estrellasOriginales.style.opacity = ".6";

        capaEstrellas.style.opacity = ".8";
        capaLuciernagas.style.opacity = ".8";

    }


    actualizarTextoMomento();

}


function actualizarTextoMomento() {

    if (!modoCampo) return;


    const textos = {

        jardin:
            "🌞 Jardín de día",

        atardecer:
            "🌅 Atardecer",

        noche:
            "🌙 Noche",

        cyber:
            "💻 Cyber Mode"

    };


    modoCampo.textContent =
        textos[momento] ||
        textos.jardin;

}


/* ============================================================
   17. BOTÓN CAMBIAR MOMENTO
   ============================================================ */

if (modoCampo) {

    modoCampo.addEventListener(
        "click",
        () => {

            const secuencia = [
                "jardin",
                "atardecer",
                "noche"
            ];


            let posicion =
                secuencia.indexOf(
                    momento
                );


            posicion++;


            if (
                posicion >=
                secuencia.length
            ) {

                posicion = 0;

            }


            aplicarMomento(
                secuencia[posicion]
            );


            mostrarToast(
                momento === "jardin"
                    ? "🌻 Día en el jardín"
                    : momento === "atardecer"
                        ? "🌅 El sol está bajando"
                        : "🌙 La noche llegó"
            );

        }
    );

}


/* ============================================================
   18. SELECTOR DE AMBIENTE
   ============================================================ */

$$(
    "#selectorAmbiente button"
).forEach(
    boton => {

        boton.addEventListener(
            "click",
            () => {

                const ambienteElegido =
                    boton.dataset.ambiente;


                if (!ambienteElegido)
                    return;


                aplicarMomento(
                    ambienteElegido
                );


                mostrarToast(
                    `✨ Ambiente: ${boton.title}`
                );

            }
        );

    }
);


/* ============================================================
   19. JARDÍN LOCO
   ============================================================ */

if (modoLocura) {

    modoLocura.addEventListener(
        "click",
        () => {

            jardinLoco =
                !jardinLoco;


            body.classList.toggle(
                "jardinLoco",
                jardinLoco
            );


            if (jardinLoco) {

                modoLocura.textContent =
                    "😈 Detener jardín loco";


                mostrarToast(
                    "🦋 ¡El jardín cobró vida!"
                );

            } else {

                modoLocura.textContent =
                    "🦋 Activar jardín loco";


                mostrarToast(
                    "🌿 El jardín se calmó"
                );

            }

        }
    );

}


/* ============================================================
   20. MOVIMIENTO DEL MOUSE
   ============================================================ */

document.addEventListener(
    "mousemove",
    evento => {

        mouseX =
            evento.clientX /
            window.innerWidth -
            .5;


        mouseY =
            evento.clientY /
            window.innerHeight -
            .5;

    }
);


function animarMouse() {

    suavizadoX +=
        (mouseX - suavizadoX) *
        .045;


    suavizadoY +=
        (mouseY - suavizadoY) *
        .045;


    if (ambiente) {

        ambiente.style.setProperty(
            "--mouseX",
            `${suavizadoX * 30}px`
        );


        ambiente.style.setProperty(
            "--mouseY",
            `${suavizadoY * 30}px`
        );

    }


    /*
       El sol responde mucho al cursor.
    */

    if (sol) {

        sol.style.translate =
            `${suavizadoX * 25}px
             ${suavizadoY * 18}px`;

    }


    /*
       La luna se mueve más lentamente.
    */

    if (luna) {

        luna.style.translate =
            `${suavizadoX * -12}px
             ${suavizadoY * -10}px`;

    }


    requestAnimationFrame(
        animarMouse
    );

}


animarMouse();


/* ============================================================
   21. BRILLO QUE SIGUE AL CURSOR
   ============================================================ */

const brilloCursor =
    document.createElement("div");

brilloCursor.className =
    "brilloCursor";

document.body.appendChild(
    brilloCursor
);


document.addEventListener(
    "mousemove",
    evento => {

        brilloCursor.style.left =
            `${evento.clientX}px`;

        brilloCursor.style.top =
            `${evento.clientY}px`;

    }
);


/* ============================================================
   22. ONDAS AL HACER CLICK
   ============================================================ */

document.addEventListener(
    "click",
    evento => {

        const onda =
            document.createElement(
                "span"
            );


        onda.className =
            "ondaClick";


        onda.style.left =
            `${evento.clientX}px`;


        onda.style.top =
            `${evento.clientY}px`;


        document.body.appendChild(
            onda
        );


        setTimeout(
            () => {

                onda.remove();

            },
            850
        );

    }
);


/* ============================================================
   23. NAVEGACIÓN DEL JARDÍN
   ============================================================ */

$$(
    ".jardinElementos button"
).forEach(
    boton => {

        boton.addEventListener(
            "click",
            () => {

                const destino =
                    boton.dataset.ir;


                if (!destino)
                    return;


                const seccion =
                    $(destino);


                if (!seccion)
                    return;


                seccion.scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });


                boton.animate(
                    [
                        {
                            transform:
                                "scale(1)"
                        },
                        {
                            transform:
                                "scale(1.15) rotate(3deg)"
                        },
                        {
                            transform:
                                "scale(1)"
                        }
                    ],
                    {
                        duration:500
                    }
                );

            }
        );

    }
);


/* ============================================================
   24. REVEAL DE SECCIONES
   ============================================================ */

const secciones =
    $$("main section");


secciones.forEach(
    (seccion, indice) => {

        seccion.classList.add(
            "reveal"
        );


        seccion.style.transitionDelay =
            `${Math.min(indice * .06,.35)}s`;

    }
);


const observerReveal =
    new IntersectionObserver(
        entradas => {

            entradas.forEach(
                entrada => {

                    if (
                        entrada.isIntersecting
                    ) {

                        entrada.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold:.12
        }
    );


secciones.forEach(
    seccion => {

        observerReveal.observe(
            seccion
        );

    }
);


/* ============================================================
   25. NAVEGACIÓN ACTIVA
   ============================================================ */

const enlacesNav =
    $$(
        "#navegacionPrincipal a"
    );


const seccionesConID =
    $$(
        "main section[id], footer[id]"
    );


const observerNav =
    new IntersectionObserver(
        entradas => {

            entradas.forEach(
                entrada => {

                    if (
                        !entrada.isIntersecting
                    )
                        return;


                    const id =
                        entrada.target.id;


                    enlacesNav.forEach(
                        enlace => {

                            enlace.classList.toggle(
                                "activo",
                                enlace.getAttribute(
                                    "href"
                                ) === `#${id}`
                            );

                        }
                    );

                }
            );

        },
        {
            threshold:.35
        }
    );


seccionesConID.forEach(
    seccion => {

        observerNav.observe(
            seccion
        );

    }
);


/* ============================================================
   26. BARRA DE LECTURA
   ============================================================ */

function actualizarLectura() {

    if (!barraLectura)
        return;


    const altura =
        document.documentElement.scrollHeight -
        window.innerHeight;


    if (altura <= 0) {

        barraLectura.style.width =
            "0%";

        return;

    }


    const porcentaje =
        (
            window.scrollY /
            altura
        ) * 100;


    barraLectura.style.width =
        `${Math.min(100,porcentaje)}%`;

}


window.addEventListener(
    "scroll",
    actualizarLectura,
    {
        passive:true
    }
);


actualizarLectura();


/* ============================================================
   27. ANIMACIÓN DE SKILLS
   ============================================================ */

const skills =
    $$("progress");


const observerSkills =
    new IntersectionObserver(
        entradas => {

            entradas.forEach(
                entrada => {

                    if (
                        !entrada.isIntersecting
                    )
                        return;


                    const barra =
                        entrada.target;


                    if (
                        barra.dataset.animada
                    )
                        return;


                    barra.dataset.animada =
                        "true";


                    const final =
                        Number(
                            barra.getAttribute(
                                "value"
                            )
                        );


                    barra.value = 0;


                    if (final === 0)
                        return;


                    let actual = 0;


                    const intervalo =
                        setInterval(
                            () => {

                                actual += 1;

                                barra.value =
                                    actual;


                                if (
                                    actual >=
                                    final
                                ) {

                                    clearInterval(
                                        intervalo
                                    );

                                }

                            },
                            18
                        );

                }
            );

        },
        {
            threshold:.5
        }
    );


skills.forEach(
    barra => {

        observerSkills.observe(
            barra
        );

    }
);


/* ============================================================
   28. DETAILS
   ============================================================ */

$$("details").forEach(
    detalle => {

        detalle.addEventListener(
            "toggle",
            () => {

                detalle.classList.toggle(
                    "detalleAbierto",
                    detalle.open
                );

            }
        );

    }
);


/* ============================================================
   29. BUSCADOR
   ============================================================ */

function mostrarBuscador() {

    if (!buscador)
        return;


    buscador.classList.add(
        "mostrar"
    );


    buscador.setAttribute(
        "aria-hidden",
        "false"
    );


    setTimeout(
        () => {

            campoBusqueda?.focus();

        },
        100
    );

}


function ocultarBuscador() {

    if (!buscador)
        return;


    buscador.classList.remove(
        "mostrar"
    );


    buscador.setAttribute(
        "aria-hidden",
        "true"
    );

}


abrirBuscador?.addEventListener(
    "click",
    mostrarBuscador
);


cerrarBuscador?.addEventListener(
    "click",
    ocultarBuscador
);


buscador?.addEventListener(
    "click",
    evento => {

        if (
            evento.target === buscador
        ) {

            ocultarBuscador();

        }

    }
);


/* ============================================================
   30. BUSCAR EN EL PORTFOLIO
   ============================================================ */

const elementosBusqueda =
    $$(
        "main section, footer"
    );


if (campoBusqueda) {

    campoBusqueda.addEventListener(
        "input",
        () => {

            const texto =
                campoBusqueda.value
                    .trim()
                    .toLowerCase();


            if (!resultadosBusqueda)
                return;


            resultadosBusqueda.innerHTML =
                "";


            if (!texto) {

                resultadosBusqueda.innerHTML =
                    "<p>🌻 Escribí algo para buscar.</p>";

                return;

            }


            let encontrados = 0;


            elementosBusqueda.forEach(
                elemento => {

                    const contenido =
                        elemento.textContent
                            .toLowerCase();


                    if (
                        contenido.includes(
                            texto
                        )
                    ) {

                        encontrados++;


                        const titulo =
                            elemento.querySelector(
                                "h1,h2,h3,summary"
                            );


                        const resultado =
                            document.createElement(
                                "button"
                            );


                        resultado.className =
                            "resultadoBusqueda";


                        resultado.textContent =
                            titulo
                                ? titulo.textContent.trim()
                                : "Sección";


                        resultado.addEventListener(
                            "click",
                            () => {

                                elemento.scrollIntoView({
                                    behavior:"smooth",
                                    block:"start"
                                });


                                ocultarBuscador();

                            }
                        );


                        resultadosBusqueda.appendChild(
                            resultado
                        );

                    }

                }
            );


            if (
                encontrados === 0
            ) {

                resultadosBusqueda.innerHTML =
                    `<p>🌱 No encontré "${texto}".</p>`;

            }

        }
    );

}


/* ============================================================
   31. COPIAR EMAIL
   ============================================================ */

$$(
    ".miniBtn[data-copiar]"
).forEach(
    boton => {

        boton.addEventListener(
            "click",
            async () => {

                const texto =
                    boton.dataset.copiar;


                if (!texto)
                    return;


                try {

                    await navigator.clipboard.writeText(
                        texto
                    );


                    mostrarToast(
                        "📋 Email copiado"
                    );

                } catch {

                    mostrarToast(
                        "No se pudo copiar"
                    );

                }

            }
        );

    }
);


/* ============================================================
   32. MODO PRESENTACIÓN
   ============================================================ */

if (modoPresentacion) {

    modoPresentacion.addEventListener(
        "click",
        () => {

            presentacion =
                !presentacion;


            body.classList.toggle(
                "presentacion",
                presentacion
            );


            modoPresentacion.textContent =
                presentacion
                    ? "❌"
                    : "🎬";


            modoPresentacion.title =
                presentacion
                    ? "Salir de presentación"
                    : "Modo presentación";


            mostrarToast(
                presentacion
                    ? "🎬 Modo presentación"
                    : "🌻 Modo normal"
            );

        }
    );

}


/* ============================================================
   33. MODO ACCESIBILIDAD
   ============================================================ */

function aplicarAccesibilidad() {

    body.classList.toggle(
        "accesible",
        accesible
    );


    if (modoAccesible) {

        modoAccesible.textContent =
            accesible
                ? "♿✓"
                : "♿";

    }


    localStorage.setItem(
        "portfolioAccesible",
        accesible
    );

}


modoAccesible?.addEventListener(
    "click",
    () => {

        accesible =
            !accesible;


        aplicarAccesibilidad();


        mostrarToast(
            accesible
                ? "♿ Movimiento reducido"
                : "🌻 Movimiento normal"
        );

    }
);


aplicarAccesibilidad();


/* ============================================================
   34. CYBER LAB
   ============================================================ */

const passwordInput =
    $("#passwordInput");

const passwordBar =
    $("#passwordBar");

const passwordResultado =
    $("#passwordResultado");

const passwordChecks =
    $("#passwordChecks");


if (passwordInput) {

    passwordInput.addEventListener(
        "input",
        () => {

            const password =
                passwordInput.value;


            let puntos = 0;


            const comprobaciones = [];


            if (
                password.length >= 8
            ) {

                puntos += 25;

                comprobaciones.push(
                    "✓ 8 o más caracteres"
                );

            } else {

                comprobaciones.push(
                    "○ 8 o más caracteres"
                );

            }


            if (
                /[A-Z]/.test(password)
            ) {

                puntos += 20;

                comprobaciones.push(
                    "✓ Mayúsculas"
                );

            } else {

                comprobaciones.push(
                    "○ Mayúsculas"
                );

            }


            if (
                /[a-z]/.test(password)
            ) {

                puntos += 20;

                comprobaciones.push(
                    "✓ Minúsculas"
                );

            } else {

                comprobaciones.push(
                    "○ Minúsculas"
                );

            }


            if (
                /[0-9]/.test(password)
            ) {

                puntos += 20;

                comprobaciones.push(
                    "✓ Números"
                );

            } else {

                comprobaciones.push(
                    "○ Números"
                );

            }


            if (
                /[^A-Za-z0-9]/.test(password)
            ) {

                puntos += 15;

                comprobaciones.push(
                    "✓ Símbolos"
                );

            } else {

                comprobaciones.push(
                    "○ Símbolos"
                );

            }


            if (passwordBar) {

                passwordBar.style.width =
                    `${puntos}%`;

            }


            if (passwordChecks) {

                passwordChecks.innerHTML =
                    comprobaciones
                        .map(
                            texto =>
                                `<span class="passwordCheck">${texto}</span>`
                        )
                        .join("");

            }


            if (passwordResultado) {

                if (!password) {

                    passwordResultado.textContent =
                        "Esperando análisis...";

                } else if (puntos < 40) {

                    passwordResultado.textContent =
                        "🔴 Muy débil";

                } else if (puntos < 60) {

                    passwordResultado.textContent =
                        "🟠 Débil";

                } else if (puntos < 80) {

                    passwordResultado.textContent =
                        "🟡 Moderada";

                } else if (puntos < 100) {

                    passwordResultado.textContent =
                        "🟢 Fuerte";

                } else {

                    passwordResultado.textContent =
                        "💚 Muy fuerte";

                }

            }

        }
    );

}


/* ============================================================
   35. LABORATORIO
   ============================================================ */

$$(".experimentoBtn").forEach(
    (boton, indice) => {

        boton.addEventListener(
            "click",
            () => {

                const resultado =
                    boton.parentElement
                        ?.querySelector(
                            ".resultadoExperimento"
                        );


                const mensajes = [

                    "🌐 HTML detectado. El DOM está funcionando.",

                    "🎨 CSS activado. Animaciones y estilos responden.",

                    "⚡ JavaScript ejecutado. Evento detectado correctamente."

                ];


                if (resultado) {

                    resultado.textContent =
                        mensajes[indice] ||
                        "🧪 Experimento ejecutado.";


                    resultado.classList.add(
                        "resultadoActivo"
                    );

                }


                mostrarToast(
                    "🧪 Experimento ejecutado"
                );

            }
        );

    }
);


/* ============================================================
   36. ESTADO DEL SISTEMA
   ============================================================ */

const jsEstado =
    $("#jsEstado");


if (jsEstado) {

    jsEstado.textContent =
        "ONLINE ✓";

}


/* ============================================================
   37. IDIOMA
   ============================================================ */

function actualizarIdioma() {

    if (!idiomaBtn)
        return;


    idiomaBtn.textContent =
        idioma === "es"
            ? "🇬🇧 English"
            : "🇪🇸 Español";

}


idiomaBtn?.addEventListener(
    "click",
    () => {

        idioma =
            idioma === "es"
                ? "en"
                : "es";


        localStorage.setItem(
            "portfolioIdioma",
            idioma
        );


        actualizarIdioma();


        /*
           Por ahora cambia el estado del idioma.
           El contenido principal sigue en español.
           No destruimos el HTML usando textContent.
        */

        mostrarToast(
            idioma === "en"
                ? "🇬🇧 English mode"
                : "🇪🇸 Modo español"
        );

    }
);


actualizarIdioma();


/* ============================================================
   38. ATAJOS DE TECLADO
   ============================================================ */

document.addEventListener(
    "keydown",
    evento => {

        const elemento =
            document.activeElement;


        const escribiendo =
            elemento &&
            (
                elemento.tagName === "INPUT" ||
                elemento.tagName === "TEXTAREA"
            );


        if (
            evento.key === "Escape"
        ) {

            ocultarBuscador();

            return;

        }


        if (escribiendo)
            return;


        const tecla =
            evento.key.toLowerCase();


        /*
           /
           Buscador
        */

        if (tecla === "/") {

            evento.preventDefault();

            mostrarBuscador();

        }


        /*
           D
           Jardín de día
        */

        if (tecla === "d") {

            aplicarMomento(
                "jardin"
            );

        }


        /*
           N
           Noche
        */

        if (tecla === "n") {

            aplicarMomento(
                "noche"
            );

        }


        /*
           P
           Presentación
        */

        if (tecla === "p") {

            modoPresentacion?.click();

        }


        /*
           A
           Accesibilidad
        */

        if (tecla === "a") {

            modoAccesible?.click();

        }

    }
);


/* ============================================================
   39. PARALLAX CON SCROLL
   ============================================================ */

window.addEventListener(
    "scroll",
    () => {

        scrollActual =
            window.scrollY;


        if (sol) {

            sol.style.marginTop =
                `${scrollActual * .035}px`;

        }


        if (luna) {

            luna.style.marginTop =
                `${scrollActual * .015}px`;

        }


        if (rayos) {

            rayos.style.transform =
                `rotate(${scrollActual * .03}deg)`;

        }

    },
    {
        passive:true
    }
);


/* ============================================================
   40. EASTER EGG
   ============================================================ */

let codigoSecreto = "";


document.addEventListener(
    "keydown",
    evento => {

        codigoSecreto +=
            evento.key.toLowerCase();


        if (
            codigoSecreto.length > 30
        ) {

            codigoSecreto =
                codigoSecreto.slice(-30);

        }


        if (
            codigoSecreto.includes(
                "valchu"
            )
        ) {

            codigoSecreto = "";


            if (easterEgg) {

                easterEgg.classList.add(
                    "mostrar"
                );


                setTimeout(
                    () => {

                        easterEgg.classList.remove(
                            "mostrar"
                        );

                    },
                    4500
                );

            }


            mostrarToast(
                "😼 Encontraste el jardín secreto"
            );

        }

    }
);


/* ============================================================
   41. BOTONES: PEQUEÑO EFECTO DE PRESIÓN
   ============================================================ */

$$("button").forEach(
    boton => {

        boton.addEventListener(
            "pointerdown",
            () => {

                boton.style.transform =
                    "scale(.94)";

            }
        );


        boton.addEventListener(
            "pointerup",
            () => {

                boton.style.transform =
                    "";

            }
        );


        boton.addEventListener(
            "pointerleave",
            () => {

                boton.style.transform =
                    "";

            }
        );

    }
);


/* ============================================================
   42. DETECTAR CAMBIO DE TAMAÑO
   ============================================================ */

window.addEventListener(
    "resize",
    () => {

        /*
           No regeneramos todo el jardín,
           solamente adaptamos algunas cantidades
           mediante las reglas CSS.
        */

        document.documentElement.style
            .setProperty(
                "--anchoVentana",
                `${window.innerWidth}px`
            );

    }
);


/* ============================================================
   43. INICIALIZACIÓN FINAL
   ============================================================ */

aplicarMomento(
    momento
);


actualizarIdioma();


console.log(
    "🌻 Jardín interactivo iniciado."
);

console.log(
    "🦋 Mariposas activadas."
);

console.log(
    "🍃 Hojas activadas."
);

console.log(
    "☁️ Nubes activadas."
);

console.log(
    "🌫️ Niebla activada."
);

console.log(
    "✨ Partículas activadas."
);

console.log(
    "💻 JavaScript ONLINE."
);



/* =========================================================
   🌎 SISTEMA DE IDIOMAS
   Español 🇪🇸 / English 🇬🇧
   ========================================================= */

const traducciones = {

    es: {
        idioma: "🇬🇧 English",

        herramientas: "Herramientas del portfolio",
        modoPresentacion: "Modo presentación",
        modoAccesible: "Modo accesibilidad",
        buscar: "Buscar",
        abrirBuscador: "Abrir buscador",
        cerrar: "Cerrar buscador",

        buscadorTitulo: "🔎 Buscar en mi portfolio",
        buscadorPlaceholder:
            "Buscar experiencia, HTML, JavaScript...",

        portfolio: "PORTFOLIO PERSONAL",
        subtitulo: "Programación | Ciberseguridad",
        frase:
            "🌻 Un portfolio en construcción, como un jardín.",

        cambiarMomento:
            "🌞 Cambiar momento del día",

        jardinLoco:
            "🦋 Activar jardín loco",

        ambiente:
            "Cambiar ambiente",

        jardin: "Jardín",
        atardecer: "Atardecer",
        noche: "Noche",
        cyber: "Cyber",

        navegacion:
            "Navegación principal",

        sobreMi: "Sobre mí",
        experiencia: "Experiencia",
        estudios: "Estudios",
        habilidades: "Habilidades",
        laboratorio: "Laboratorio",
        cyberLab: "Cyber Lab",
        expectativa: "Expectativa",
        contacto: "Contacto",

        navegacionInteractiva:
            "NAVEGACIÓN INTERACTIVA",

        explora:
            "🌿 Explorá",

        recorrido:
            "Cada elemento representa una parte de mi recorrido.",

        perfil:
            "01 · PERFIL",

        conoceme:
            "🌻 Conoceme",

        disponibilidad:
            "🌱 Disponibilidad",

        experienciaLaboral:
            "Experiencia Laboral",

        formacion:
            "03 · FORMACIÓN",

        misEstudios:
            "Mis estudios",

        habilidadesTitulo:
            "Habilidades",

        habilidadesInterpersonales:
            "🤝 Habilidades interpersonales",

        actualmenteAprendiendo:
            "💻 Actualmente aprendiendo",

        conocimientosTecnicos:
            "Conocimientos técnicos",

        idiomas:
            "🌎 Idiomas",

        portfolio:
            "🚀 Portfolio",

        experimentos:
            "05 · EXPERIMENTOS",

        laboratorioTitulo:
            "🧪 Laboratorio",

        laboratorioTexto:
            "Este espacio muestra algunos de mis experimentos mientras aprendo programación.",

        experimentoHTML:
            "🌐 Experimento HTML",

        htmlDescripcion:
            "Estructuras semánticas, enlaces y elementos interactivos.",

        ejecutarExperimento:
            "Ejecutar experimento",

        experimentoCSS:
            "🎨 Experimento CSS",

        cssDescripcion:
            "Animaciones, transformaciones y efectos visuales.",

        activarCSS:
            "Activar CSS",

        experimentoJS:
            "⚡ Experimento JavaScript",

        jsDescripcion:
            "Eventos, DOM, interacción y lógica.",

        ejecutarJS:
            "Ejecutar JavaScript",

        esperando:
            "Esperando...",

        cyberEtiqueta:
            "06 · CYBERSECURITY",

        cyberTitulo:
            "🔐 Mini laboratorio de ciberseguridad",

        cyberTexto:
            "Probá qué tan segura sería una contraseña. Este ejercicio es educativo y no guarda lo que escribís.",

        passwordPlaceholder:
            "Escribí una contraseña",

        esperandoAnalisis:
            "Esperando análisis...",

        system:
            "07 · SYSTEM",

        estadoSistema:
            "📡 Estado del sistema",

        online:
            "ONLINE",

        activo:
            "ACTIVO",

        detectando:
            "DETECTANDO...",

        disponibilidadEtiqueta:
            "08 · DISPONIBILIDAD",

        expectativaSalarial:
            "Expectativa salarial",

        salarioMinimo:
            "💰 Salario mínimo aceptado",

        contactoEtiqueta:
            "09 · CONTACTO",

        contactarme:
            "🌙 Contactarme",

        descargarCV:
            "📄 Descargar CV",

        curriculum:
            "Currículum Vitae",

        ubicacion:
            "📍 Ubicación",

        email:
            "📧 Email",

        enviarCorreo:
            "Enviar correo",

        copiar:
            "📋 Copiar",

        telefono:
            "📞 Teléfono",

        linkedin:
            "💼 LinkedIn",

        github:
            "😼 GitHub",

        volverInicio:
            "⬆ Volver al inicio",

        footer:
            "🌻 Hecho mientras aprendo. 🌻"
    },


    en: {

        idioma: "🇦🇷 Español",

        herramientas: "Portfolio tools",
        modoPresentacion: "Presentation mode",
        modoAccesible: "Accessibility mode",
        buscar: "Search",
        abrirBuscador: "Open search",
        cerrar: "Close search",

        buscadorTitulo:
            "🔎 Search my portfolio",

        buscadorPlaceholder:
            "Search experience, HTML, JavaScript...",

        portfolio:
            "PERSONAL PORTFOLIO",

        subtitulo:
            "Programming | Cybersecurity",

        frase:
            "🌻 A portfolio under construction, like a garden.",

        cambiarMomento:
            "🌞 Change time of day",

        jardinLoco:
            "🦋 Activate crazy garden",

        ambiente:
            "Change environment",

        jardin: "Garden",
        atardecer: "Sunset",
        noche: "Night",
        cyber: "Cyber",

        navegacion:
            "Main navigation",

        sobreMi: "About me",
        experiencia: "Experience",
        estudios: "Education",
        habilidades: "Skills",
        laboratorio: "Laboratory",
        cyberLab: "Cyber Lab",
        expectativa: "Expectations",
        contacto: "Contact",

        navegacionInteractiva:
            "INTERACTIVE NAVIGATION",

        explora:
            "🌿 Explore",

        recorrido:
            "Each element represents part of my journey.",

        perfil:
            "01 · PROFILE",

        conoceme:
            "🌻 Get to know me",

        disponibilidad:
            "🌱 Availability",

        experienciaLaboral:
            "Work Experience",

        formacion:
            "03 · EDUCATION",

        misEstudios:
            "Education",

        habilidadesTitulo:
            "Skills",

        habilidadesInterpersonales:
            "🤝 Interpersonal skills",

        actualmenteAprendiendo:
            "💻 Currently learning",

        conocimientosTecnicos:
            "Technical skills",

        idiomas:
            "🌎 Languages",

        portfolio:
            "🚀 Portfolio",

        experimentos:
            "05 · EXPERIMENTS",

        laboratorioTitulo:
            "🧪 Laboratory",

        laboratorioTexto:
            "This space showcases some of my experiments while I learn programming.",

        experimentoHTML:
            "🌐 HTML Experiment",

        htmlDescripcion:
            "Semantic structures, links and interactive elements.",

        ejecutarExperimento:
            "Run experiment",

        experimentoCSS:
            "🎨 CSS Experiment",

        cssDescripcion:
            "Animations, transformations and visual effects.",

        activarCSS:
            "Activate CSS",

        experimentoJS:
            "⚡ JavaScript Experiment",

        jsDescripcion:
            "Events, DOM, interaction and logic.",

        ejecutarJS:
            "Run JavaScript",

        esperando:
            "Waiting...",

        cyberEtiqueta:
            "06 · CYBERSECURITY",

        cyberTitulo:
            "🔐 Mini cybersecurity laboratory",

        cyberTexto:
            "Test how secure a password would be. This exercise is educational and does not store what you type.",

        passwordPlaceholder:
            "Enter a password",

        esperandoAnalisis:
            "Waiting for analysis...",

        system:
            "07 · SYSTEM",

        estadoSistema:
            "📡 System status",

        online:
            "ONLINE",

        activo:
            "ACTIVE",

        detectando:
            "DETECTING...",

        disponibilidadEtiqueta:
            "08 · AVAILABILITY",

        expectativaSalarial:
            "Salary expectations",

        salarioMinimo:
            "💰 Minimum accepted salary",

        contactoEtiqueta:
            "09 · CONTACT",

        contactarme:
            "🌙 Contact me",

        descargarCV:
            "📄 Download CV",

        curriculum:
            "Resume",

        ubicacion:
            "📍 Location",

        email:
            "📧 Email",

        enviarCorreo:
            "Send email",

        copiar:
            "📋 Copy",

        telefono:
            "📞 Phone",

        linkedin:
            "💼 LinkedIn",

        github:
            "😼 GitHub",

        volverInicio:
            "⬆ Back to top",

        footer:
            "🌻 Made while I learn. 🌻"
    }
};


/* =========================================================
   ELEMENTOS A TRADUCIR
   ========================================================= */

function prepararTraducciones() {

    const elementos = {

        idiomaBtn: "#idiomaBtn",

        portfolio: ".eyebrow",
        subtitulo: ".subtitulo",
        frase: ".fraseJardin",

        cambiarMomento: "#modoCampo",
        jardinLoco: "#modoLocura",

        sobreMi:
            '#navegacionPrincipal a[href="#sobre-mi"]',

        experiencia:
            '#navegacionPrincipal a[href="#experience"]',

        estudios:
            '#navegacionPrincipal a[href="#mis-estudios"]',

        habilidades:
            '#navegacionPrincipal a[href="#habilidades"]',

        laboratorio:
            '#navegacionPrincipal a[href="#laboratorio"]',

        cyberLab:
            '#navegacionPrincipal a[href="#cyberLab"]',

        expectativa:
            '#navegacionPrincipal a[href="#salario"]',

        contacto:
            '#navegacionPrincipal a[href="#contacto"]',

        navegacionInteractiva:
            "#jardinNav .etiqueta",

        explora:
            "#jardinNav h2",

        recorrido:
            "#jardinNav > p",

        perfil:
            "#sobre-mi .etiqueta",

        sobreMiTitulo:
            "#sobre-mi h2",

        experienciaEtiqueta:
            "#experience .etiqueta",

        experienciaTitulo:
            "#experience h2",

        formacion:
            "#mis-estudios .etiqueta",

        misEstudiosTitulo:
            "#mis-estudios h2",

        habilidadesEtiqueta:
            "#habilidades .etiqueta",

        habilidadesTitulo:
            "#habilidades h2",

        experimentos:
            "#laboratorio .etiqueta",

        laboratorioTitulo:
            "#laboratorio h2",

        laboratorioTexto:
            "#laboratorio > p",

        cyberEtiqueta:
            "#cyberLab .etiqueta",

        cyberTitulo:
            "#cyberLab h2",

        cyberTexto:
            "#cyberLab > p",

        passwordInput:
            "#passwordInput",

        esperandoAnalisis:
            "#passwordResultado",

        system:
            "#estado .etiqueta",

        estadoSistema:
            "#estado h2",

        disponibilidadEtiqueta:
            "#salario .etiqueta",

        expectativaSalarial:
            "#salario h2",

        contactoEtiqueta:
            "#contacto .etiqueta",

        contactarme:
            "#contacto h2",

        footer:
            ".footerFinal"
    };

    return elementos;
}


/* =========================================================
   CAMBIAR TEXTO
   ========================================================= */

function cambiarTexto(selector, texto) {

    const elemento = $(selector);

    if (!elemento) return;

    elemento.textContent = texto;
}


/* =========================================================
   APLICAR IDIOMA
   ========================================================= */

let idiomaActual =
    localStorage.getItem("idiomaPortfolio") || "es";


function aplicarIdioma(idioma) {

    idiomaActual = idioma;

    const idiomaData =
        traducciones[idioma];

    if (!idiomaData) return;


    /*
       Cambiamos el idioma real del documento.
    */

    document.documentElement.lang = idioma;


    /*
       Botón de idioma
    */

    cambiarTexto(
        "#idiomaBtn",
        idiomaData.idioma
    );


    /*
       Elementos generales
    */

    cambiarTexto(
        ".eyebrow",
        idiomaData.portfolio
    );

    cambiarTexto(
        ".subtitulo",
        idiomaData.subtitulo
    );

    cambiarTexto(
        ".fraseJardin",
        idiomaData.frase
    );


    /*
       Controles
    */

    cambiarTexto(
        "#modoCampo",
        idiomaData.cambiarMomento
    );

    cambiarTexto(
        "#modoLocura",
        idiomaData.jardinLoco
    );


    /*
       Navegación
    */

    cambiarTexto(
        '#navegacionPrincipal a[href="#sobre-mi"]',
        idiomaData.sobreMi
    );

    cambiarTexto(
        '#navegacionPrincipal a[href="#experience"]',
        idiomaData.experiencia
    );

    cambiarTexto(
        '#navegacionPrincipal a[href="#mis-estudios"]',
        idiomaData.estudios
    );

    cambiarTexto(
        '#navegacionPrincipal a[href="#habilidades"]',
        idiomaData.habilidades
    );

    cambiarTexto(
        '#navegacionPrincipal a[href="#laboratorio"]',
        idiomaData.laboratorio
    );

    cambiarTexto(
        '#navegacionPrincipal a[href="#cyberLab"]',
        idiomaData.cyberLab
    );

    cambiarTexto(
        '#navegacionPrincipal a[href="#salario"]',
        idiomaData.expectativa
    );

    cambiarTexto(
        '#navegacionPrincipal a[href="#contacto"]',
        idiomaData.contacto
    );


    /*
       Jardín interactivo
    */

    cambiarTexto(
        "#jardinNav .etiqueta",
        idiomaData.navegacionInteractiva
    );

    cambiarTexto(
        "#jardinNav h2",
        idiomaData.explora
    );

    cambiarTexto(
        "#jardinNav > p",
        idiomaData.recorrido
    );


    /*
       Botones del jardín
    */

    const botonesJardin =
        $$(".jardinElementos button");

    const textosJardin =
        [
            idiomaData.sobreMi,
            idiomaData.experiencia,
            idiomaData.estudios,
            idiomaData.habilidades,
            idiomaData.laboratorio,
            idiomaData.contacto
        ];

    botonesJardin.forEach(
        (boton, indice) => {

            const span =
                boton.querySelector(
                    "span:not(.emojiGrande)"
                );

            if (span) {

                span.textContent =
                    textosJardin[indice];

            }

        }
    );


    /*
       Secciones
    */

    cambiarTexto(
        "#sobre-mi .etiqueta",
        idiomaData.perfil
    );

    cambiarTexto(
        "#sobre-mi h2",
        idiomaData.sobreMi
    );

    cambiarTexto(
        "#experience .etiqueta",
        idiomaData.experiencia
    );

    cambiarTexto(
        "#experience h2",
        idiomaData.experienciaLaboral
    );

    cambiarTexto(
        "#mis-estudios .etiqueta",
        idiomaData.formacion
    );

    cambiarTexto(
        "#mis-estudios h2",
        idiomaData.misEstudios
    );

    cambiarTexto(
        "#habilidades .etiqueta",
        "04 · SKILLS"
    );

    cambiarTexto(
        "#habilidades h2",
        idiomaData.habilidadesTitulo
    );

    cambiarTexto(
        "#laboratorio .etiqueta",
        idiomaData.experimentos
    );

    cambiarTexto(
        "#laboratorio h2",
        idiomaData.laboratorioTitulo
    );

    cambiarTexto(
        "#laboratorio > p",
        idiomaData.laboratorioTexto
    );

    cambiarTexto(
        "#cyberLab .etiqueta",
        idiomaData.cyberEtiqueta
    );

    cambiarTexto(
        "#cyberLab h2",
        idiomaData.cyberTitulo
    );

    cambiarTexto(
        "#cyberLab > p",
        idiomaData.cyberTexto
    );

    cambiarTexto(
        "#passwordInput",
        ""
    );

    $("#passwordInput")?.setAttribute(
        "placeholder",
        idiomaData.passwordPlaceholder
    );

    cambiarTexto(
        "#passwordResultado",
        idiomaData.esperandoAnalisis
    );

    cambiarTexto(
        "#estado .etiqueta",
        idiomaData.system
    );

    cambiarTexto(
        "#estado h2",
        idiomaData.estadoSistema
    );

    cambiarTexto(
        "#salario .etiqueta",
        idiomaData.disponibilidadEtiqueta
    );

    cambiarTexto(
        "#salario h2",
        idiomaData.expectativaSalarial
    );

    cambiarTexto(
        "#contacto .etiqueta",
        idiomaData.contactoEtiqueta
    );

    cambiarTexto(
        "#contacto h2",
        idiomaData.contactarme
    );

    cambiarTexto(
        ".footerFinal",
        idiomaData.footer
    );


    /*
       Buscador
    */

    cambiarTexto(
        "#buscador h2",
        idiomaData.buscadorTitulo
    );

    $("#campoBusqueda")?.setAttribute(
        "placeholder",
        idiomaData.buscadorPlaceholder
    );


    /*
       Guardamos el idioma
    */

    localStorage.setItem(
        "idiomaPortfolio",
        idioma
    );


    /*
       Evento visual
    */

    if (
        typeof mostrarToast === "function"
    ) {

        mostrarToast(
            idioma === "en"
                ? "🇬🇧 English activated"
                : "🇪🇸 Español activado"
        );

    }

}


/* =========================================================
   BOTÓN DE IDIOMA
   ========================================================= */

if (idiomaBtn) {

    idiomaBtn.addEventListener(
        "click",
        () => {

            const nuevoIdioma =
                idiomaActual === "es"
                    ? "en"
                    : "es";

            aplicarIdioma(
                nuevoIdioma
            );

        }
    );

}


/* =========================================================
   INICIAR IDIOMA
   ========================================================= */

aplicarIdioma(
    idiomaActual
);
