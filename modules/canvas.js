let canvas = document.getElementById("mainCanvas");
let ctx = canvas.getContext("2d");

function draw(entity){
	ctx.fillStyle = 'white';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	
	let entityAngleRads = entity.angle * (Math.PI / 180);
	let entityVisRads = entity.visionRadius * (Math.PI / 180);
	
	let xVisLineTo = entity.position.x + entity.visionDistance * Math.cos(entityAngleRads-(entityVisRads/2));
	let yVisLineTo = entity.position.y + entity.visionDistance * -Math.sin(entityAngleRads-(entityVisRads/2));
	
	let xVisEndLineTo = entity.position.x + entity.visionDistance * Math.cos(entityAngleRads+(entityVisRads/2));
	let yVisEndLineTo = entity.position.y + entity.visionDistance * -Math.sin(entityAngleRads+(entityVisRads/2));
	//draw vision
	if(entity.spotted){
		ctx.fillStyle = 'rgba(0,255,0,0.3)';
	}
	else{
		ctx.fillStyle = 'rgba(40,40,40,0.3)';
	}
	
	ctx.strokeStyle = 'black';
	ctx.beginPath();
	
	ctx.moveTo(entity.position.x,entity.position.y);
	ctx.lineTo(xVisLineTo,yVisLineTo);
	
	let arcStart = Math.atan2(yVisLineTo-entity.position.y, xVisLineTo-entity.position.x);
	let arcEnd = Math.atan2(yVisEndLineTo-entity.position.y, xVisEndLineTo-entity.position.x);
	ctx.arc(entity.position.x,entity.position.y,entity.visionDistance,arcStart,arcEnd,true);
	
	ctx.moveTo(entity.position.x,entity.position.y);
	ctx.lineTo(xVisEndLineTo,yVisEndLineTo);
	
	ctx.stroke();
	
	ctx.fill();
	//draw unit
	ctx.fillStyle = 'red';
	ctx.fillRect(entity.position.x-5,entity.position.y-5,10,10);
	//draw angle its pointing
	ctx.strokeStyle = 'green';
	ctx.beginPath();
	ctx.moveTo(entity.position.x,entity.position.y);
	
	let xLineTo = entity.position.x + entity.visionDistance * Math.cos(entityAngleRads);
	let yLineTo = entity.position.y + entity.visionDistance * -Math.sin(entityAngleRads);
	ctx.lineTo(xLineTo,yLineTo);
	ctx.stroke();
}

export {canvas, ctx, draw};