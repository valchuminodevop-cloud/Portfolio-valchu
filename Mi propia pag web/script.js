
"use strict";

/* =========================================================
   VALENTINA MINO PORTFOLIO
   Interactive Portfolio Engine
   ========================================================= */


/* =========================================================
   HELPERS
   ========================================================= */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const finePointer = window.matchMedia(
    "(pointer: fine)"
).matches;


/* =========================================================
   PAGE READY
   ========================================================= */

document.documentElement.classList.add("js-enabled");


/* =========================================================
   CUSTOM CURSOR
   ========================================================= */

const cursorGlow = $(".cursor-glow");
const cursorDot = $(".cursor-dot");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let glowX = mouseX;
let glowY = mouseY;

let dotX = mouseX;
let dotY = mouseY;

if (finePointer && !prefersReducedMotion) {

    window.addEventListener(
        "pointermove",
        (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            document.documentElement.style.setProperty(
                "--mouse-x",
                `${mouseX}px`
            );

            document.documentElement.style.setProperty(
                "--mouse-y",
                `${mouseY}px`
            );

        },
        { passive: true }
    );

    function animateCursor() {

        glowX += (mouseX - glowX) * 0.075;
        glowY += (mouseY - glowY) * 0.075;

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

    animateCursor();
}


/* =========================================================
   CURSOR INTERACTION STATES
   ========================================================= */

const interactiveElements = $$(
    "a, button, .btn, .project-card, .skill-item, .nav-github"
);

interactiveElements.forEach((element) => {

    element.addEventListener("pointerenter", () => {

        document.body.classList.add("cursor-hover");

    });

    element.addEventListener("pointerleave", () => {

        document.body.classList.remove("cursor-hover");

    });

});


/* =========================================================
   BUTTON LIGHT FOLLOW
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

if (finePointer && !prefersReducedMotion) {

    $$(".magnetic").forEach((element) => {

        element.addEventListener("pointermove", (event) => {

            const rect = element.getBoundingClientRect();

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
                `translate3d(${x * strength}px, ${y * strength}px, 0)`;

        });

        element.addEventListener("pointerleave", () => {

            element.style.transform = "";

        });

    });

}


/* =========================================================
   3D TILT CARDS
   ========================================================= */

if (finePointer && !prefersReducedMotion) {

    $$(".tilt-card").forEach((card) => {

        card.addEventListener("pointermove", (event) => {

            const rect = card.getBoundingClientRect();

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
                 translateY(-5px)`;

        });

        card.addEventListener("pointerleave", () => {

            card.style.transform = "";

        });

    });

}


/* =========================================================
   CARD SPOTLIGHT
   ========================================================= */

if (finePointer) {

    $$(".glass-card, .project-card, .skill-category").forEach(
        (card) => {

            card.addEventListener("pointermove", (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                card.style.setProperty(
                    "--spot-x",
                    `${x}px`
                );

                card.style.setProperty(
                    "--spot-y",
                    `${y}px`
                );

            });

        }
    );

}


/* =========================================================
   NAVBAR
   ========================================================= */

const navbar = $(".navbar");

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

const menuToggle = $(".menu-toggle");
const mobileMenu = $(".mobile-menu");

function closeMobileMenu() {

    if (!menuToggle || !mobileMenu) return;

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
            !mobileMenu.classList.contains("active");

        mobileMenu.classList.toggle(
            "active",
            isOpen
        );

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
   ESCAPE KEY
   ========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeMobileMenu();
    }

});


/* =========================================================
   SMOOTH ANCHOR SCROLL
   ========================================================= */

$$('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (!targetId || targetId === "#") {
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
            behavior: prefersReducedMotion
                ? "auto"
                : "smooth"
        });

    });

});


/* =========================================================
   REVEAL ON SCROLL
   ========================================================= */

const revealElements = $(".reveal")
    ? $$(".reveal")
    : [];

if (
    "IntersectionObserver" in window &&
    revealElements.length
) {

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
                rootMargin:
                    "0px 0px -50px 0px"
            }
        );

    revealElements.forEach(
        (element, index) => {

            if (!prefersReducedMotion) {

                element.style.transitionDelay =
                    `${Math.min(
                        index * 0.035,
                        0.28
                    )}s`;

            }

            revealObserver.observe(element);

        }
    );

} else {

    revealElements.forEach(
        (element) =>
            element.classList.add("visible")
    );

}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const sections = $$(
    "main section[id]"
);

const navLinks = $$(
    ".desktop-nav a"
);

if (
    "IntersectionObserver" in window &&
    sections.length &&
    navLinks.length
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
        (section) =>
            sectionObserver.observe(section)
    );

}


/* =========================================================
   BUTTERFLIES
   ========================================================= */

const butterfliesContainer =
    $("#butterflies");

function createButterflies() {

    if (!butterfliesContainer) return;

    const count =
        prefersReducedMotion
            ? 2
            : window.innerWidth < 700
                ? 5
                : 10;

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
            `${Math.random() * 80 + 5}%`;

        butterfly.style.top =
            `${Math.random() * 70 + 10}%`;

        butterfly.style.setProperty(
            "--duration",
            `${18 + Math.random() * 18}s`
        );

        butterfly.style.animationDelay =
            `${-Math.random() * 20}s`;

        butterfly.style.transform =
            `scale(${0.55 + Math.random() * 0.65})`;

        butterfliesContainer.appendChild(
            butterfly
        );

    }

}

createButterflies();


/* =========================================================
   LEAVES
   ========================================================= */

const leavesContainer =
    $("#leaves");

function createLeaves() {

    if (!leavesContainer) return;

    const count =
        prefersReducedMotion
            ? 4
            : window.innerWidth < 700
                ? 9
                : 18;

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
            `${0.2 + Math.random() * 0.5}`;

        leavesContainer.appendChild(
            leaf
        );

    }

}

createLeaves();


/* =========================================================
   PARTICLES
   ========================================================= */

const particlesContainer =
    $("#particles");

function createParticles() {

    if (!particlesContainer) return;

    const count =
        prefersReducedMotion
            ? 8
            : window.innerWidth < 700
                ? 18
                : 40;

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
   MOUSE PARALLAX WORLD
   ========================================================= */

const world = $(".world");

let parallaxX = 0;
let parallaxY = 0;

let currentParallaxX = 0;
let currentParallaxY = 0;

if (
    world &&
    finePointer &&
    !prefersReducedMotion
) {

    window.addEventListener(
        "pointermove",
        (event) => {

            parallaxX =
                event.clientX /
                window.innerWidth -
                0.5;

            parallaxY =
                event.clientY /
                window.innerHeight -
                0.5;

        },
        { passive: true }
    );

    function animateParallax() {

        currentParallaxX +=
            (parallaxX - currentParallaxX) *
            0.035;

        currentParallaxY +=
            (parallaxY - currentParallaxY) *
            0.035;

        world.style.setProperty(
            "--parallax-x",
            `${currentParallaxX * 12}px`
        );

        world.style.setProperty(
            "--parallax-y",
            `${currentParallaxY * 8}px`
        );

        requestAnimationFrame(
            animateParallax
        );

    }

    animateParallax();

}


/* =========================================================
   PHOTO PARALLAX
   ========================================================= */

const photo =
    $(".hero-photo-card");

if (
    photo &&
    finePointer &&
    !prefersReducedMotion
) {

    window.addEventListener(
        "pointermove",
        (event) => {

            const x =
                event.clientX /
                window.innerWidth -
                0.5;

            const y =
                event.clientY /
                window.innerHeight -
                0.5;

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
   ANIMATED COUNTERS
   ========================================================= */

function animateCounter(element) {

    const target =
        parseInt(
            element.dataset.target ||
            element.textContent ||
            "0",
            10
        );

    const duration = 1400;

    const startTime =
        performance.now();

    function update(currentTime) {

        const progress =
            Math.min(
                (currentTime - startTime) /
                duration,
                1
            );

        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );

        const current =
            Math.floor(
                eased * target
            );

        element.textContent =
            current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }

    }

    requestAnimationFrame(update);

}

const counters =
    $$("[data-counter]");

if (
    counters.length &&
    "IntersectionObserver" in window
) {

    const counterObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    animateCounter(
                        entry.target
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.7
            }
        );

    counters.forEach(
        (counter) =>
            counterObserver.observe(counter)
    );

}


/* =========================================================
   SKILL BARS
   ========================================================= */

const skillBars =
    $$("[data-skill]");

if (
    skillBars.length &&
    "IntersectionObserver" in window
) {

    const skillObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const bar =
                        entry.target;

                    const value =
                        bar.dataset.skill;

                    bar.style.width =
                        `${value}%`;

                    observer.unobserve(
                        bar
                    );

                });

            },
            {
                threshold: 0.4
            }
        );

    skillBars.forEach(
        (bar) =>
            skillObserver.observe(bar)
    );

}


/* =========================================================
   GITHUB CARDS HOVER
   ========================================================= */

$$(".project-card").forEach((card) => {

    card.addEventListener(
        "pointerenter",
        () => {

            card.classList.add(
                "project-active"
            );

        }
    );

    card.addEventListener(
        "pointerleave",
        () => {

            card.classList.remove(
                "project-active"
            );

        }
    );

});


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

                emailLink.classList.add(
                    "copied"
                );

                const originalText =
                    emailLink.textContent;

                emailLink.textContent =
                    "Email copiado ✓";

                setTimeout(() => {

                    emailLink.textContent =
                        originalText;

                    emailLink.classList.remove(
                        "copied"
                    );

                }, 1800);

            } catch {

                /* mailto fallback */

            }

        }
    );

}


/* =========================================================
   PAGE VISIBILITY
   ========================================================= */

document.addEventListener(
    "visibilitychange",
    () => {

        document.body.classList.toggle(
            "page-hidden",
            document.hidden
        );

    }
);


/* =========================================================
   WINDOW LOAD
   ========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);


/* =========================================================
   RESIZE OPTIMIZATION
   ========================================================= */

let resizeTimer;

window.addEventListener(
    "resize",
    () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {

            createButterflies();
            createLeaves();
            createParticles();

        }, 250);

    },
    { passive: true }
);

