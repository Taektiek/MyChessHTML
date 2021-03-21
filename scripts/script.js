function on_square_click(context) {
    let squares = Array.prototype.slice.call(document.getElementsByClassName("square"));
    if (context.firstChild) {
        squares.forEach(element => {
            element.classList.remove("selected");
        });
        context.classList.add("selected");
    }
}