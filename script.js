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
        for(let i = 0; i < 100; i++) {
            confettis.push(new confetti_object(200, 200, 10, 10, colors[i % colors.length], Math.random() * 10 - 5, Math.random() * -10));
        }
        update();
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = confettis.length - 1; i >= 0; i--) {
        let obj = confettis[i];
        obj.x += obj.xchange;
        obj.y += obj.ychange;
        obj.ychange += 1;

        ctx.fillStyle = obj.color;
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);

        if(obj.y > 400 || obj.x < 0 || obj.x > 400) {
            confettis.splice(i, 1);
        }
    }

    if (confettis.length > 0) {
        requestAnimationFrame(update);
    } else {
        currently_confettiing = false;
    }
}