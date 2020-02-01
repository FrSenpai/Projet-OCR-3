class Canvas {
    canvas = document.getElementById("signature");
    ctx = this.canvas.getContext('2d');
    dessine = false;
    signatureOK = false;
  
    constructor() {

        // Gestion du curseur sur le canvas
        this.canvas.addEventListener("mouseup", () => this.finPosition());
        this.canvas.addEventListener("mousedown", () => this.debutPosition());
        this.canvas.addEventListener("mousemove", (e) => this.dessinerTrait(e));
        // Gestion des events sur mobile
        this.canvas.addEventListener("touchstart", () => this.debutPosition(e));
        this.canvas.addEventListener("touchmove", (e) => this.dessinerTouch(e));
        this.canvas.addEventListener("touchend", () => this.finPosition(e));

    }

    debutPosition() {
        this.dessine = true;
    }

    finPosition() {
        this.dessine = false;
        this.ctx.beginPath();
    }

    dessinerTrait(e) {
        if (this.dessine) {
            this.ctx.lineWidth = 5;
            this.ctx.lineCap = 'round';
            this.ctx.lineTo(e.offsetX, e.offsetY); 
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(e.offsetX, e.offsetY);
            this.signatureOK = true;
        }
    }

    dessinerTouch(e) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect()
        const touch = e.changedTouches[0];

        if (this.dessine) {
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