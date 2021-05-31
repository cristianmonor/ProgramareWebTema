const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const fs = require('fs');
const cookieParser = require('cookie-parser');
const session = require('express-session');

var mysql = require('mysql');

const app = express();
app.use(cookieParser());

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 10000
	}
}));
const port = 6789;

// directorul 'views' va conține fișierele .ejs (html + js executat la server)
app.set('view engine', 'ejs');
// suport pentru layout-uri - implicit fișierul care reprezintă template-ul site-ului este views/layout.ejs
app.use(expressLayouts);
// directorul 'public' va conține toate resursele accesibile direct de către client (e.g., fișiere css, javascript, imagini)
app.use(express.static('public'));
// corpul mesajului poate fi interpretat ca json; datele de la formular se găsesc în format json în req.body
app.use(bodyParser.json());
// utilizarea unui algoritm de deep parsing care suportă obiecte în obiecte
app.use(bodyParser.urlencoded({
	extended: true
}));

var listaIntrebari;
fs.readFile('intrebari.json', (err, intrebari) => {
	if (err) throw err;
	listaIntrebari = JSON.parse(intrebari);
});

var listaUtilizatori;
fs.readFile('utilizatori.json', (err, utilizatori) => {
	if (err) throw err;
	listaUtilizatori = JSON.parse(utilizatori);
});

var cosCumparaturi = []

// la accesarea din browser adresei http://localhost:6789/ se va returna textul 'Hello World'
// proprietățile obiectului Request - req - https://expressjs.com/en/api.html#req
// proprietățile obiectului Response - res - https://expressjs.com/en/api.html#res
app.get('/', (req, res) => {
	var cookies = req.cookies;
	var produse;

	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "123catalina",
		database: "cumparaturi"
	});

	con.connect(function (err) {
		if (err) throw err;
		con.query("SELECT * FROM produse", function (err, result, fields) {
			if (err) throw err;
			res.render("index", {
				cookies: cookies,
				result: result
			});
		});
	});
});

app.get('/autentificare', (req, res) => {
	var cookies = req.cookies;
	res.render('autentificare', {
		cookies
	});
});

app.get('/inregistrare', (req, res) => {
	var cookies = req.cookies;
	res.render('inregistrare', {
		cookies
	});
});

app.get('/categorieA', (req, res) => {
	var cookies = req.cookies;
	res.render('categorieA', {
		cookies
	});
});
app.get('/categorieB', (req, res) => {
	var cookies = req.cookies;
	res.render('categorieB', {
		cookies
	});
});
app.get('/categorieC', (req, res) => {
	var cookies = req.cookies;
	res.render('categorieC', {
		cookies
	});
});
app.post('/verificare-autentificare', (req, res) => {
	let found = false;
	for (let i = 0; i < listaUtilizatori.length; i++) {
		if (req.body.username == listaUtilizatori[i].utilizator && req.body.password == listaUtilizatori[i].parola) {
			req.session.utilizator = listaUtilizatori[i].utilizator;
			req.session.tara = listaUtilizatori[i].tara;
			res.cookie('username', listaUtilizatori[i].utilizator);
			found = true;
			res.redirect('/');
		}
	}
	if (found == false) {
		res.cookie('mesajEroare', 'Date incorecte', {
			maxAge: 1000
		});
		res.redirect('/autentificare')
	}
});

var users = {
	table: []
};

app.post('/verificare-inregistrare', (req, res) => {
	if (req.body.password == req.body.passwordRepeat) {
		req.session.utilizator = req.body.name;
		res.cookie('username', req.body.name);
		console.log(req.body);
		console.log(req.body.name,req.body.email,req.body.password);
		users.table.push({
			name: req.body.name,
			email: req.body.email,
			parola: req.body.password
		});
		var json=JSON.stringify(users);
		fs.writeFile('utilizatori.json', json, 'utf8',function(){
			console.log("succes");
		});

		// fs.readFile('utilizatori.json', 'utf8', function readFileCallback(err, data) {
		// 	if (err) {
		// 		console.log(err);
		// 	} else {
		// 		users = JSON.parse(data); //now it an object
		// 		users.table.push({
		// 			name: req.body.name,
		// 			email: req.body.email,
		// 			parola: req.body.password
		// 		}); //add some data
		// 		json = JSON.stringify(users); //convert it back to json
		// 		fs.writeFile('utilizatori.json', json, 'utf8', callback); // write it back 
		// 	}
		// });
		res.redirect('/');
	} else {
		res.cookie('mesajEroare', 'Date incorecte', {
			maxAge: 1000
		});
		res.redirect('/inregistrare')
	}
});

app.get('/creare-bd', (req, res) => {
	var con = mysql.createConnection({
		host: "localhost",
		user: "student",
		password: "",
		database: "test_cumparaturi"
	});

	con.connect(function (err) {
		if (err) throw err;
		console.log("Connected!");
		con.query("CREATE DATABASE IF NOT EXISTS test_cumparaturi", function (err, result) {
			if (err) throw err;
			console.log("Database created");
		});
		var sql = "CREATE TABLE IF NOT EXISTS produse (id INTEGER(3), nume VARCHAR(255), pret INTEGER(4));";
		con.query(sql, function (err, result) {
			if (err) throw err;
			console.log("Table created");
			res.redirect("/");
		});
	});

});




app.get('/incarcare-bd', (req, res) => {
	var con = mysql.createConnection({
		host: "localhost",
		user: "student",
		password: "",
		database: "test_cumparaturi"
	});

	con.connect(function (err) {
		if (err) throw err;
		console.log("Connected!");

		con.query("insert into produse values (0,'Mașină de tuns iarba',2349);", function (err, result) {
			if (err) throw err;
			console.log("product inserted");
		});
		con.query("insert into produse values (1,'Fierăstrău electric',1299);", function (err, result) {
			if (err) throw err;
			console.log("product inserted");
		});
		con.query("insert into produse values (2,'Mașină de găurit și înșurubat',799);", function (err, result) {
			if (err) throw err;
			console.log("product inserted");
		});
		con.query("insert into produse values (3,'Bandă abrazivă pentru șlefuire',69);", function (err, result) {
			if (err) throw err;
			console.log("product inserted");
		});
		con.query("insert into produse values (4,'Stand reglabil pentru fierăstrău',699);", function (err, result) {
			if (err) throw err;
			console.log("product inserted");
		});
		con.query("insert into produse values (5,'Foarfecă tuns gard viu',759);", function (err, result) {
			if (err) throw err;
			console.log("product inserted");
		});
		con.query("insert into produse values (6,'Fir pentru trimmer',9);", function (err, result) {
			if (err) throw err;
			console.log("product inserted");
		});
		con.query("insert into produse values (7,'Aspirator de grădină',779);", function (err, result) {
			if (err) throw err;
			console.log("product inserted");
		});
		con.query("insert into produse values (8,'Trimmer iarbă electric',519);", function (err, result) {
			if (err) throw err;
			console.log("product inserted");
		});
		con.query("insert into produse values (9,'Set pânze fierăstrău',45);", function (err, result) {
			if (err) throw err;
			console.log("product inserted");
		});
		res.redirect("/");
	});
});

// la accesarea din browser adresei http://localhost:6789/chestionar se va apela funcția specificată
app.get('/chestionar', (req, res) => {
	// // în fișierul views/chestionar.ejs este accesibilă variabila 'intrebari' care conține vectorul de întrebări
	res.render('chestionar', {
		intrebari: listaIntrebari
	});
});

app.post('/rezultat-chestionar', (req, res) => {
	console.log(req.body);
	let raspCorecte = 0;
	for (let i = 0; i < listaIntrebari.length; i++) {
		if (req.body[i] == listaIntrebari[i].corect) {
			raspCorecte++;
		}
	}
	res.render('rezultat-chestionar', {
		raspunsuri: raspCorecte
	});
});

app.post('/adauga-cos', (req, res) => {
	cosCumparaturi.push(req.body);
	console.log(req.body)
	res.redirect("/");
});

app.get('/vizualizare-cos', (req, res) => {
	res.render('vizualizare-cos', {
		cosCumparaturi: cosCumparaturi
	});
});

app.listen(port, () => console.log(`Serverul rulează la adresa http://localhost:`));