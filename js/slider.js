class Slider {
    timer = 5; // Le timer en s
    imgActuelle = 0; // L'image actuelle affichée sur le slider, par défault = 0
    etatSlider = 1; // 1 = En route, 0 = En pause

    // TO DO : Rajouter Elt sur les variables qui concernent des élements du DOM

    constructor() {

        // Variables DOM
        this.flecheGaucheElt = document.getElementById("flecheGauche");
        this.flecheDroiteElt = document.getElementById("flecheDroite");
        this.imageElt = document.getElementById("imgSlider");
        this.descriptionSliderElt = document.getElementById("descriptionSlider");
        this.buttonPauseElt = document.getElementById("pause-Play");
        this.navigateur = window;
        // Autre
        this.timerImage();
        this.flecheGaucheElt.addEventListener("click", (e) => this.imagePrecedente());
        this.flecheDroiteElt.addEventListener("click", (e) => this.imageSuivante());
        this.buttonPauseElt.addEventListener("click", (e) => this.pauseReprise());
        this.navigateur.addEventListener("keydown", (e) => this.gestionTouche());
    }

    imagePrecedente() {
        // Se produit lors d'un clic sur la flèche gauche présente sur le slider
        if (this.imgActuelle <= -1) {
            this.imgActuelle = 1;
        } else {
            this.imgActuelle--;
        }
        this.imageElt.src = `../media/sliderbackground-${this.imgActuelle}.jpg`;
        this.timer = 5;
        if (this.imgActuelle === 0) {
            this.descriptionSliderElt.textContent = `Première étape : Cliquez sur la station de votre choix !`;
        } else if (this.imgActuelle === 1) {
            this.descriptionSliderElt.textContent = `Deuxième étape : Remplissez le formulaire de réservation`;
        } else if (this.imgActuelle === -1) {
            this.descriptionSliderElt.textContent = `Dernière étape : Signez et finalisez votre réservation !`;
        }
    }

    imageSuivante() {
        // Se produit lors d'un clic sur la flèche droite présente sur le slider
        if (this.imgActuelle >= 1) {
            this.imgActuelle = -1;
        } else {
            this.imgActuelle++;
        }
        this.imageElt.src = `../media/sliderbackground-${this.imgActuelle}.jpg`;
        this.timer = 5;
        if (this.imgActuelle === 0) {
            this.descriptionSliderElt.textContent = `Première étape : Cliquez sur la station de votre choix !`;
        } else if (this.imgActuelle === 1) {
            this.descriptionSliderElt.textContent = `Deuxième étape : Remplissez le formulaire de réservation`;
        } else if (this.imgActuelle === -1) {
            this.descriptionSliderElt.textContent = `Dernière étape : Signez et finalisez votre réservation !`;
        }
    }

    timerImage() {
        // Change de slide toutes les 5 secondes, si interaction de l'utilisateur, reset le timer (imageSuivante,imagePrecedente).
        setInterval(() => {
            // Si le timer est en route, le décrementer, sinon, ne rien faire
            if (this.etatSlider > 0) {
                this.timer--;
            }
            if (this.timer === 0) {
                this.imageSuivante();
            }
        }, 1000);
    }

    gestionTouche() {
        // Gère les appuis de touches 
        if (event.keyCode === 37) { // flèche gauche
            return this.imagePrecedente();
        } else if (event.keyCode === 39) { // flèche droite
            return this.imageSuivante();
        }
    }

    pauseReprise() {
        // Si le timer est en route, mise en pause lors du clic, sinon remise en route !
        if (this.etatSlider > 0) {
            this.etatSlider = 0;
            this.buttonPauseElt.className = "far fa-play-circle";
        } else {
            this.etatSlider = 1;
            this.buttonPauseElt.className = "far fa-pause-circle";
        }
    }
}