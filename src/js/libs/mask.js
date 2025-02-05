export function mask() {
    var selector = document.querySelectorAll(".phone");
    if (selector) {
        var im = new Inputmask("+7 (999) 999-99-99");
        im.mask(selector);
    }
}
mask()