document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("play").addEventListener("click", () => {
        document.getElementById("menu").style.display = 'none';
        document.getElementById("playfield").style.display = 'flex';
    });
    
    document.getElementById("open-settings").addEventListener("click", () => {
        document.getElementById("menu").style.display = 'none';
        document.getElementById("settings").style.display = 'flex';
    });

    document.getElementById("open-rate").addEventListener("click", () => {
        document.getElementById("menu").style.display = 'none';
        document.getElementById("rate").style.display = 'flex';
    });

    Array.from(document.getElementsByClassName("open-menu")).forEach((el) => {
        el.addEventListener("click", () => {
            document.getElementById("menu").style.display = 'flex';
            document.getElementById("playfield").style.display = 'none';
            document.getElementById("settings").style.display = 'none';
            document.getElementById("rate").style.display = 'none';
        });
    });
});