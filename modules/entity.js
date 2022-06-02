class Entity{
	visionDistance = 60;
	visionRadius = 40;	//measured in degrees
	angle = 40;
	position = {'x':0,'y':0};
	velocity = {'x':0,'y':0};
	acceleration = {'x':0,'y':0};
	spotted = false;
	//speed modifiers
	maxspeed = 20;
	speed = 1;
	traction = 0.9;
	constructor(xpos, ypos){
		this.position.x = xpos;
		this.position.y = ypos;
	}
	
	findCursor(cursorPos){
		let distance = Math.sqrt(Math.pow(cursorPos.y-this.position.y,2)+Math.pow(cursorPos.x-this.position.x,2));
		if(distance >= this.visionDistance){
			this.spotted = false;
		}
		else{
			let entityAngleRads = this.angle * (Math.PI / 180);
			let entityVisRads = this.visionRadius * (Math.PI / 180);
			
			let xVisLineTo = this.position.x + Math.cos(entityAngleRads-(entityVisRads/2));
			let yVisLineTo = this.position.y + -Math.sin(entityAngleRads-(entityVisRads/2));
			let xVisEndLineTo = this.position.x + Math.cos(entityAngleRads+(entityVisRads/2));
			let yVisEndLineTo = this.position.y + -Math.sin(entityAngleRads+(entityVisRads/2));
			
			let cursorAngle = Math.atan2(cursorPos.y-this.position.y,cursorPos.x-this.position.x);
			let arcStart = Math.atan2(yVisLineTo-this.position.y, xVisLineTo-this.position.x);
			let arcEnd = Math.atan2(yVisEndLineTo-this.position.y, xVisEndLineTo-this.position.x);
			if(arcStart < arcEnd){
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
	}
	updatePosition(time, cursorPos){
		if(this.spotted){
			let entityAngleRads = this.angle * (Math.PI / 180);
			let entityVisRads = this.visionRadius * (Math.PI / 180);
			
			let xVisLineTo = this.position.x + Math.cos(entityAngleRads-(entityVisRads/2));
			let yVisLineTo = this.position.y + -Math.sin(entityAngleRads-(entityVisRads/2));
			let xVisEndLineTo = this.position.x + Math.cos(entityAngleRads+(entityVisRads/2));
			let yVisEndLineTo = this.position.y + -Math.sin(entityAngleRads+(entityVisRads/2));
			
			let cursorAngle = Math.atan2(cursorPos.y-this.position.y,cursorPos.x-this.position.x);
			let arcStart = Math.atan2(yVisLineTo-this.position.y, xVisLineTo-this.position.x);
			let arcEnd = Math.atan2(yVisEndLineTo-this.position.y, xVisEndLineTo-this.position.x);
			
			//update angle
			let cursorDeg = cursorAngle * (180/Math.PI);
			if(cursorDeg <= 0)
				cursorDeg *= -1;
			else{
				cursorDeg = 360 - cursorDeg;
			}
			
			//make angle relative
			let relativeAngle = this.angle % 360;
			if(relativeAngle <= 0){
				relativeAngle = 360 + relativeAngle;
			}
			
			let angleDiff = cursorDeg - relativeAngle;
			
			let otherOption = Math.min(relativeAngle, cursorDeg) + (360 - Math.max(relativeAngle, cursorDeg));
			
			if(otherOption < Math.abs(angleDiff)){
				if(relativeAngle < cursorDeg){
					this.angle -= (otherOption * time);	
				}
				else{
					this.angle += (otherOption * time);	
				}
			}
			else{
				this.angle += (angleDiff * time) * this.speed;	
			}
			
			//move towards location
			this.acceleration.x = (cursorPos.x - this.position.x) * this.speed;
			this.acceleration.y = (cursorPos.y - this.position.y) * this.speed;
		}
		else{
			this.acceleration.x = 0;
			this.acceleration.y = 0;
		}
	}
	moveUnit(time,canvasWidth,canvasHeight){
		//update velocity
		this.velocity.x += this.acceleration.x * time;
		this.velocity.y += this.acceleration.y * time;
		
		//update position
		this.position.x += this.velocity.x * time;
		this.position.y += this.velocity.y * time;
		if(this.position.x < 0){
			this.position.x = 0;
			this.velocity.x *= -1;
			this.angle = 180 - this.angle;
		}
		if(this.position.x > canvasWidth){
			this.position.x = canvasWidth;
			this.velocity.x *= -1;
			this.angle = 180 - this.angle;
		}
		if(this.position.y < 0){
			this.position.y = 0;
			this.velocity.y *= -1;
			this.angle = 360 - this.angle;
		}
		if(this.position.y > canvasHeight){
			this.position.y = canvasHeight;
			this.velocity.y *= -1;
			this.angle = 360 - this.angle;
		}
		
		//damped velocity
		this.velocity.x *= this.traction;
		if(Math.abs(this.velocity.x) < 0.01){
			this.velocity.x = 0;
		}
		this.velocity.y *= this.traction;
		if(Math.abs(this.velocity.y) < 0.01){
			this.velocity.y = 0;
		}
	}
}

export {Entity};