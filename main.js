var canvas = document.querySelector('canvas');

var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height =  window.innerHeight*0.9;


function Ball(x,y,velX,velY,color,size){
    this.x  =x ;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}



//画出模型

var balls=[];

Ball.prototype.draw = function(){


    ctx.beginPath();
    ctx.fillStyle=this.color;
     ctx.arc(this.x,this.y ,this.size,0,Math.PI*2);
     ctx.fill();
};


Ball.prototype.sport = function(){
    if((this.x+this.velX)>width || (this.x+this.velX)<0){
        this.velX = -(this.velX);
    }

    if((this.y+this.velY)>height || (this.y +this.velY)<0){
        this.velY = -(this.velY);
    }

    this.x = this.x + this.velX;
    this.y = this.y + this.velY;

};

Ball.prototype.collison = function(){

    for (var j = 0; j < balls.length; j++) {
        if(!(this===balls[j])){
            var dx = Math.abs(this.x-balls[j].x);
            var dy = Math.abs(this.y-balls[j].y);
            var dis = Math.sqrt(dx*dx + dy*dy);
            var total =  this.size+balls[j].size;

            if(dis<total){

                    this.velX = -(this.velX) ;
                    balls[j].velX =- balls[j].velX;

                    this.velY = - (this.velY) ;
                    balls[j].velY = - balls[j].velY;

                this.color = balls[j].color ='rgb('+Math.random()*255+','
            +Math.random()*255+','
            +Math.random()*255
            +')';


            }
        }
    }

};

Ball.prototype.evil = function(i){
    //吸收路过的小圈圈



            var dx = Math.abs(this.x-evilWidth);
            var dy = Math.abs(this.y-evilHeight);
            var dis = Math.sqrt(dx*dx + dy*dy);
            var total =  this.size+50;

            //如果距离小于总大小，则删除小圈圈
            if(dis<total){

             balls.splice(i,1);


    }

};
// 监听鼠标移动事件
document.addEventListener('mousemove', function(event) {
  // 更新恶魔圈的坐标为鼠标的当前位置
  evilWidth = event.clientX;
  evilHeight = event.clientY;
});
function loop(){

         ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.fillRect(0,0,width,height);

        while(balls.length<25){
            var ball = new Ball(Math.random()*width,Math.random()*height,
            Math.random()*5+Math.random()*(-5),
            Math.random()*5+Math.random()*(-5),
            'rgb('+Math.random()*255+','
            +Math.random()*255+','
            +Math.random()*255
            +')',Math.random()*20+5);

            balls.push(ball);
        }

        for (var i = 0; i < balls.length; i++) {
            balls[i].draw();
            balls[i].sport();
            balls[i].collison();
            balls[i].evil(i);

        }

  EvilCircle();

    requestAnimationFrame(loop);
}



loop();



 

var evilWidth = width/2;
var evilHeight = height/2;

function EvilCircle(){
    //画个圈

    ctx.beginPath();
    ctx.strokeStyle = 'crimson';
    ctx.arc(evilWidth,evilHeight,50,0,2*Math.PI);
    ctx.stroke();

}




