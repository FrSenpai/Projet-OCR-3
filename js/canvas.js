class Canvas {
    canvas = document.getElementById("signature");
    ctx = this.canvas.getContext('2d');
    painting = false;
    signatureOK = false;
  
    constructor() {

        // Gestion du curseur sur le canvas
        this.canvas.addEventListener("mouseup", (e) => this.finPosition());
        this.canvas.addEventListener("mousedown", (e) => this.debutPosition());
        this.canvas.addEventListener("mousemove", (e) => this.dessinerTrait(e));
        // Gestion des events sur mobile
        this.canvas.addEventListener("touchstart", (e) => this.debutPosition(e));
        this.canvas.addEventListener("touchmove", (e) => this.dessinerTouch(e));
        this.canvas.addEventListener("touchend", (e) => this.finPosition(e));

    }

    debutPosition() {
        this.painting = true;
    }

    finPosition() {
        this.painting = false;
        this.ctx.beginPath();
    }

    dessinerTrait(e) {
        if (!this.painting) {
            console.log("Survol");
        } else {
            this.ctx.lineWidth = 5;
            this.ctx.lineCap = 'round';
            this.ctx.lineTo(e.offsetX, e.offsetY); 
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(e.offsetX, e.offsetY);
            this.signatureOK = true;
        }
    }
// Tenter de faire un convertisseur
    dessinerTouch(e) {
        e.preventDefault();
        let rect = this.canvas.getBoundingClientRect()
        let touch = e.changedTouches[0];

        if (!this.painting) {
            console.log("Survol");
        } else {
            this.ctx.lineWidth = 5;
            this.ctx.lineCap = 'round';
            this.ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
            this.signatureOK = true;
        }

    }



}