document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const menuOverlay = document.querySelector(".menu-overlay");
    const openBtn = document.getElementById("menu-open");
    const closeBtn = document.getElementById("menu-close");
    const letters = document.querySelectorAll(".letter");

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

    const carousels = document.querySelectorAll(".carousel");

    carousels.forEach((carousel) => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextButton = carousel.querySelector('.carousel-button.next');
        const prevButton = carousel.querySelector('.carousel-button.prev');
        let currentIndex = 0;

        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        });

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        });
    });

    document.querySelectorAll('.accordion-header').forEach(header => {
        const parent = header.parentElement;
        const toggleBtn = header.querySelector('.accordion-toggle');
        const content = parent.querySelector('.accordion-content');

        header.addEventListener('click', () => {
            document.querySelectorAll('.accordion-item.open').forEach(item => {
                if (item !== parent) {
                    item.classList.remove('open');
                    item.querySelector('.accordion-toggle').textContent = '+';
                    item.querySelector('.accordion-content').style.height = '0';
                }
            });

            if (parent.classList.contains('open')) {
                content.style.height = '0';
                parent.classList.remove('open');
                toggleBtn.textContent = '+';
            } else {
                content.style.height = content.scrollHeight + 'px';
                parent.classList.add('open');
                toggleBtn.textContent = '−';
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


    let currentTheme = 0;
    const button = document.getElementById("coloursbutton");

    button.addEventListener("click", () => {
        currentTheme = (currentTheme + 1) % themes.length;
        const theme = themes[currentTheme];

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
    });

});
