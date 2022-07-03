let ball_x,ball_y,ball_dx,ball_dy,ball_radius,ball_init_x,ball_init_y;
let paddle_x,paddle_y,paddle_width,paddle_height,paddle_dx,paddle_init_x,paddle_init_y;
let brick_width, brick_height,brick_x,brick_y;
let scores, lives;
let grid=[];
var x,y,h,w;

function setup() {
  createCanvas(400, 400);
  
  
  paddle_x=paddle_init_x=(width/2)-80/2;
  paddle_y=paddle_init_y=height-20;
  paddle_height = 15;
  paddle_width=80;
  paddle_dx=2;
  
  ball_radius=25;
  ball_x=ball_init_x=width/2;
  ball_y=ball_init_y=paddle_y-(ball_radius/2);
  ball_dx=2;
  ball_dy=1.7;
  // brick_x=150;
  // brick_y=150;
  
  scores=0;
  lives=3;
  
  for(var i=0;i<4;i++){
    let row =[];
    for(var j=0; j<4 ; j++){
      row.push({x : (i*90) + 10, y : (j*50) + 25 ,w: 85 ,h: 25,v:true })
      
    }
    grid.push(row);
  }
  
  
  
}

function draw () {
  background("red");
  
  ball_x+=ball_dx;
  ball_y-=ball_dy;
  
  if(keyIsDown(RIGHT_ARROW)){
    paddle_x+=paddle_dx;
  }
  if(keyIsDown(LEFT_ARROW)){
    paddle_x-=paddle_dx;
  }
  
  
  fill("green");
  circle(ball_x,ball_y,25);
  fill("white");
  rect(paddle_x,paddle_y,paddle_width,paddle_height);
  
  
  if(ball_x + (ball_radius/2)>width || ball_x - (ball_radius/2)<0){
    ball_dx = - ball_dx;  
  }
  
  //bottom side
  
  if(ball_y + (ball_radius/2)>height && lives>0){
    ball_x=ball_init_x;
    ball_y=ball_init_y;
    lives=lives-1;
    paddle_x = paddle_init_x;
    paddle_y= paddle_init_y;
  }
  
  //upper side
  
   if(ball_y-ball_radius/2<0){
     ball_dy=-ball_dy;
  }
  
  //ball bounce on paddle
  
  if(ball_y + (ball_radius/2)>paddle_y && ball_x > paddle_x && ball_x < paddle_x + paddle_width){
     ball_dy=-ball_dy
     }
  
  //paddle moving right
  if(paddle_x + paddle_width >width){
    paddle_x = width - paddle_width;
  }
  
  if(paddle_x < 0){
    paddle_x=0;
  }
  

  if(lives === 0){
    ball_dx=0;
    ball_dy=0;
    text("Game Over", (width/2)-50,(height/2));
  }
  
  
  
  for(var i=0;i<4;i++){
    for(var j=0;j<4;j++){
      
      rect(grid[i][j].x,grid[i][j].y,grid[i][j].w,grid[i][j].h);
      
      if(ball_x-(ball_radius/2) < grid[i][j].x + grid[i][j].w &&
        ball_y > grid[i][j].y && ball_y <grid[i][j].y + grid[i][j].h && ball_x + (ball_radius/2) > grid[i][j].x){
        ball_dx = -ball_dx;
        scores++;
        grid[i][j].h=0;
        grid[i][j].w=0;
      }
      
       if(ball_y-(ball_radius/2) < grid[i][j].y + grid[i][j].h &&
        ball_x > grid[i][j].x && ball_x <grid[i][j].x + grid[i][j].w && ball_y + (ball_radius/2) > grid[i][j].y){
        ball_dy = -ball_dy;
        scores++;
        grid[i][j].h=0;
        grid[i][j].w=0;
      }
      
    }
  }
  
  
   //add text
  text(`Score : ${scores}`, width-100, 20);
    text(`Lives : ${lives}`, 50, 20);
  
  
  
  if(scores === (grid.length*grid[0].length) ){
    ball_dx=0;
    ball_dy=0;
    text("Congrats! You have won", (width/2)-50,(height/2));
  }
  //ball touching brick
  
//   if((ball_x < brick_x+brick_width+(ball_radius/2)) && ball_y>brick_y && ball_y<brick_y+brick_height  && ball_x+(ball_radius/2)> brick_x){
//     ball_dx = -ball_dx;
//     scores++;
//     brick_height=0;
//     brick_width=0;
//   }
  
//   if(ball_y < brick_y+brick_height+(ball_radius/2) && ball_x>brick_x && ball_x<brick_x+brick_width && ball_y+(ball_radius/2)>brick_y  ){
//     ball_dy = -ball_dy;
//     scores++;
//     brick_height=0;
//     brick_width=0;
//   }
  
  
}