var lista = [];
var now = 0;
var max = 30;
var item_control = true;
var max_control = true;

//Controlla se un item esiste
function esiste (name) {
	var res = false;

	for (var i=0; i<lista.length; i++){
		if (lista[i].nome == name){
			res = true;
			now = i;
			break;
		}
	}

	return res;
}

//Mosta o nasconde il form
function form_inserisci () {
	if (item_control == true) {
		document.getElementById("ins_item").style.display = "block";
		item_control = false;
	}
	else {
		document.getElementById("ins_item").style.display = "none";
		item_control = true;
	}
}

//Crea o modifica l'item
function nuovoItem () {
	var nome = document.getElementById("nome").value;
	var num = document.getElementById("num").value;

	if (isNaN(num) == false) {
		if (esiste(nome)){
			lista[now].numero += Number(num);

			if(lista[now].numero > max) {
				alert("Il massimo e': " + max);
				lista[now].numero = max;
			}
			if(lista[now].numero < 0) {
				alert("Il minimo e' 0");
				lista[now].numero = 0;
			}
		}
		else {
			var item = {
				nome: nome,
				numero: Number(num),
			};

			lista.push(item);
			now = lista.length - 1;

			if (lista[now].numero > max) {
				alert("Il massimo e': " + max);
				lista[now].numero = max;
			}

			if (lista[now].numero < 0) {
				alert("Il minimo e' 0");
				lista[now].numero = 0;
			}
		}

		tabella();
		document.getElementById("nome").value = "";
		document.getElementById("num").value = "";
		document.getElementById("ins_item").style.display = "none";
		item_control = true;
	}
	else {
		alert(num + " non e' un numero");
	}
}

//Mostra il massimo
function mostraMax () {
	document.getElementById("massimo").innerHTML = max;
}

//Mostra il form per il nuovo massimo
function form_max () {
	if (max_control == true) {
		document.getElementById("ins_max").style.display = "block";
		max_control = false;
	}
	else {
		document.getElementById("ins_max").style.display = "none";
		max_control = true;
	}
}

//Modifica il massimo
function nuovoMassimo () {
	var nuovo = document.getElementById("max").value;

	if (isNaN(nuovo) == false) {
		if (nuovo > 0) {
			max = Number(nuovo);
			alert("Nuovo massimo: " + max);

			for (var i=0; i<lista.length; i++) {
				if (lista[i].numero > max){
					lista[i].numero = max;
				}
			}

			tabella();
			mostraMax();
			document.getElementById("max").value = "";
			document.getElementById("ins_max").style.display = "none";
			max_control = true;
		}
		else {
			alert(nuovo + " e' negativo o 0");
		}
	}
	else {
		alert(nuovo + " non e' un numero");
	}
}


//Crea e ricrea la tabella
function tabella () {

	var tab = document.getElementById("tabella");
	tab.innerHTML = "";
	var tabella = document.createElement("table");
	var riga = document.createElement("tr");
	var primo = document.createElement("th");
	primo.appendChild(document.createTextNode("Oggetto"));
	var secondo = document.createElement("th");
	secondo.appendChild(document.createTextNode("numeroero"));

	riga.appendChild(primo);
	riga.appendChild(secondo);
	tabella.appendChild(riga);

	for (var i=0; i<lista.length; i++) {

		riga = document.createElement("tr");
		primo = document.createElement("td");
		primo.appendChild(document.createTextNode(lista[i].nome));
		secondo = document.createElement("td");
		secondo.appendChild(document.createTextNode(lista[i].numero));

		riga.appendChild(primo);
		riga.appendChild(secondo);
		tabella.appendChild(riga);
	}

	tab.appendChild(tabella);
}