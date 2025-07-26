document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const menuOverlay = document.querySelector(".menu-overlay");
    const openBtn = document.getElementById("menu-open");
    const closeBtn = document.getElementById("menu-close");
    const letters = document.querySelectorAll(".letter");

    const THEME_KEY = 'themeIndex'; // current theme

    let isOpen = false;

    menuToggle.addEventListener("click", () => {
        if (!isOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    });

    function openMenu() {
        menuOverlay.classList.add("open");
        openBtn.style.opacity = "0";
        closeBtn.style.opacity = "1";
        isOpen = true;
    }

    function closeMenu() {
        menuOverlay.classList.remove("open");
        openBtn.style.opacity = "1";
        closeBtn.style.opacity = "0";
        isOpen = false;
    }

    const colours = [
        "#ffadad", "#ffd6a5", "#fdffb6", "#caffbf",
        "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff",
        "#fffffc", "#ffe066", "#ff70a6", "#ff9770",
        "#70d6ff"
    ];

    const isColour = [
        false, false, false, false,
        false, false, false, false,
        false, false, false, false,
        false
    ];

    letters.forEach((letter, index) => {
        const colour = colours[Math.floor(Math.random() * colours.length)];

        letter.addEventListener("mouseenter", () => {
            if (isColour[index]) {
                letter.style.backgroundColor = "transparent";
                isColour[index] = false;
            }
            else {
                letter.style.backgroundColor = colour;
                isColour[index] = true;
            }
        });
    });

    const themes = [
        {
            lines: "linear-gradient(#00000010 1px, transparent 1px), linear-gradient(90deg, #00000010 1px, transparent 1px)",
            background: "#f4a261",
            text: "#264653",
            accent: "#e76f51",
            highlight: "#2a9d8f"
        },
        {
            lines: "linear-gradient(#e6e1c9 1px, transparent 1px), linear-gradient(90deg, #e6e1c9 1px, transparent 1px)",
            background: "#caf0f8",
            text: "#03045e",
            accent: "#0077b6",
            highlight: "#90e0ef"
        },
        {
            lines: "linear-gradient(#00000010 1px, transparent 1px), linear-gradient(90deg, #00000010 1px, transparent 1px)",
            background: "#ffe066",
            text: "#3a0ca3",
            accent: "#ff006e",
            highlight: "#8338ec"
        },
        {
            lines: "linear-gradient(#00000010 1px, transparent 1px), linear-gradient(90deg, #00000010 1px, transparent 1px)",
            background: "#d8f3dc",
            text: "#081c15",
            accent: "#40916c",
            highlight: "#52b788"
        }
    ];


    let currentTheme = -1;

    function applyTheme(idx) {
        const theme = themes[idx];

        document.body.style.backgroundColor = theme.background;
        document.body.style.color = theme.text;

        document.querySelectorAll(".menu-toggle p, .logo-box, .menu-overlay").forEach(span => {
            span.style.backgroundColor = theme.accent;
        });

        document.querySelectorAll("a").forEach(link => {
            link.style.color = theme.text;
        });

        document.querySelectorAll(".aboutspan, .socialspan, .contactspan").forEach(span => {
            span.style.backgroundColor = theme.highlight;
            span.style.color = theme.background;
        });

        document.querySelectorAll(".letter").forEach(letter => {
            letter.style.color = theme.text;
        });

        document.body.style.backgroundImage = theme.lines;

        localStorage.setItem(THEME_KEY, String(idx));
    }

    function resetToOriginal() {
        document.body.style.backgroundColor = "";
        document.body.style.color = "";
        document.body.style.backgroundImage = "";

        document.querySelectorAll(".menu-toggle p, .logo-box, .menu-overlay, a, .aboutspan, .socialspan, .contactspan, .letter")
            .forEach(el => el.style.cssText = "");

        localStorage.removeItem(THEME_KEY);
    }

    (function restoreThemeFromStorage() {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved === null) return; // no saved => stay on original
        const idx = parseInt(saved, 10);
        if (Number.isNaN(idx) || idx < 0 || idx >= themes.length) {
            resetToOriginal();
            return;
        }
        currentTheme = idx;
        applyTheme(currentTheme);
    })();

    const button = document.getElementById("coloursbutton");

    button.addEventListener("click", () => {
        // cycle through themes, then go back to original (index -1)
        if (currentTheme === -1) {
            currentTheme = 0;
            applyTheme(currentTheme);
            return;
        }

        currentTheme += 1;

        if (currentTheme >= themes.length) {
            resetToOriginal();
            currentTheme = -1;
            return;
        }

        applyTheme(currentTheme);
    });
});