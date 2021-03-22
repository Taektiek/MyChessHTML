function resize() {
    var r = document.querySelector(":root");
    r.style.setProperty("--square-size", (Math.min(screen.height, screen.width) - 150)/8 + "px")
}