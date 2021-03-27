var dog,happyDog,database,foodS,foodStock,happyDogImg,dogImg,Food;

function preload()
{
	dogImg=loadImage("images/dogImg.png");
  happyDogImg=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);
  var dog=createSprite(250,250,1,1);
  dog.addImage(dogImg);
  dog.scale=0.5;

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
 
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  textSize(24);
  fill("white");
  stroke("red");
  text("Press the UP ARROW to feed dog milk!",30,30);

  drawSprites();
  //add styles here

   
}

function getFood(foodS){
  var foodStock=database.ref("Food");
  foodStock.update({Food:foodS})
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref("/").set({
    Food:x+x
  })
  
  database.ref("/").update({
    Food:x
  })
}

