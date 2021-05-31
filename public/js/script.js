var casuteCastigatoare = ["hex_num_rand1","hex_num_rand2","hex_num_rand3","hex_num_rand4","hex_num_rand5","hex_num_rand6","hex_num_rand7","hex_num_rand8"];
var casuteIntroduse = ["hex_num1","hex_num2","hex_num3","hex_num4","hex_num5","hex_num6","hex_num7","hex_num8"];

function laIncarcare() {
  setInterval(showDate, 1000);
  window.document.getElementById("p2").innerHTML = "Adresa URL este " + location.href;
  if (window.navigator.geolocation) {
    window.document.getElementById("p3").innerHTML = window.navigator.geolocation.getCurrentPosition(showLocation);
  } else {
    window.document.getElementById("p3").innerHTML = "Geolocation is not supported by this browser.";
  }
  window.document.getElementById("p4").innerHTML = "Numele browserului este " + window.navigator.appName;
  window.document.getElementById("p5").innerHTML = "Versiunea browserului este " + window.navigator.appVersion;
}
function showLocation(position) {
  window.document.getElementById("p3").innerHTML = "Locatia curenta este:  latitudine: " + position.coords.latitude + ",  longitudine: " + position.coords.longitude;
}
function showDate() {
  window.document.getElementById("p1").innerHTML = "Data curenta este " + (new Date());
}

function schimbaContinut(resursa, jsFisier, jsFunctie) {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange =
      function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          document.getElementById("continut").innerHTML =
            this.responseText
          if (jsFisier) {
            var elementScript = document.createElement('script');
            elementScript.onload = function () {
              console.log("hello");
              if (jsFunctie) {
                window[jsFunctie]();
              }
            };
            elementScript.src = jsFisier;
            document.head.appendChild(elementScript);
          } else {
            if (jsFunctie) {
              window[jsFunctie]();
            }
          }
        }
      }
    xmlhttp.open("GET", resursa + ".html", true);
    xmlhttp.send();
  }
}

function internetLoto() {
  for (i = 0; i < casuteCastigatoare.length; i++) {
    window.document.getElementById(casuteCastigatoare[i]).value = genHexNumber();
  }
  var check = checkNumbers();
  window.document.getElementById("mesajloto").innerHTML = check.toString() + " numere castigatoare";
}

function checkNumbers() {
  var check = 0;
  for (i = 0; i < casuteCastigatoare.length; i++) {
    if (window.document.getElementById(casuteCastigatoare[i]).value == window.document.getElementById(casuteIntroduse[i]).value) {
      check++;
    }
  }
  return check;
}

function genHexNumber() {
  var n = (Math.random() * 0xff * 100).toString(16);
  return  n.slice(0, 2);
}

var rectangle = 0;
var x1, y1, x2, y2;
function plot_pt() {
    var c = document.getElementById("canvas");
    var context = c.getContext("2d");
    if (rectangle == 0) {
        x1 = event.clientX - c.offsetLeft;
        y1 = event.clientY - c.offsetTop+pageYOffset;
        context.moveTo(x1, y1);
        rectangle++;
    } else {
        x2 = event.clientX - c.offsetLeft;
        y2 = event.clientY - c.offsetTop+pageYOffset;
        context.beginPath();
        context.moveTo(x2, y2);
        context.fillStyle=document.getElementById("umplere").value;
        context.lineWidth = 5;
        context.strokeStyle = document.getElementById("contur").value;
        context.strokeRect(x1, y1, x2 - x1, y2 - y1);
        context.fillRect(x1, y1, x2 - x1, y2 - y1);
        rectangle = 0;
    }
}

function asideRow() {
  window.document.getElementById("container").style.flexDirection = "row";
}

function asideColumn() {
  window.document.getElementById("container").style.flexDirection = "column";
}

var nrColoane = 1;
function insertRand() {
  var tabel = window.document.getElementById("tabeldinamic");
  rand = tabel.insertRow(window.document.getElementById("pozitia").value - 1);
  for(i = 0;i<nrColoane;i++) {
    var cell = rand.insertCell(i);
    cell.bgColor = window.document.getElementById("fundal").value;
    cell.innerHTML=" ";
  }
}

function insertColoana() {
  var tabel = window.document.getElementById("tabeldinamic");
  var randuri = tabel.rows;
  for (var i = 0, rand; rand = tabel.rows[i]; i++) {
    var cell = rand.insertCell(window.document.getElementById("pozitia").value - 1);
    cell.bgColor = window.document.getElementById("fundal").value;
    cell.innerHTML=" ";
  }
  nrColoane++;
}
