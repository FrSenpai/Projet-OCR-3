class Map {
    mapElt = document.getElementById("map");
    reservationElt = document.getElementById("panelReservation");
    map = L.map('map').setView([43.60141, 1.44446], 16); // Définition de la map ainsi que sa position géo-graphique ([lat, lng] , zoom)
    etatPanel = false; 
    constructor() {
        this.chargementApi();
        this.afficherCarte();
        this.mapElt = document.getElementById("map");
    }

    afficherCarte() {
        // Affichage de la carte via l'API Leaflet
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 40, 
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1Ijoic2VucGFpNDAyIiwiYSI6ImNqendvOXNvYjBqanczZ3E5cTkwaG8zNWUifQ.P6XnEKah_lmIRkbly5YP0w'
        }).addTo(this.map);

        this.iconeRouge = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        this.iconeOrange = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        this.iconeVerte = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
    }

    chargementApi() {
        // Récupération des données concernant les stations
        $.getJSON("https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=00725f1585ae004d2043b59894843d43b6650b8e")
            .then((api) => {
                this.api = api;
                this.affichageIcone();
            });
    }

    affichageIcone() {
        // Affichage des icones des stations
        const stations = this.api;
        const adresseElt = document.getElementById("adresseStation");
        const etatStationElt = document.getElementById("etatStation");
        const veloDispoElt = document.getElementById("veloDispoStations");
        const placeDispoElt = document.getElementById("placesDispoStations");

        stations.map(station => { 
            // Si la station est fermée, alors icone rouge, si ouvert & pas de velo alors orange, autre (open) vert
            if (station.status === "CLOSED") {
                this.iconeMap = L.marker([station.position.lat, station.position.lng], {icon: this.iconeRouge}).addTo(this.map);
            } else if (station.available_bikes ===  0 && station.status === "OPEN" ) {
                this.iconeMap = L.marker([station.position.lat, station.position.lng], {icon: this.iconeOrange}).addTo(this.map);
            } else {
                this.iconeMap = L.marker([station.position.lat, station.position.lng], {icon: this.iconeVerte}).addTo(this.map);
            }
            //Lors d'un clic, la map se réduit et une fenêtre d'informations apparait.
            this.iconeMap.addEventListener(`click`,  (e) => {
                if (timer.etatTimer === true) {
                    alert("Vous devez d'abord annuler votre réservation en cours avant d'en refaire une autre.");
                } else if (station.available_bikes ===  0) {
                    alert("Cette station ne possède plus de vélo disponible.");
                } else if (station.status === "CLOSED") {
                    alert("Cette station est actuellement fermée.");
                } else if (reservation.panelCanvasElt.style.display === "flex") {
                    reservation.panelCanvasElt.style.display = "none";
                    this.reservationElt.style.display = "flex";
                } else {
                    // Si la taille de la fenêtre est supérieure à 1000px (Partie responsive)
                    if (window.width > 1000) {
                        this.mapElt.style.width = "60%";
                        this.mapElt.style.marginLeft = "5%";
                    } 
                this.reservationElt.style.display = "flex";
                adresseElt.textContent = `Adresse : ${station.address}`;
                if (station.status === "OPEN") {
                    etatStationElt.textContent = `Etat : Ouvert !`;
                } 
                veloDispoElt.textContent = `Vélo(s) disponible(s) : ${station.available_bikes}`; 
                placeDispoElt.textContent = `Place(s) disponible(s) : ${station.available_bike_stands}`;
                }
            } ); 
        });
    }
}