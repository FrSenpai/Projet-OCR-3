class Timer {
    minutes = 19;
    secondes = 60;
    etatTimer = false;

    timer() {
        // Si des données concernant une réservations sont présents, modifier les minutes & secondes selon celles-ci.
        if (sessionStorage.getItem("minutes") && sessionStorage.getItem("secondes")) {
            this.minutes = sessionStorage.getItem("minutes");
            this.secondes = sessionStorage.getItem("secondes");
            reservation.tempsRestantElt.textContent = `Votre reservation expire dans ${this.minutes} minutes et ${this.secondes} secondes !`;
        }
        //Décrémentation de 1 au timer chaque secondes.
        const minuteur = setInterval((e) => {
            this.secondes--;
            if (this.minutes === 0 && this.secondes === 0) { // Temps écoulé ! Désactivation & reset du timer.
                this.minutes = 19;
                this.secondes = 60;
                reservation.boutonPanelCanvasElt.style.display = "flex";
                reservation.infoReservationElt.style.display = "None";
                // Clean du canvas.
                document.getElementById("signature").getContext('2d').clearRect(0, 0, 150, 150);
                canvas.signatureOK = false;
                this.etatTimer = false;
                clearInterval(minuteur);
            } else if (this.secondes <= 0) {
                this.minutes--;
                this.secondes = 59;
            }

            // Affichage & enregistrement des données jusqu'à fermeture du navigateur ou annulation
            reservation.tempsRestantElt.textContent = `Votre reservation expire dans ${this.minutes} minutes et ${this.secondes} secondes !`;
            sessionStorage.setItem('secondes', `${this.secondes}`);
            sessionStorage.setItem("minutes", `${this.minutes}`);

            // Si le timer est désactivé, remettre à zéro les données & reset l'interval
            if (this.etatTimer === false) {
                this.minutes = 19;
                this.secondes = 60;
                sessionStorage.removeItem("secondes");
                sessionStorage.removeItem("minutes");
                clearInterval(minuteur);
            }
        }, 1000)
        reservation.infoReservationElt.style.display = "flex";
    }

    stopTimer() {
        // On désactive et supprime la moindre donnée concernant une réservation + clean du canvas
        timer.etatTimer = false;
        reservation.boutonPanelCanvasElt.style.display = "flex";
        reservation.infoReservationElt.style.display = "None";
        document.getElementById("signature").getContext('2d').clearRect(0, 0, 150, 150);
        canvas.signatureOK = false;
        sessionStorage.removeItem("secondes");
        sessionStorage.removeItem("minutes");
    }
}