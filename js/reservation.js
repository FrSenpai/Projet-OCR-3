class Reservation {

    // Variables DOM
    prenomElt = document.getElementById("prenom");
    nomElt = document.getElementById("nom");
    boutonPanelReservationElt = document.getElementById("boutonReserver");
    panelReservationElt = document.getElementById("panelReservation");
    panelCanvasElt = document.getElementById("panelCanvas");
    boutonPanelCanvasElt = document.getElementById("validationCanvas");
    infoReservationElt = document.getElementById("reservationEnCours");
    tempsRestantElt = document.getElementById("tempsRestant");
    annulerReservationElt = document.getElementById("annulerReservation"); // Annulation via l'onglet du temps restant

    // Autres
    initTimer = new Timer();
    prenomUtilisateur = "";
    nomUtilisateur = "";

    constructor() {
        this.initEvent();
        
    }

    initEvent() {
        // Afficher la div uniquement quand chargement ok
        window.addEventListener("load", (e) => {
            if (sessionStorage.getItem("minutes") && sessionStorage.getItem("secondes")) { // Si une réservation est déjà en cours, relance le timer.
                timer.etatTimer = true;
                timer.timer();
            } else {
                timer.etatTimer = false;
            }
        })
        
        // Gestion des interactions de l'utilisateur.
        this.prenomElt.addEventListener("click", (e) => this.informationsConnu());

        this.boutonPanelReservationElt.addEventListener("click", (e) => {
            this.verifierInformations();
            // Si input prénom & nom sont corrects, alors envoyer les données, sinon "" "" ""
            if (this.prenomOk === 1 && this.nomOk === 1) {
                localStorage.setItem("prenom", this.prenomUtilisateur);
                localStorage.setItem("nom", this.nomUtilisateur);
                this.panelReservationElt.style.display = "None";
                this.panelCanvasElt.style.display = "flex";
            }
        })

        this.boutonPanelCanvasElt.addEventListener("click", (e) => {
            if (canvas.signatureOK === true) {
                timer.etatTimer = true;
                timer.timer();
                document.getElementById("map").style.width = "90%";
                this.panelCanvasElt.style.display = "none";
                document.getElementById("signatureInvalide").style.visibility = "hidden";
                canvas.signatureOK = false;
                this.tempsRestantElt.textContent = `Votre reservation expire dans 20 minutes !`;
            } else {
                document.getElementById("signatureInvalide").style.visibility = "visible";
            }

        })
            // annuler une réservation
        this.annulerReservationElt.addEventListener("click", (e) => {
            timer.stopTimer();
        })
    }
    
    
    
    informationsConnu() {
        // Si un prénom ou un nom ont été déjà envoyé, les inputs les prennent comme valeur
        if (localStorage.getItem("nom")) {
            this.nomElt.value = localStorage.getItem("nom");
        }
        if (localStorage.getItem("prenom")) {
            this.prenomElt.value = localStorage.getItem("prenom");
        }
    }

    verifierInformations() {
        const regex = /[a-zA-ZÀ-ÿ-]+/;
        // Limite de caractères

        // Si le prénom est syntaxiquement correct alors
        if (!regex.test(this.prenomElt.value)) {
            this.prenomOk = 0;
            document.getElementById("prenomRequis").style.visibility = "visible";
        } else { // To-do : Affichage d'un message de prévention en cas d'erreur dans le prénom
            this.prenomUtilisateur = this.prenomElt.value;
            this.prenomOk = 1;
            document.getElementById("prenomRequis").style.visibility = "hidden";
        }
        // Si le nom est syntaxiquement correct alors
        if (!regex.test(this.nomElt.value)) {
            this.nomOk = 0 // Nom incorrect !
            document.getElementById("nomRequis").style.visibility = "visible";
        } else {
            this.nomUtilisateur = this.nomElt.value;
            this.nomOk = 1; // Nom ok !
            document.getElementById("nomRequis").style.visibility = "hidden";
        }
    }

}