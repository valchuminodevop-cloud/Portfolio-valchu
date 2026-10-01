/* =========================================================
   VALENTINA MINO PORTFOLIO
   Interactive background + UI
========================================================= */

"use strict";


/* =========================================================
   HELPERS
========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


/* =========================================================
   CURSOR
========================================================= */

const cursorGlow = $(".cursor-glow");
const cursorDot = $(".cursor-dot");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let glowX = mouseX;
let glowY = mouseY;

let dotX = mouseX;
let dotY = mouseY;


window.addEventListener("pointermove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

}, { passive: true });


function animateCursor() {

    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;

    dotX += (mouseX - dotX) * 0.28;
    dotY += (mouseY - dotY) * 0.28;


    if (cursorGlow) {

        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;

    }


    if (cursorDot) {

        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;

    }


    requestAnimationFrame(animateCursor);

}

if (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {

    animateCursor();

}


/* =========================================================
   BUTTON CURSOR LIGHT
========================================================= */

$$(".btn, .nav-github, .project-link").forEach((element) => {

    element.addEventListener("pointermove", (event) => {

        const rect = element.getBoundingClientRect();

        const x =
            ((event.clientX - rect.left) / rect.width) * 100;

        const y =
            ((event.clientY - rect.top) / rect.height) * 100;

        element.style.setProperty("--mx", `${x}%`);
        element.style.setProperty("--my", `${y}%`);

    });

});


/* =========================================================
   MAGNETIC ELEMENTS
========================================================= */

const magneticElements =
    $$(".magnetic");

magneticElements.forEach((element) => {

    element.addEventListener("pointermove", (event) => {

        if (
            !window.matchMedia("(pointer: fine)").matches ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }


        const rect =
            element.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left -
            rect.width / 2;

        const y =
            event.clientY -
            rect.top -
            rect.height / 2;


        const strength = 0.16;

        element.style.transform =
            `translate(${x * strength}px, ${y * strength}px)`;

    });


    element.addEventListener("pointerleave", () => {

        element.style.transform = "";

    });

});


/* =========================================================
   TILT CARDS
========================================================= */

const tiltCards =
    $$(".tilt-card");

tiltCards.forEach((card) => {

    card.addEventListener("pointermove", (event) => {

        if (
            !window.matchMedia("(pointer: fine)").matches ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }


        const rect =
            card.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width;

        const y =
            (event.clientY - rect.top) /
            rect.height;


        const rotateX =
            (0.5 - y) * 7;

        const rotateY =
            (x - 0.5) * 7;


        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-4px)`;

    });


    card.addEventListener("pointerleave", () => {

        card.style.transform = "";

    });

});


/* =========================================================
   NAVBAR SCROLL
========================================================= */

const navbar =
    $(".navbar");


function updateNavbar() {

    if (!navbar) return;

    navbar.classList.toggle(
        "scrolled",
        window.scrollY > 30
    );

}

window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);

updateNavbar();


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    $(".menu-toggle");

const mobileMenu =
    $(".mobile-menu");


function closeMobileMenu() {

    if (!menuToggle || !mobileMenu) {
        return;
    }

    menuToggle.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    mobileMenu.classList.remove("active");

    document.body.classList.remove("menu-open");

}


if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.toggle("active");

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });


    $$(".mobile-menu a").forEach((link) => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 850) {
            closeMobileMenu();
        }

    });

}


/* =========================================================
   SMOOTH ANCHOR OFFSET
========================================================= */

$$('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }


        event.preventDefault();


        const navbarHeight =
            navbar?.offsetHeight || 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight -
            15;


        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const revealElements =
    $$(".reveal");


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    revealElements.forEach((element, index) => {

        element.style.transitionDelay =
            `${Math.min(index * 0.035, 0.28)}s`;

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(
        element =>
            element.classList.add("visible")
    );

}


/* =========================================================
   GENERATE BUTTERFLIES
========================================================= */

const butterfliesContainer =
    $("#butterflies");


function createButterflies() {

    if (!butterfliesContainer) {
        return;
    }


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const count =
        reducedMotion ? 3 : 10;


    butterfliesContainer.innerHTML = "";


    for (let i = 0; i < count; i++) {

        const butterfly =
            document.createElement("div");

        butterfly.className =
            "butterfly";


        const body =
            document.createElement("span");

        body.className =
            "butterfly-body";


        butterfly.appendChild(body);


        butterfly.style.left =
            `${Math.random() * 75 + 5}%`;

        butterfly.style.top =
            `${Math.random() * 70 + 10}%`;

        butterfly.style.setProperty(
            "--duration",
            `${18 + Math.random() * 18}s`
        );


        butterfly.style.animationDelay =
            `${-Math.random() * 20}s`;


        butterfly.style.transform =
            `scale(${0.55 + Math.random() * .65})`;


        butterfliesContainer.appendChild(
            butterfly
        );

    }

}

createButterflies();


/* =========================================================
   GENERATE LEAVES
========================================================= */

const leavesContainer =
    $("#leaves");


function createLeaves() {

    if (!leavesContainer) {
        return;
    }


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const count =
        reducedMotion ? 5 : 18;


    leavesContainer.innerHTML = "";


    for (let i = 0; i < count; i++) {

        const leaf =
            document.createElement("div");

        leaf.className =
            "leaf";


        leaf.style.left =
            `${-10 + Math.random() * 100}%`;

        leaf.style.top =
            `${15 + Math.random() * 65}%`;


        leaf.style.setProperty(
            "--duration",
            `${14 + Math.random() * 18}s`
        );


        leaf.style.animationDelay =
            `${-Math.random() * 25}s`;


        leaf.style.opacity =
            `${0.2 + Math.random() * .5}`;


        leavesContainer.appendChild(
            leaf
        );

    }

}

createLeaves();


/* =========================================================
   GENERATE PARTICLES
========================================================= */

const particlesContainer =
    $("#particles");


function createParticles() {

    if (!particlesContainer) {
        return;
    }


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    const count =
        reducedMotion ? 10 : 40;


    particlesContainer.innerHTML = "";


    for (let i = 0; i < count; i++) {

        const particle =
            document.createElement("div");

        particle.className =
            "particle";


        particle.style.left =
            `${Math.random() * 100}%`;

        particle.style.top =
            `${Math.random() * 100}%`;


        particle.style.setProperty(
            "--duration",
            `${4 + Math.random() * 7}s`
        );


        particle.style.animationDelay =
            `${-Math.random() * 8}s`;


        particlesContainer.appendChild(
            particle
        );

    }

}

createParticles();


/* =========================================================
   SUBTLE PARALLAX
========================================================= */

const world =
    $(".world");

let parallaxX = 0;
let parallaxY = 0;

let currentParallaxX = 0;
let currentParallaxY = 0;


window.addEventListener(
    "pointermove",
    (event) => {

        if (
            !world ||
            !window.matchMedia("(pointer: fine)").matches ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }


        parallaxX =
            (event.clientX / window.innerWidth - .5);

        parallaxY =
            (event.clientY / window.innerHeight - .5);

    },
    { passive: true }
);


function animateParallax() {

    currentParallaxX +=
        (parallaxX - currentParallaxX) * .035;

    currentParallaxY +=
        (parallaxY - currentParallaxY) * .035;


    if (world) {

        world.style.setProperty(
            "--parallax-x",
            `${currentParallaxX * 12}px`
        );

        world.style.setProperty(
            "--parallax-y",
            `${currentParallaxY * 8}px`
        );

    }


    requestAnimationFrame(
        animateParallax
    );

}

if (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {

    animateParallax();

}


/* =========================================================
   PHOTO PARALLAX
========================================================= */

const photo =
    $(".hero-photo-card");


if (photo) {

    window.addEventListener(
        "pointermove",
        (event) => {

            if (
                !window.matchMedia("(pointer: fine)").matches ||
                window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
                return;
            }


            const x =
                (event.clientX / window.innerWidth - .5);

            const y =
                (event.clientY / window.innerHeight - .5);


            photo.style.setProperty(
                "--photo-x",
                `${x * 8}deg`
            );

            photo.style.setProperty(
                "--photo-y",
                `${y * -8}deg`
            );

        },
        { passive: true }
    );

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    $$("main section[id]");

const navLinks =
    $$(".desktop-nav a");


if (
    "IntersectionObserver" in window &&
    sections.length
) {

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    navLinks.forEach((link) => {

                        link.classList.remove(
                            "active"
                        );


                        if (
                            link.getAttribute("href") ===
                            `#${entry.target.id}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(
        section =>
            sectionObserver.observe(section)
    );

}


/* =========================================================
   EMAIL COPY
========================================================= */

const emailLink =
    $(".contact-email");


if (emailLink) {

    emailLink.addEventListener(
        "click",
        async () => {

            try {

                await navigator.clipboard.writeText(
                    "valchumino@gmail.com"
                );

            } catch {
                // Fallback: mailto continues normally.
            }

        }
    );

}


/* =========================================================
   VISIBILITY OPTIMIZATION
========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            document.body.classList.add(
                "page-hidden"
            );

        } else {

            document.body.classList.remove(
                "page-hidden"
            );

        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);
