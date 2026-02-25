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
ctx2.font = "30px Arial";
let titlescreen=true;
let shop=false;
let clicked=false;
let score = 0;
let score_change = 1;
let score_x = 45;
let score_xchange = 0;
let score_y = 45;
const button_img = new Image();
button_img.src="./ClickerGame/button.png";
window.onload = function() {
    update2();
}
class RectButton {
    constructor(x, y, width, height) {
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
    }
    isCollision(mousex, mousey) {
        let realX = canvas2.width/2 + this.x;
        let realY = canvas2.height/2 + this.y;
        if (
            mousex < (realX+this.width) &&
            mousex > (realX) &&
            mousey < (realY+this.height) &&
            mousey > (realY)
        ) {
            return true;
        } else {
            return false;
        }
    }
}
shopbutton = new RectButton(135, 75, -190, 50);
clickbutton = new RectButton(-(178.8/2), -(178.8/2), 178.8, 178.8);
shopbackbutton = new RectButton(135, 75, -190, 50);
startbutton = new RectButton(-50, 50, 100, 50);
function update2() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    if (!shop && !titlescreen) {
        ctx2.fillText(score.toString(), score_x + (15 * (score.toString().length-1)), score_y);
        ctx2.strokeRect(canvas2.width - 225, 75, 150, 50);
        ctx2.fillText("Shop", canvas2.width - 150, 75);
        if (clicked) {
            ctx2.drawImage(button_img, 0, 178.8, 178.8, 178.8, (canvas2.width-178.8)/2, (canvas2.height-178.8)/2, 178.8, 178.8);
        } else {
            ctx2.drawImage(button_img, 0, 0, 178.8, 178.8, (canvas2.width-178.8)/2, (canvas2.height-178.8)/2, 178.8, 178.8);
        }
    } else if (titlescreen) {
        ctx2.fillText("Title", canvas2.width/2-50, canvas2.height/2-100);
        ctx2.strokeRect(canvas2.width/2-50, canvas2.height/2+50, 100, 50);
    } else if (shop) {
        ctx2.fillText(score.toString(), score_x + score_xchange, score_y);
        ctx2.strokeRect(canvas2.width/2-50, canvas2.height/2-50, 100, 50);
        ctx2.strokeRect(canvas2.width/2+50, canvas2.height/2-50, 100, 50);
        ctx2.strokeRect(canvas2.width - 225, 75, 150, 50);
        ctx2.fillText("Back", canvas2.width - 150, 175);
    }
    requestAnimationFrame(update2);
}
function canvas2click(event) {
    let rect = canvas2.getBoundingClientRect();
    const scaleX = canvas2.width / rect.width;
    const scaleY = canvas2.height / rect.height;
    let mouse_x = (event.clientX - rect.left) * scaleX;
    let mouse_y = (event.clientY - rect.top) * scaleY;
    if (!shop && !titlescreen) {
        if (clickbutton.isCollision(mouse_x, mouse_y)) {
            if (!clicked) {
                score = score + score_change;
                clicked = true;
                console.log("Mousedown button");
            }
        }
        if (shopbutton.isCollision(mouse_x, mouse_y)) {
            shop=true;
        }
    } else if (titlescreen) {
        if (startbutton.isCollision(mouse_x, mouse_y)) {
            titlescreen=false;
        }
    } else if (shop) {
        if (shopbackbutton.isCollision(mouse_x, mouse_y)) {
            shop=false;
        }
    }
}
canvas2.addEventListener('mousedown', function(event) {
    canvas2click(event);
});
canvas2.addEventListener('mouseup', function(event) {
    let rect = canvas2.getBoundingClientRect();
    const scaleX2 = canvas2.width / rect.width;
    const scaleY2 = canvas2.height / rect.height;
    let mouse_x2 = (event.clientX - rect.left) * scaleX2;
    let mouse_y2 = (event.clientY - rect.top) * scaleY2;
    if (clickbutton.isCollision(mouse_x2, mouse_y2)) {
        console.log("Mouseup button");
        clicked=false;
    }
});