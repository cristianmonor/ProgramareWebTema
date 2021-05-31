class Produs {
    constructor(id, nume, cantitate) {
        this.id = id;
        this.nume = nume;
        this.cantitate = cantitate;
    }
}

var index=0;

function insertProdus() {
    var tabel=document.getElementById("tabel");
    index++;
    var produs=new Produs(index,document.getElementById("nume").value,document.getElementById("cantitate").value);
    tabel.innerHTML+="<tr><td>"+produs.id+"</td><td>"+produs.nume+"</td><td>"+produs.cantitate+"</td></tr>";
    localStorage.setItem(index, JSON.stringify(produs));
}