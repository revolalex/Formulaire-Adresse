// Boutons Envoi
var formValid = document.getElementById('bouton_envoi');

// prenom
var prenom = document.getElementById('prenom');
var nom = document.getElementById('nom');
var missPrenom = document.getElementById('missPrenom');
var prenomValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/; // Regex pour validation

// date
var dateNaissance = document.getElementById('date');
var missDate = document.getElementById('missDate');
var dateValid = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

// email
var adressMail = document.getElementById('email');
var missEmail = document.getElementById('missEmail');
//regex pour validation email
var emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// coordonnées
var cp = document.getElementById('cp');
var cpValid = /^(([0-8][0-9])|(9[0-5])|(2[ab]))[0-9]{3}$/;
var missCp = document.getElementById('missCp');

var ville = document.getElementById('ville');
var adresse = document.getElementById('adresse');
var missAdresse = document.getElementById('missAdresse');

var newsLetter = "Non abonné";


// control
var controlPrenom, controlNom, controlDate, controlMail, controlCp, controlAdresse;

// au clic sur le bouton éxécute la fonction validation
formValid.addEventListener('click', validation);

// fonction validation si tous les controles sont true alertSaisie()
function validation(event) {
    
    if (checkFormulaire()) {
        alertSaisie();
    }
}






function newsLetterOk(){
    newsLetter = "Abonné";
}
// on controle si tout les controls sont true
function checkFormulaire() {
    return controlPrenom && controlNom && controlDate && controlMail && controlCp && controlAdresse;
}

// recapitule les éléments saisie en alert
function alertSaisie() {
    alert(
        'Récap Saisie : ' + '\n'
        + prenom.value + ' ' + nom.value + '\n'
        + 'Date de naissance : ' + dateNaissance.value + '\n'
        + 'Email : ' + adressMail.value + '\n'
        + 'Vous habitez : ' + ville.value + '\n'
        + 'Votre adresse : ' + adresse.value + '\n'
        + 'Code postal :  ' + cp.value + '\n' 
        + 'Statut Newletters : '+ newsLetter);
}



// controle prénom
function checkPrenom() {
    //Si le champ est vide
    if (prenom.validity.valueMissing) {
        missPrenom.textContent = 'Prénom manquant';
        missPrenom.style.color = '#bb3d3d';
        controlPrenom = false;
        //Si le format de données est incorrect
    } else if (prenomValid.test(prenom.value) == false) {
        missPrenom.textContent = 'Format incorrect';
        missPrenom.style.color = 'orange';
        controlPrenom = false;
    } else {
        missPrenom.textContent = 'Format correct';
        missPrenom.style.color = '#69B692';
        controlPrenom = true;
    }
}


// controle nom
function checkNom() {
    //Si le champ est vide
    if (nom.validity.valueMissing) {
        missNom.textContent = 'Nom manquant';
        missNom.style.color = '#bb3d3d';
        controlNom = false;
        //Si le format de données est incorrect
    } else if (prenomValid.test(nom.value) == false) {
        missNom.textContent = 'Format incorrect';
        missNom.style.color = 'orange';
        controlNom = false;
    } else {
        missNom.textContent = 'Format correct';
        missNom.style.color = '#69B692';
        controlNom = true;
    }

}

// controle date
function checkDate() {
    if (dateNaissance.validity.valueMissing) {
        missDate.textContent = 'Date Manquante';
        missDate.style.color = '#bb3d3d';
        controlDate = false;
    } else if (dateValid.test(dateNaissance.value) == false) {
        missDate.textContent = 'Format Incorrect';
        missDate.style.color = 'orange';
        controlDate = false;
    } else {
        missDate.textContent = 'Format Correct';
        missDate.style.color = '#69B692';
        controlDate = true;
    }
}


// controle email
function checkEmail() {
    // si le champs est vide
    if (adressMail.validity.valueMissing) {
        // affiche email manquant
        missEmail.textContent = 'Email manquant';
        // de couleur rouge
        missEmail.style.color = '#bb3d3d';
        controlMail = false;
        // sinon l'email n'est pas correct  test REGEX
    } else if (emailValid.test(adressMail.value) == false) {
        // affiche email invalide
        missEmail.textContent = 'Email invalide';
        //de couleur orange
        missEmail.style.color = 'orange';
        controlMail = false;
    } else {
        missEmail.textContent = 'Format correct';
        missEmail.style.color = '#69B692';
        controlMail = true;
    }
}

// controle code postal
function checkCp() {
    if (cp.validity.valueMissing) {
        missCp.textContent = 'CP manquant';
        missCp.style.color = '#bb3d3d';
        controlCp = false;
        //Si le format de données est incorrect
    } else if (cpValid.test(cp.value) == false) {
        missCp.textContent = 'Format incorrect';
        missCp.style.color = 'orange';
        controlCp = false;
    } else {
        missCp.textContent = 'Format correct';
        missCp.style.color = '#69B692';
        controlCp = true;
    }

}

function checkAdresse() {
    if (adresse.validity.valueMissing) {
        missAdresse.textContent = 'Adresse manquante';
        missAdresse.style.color = '#bb3d3d';
        controlAdresse = false;
    } else {
        missAdresse.textContent = 'Format correct';
        missAdresse.style.color = '#69B692';
        controlAdresse = true;
    }

}

















$("#cp").autocomplete({
    // la fonction anonyme permet de maintenir une requête AJAX directement dans le plugin
    source: function (request, response) {
        //requete ajax
        $.ajax({
            url: "https://api-adresse.data.gouv.fr/search/?postcode=" + $("input[name='cp']").val(), // on ajoute la valeur du CP 
            data: { q: request.term }, // requete
            dataType: "json", // de type json

            // on se prépare à renvoyer les données réceptionnées grâce à l'évènement de succès
            success: function (data) {
                var postcodes = [];
                response($.map(data.features, function (item) {
                    // Ici on est obligé d'ajouter les CP dans un array pour ne pas avoir plusieurs fois le même
                    if ($.inArray(item.properties.postcode, postcodes) == -1) {
                        postcodes.push(item.properties.postcode);
                        return {
                            label: item.properties.postcode + " - " + item.properties.city,
                            city: item.properties.city,
                            value: item.properties.postcode
                        };
                    }
                }));
            }
        });
    },

    // On remplit aussi la ville
    select: function (event, ui) {
        $('#ville').val(ui.item.city);
    },

});

$("#ville").autocomplete({
    source: function (request, response) {
        $.ajax({
            url: "https://api-adresse.data.gouv.fr/search/?city=" + $("input[name='ville']").val(),
            data: { q: request.term },
            dataType: "json",
            success: function (data) {
                var cities = [];
                response($.map(data.features, function (item) {
                    // Ici on est obligé d'ajouter les villes dans un array pour ne pas avoir plusieurs fois la même
                    if ($.inArray(item.properties.postcode, cities) == -1) {
                        cities.push(item.properties.postcode);
                        return {
                            label: item.properties.postcode + " - " + item.properties.city,
                            postcode: item.properties.postcode,
                            value: item.properties.city
                        };
                    }
                }));
            }
        });
    },
    // On remplit aussi le CP
    select: function (event, ui) {
        $('#cp').val(ui.item.postcode);
    }
});

$("#adresse").autocomplete({
    source: function (request, response) {
        $.ajax({
            url: "https://api-adresse.data.gouv.fr/search/?postcode=" + $("input[name='cp']").val(),
            data: { q: request.term },
            dataType: "json",
            success: function (data) {
                response($.map(data.features, function (item) {
                    return { label: item.properties.name, value: item.properties.name };
                }));
            }
        });
    }
});


// Coordonnée







