const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink,eat,sad;

function preload(){
  bg_img = loadImage("background.png");
  food = loadImage("melon.png");
  rabbit = loadImage("Rabbit-01.png");
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  
  //Habilitamos las animaciones 
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  //evitamos que la animación se resprodusca una y otra vez 
  sad.looping= false;
  eat.looping = false; 
  }

function setup() {
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;
  //Botón 1 
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  //Guardar molde de cuerda en variable 
  rope = new Rope(7,{x:245,y:30});
   //Guardar molde del suelo en variable 
  ground = new Ground(200,690,600,20);

  //Configuramos la velocidad de la animación. 
  blink.frameDelay = 20;
  
  //Crear objeto del conejito
  bunny = createSprite(130,620,100,100);
  bunny.scale = 0.2;

  //Agregar animación a nuestro Sprite con etiqueta
  bunny.addAnimation('blinking',blink);
  
  //Cambiar animación
  
  bunny.changeAnimation('blinking');

  //Creamos cuerpo circular para la fruta 
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  //Guardar molde de restricción en variable 
  fruit_con = new Link(rope,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,490,690);

  //Mostrar la cuerda
  rope.display();
  Engine.update(engine);
  //Mostar suelo
  ground.display();
  //Asignar imagen de la fruta
  image(food,fruit.position.x,fruit.position.y,60,60);
  
  
  drawSprites();
}

function drop()
{
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}
