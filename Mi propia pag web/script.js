/* =========================================================
   🌻 PORTFOLIO DE VALENTINA
   JavaScript — Jardín interactivo
   ========================================================= */


/* =========================================================
   1. FUNCIONES AUXILIARES
   ========================================================= */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);


/* =========================================================
   2. ELEMENTOS DEL DOM
   ========================================================= */

const body = document.body;

const ambiente = $("#ambiente");

const sol = $("#sol");
const luna = $("#luna");
const estrellas = $("#estrellas");
const mariposas = $("#mariposas");
const hojas = $("#hojas");
const luciernagas = $("#luciernagas");
const niebla = $("#niebla");

const modoCampo = $("#modoCampo");
const idiomaBtn = $("#idiomaBtn");

const barraLectura = $("#barraLectura");

const btnPresentacion = $("#btnPresentacion");
const btnAccesibilidad = $("#btnAccesibilidad");
const btnBuscar = $("#btnBuscar");

const buscador = $("#buscador");
const inputBusqueda = $("#inputBusqueda");
const resultadosBusqueda = $("#resultadosBusqueda");
const cerrarBusqueda = $("#cerrarBusqueda");

const toast = $("#toast");

const easterEgg = $("#easterEgg");


/* =========================================================
   3. TOAST / NOTIFICACIONES
   ========================================================= */

let toastTimer;

function mostrarToast(mensaje) {

    if (!toast) return;

    toast.textContent = mensaje;

    toast.classList.add("mostrar");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("mostrar");

    }, 2500);
}


/* =========================================================
   4. CAMBIO DE MOMENTO DEL DÍA
   ========================================================= */

let momentoActual =
    localStorage.getItem("momentoPortfolio") || "jardin";


function aplicarMomento(momento) {

    momentoActual = momento;

    /*
       Quitamos TODOS los estados anteriores.
       Incluimos cyber para evitar que se mezclen
       los temas.
    */

    body.classList.remove(
        "jardin",
        "atardecer",
        "noche",
        "cyber"
    );


    body.classList.add(momento);


    localStorage.setItem(
        "momentoPortfolio",
        momento
    );


    if (modoCampo) {

        if (momento === "jardin") {

            modoCampo.textContent =
                "🌞 Cambiar momento del día";

        }

        if (momento === "atardecer") {

            modoCampo.textContent =
                "🌅 Atardecer";

        }

        if (momento === "noche") {

            modoCampo.textContent =
                "🌙 Noche";

        }

        if (momento === "cyber") {

            modoCampo.textContent =
                "💻 Cyber Mode";

        }
    }

}


/*
   Secuencia:

   jardín → atardecer → noche → jardín
*/

function cambiarMomento() {

    if (momentoActual === "jardin") {

        aplicarMomento("atardecer");

    } else if (momentoActual === "atardecer") {

        aplicarMomento("noche");

    } else {

        aplicarMomento("jardin");

    }

}


if (modoCampo) {

    modoCampo.addEventListener(
        "click",
        cambiarMomento
    );

}


/* =========================================================
   5. SELECTOR DE TEMAS
   ========================================================= */

const botonesTema =
    $$(".temaBtn");


botonesTema.forEach((boton) => {

    boton.addEventListener(
        "click",
        () => {

            const tema =
                boton.dataset.tema;

            if (!tema) return;

            aplicarMomento(tema);

            mostrarToast(
                `Tema cambiado: ${tema}`
            );

        }
    );

});


/* =========================================================
   6. MODO JARDÍN LOCO 🌻🦋
   ========================================================= */

const jardinLoco =
    $("#jardinLoco");


let jardinEstaLoco = false;


if (jardinLoco) {

    jardinLoco.addEventListener(
        "click",
        () => {

            jardinEstaLoco =
                !jardinEstaLoco;

            body.classList.toggle(
                "gardenCrazy",
                jardinEstaLoco
            );


            if (jardinEstaLoco) {

                jardinLoco.textContent =
                    "😈 Detener jardín loco";

                mostrarToast(
                    "🌻 ¡El jardín cobró vida!"
                );

            } else {

                jardinLoco.textContent =
                    "🌻 Jardín loco";

                mostrarToast(
                    "🌿 El jardín volvió a la calma"
                );

            }

        }
    );

}


/* =========================================================
   7. MOVIMIENTO DEL AMBIENTE CON EL MOUSE
   ========================================================= */

let mouseX = 0;
let mouseY = 0;

let movimientoX = 0;
let movimientoY = 0;


document.addEventListener(
    "mousemove",
    (evento) => {

        mouseX =
            evento.clientX /
            window.innerWidth -
            0.5;

        mouseY =
            evento.clientY /
            window.innerHeight -
            0.5;

    }
);


/*
   requestAnimationFrame hace que
   el movimiento sea más suave.
*/

function animarAmbiente() {

    movimientoX +=
        (mouseX - movimientoX) * 0.04;

    movimientoY +=
        (mouseY - movimientoY) * 0.04;


    const movimientoHorizontal =
        movimientoX * 35;

    const movimientoVertical =
        movimientoY * 25;


    if (sol) {

        sol.style.translate =
            `${movimientoHorizontal}px
             ${movimientoVertical}px`;

    }


    if (luna) {

        luna.style.translate =
            `${movimientoHorizontal * -0.5}px
             ${movimientoVertical * -0.5}px`;

    }


    if (estrellas) {

        estrellas.style.translate =
            `${movimientoHorizontal * 0.3}px
             ${movimientoVertical * 0.3}px`;

    }


    if (mariposas) {

        mariposas.style.translate =
            `${movimientoHorizontal * 1.5}px
             ${movimientoVertical * 1.5}px`;

    }


    if (hojas) {

        hojas.style.translate =
            `${movimientoHorizontal * 1.8}px
             ${movimientoVertical * 1.8}px`;

    }


    if (luciernagas) {

        luciernagas.style.translate =
            `${movimientoHorizontal * 1.2}px
             ${movimientoVertical * 1.2}px`;

    }


    requestAnimationFrame(
        animarAmbiente
    );

}


animarAmbiente();


/* =========================================================
   8. CHISPAS QUE SIGUEN AL CURSOR ✨
   ========================================================= */

let ultimaChispa = 0;


document.addEventListener(
    "mousemove",
    (evento) => {

        const ahora =
            Date.now();


        /*
           Limitamos la cantidad de partículas
           para no saturar el navegador.
        */

        if (
            ahora - ultimaChispa < 80
        ) {
            return;
        }


        ultimaChispa = ahora;


        const chispa =
            document.createElement("span");


        chispa.className =
            "chispaCursor";


        chispa.textContent =
            Math.random() > 0.5
                ? "✦"
                : "✨";


        chispa.style.left =
            `${evento.clientX}px`;


        chispa.style.top =
            `${evento.clientY}px`;


        document.body.appendChild(
            chispa
        );


        setTimeout(() => {

            chispa.remove();

        }, 1000);

    }
);


/* =========================================================
   9. NAVEGACIÓN DEL JARDÍN
   ========================================================= */

const botonesJardin =
    $$(".gardenNav");


botonesJardin.forEach((boton) => {

    boton.addEventListener(
        "click",
        () => {

            const destino =
                boton.dataset.target;


            const seccion =
                document.querySelector(
                    destino
                );


            if (!seccion) return;


            seccion.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


            boton.classList.add(
                "gardenNavClick"
            );


            setTimeout(() => {

                boton.classList.remove(
                    "gardenNavClick"
                );

            }, 600);

        }
    );

});


/* =========================================================
   10. ANIMACIÓN DE SECCIONES AL HACER SCROLL
   ========================================================= */

const elementosReveal =
    $$(".reveal");


const observerReveal =
    new IntersectionObserver(
        (entradas) => {

            entradas.forEach(
                (entrada) => {

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
            threshold: 0.15
        }
    );


elementosReveal.forEach(
    (elemento) => {

        observerReveal.observe(
            elemento
        );

    }
);


/* =========================================================
   11. NAVEGACIÓN ACTIVA
   ========================================================= */

const secciones =
    $$("main section[id]");


const enlacesNav =
    $$("nav a[href^='#']");


const observerNav =
    new IntersectionObserver(
        (entradas) => {

            entradas.forEach(
                (entrada) => {

                    if (
                        entrada.isIntersecting
                    ) {

                        const id =
                            entrada.target.id;


                        enlacesNav.forEach(
                            (enlace) => {

                                enlace.classList.remove(
                                    "activo"
                                );


                                if (
                                    enlace.getAttribute(
                                        "href"
                                    ) === `#${id}`
                                ) {

                                    enlace.classList.add(
                                        "activo"
                                    );

                                }

                            }
                        );

                    }

                }
            );

        },
        {
            threshold: 0.45
        }
    );


secciones.forEach(
    (seccion) => {

        observerNav.observe(
            seccion
        );

    }
);


/* =========================================================
   12. BARRA DE PROGRESO DE LECTURA
   ========================================================= */

function actualizarBarraLectura() {

    if (!barraLectura) return;


    const scrollActual =
        window.scrollY;


    const alturaDocumento =
        document.documentElement.scrollHeight -
        window.innerHeight;


    if (alturaDocumento <= 0) {

        barraLectura.style.width =
            "0%";

        return;

    }


    const porcentaje =
        (
            scrollActual /
            alturaDocumento
        ) * 100;


    barraLectura.style.width =
        `${porcentaje}%`;

}


window.addEventListener(
    "scroll",
    actualizarBarraLectura
);


actualizarBarraLectura();


/* =========================================================
   13. BARRAS DE HABILIDADES
   ========================================================= */

const progressBars =
    $$("progress");


function animarProgressBar(
    barra
) {

    const valorFinal =
        Number(barra.value);


    /*
       Guardamos el valor original.
    */

    barra.dataset.valorFinal =
        valorFinal;


    /*
       Si el valor final es 0,
       no necesitamos animarlo.
    */

    if (valorFinal === 0) {

        barra.value = 0;

        return;

    }


    barra.value = 0;


    let valor = 0;


    const intervalo =
        setInterval(
            () => {

                valor += 1;


                barra.value =
                    valor;


                if (
                    valor >= valorFinal
                ) {

                    barra.value =
                        valorFinal;


                    clearInterval(
                        intervalo
                    );

                }

            },
            20
        );

}


const observerProgress =
    new IntersectionObserver(
        (entradas) => {

            entradas.forEach(
                (entrada) => {

                    if (
                        entrada.isIntersecting &&
                        !entrada.target.dataset.animada
                    ) {

                        entrada.target.dataset.animada =
                            "true";


                        animarProgressBar(
                            entrada.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.4
        }
    );


progressBars.forEach(
    (barra) => {

        observerProgress.observe(
            barra
        );

    }
);


/* =========================================================
   14. DETAILS INTERACTIVOS
   ========================================================= */

const detalles =
    $$("details");


detalles.forEach(
    (detalle) => {

        detalle.addEventListener(
            "toggle",
            () => {

                if (detalle.open) {

                    detalle.classList.add(
                        "detalleAbierto"
                    );

                } else {

                    detalle.classList.remove(
                        "detalleAbierto"
                    );

                }

            }
        );

    }
);


/* =========================================================
   15. BUSCADOR DEL PORTFOLIO 🔎
   ========================================================= */

function abrirBuscador() {

    if (!buscador) return;

    buscador.classList.add(
        "mostrar"
    );


    if (inputBusqueda) {

        setTimeout(() => {

            inputBusqueda.focus();

        }, 100);

    }

}


function cerrarBuscador() {

    if (!buscador) return;

    buscador.classList.remove(
        "mostrar"
    );

}


if (btnBuscar) {

    btnBuscar.addEventListener(
        "click",
        abrirBuscador
    );

}


if (cerrarBusqueda) {

    cerrarBusqueda.addEventListener(
        "click",
        cerrarBuscador
    );

}


/*
   Cerrar haciendo click
   fuera del buscador.
*/

if (buscador) {

    buscador.addEventListener(
        "click",
        (evento) => {

            if (
                evento.target === buscador
            ) {

                cerrarBuscador();

            }

        }
    );

}


/* =========================================================
   16. FILTRAR RESULTADOS DEL BUSCADOR
   ========================================================= */

const elementosBuscables =
    $$("main section, footer");


function escaparHTML(texto) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        texto;

    return div.innerHTML;

}


if (inputBusqueda) {

    inputBusqueda.addEventListener(
        "input",
        () => {

            const texto =
                inputBusqueda.value
                    .trim()
                    .toLowerCase();


            if (!resultadosBusqueda) {
                return;
            }


            resultadosBusqueda.innerHTML =
                "";


            if (!texto) {

                resultadosBusqueda.innerHTML =
                    "<p>Escribí algo para buscar 🌻</p>";

                return;

            }


            let encontrados = 0;


            elementosBuscables.forEach(
                (elemento) => {

                    const contenido =
                        elemento.textContent
                            .toLowerCase();


                    if (
                        contenido.includes(texto)
                    ) {

                        encontrados++;


                        const titulo =
                            elemento.querySelector(
                                "h1, h2, h3, summary"
                            );


                        const nombre =
                            titulo
                                ? titulo.textContent.trim()
                                : "Sección";


                        const resultado =
                            document.createElement(
                                "button"
                            );


                        resultado.className =
                            "resultadoBusqueda";


                        resultado.textContent =
                            nombre;


                        resultado.addEventListener(
                            "click",
                            () => {

                                elemento.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                });


                                cerrarBuscador();

                            }
                        );


                        resultadosBusqueda.appendChild(
                            resultado
                        );

                    }

                }
            );


            if (encontrados === 0) {

                resultadosBusqueda.innerHTML =
                    `<p>No encontré resultados para "${escaparHTML(texto)}" 🦋</p>`;

            }

        }
    );

}


/* =========================================================
   17. COPIAR EMAIL
   ========================================================= */

const botonesCopiar =
    $$(".copiarEmail");


botonesCopiar.forEach(
    (boton) => {

        boton.addEventListener(
            "click",
            async () => {

                const email =
                    boton.dataset.email;


                if (!email) return;


                try {

                    await navigator.clipboard.writeText(
                        email
                    );


                    mostrarToast(
                        "📧 Email copiado"
                    );

                } catch (error) {

                    mostrarToast(
                        "No se pudo copiar el email"
                    );

                }

            }
        );

    }
);


/* =========================================================
   18. MODO PRESENTACIÓN
   ========================================================= */

if (btnPresentacion) {

    btnPresentacion.addEventListener(
        "click",
        () => {

            body.classList.toggle(
                "presentacion"
            );


            const activo =
                body.classList.contains(
                    "presentacion"
                );


            btnPresentacion.textContent =
                activo
                    ? "❌ Salir de presentación"
                    : "🎬 Presentación";


            mostrarToast(
                activo
                    ? "🎬 Modo presentación activado"
                    : "🌻 Modo normal"
            );

        }
    );

}


/* =========================================================
   19. MODO ACCESIBILIDAD
   ========================================================= */

let accesibilidad =
    localStorage.getItem(
        "accesibilidadPortfolio"
    ) === "true";


function aplicarAccesibilidad() {

    body.classList.toggle(
        "accesible",
        accesibilidad
    );


    if (btnAccesibilidad) {

        btnAccesibilidad.textContent =
            accesibilidad
                ? "♿ Accesibilidad ON"
                : "♿ Accesibilidad";

    }


    localStorage.setItem(
        "accesibilidadPortfolio",
        accesibilidad
    );

}


if (btnAccesibilidad) {

    btnAccesibilidad.addEventListener(
        "click",
        () => {

            accesibilidad =
                !accesibilidad;


            aplicarAccesibilidad();


            mostrarToast(
                accesibilidad
                    ? "♿ Accesibilidad activada"
                    : "🌻 Accesibilidad desactivada"
            );

        }
    );

}


aplicarAccesibilidad();


/* =========================================================
   20. CYBER LAB 🔐
   ========================================================= */

const passwordInput =
    $("#passwordInput");


const passwordResultado =
    $("#passwordResultado");


const passwordBar =
    $("#passwordBar");


if (passwordInput) {

    passwordInput.addEventListener(
        "input",
        () => {

            const password =
                passwordInput.value;


            let fuerza = 0;


            /*
               Longitud
            */

            if (
                password.length >= 8
            ) {

                fuerza += 25;

            }


            /*
               Mayúsculas
            */

            if (
                /[A-Z]/.test(password)
            ) {

                fuerza += 20;

            }


            /*
               Minúsculas
            */

            if (
                /[a-z]/.test(password)
            ) {

                fuerza += 20;

            }


            /*
               Números
            */

            if (
                /[0-9]/.test(password)
            ) {

                fuerza += 20;

            }


            /*
               Símbolos
            */

            if (
                /[^A-Za-z0-9]/.test(password)
            ) {

                fuerza += 15;

            }


            if (password.length === 0) {

                fuerza = 0;

            }


            if (passwordBar) {

                passwordBar.value =
                    fuerza;

                passwordBar.style.width =
                    `${fuerza}%`;

            }


            if (passwordResultado) {

                if (fuerza < 30) {

                    passwordResultado.textContent =
                        "🔴 Muy débil";

                } else if (fuerza < 60) {

                    passwordResultado.textContent =
                        "🟠 Débil";

                } else if (fuerza < 80) {

                    passwordResultado.textContent =
                        "🟡 Buena";

                } else {

                    passwordResultado.textContent =
                        "🟢 Fuerte";

                }

            }

        }
    );

}


/* =========================================================
   21. LABORATORIO DE EXPERIMENTOS 🧪
   ========================================================= */

const botonesExperimento =
    $$(".experimento");


botonesExperimento.forEach(
    (boton) => {

        boton.addEventListener(
            "click",
            () => {

                const experimento =
                    boton.dataset.experimento;


                switch (experimento) {

                    case "particles":

                        mostrarToast(
                            "✨ Las partículas están vivas"
                        );

                        body.classList.toggle(
                            "particulasLocas"
                        );

                        break;


                    case "matrix":

                        mostrarToast(
                            "💻 Experimento Matrix iniciado"
                        );

                        body.classList.toggle(
                            "matrixMode"
                        );

                        break;


                    case "nature":

                        mostrarToast(
                            "🌿 La naturaleza responde"
                        );

                        body.classList.toggle(
                            "natureMode"
                        );

                        break;


                    default:

                        mostrarToast(
                            "🧪 Experimento activado"
                        );

                }

            }
        );

    }
);


/* =========================================================
   22. ESTADO DEL SISTEMA
   ========================================================= */

const estadoSistema =
    $("#estadoSistema");


const horaSistema =
    $("#horaSistema");


const resolucionSistema =
    $("#resolucionSistema");


function actualizarSistema() {

    if (estadoSistema) {

        estadoSistema.textContent =
            "🟢 Online";

    }


    if (horaSistema) {

        const ahora =
            new Date();


        horaSistema.textContent =
            ahora.toLocaleTimeString(
                "es-AR",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

    }


    if (resolucionSistema) {

        resolucionSistema.textContent =
            `${window.innerWidth} × ${window.innerHeight}`;

    }

}


actualizarSistema();


setInterval(
    actualizarSistema,
    1000
);


window.addEventListener(
    "resize",
    actualizarSistema
);


/* =========================================================
   23. CAMBIO DE IDIOMA
   ========================================================= */

let idioma =
    localStorage.getItem(
        "idiomaPortfolio"
    ) || "es";


function actualizarIdiomaBoton() {

    if (!idiomaBtn) return;


    if (idioma === "es") {

        idiomaBtn.textContent =
            "🇬🇧 English";

    } else {

        idiomaBtn.textContent =
            "🇪🇸 Español";

    }

}


/*
   Este sistema busca elementos que tengan:

   data-es="texto en español"
   data-en="text in English"

   y cambia su contenido.
*/

function cambiarIdioma() {

    idioma =
        idioma === "es"
            ? "en"
            : "es";


    const elementosIdioma =
        $$("[data-es][data-en]");


    elementosIdioma.forEach(
        (elemento) => {

            elemento.textContent =
                idioma === "es"
                    ? elemento.dataset.es
                    : elemento.dataset.en;

        }
    );


    localStorage.setItem(
        "idiomaPortfolio",
        idioma
    );


    actualizarIdiomaBoton();


    mostrarToast(
        idioma === "es"
            ? "🇪🇸 Español"
            : "🇬🇧 English"
    );

}


if (idiomaBtn) {

    idiomaBtn.addEventListener(
        "click",
        cambiarIdioma
    );

}


actualizarIdiomaBoton();


/* =========================================================
   24. BOTONES CON EFECTO DE CLICK
   ========================================================= */

const botones =
    $$("button");


botones.forEach(
    (boton) => {

        boton.addEventListener(
            "click",
            () => {

                boton.classList.add(
                    "botonPulsado"
                );


                setTimeout(() => {

                    boton.classList.remove(
                        "botonPulsado"
                    );

                }, 300);

            }
        );

    }
);


/* =========================================================
   25. EASTER EGG 😼
   ========================================================= */

let codigoSecreto =
    "";


document.addEventListener(
    "keydown",
    (evento) => {

        codigoSecreto +=
            evento.key.toLowerCase();


        /*
           Solo guardamos los últimos
           20 caracteres.
        */

        if (
            codigoSecreto.length > 20
        ) {

            codigoSecreto =
                codigoSecreto.slice(-20);

        }


        if (
            codigoSecreto.includes(
                "valchu"
            )
        ) {

            if (easterEgg) {

                easterEgg.classList.add(
                    "mostrar"
                );


                setTimeout(() => {

                    easterEgg.classList.remove(
                        "mostrar"
                    );

                }, 4000);

            }


            mostrarToast(
                "😼 Encontraste el secreto"
            );


            codigoSecreto = "";

        }

    }
);


/* =========================================================
   26. ATAJOS DE TECLADO
   ========================================================= */

document.addEventListener(
    "keydown",
    (evento) => {

        /*
           No ejecutar atajos mientras
           se escribe en un input.
        */

        const escribiendo =
            evento.target.matches(
                "input, textarea"
            );


        if (escribiendo) return;


        /*
           D = día / jardín
        */

        if (
            evento.key.toLowerCase() === "d"
        ) {

            aplicarMomento(
                "jardin"
            );

        }


        /*
           N = noche
        */

        if (
            evento.key.toLowerCase() === "n"
        ) {

            aplicarMomento(
                "noche"
            );

        }


        /*
           P = presentación
        */

        if (
            evento.key.toLowerCase() === "p"
        ) {

            if (btnPresentacion) {

                btnPresentacion.click();

            }

        }


        /*
           A = accesibilidad
        */

        if (
            evento.key.toLowerCase() === "a"
        ) {

            if (btnAccesibilidad) {

                btnAccesibilidad.click();

            }

        }


        /*
           / = buscador
        */

        if (
            evento.key === "/"
        ) {

            evento.preventDefault();

            abrirBuscador();

        }


        /*
           ESC = cerrar buscador
        */

        if (
            evento.key === "Escape"
        ) {

            cerrarBuscador();

        }

    }
);


/* =========================================================
   27. PARALLAX CON SCROLL
   ========================================================= */

let scrollActual = 0;


window.addEventListener(
    "scroll",
    () => {

        scrollActual =
            window.scrollY;


        if (sol) {

            sol.style.marginTop =
                `${scrollActual * 0.05}px`;

        }


        if (luna) {

            luna.style.marginTop =
                `${scrollActual * 0.02}px`;

        }


        if (estrellas) {

            estrellas.style.marginTop =
                `${scrollActual * 0.01}px`;

        }

    }
);


/* =========================================================
   28. INICIALIZACIÓN
   ========================================================= */

aplicarMomento(
    momentoActual
);


actualizarIdiomaBoton();


console.log(
    "🌻 Portfolio iniciado correctamente."
);


console.log(
    "💻 JavaScript funcionando."
);


console.log(
    "🦋 El jardín está vivo."
);


/* =========================================================
   FIN DEL SCRIPT
   ========================================================= */