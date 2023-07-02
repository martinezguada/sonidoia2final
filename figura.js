class Figura {
  constructor() {

    this.vel = 30;

    this.dir = radians(20);
    

    this.rad = radians(1);
    this.color =('white');
//rosa
    this.t = 400;
    this.circulo1 = this.rosa;
    this.rosa = color (255,128,130,99);

    this.mov1=0;

    this.modos1=0;
    this.modo1=sin;
  

    
    this.valX=400;
    this.valY=400;
    
    this.valX2=600;
    this.valY2=600;
//celeste
this.celeste = color (0,255,255,90);
this.circulo2 = this.celeste;
    this.t2 = 300;

    this.modos2=0;
    this.modo2=sin;

    this.valX3=400;
    this.valY3=400;

    this.valX4=600;
    this.valY4=600;
//amarillo  
this.amarillo = color (238,232,170,60);
this.circulo3 = this.celeste;
    this.t3 = 300;  

    this.modos3=0;
    this.modo3=cos;
   
    this.valX5=500;
    this.valY5=500;

    this.valX6=500;
    this.valY6=500;
//rojo
    this.t4 = 300;

    this.modos4=0;
    this.modo4=cos;

    this.valX7=500;
    this.valY7=200;

    this.valX8=500;
    this.valY8=200;




    this.modoCos = cos;

   
  }

  dibujar() {
    strokeWeight(1);
    noFill();

    push();
    stroke(this.rosa);
    ellipse(this.x, this.y, this.t, this.t);
    ellipse(this.x2, this.y2, this.t, this.t);


    this.x = this.valX;
    this.y = this.valY;
    this.x2 = this.valX2;
    this.y2 = this.valY2;

    
    this.dir += this.rad;
    let dx = this.vel * cos(this.dir);
    let dy = this.vel * this.modo1(this.dir);

    this.x += dx;
    this.y += dy;



    this.dir += this.rad;
    let dx2 = this.vel * cos(this.dir);
    let dy2 = this.vel * this.modo1(this.dir);

    this.x2 += dx2;
    this.y2 += dy2;

    this.modo=1;
    pop();
  }
    dibujar2() {

  
    stroke (this.celeste) ; 

    ellipse(this.x3, this.y3, this.t2, this.t2);
    ellipse(this.x4, this.y4, this.t2, this.t2);



    this.x3 =  this.valX3;
    this.y3 = this.valY3;
    this.x4 = this.valX4;
    this.y4 = this.valY4;




    this.dir += this.rad;
    let dx3 = this.vel * cos(this.dir);
    let dy3 = this.vel * this.modo2(this.dir);

    this.x3 += dx3;
    this.y3 += dy3;


    this.dir += this.rad;
    let dx4 = this.vel * cos(this.dir);
    let dy4 = this.vel * this.modo2(this.dir);

    this.x4 += dx4;
    this.y4 += dy4;

  }
  
  dibujar3(){
    
    stroke(this.amarillo);

    ellipse(this.x5, this.y5, this.t3, this.t3);
    
    this.x5 = this.valX5;
    this.y5 = this.valY5;

    let dx5 = this.vel * this.modo3(this.dir);
   
    this.x5 -= dx5;

  }



  setMov(valor) {

    this.mov1 = map(valor, 0, 1, 200, 800);
    if (this.mov1 > 200 && this.mov1 < 400 ){ 
        this.valX = this.valY;
        this.valX2= this.valY2
        this.valX3= 500;
        this.valX4= 500;
      }
    else if (this.mov1 > 400 && this.mov1 < 700  ) { 
            this.valX= 500;
            this.valX2=500;
            this.valX3 = this.valY3;
            this.valX4=this.valY4}
 
     else if (this.mov1 > 700 ) { 
              this.valX= 400;
              this.valX2= 600;
              this.valX3 = 400;
              this.valX4= 600}
  
    
   


  }



  setMov2(valor) {

    this.mov1 = map(valor, 0, 1, 200, 800);
    if (this.mov1 < 500 ){ 
        this.valX3 = this.valY3;
        this.valX4=this.valY4}
    else { 
            this.valX3=500;
            this.valX4=500;}
  }

 setMov3(valor) {


    stroke(238,232,170,60);

    ellipse(this.x5, this.y5, this.t3, this.t3);
    
    this.x5 = this.valX5;
    this.y5 = this.valY5;
   
    let dx5 = this.vel * this.modo3(this.dir);
   

    this.x5 -= dx5;



  

  }

  setMov4(valor) {

    this.valX7 = map(valor, 0, 1, 200, 800);
    this.valX8 = map(valor, 0, 1, 800, 200);


  }





  setEstado1(valor) {
  this.modos1 = map(valor, 0, 1, 100, 2, 700); 
    if (this.modos1 < 40 ){ this.modo1 = this.modoCos;}
    else {this.modo1=sin }
  }
  setEstado2(valor) {
    this.modos2 = map(valor, 0, 1, 100, 2, 700); 
      if (this.modos2 < 40 ){ this.modo2 = this.modoCos;}
      else {this.modo2=sin }
    }
  setEstado3(valor) {
    let gestorPitchFiltrada = gestorPitch.filtrada;
      this.modos3 = map(gestorPitchFiltrada, 0.5, 1, 0, 1000);
        if (this.modos3 < 0.5){ this.modo3 = this.modo2;}
        else {this.modo3=sin }
      }
setEstado4(valor) {
        this.modos4 = map(valor, 0, 1, 100, 2, 700); 
          if (this.modos4 < 40 ){ this.modo4 = this.modoCos;}
          else {this.modo4=sin }
        }
  
  setTamano(valor) { this.t = map(valor, 0, 1, 200, 400);}
  setTamano2(valor) {this.t2 = map(valor, 0, 1, 200, 400);}



   //this.modo = map(valor, 0, 1, 100, 2, 700);
   
    //if (this.modo < 40){this.modo1 = this.modo2 } 
    //else {this.modo1=sin}



    setColor(valor) {

      this.mov1 = map(valor, 0, 1, 200, 800);
      if (this.mov1 > 300 && this.mov1 < 400 ){ 
        this.rosa = color(0,255,255,90);
        this.celeste = color (238,232,170,60);
        this.amarillo = color (255,128,130,99);
      }
      else if (this.mov1 > 400 && this.mov1 <500 ) { 
        this.rosa = color (255,128,130,99);
        this.celeste = color(0,255,255,90);
        this.amarillo = color (238,232,170,60);
      }

    else if (this.mov1 > 500 ) { 
      this.rosa = color (238,232,170,60);
      this.celeste = color (255,128,130,99);
      this.amarillo = color(0,255,255,90);}

      }
    }
