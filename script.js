const canvas = document.getElementById("it4button");
const ctx = canvas.getContext("2d");
class confetti_object {
    constructor(x, y, width, height, color, xchange, ychange) {
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.color=color;
        this.xchange=xchange;
        this.ychange=ychange;
    }
}
const max_xchange = 20;
const max_ychange = 20;
const colors = ["red", "orange", "yellow", "green", "blue", "purple"];
let confettis = [];
let currently_confettiing = false;
function confetti() {
    if(currently_confettiing === false) {
        currently_confettiing = true;
        for(let i = 0; i<401; i++) {
            confettis.push(confetti_object(0, 0, 10, 20, (colors[colors.length % i]), Math.floor(Math.random() * max_xchange) - 10, Math.floor(Math.random() * max_ychange) - 10));
        }
        while(confettis.length > 0) {
            let c = 0
            for(const obj in confettis) {
                obj.x = obj.x + obj.xchange;
                obj.y = obj.y + obj.ychange;
                obj.ychange = obj.ychange + 1;
                ctx.fillStyle = obj.color;
                ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
                if(obj.y < 0 || obj.y > 400 || obj.x < 0 || obj.x > 400) {
                    confettis.splice(c, 1);
                }
            }
        }
    }
}