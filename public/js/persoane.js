function incarcaPersoane() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            incarcaTabelPersoane(this);
        }
    };
    xhttp.open("GET", "resurse/persoane.xml", true);
    xhttp.send();
}
function incarcaTabelPersoane(xml) {
    var i;
    var doc = xml.responseXML;
    var tabel = "<table><tr><th>ID</th><th>Nume</th><th>Prenume</th><th>Varsta</th><th>Strada</th><th>Numarul</th><th>Localitate</th><th>Judet</th><th>Tara</th></tr>";
    var x = doc.getElementsByTagName("persoana");
    var id = 1;
    for (i = 0; i < x.length; i++) {
        tabel += "<tr><td>" + id + "</td><td>" +
            x[i].getElementsByTagName("nume")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("prenume")[0].childNodes[0].nodeValue +
            "</td><td>" +
            x[i].getElementsByTagName("varsta")[0].childNodes[0].nodeValue +
            "</td><td>"+
            x[i].getElementsByTagName("strada")[0].childNodes[0].nodeValue +
            "</td><td>"+
            x[i].getElementsByTagName("numar")[0].childNodes[0].nodeValue +
            "</td><td>"+
            x[i].getElementsByTagName("localitate")[0].childNodes[0].nodeValue +
            "</td><td>"+
            x[i].getElementsByTagName("judet")[0].childNodes[0].nodeValue +
            "</td><td>"+
            x[i].getElementsByTagName("tara")[0].childNodes[0].nodeValue +
            "</td></tr>";
            id++;
    }
    tabel+="</table>"
    document.getElementById("persoanetabel").innerHTML = tabel;
}