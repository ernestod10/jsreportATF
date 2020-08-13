function now() {
    return new Date().toLocaleDateString()
}

function nowPlus20Days() {
    var date = new Date()
    date.setDate(date.getDate() + 20);
    return date.toLocaleDateString();
}

function cedula(value) {
    return value.toString().replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&.");
}