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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
        obj.ychange += 0.25;
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
const canvas2=document.getElementById("it6canvas");
const ctx2=canvas2.getContext("2d");
let titlescreen=true;
let shop=false;
let clicked=false;
let score = 0;
let score_change = 1;
let sps = 0;
let score_x = 15;
let score_y = 15;
const button_img = new Image();
button_img.src="./ClickerGame/button.png";
function update2() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
    if (!shop && !titlescreen) {
        ctx2.fillText(score.toString(), score_x, score_y);
        if (clicked) {
            ctx2.drawImage(button_img, 0, 178.8, 178.8, 178.8, (canvas2.width-178.8)/2, (canvas2.height-178.8)/2, 178.8, 178.8);
        } else {
            ctx2.drawImage(button_img, 0, 0, 178.8, 178.8, (canvas2.width-178.8)/2, (canvas2.height-178.8)/2, 178.8, 178.8);
        }
    } else if (!shop && titlescreen) {
        ctx2.fillText("Title", canvas2.width/2-50, canvas2.height/2-100);
        ctx2.fillRect(canvas2.width/2-50, canvas2.height/2+50, 100, 50);
    }
}
canvas2.addEventListener('click', function(event) {
    let mouse_pos = getMousePosition(canvas2, event)
    if (!shop && !titlescreen) {
        if (mouse_pos.x < 449.4 && mouse_pos.x > 270.6 && mouse_pos.y > 250.6 && mouse_pos.y < 429.4) {
            if (!clicked) {
                score = score + score_change;
            }
            clicked = true;
        }
    } else if (!shop && titlescreen) {
        if (mouse_pos.x > canvas2.width/2 - 50 && mouse_pos.x < canvas2.width/2 + 50 && mouse_pos.y > canvas2.height/2 + 50 && mouse_pos.y < canvas2.height/2 + 100) {
            titlescreen=0;
        }
    }
})