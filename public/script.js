window.addEventListener("DOMContentLoaded", () => {
    const target = document.getElementById("barcode")
    const text = "productions"

    function randomCaps(str) {
        return str
            .split("")
            .map(ch => (Math.random() < 0.5 ? ch.toLowerCase() : ch.toUpperCase()))
            .join("")
    }

    setInterval(() => {
        target.textContent = randomCaps(text)
    }, 100)
})