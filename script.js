//canvas setup
import {canvas, ctx, draw} from './modules/canvas.js';
import {Entity} from './modules/entity.js';

let testEntity = new Entity(canvas.width/2,canvas.height/2);
let cursorPos = {'x':0,'y':0};
let TIME = 0.05;
//called on page load
window.onload = init();

document.getElementById('visionRadius').addEventListener('input', e => {
	testEntity.visionRadius = parseInt(e.srcElement.value);
});
document.getElementById('visionDistance').addEventListener('input', e => {
	testEntity.visionDistance = parseInt(e.srcElement.value);
});
document.getElementById('angle').addEventListener('input', e => {
	testEntity.angle = parseInt(e.srcElement.value);
});
canvas.addEventListener('mousemove', e => {
		cursorPos.x = e.offsetX;
		cursorPos.y = e.offsetY;
});

function init(){
	//called only once
	frame();
}

//called every 1/60 of a second
function frame(){
	//vision check
	testEntity.findCursor(cursorPos);
	testEntity.updatePosition(TIME, cursorPos);
	testEntity.moveUnit(TIME);
	//draws main screen
	draw(testEntity);
	window.requestAnimationFrame(frame);
}