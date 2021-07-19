function moneda(costo_base, continente){
    var r;
    var n = continente.search('europa');
    if (n==-1) r=('$'+costo_base) 
    else r=('€'+(costo_base*1.2))
    return r;
}