// =========================
// MOBILE MENU
// =========================

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menu?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
    });
});


// =========================
// FOOTER YEAR
// =========================

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


// =========================
// DOWNLOAD CV
// =========================

function downloadCV(e) {
    e.preventDefault();

    window.location.href = "assets/JabirGFX-CV.pdf";
}


// =========================
// JABIRGFX LOADER
// =========================

document.addEventListener("DOMContentLoaded", function () {

    const loader = document.querySelector(".loader");

    if (!loader) return;

    setTimeout(function () {
        loader.classList.add("hide");
    }, 1200);

});


// =========================
// CUSTOM CURSOR
// =========================

document.addEventListener("DOMContentLoaded", function () {

    const cursor = document.querySelector(".cursor");
    const cursorRing = document.querySelector(".cursor-ring");

    if (!cursor || !cursorRing) return;

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    // Mouse position
    document.addEventListener("mousemove", function (e) {

        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = mouseX + "px";
        cursor.style.top = mouseY + "px";

    });


    // Smooth ring
    function animateCursor() {

        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;

        cursorRing.style.left = ringX + "px";
        cursorRing.style.top = ringY + "px";

        requestAnimationFrame(animateCursor);
    }

    animateCursor();


    // Hover effect
    const hoverElements = document.querySelectorAll(
        "a, button, input, textarea, select, .project, .service"
    );

    hoverElements.forEach(function (element) {

        element.addEventListener("mouseenter", function () {
            document.body.classList.add("cursor-hover");
        });

        element.addEventListener("mouseleave", function () {
            document.body.classList.remove("cursor-hover");
        });

    });

});


// =========================
// ACTIVE NAV LINK ON SCROLL
// =========================

const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {

    let current = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

}


// Scroll event
window.addEventListener("scroll", updateActiveNav);


// Run once when page loads
updateActiveNav();


// =========================
// SMOOTH SCROLL
// =========================

navLinks.forEach(function (link) {

    link.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        if (!targetId || !targetId.startsWith("#")) return;

        const target = document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});// =========================
// SMOOTH SLIDING NAV UNDERLINE
// =========================

const navContainer = document.querySelector(".nav");
const navItems = document.querySelectorAll(".nav a");

if (navContainer && navItems.length) {

    // Create one underline
    const underline = document.createElement("span");
    underline.classList.add("nav-underline");

    navContainer.appendChild(underline);


    // Move underline
    function moveUnderline(link) {

        if (!link) return;

        const navRect = navContainer.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();

        underline.style.left =
            (linkRect.left - navRect.left) + "px";

        underline.style.width =
            linkRect.width + "px";
    }


    // Set initial position
    const activeLink =
        navContainer.querySelector("a.active") || navItems[0];

    moveUnderline(activeLink);


    // Click effect
    navItems.forEach(function (link) {

        link.addEventListener("click", function () {

            // Remove active from all
            navItems.forEach(function (item) {
                item.classList.remove("active");
            });

            // Add active to clicked link
            this.classList.add("active");

            // Slide underline
            moveUnderline(this);

        });

    });


    // Update on scroll
    window.addEventListener("scroll", function () {

        let current = "";

        document.querySelectorAll("section[id]").forEach(function (section) {

            const sectionTop = section.offsetTop - 180;
            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {
                current = section.id;
            }

        });


        if (current) {

            const activeSectionLink =
                navContainer.querySelector(
                    'a[href="#' + current + '"]'
                );

            if (activeSectionLink) {

                navItems.forEach(function (item) {
                    item.classList.remove("active");
                });

                activeSectionLink.classList.add("active");

                moveUnderline(activeSectionLink);
            }
        }

    });


    // Recalculate on resize
    window.addEventListener("resize", function () {

        const currentActive =
            navContainer.querySelector("a.active");

        moveUnderline(currentActive);

    });

}