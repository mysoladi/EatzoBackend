document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".menu-button");
    const menuButton2 = document.querySelector(".fixed-menu .menu-button");
    const navOverlay = document.querySelector(".nav-overlay");
    const fixedMenu = document.querySelector('.fixed-menu');

    menuButton.addEventListener("click", () => {
        toggleMenu(menuButton);
    });

    menuButton2.addEventListener("click", (event) => {
        // Prevent the default behavior of the button
        event.preventDefault();
        toggleMenu(menuButton2);
        extendNavOverlay();
    });

    function toggleMenu(button) {
        const isOpen = navOverlay.classList.toggle("open");
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        menuButton.classList.toggle("menu-button--open", isOpen);
        menuButton2.classList.toggle("menu-button--open", isOpen);
        if (button === menuButton) {
            resetNavOverlay();
        } else if (button === menuButton2) {
            extendNavOverlay();
        }
    }

    function extendNavOverlay() {
        navOverlay.style.top = 0;
        navOverlay.style.height = "100vh"; // Extend nav-overlay to full screen height
    }

    function resetNavOverlay() {
        navOverlay.style.top = "120px"; // Reset top position to 120px
        navOverlay.style.height = ""; // Reset nav-overlay height
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 769) {
            if (navOverlay.classList.contains("open")) {
                toggleMenu();
                resetNavOverlay();
            }
        }
    });

    window.addEventListener("scroll", () => {
        const scrollThreshold = 200;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        fixedMenu.style.display = scrollTop > scrollThreshold ? 'block' : 'none';
        
        if (scrollTop < 200 && navOverlay.classList.contains("open")) {
            resetNavOverlay();
        }
    });
});
