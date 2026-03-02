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
ctx2.textAlign = "center";
ctx2.textBaseline = "middle";
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
        return (mousex >= this.x && mousex <= this.x + this.width &&
           mousey >= this.y && mousey <= this.y + this.height);
    }
}
let buybutton_texts = [];
buybutton_texts.push("Cost: 50 Score Change: 1");
let buybuttons = [];
let bb_costs = [];
bb_costs.push(50);
let bb_score_changes = [];
bb_score_changes.push(1);
buybuttons.push(new RectButton((canvas2.width/2)-500, canvas2.height/2-200, 150, 75));
let shopbutton = new RectButton((canvas2.width/2)-75, 20, 150, 50);
let clickbutton = new RectButton(canvas2.width/2-(178.8/2), canvas2.height/2-(178.8/2), 178.8, 178.8);
let startbutton = new RectButton((canvas2.width/2)-75, canvas2.height/2+50, 150, 75);
function update2() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    if (!shop && !titlescreen) {
        ctx2.fillText(score.toString(), score_x + (15 * (score.toString().length-1)), score_y);
        ctx2.strokeRect(shopbutton.x, shopbutton.y, shopbutton.width, shopbutton.height);
        ctx2.fillText("Shop", (shopbutton.x + (shopbutton.width/2)), (shopbutton.y + (shopbutton.height/2)));
        if (clicked) {
            ctx2.drawImage(button_img, 0, 178.8, 178.8, 178.8, (canvas2.width-178.8)/2, (canvas2.height-178.8)/2, 178.8, 178.8);
        } else {
            ctx2.drawImage(button_img, 0, 0, 178.8, 178.8, (canvas2.width-178.8)/2, (canvas2.height-178.8)/2, 178.8, 178.8);
        }
    } else if (titlescreen) {
        ctx2.fillText("Clicker Game", canvas2.width/2, canvas2.height/2-100);
        ctx2.strokeRect(startbutton.x, startbutton.y, startbutton.width, startbutton.height);
        ctx2.fillText("Start", startbutton.x + startbutton.width/2, startbutton.y + (startbutton.height/2));
    } else if (shop) {
        ctx2.fillText(score.toString(), score_x + score_xchange, score_y);
        ctx2.fillText("Score per click: " + score_change.toString(), score_x + score_xchange, score_y + 30);
        for (let i = 0; i < buybuttons.length; i++) {
            ctx2.strokeRect(buybuttons[i].x, buybuttons[i].y, buybuttons[i].width, buybuttons[i].height);
            ctx2.fillText(buybutton_texts[i], buybuttons[i].x + (buybuttons[i].width/2), buybuttons[i].y + (buybuttons[i].height/2));
        }
        ctx2.strokeRect(shopbutton.x, shopbutton.y, shopbutton.width, shopbutton.height);
        ctx2.fillText("Back", shopbutton.x + (shopbutton.width/2), shopbutton.y + (shopbutton.height/2));
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
        if (shopbutton.isCollision(mouse_x, mouse_y)) {
            shop=false;
        }
        for (let i = 0; i < buybuttons.length; i++) {
            if (buybuttons[i].isCollision(mouse_x, mouse_y)) {
                if (score >= bb_costs[i]) {
                    score = score - bb_costs[i];
                    score_change = score_change + bb_score_changes[i];
                }
            }
        }
    }
}
canvas2.addEventListener('mousedown', function(event) {
    canvas2click(event);
});
canvas2.addEventListener('mouseup', function(event) {
    let rect = canvas2.getBoundingClientRect();
    let scaleX2 = canvas2.width / rect.width;
    let scaleY2 = canvas2.height / rect.height;
    let mouse_x2 = (event.clientX - rect.left) * scaleX2;
    let mouse_y2 = (event.clientY - rect.top) * scaleY2;
    if (clickbutton.isCollision(mouse_x2, mouse_y2)) {
        console.log("Mouseup button");
        clicked=false;
    }
});