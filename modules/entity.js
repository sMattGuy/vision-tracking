class Entity{
	visionDistance = 60;
	visionRadius = 40;	//measured in degrees
	angle = 40;
	position = {'x':0,'y':0};
	velocity = {'x':0,'y':0};
	spotted = false;
	
	constructor(xpos, ypos){
		this.position.x = xpos;
		this.position.y = ypos;
	}
	
	findCursor(cursorPos){
		let entityAngleRads = this.angle * (Math.PI / 180);
		let entityVisRads = this.visionRadius * (Math.PI / 180);
		
		let xVisLineTo = this.position.x + Math.cos(entityAngleRads-(entityVisRads/2));
		let yVisLineTo = this.position.y + -Math.sin(entityAngleRads-(entityVisRads/2));
		let xVisEndLineTo = this.position.x + Math.cos(entityAngleRads+(entityVisRads/2));
		let yVisEndLineTo = this.position.y + -Math.sin(entityAngleRads+(entityVisRads/2));
		
		let cursorAngle = Math.atan2(cursorPos.y-this.position.y,cursorPos.x-this.position.x);
		let arcStart = Math.atan2(yVisLineTo-this.position.y, xVisLineTo-this.position.x);
		let arcEnd = Math.atan2(yVisEndLineTo-this.position.y, xVisEndLineTo-this.position.x);
		
		let distance = Math.sqrt(Math.pow(cursorPos.y-this.position.y,2)+Math.pow(cursorPos.x-this.position.x,2));
		if(distance >= this.visionDistance){
			this.spotted = false;
		}
		else if(arcStart < arcEnd){
			if(arcStart <= cursorAngle && cursorAngle <= arcEnd){
				this.spotted = false;
			}
			else{
				this.spotted = true;
			}
		}
		else if(arcStart > arcEnd){
			if(cursorAngle >= arcStart){
				this.spotted = false;
			}
			else if(cursorAngle <= arcEnd){
				this.spotted = false;
			}
			else{
				this.spotted = true;
			}
		}
		else{
			this.spotted = false;
		}
	}
	updatePosition(time){
		
	}
}

export {Entity};