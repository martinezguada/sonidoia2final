let monitorear = true;

let mic;
let pitch;
let audioContext;

let gestorAmp;
let gestorPitch;
let haySonido;
let antesHabiaSonido;
let estado = "agrega";
let circulos = [];
let cantidad = 0;

let marcaEnElTiempo;
let tiempoLimiteAgrega = 100;
let tiempoLimiteEstado = 3000;
let tiempoLimiteColor = 3000;
let tiempoReinicio = 100;

let elColor;
let redBlue;
let cyanOrange;
let magentaWhite;

let elTamano = 300;
let colorInicial;
let colorFinal;

const model_url =
  "https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/";

function setup() {
  createCanvas(1000, 1000);

  //inicializo la escucha de sonido
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  //acá le pido que llame a startPitch
  mic.start(startPitch);

  gestorAmp = new GestorSenial(0.01, 0.4);
  gestorPitch = new GestorSenial(30, 75);

  //hay que agregar esto
  userStartAudio();

  antesHabiaSonido = false;

  ///colorInicial = color(0,0,255);
  colorRed = color("red");
  colorCyan = color("cyan");
  colorBlue = color("blue");
  colorWhite = color("white");
  colorOrange = color("orange");
  colorMagenta = color("magenta");
  colorPink = color("pink");
  colorGreen = color("green");
  //colorFinal = color(255,255,0);
  elColor = colorWhite;
  redBlue = colorWhite;
  cyanOrange = colorWhite;
  magentaWhite = colorWhite;
}

function draw() {
  let vol = mic.getLevel();
  gestorAmp.actualizar(vol);
  //mido por el umbral si hay o no sonido
  haySonido = gestorAmp.filtrada > 0.1;
  //comparando el pasado con el presente
  //decido que el sonido inició ahora
  let inicioElSonido = haySonido && !antesHabiaSonido;
  //comparando el pasado con el presente
  //decido que el sonido finalizó ahora
  let finDelSonido = !haySonido && antesHabiaSonido;
  background(0);

  if (estado == "agrega") {
    cambiarTexto("Al detectar sonido se agregan los circulos");
    if (haySonido) {
      circulos[cantidad] = new Figura();
      cantidad++;
      
    }

    if (finDelSonido) {
      marcaEnElTiempo = millis();
     
    }

    if (cantidad >= 30) {
      estado = "movimiento";
    }

    if (!haySonido) {
      let ahora = millis();
      if (ahora > marcaEnElTiempo + tiempoLimiteAgrega && cantidad >= 10) {
        estado = "movimiento";
        marcaEnElTiempo = millis();
        
      }
    }
  }

  //movimiento
  else if (estado == "movimiento") {
    cambiarTexto("Ahora los circulos 𝙧𝙤𝙨𝙖𝙨 cambian de lugar con el sonido");
    background(0);
    if (haySonido) {
      for (let i = 0; i < cantidad; i++) {
        circulos[i].setMov(gestorPitch.filtrada);
      }
    }
    if (finDelSonido) {
      marcaEnElTiempo = millis();
    }
    if (!haySonido) {
      let ahora = millis();
      if (ahora > marcaEnElTiempo + tiempoLimiteEstado) {
        estado = "movimiento2";
        marcaEnElTiempo = millis();
      }
    }
  } else if (estado == "movimiento2") {
    cambiarTexto("Ahora los circulos 𝙘𝙚𝙡𝙚𝙨𝙩𝙚𝙨 cambian de lugar con el sonido");
    background(0);
    if (haySonido) {
      for (let i = 0; i < cantidad; i++) {
        circulos[i].setMov2(gestorPitch.filtrada);
      }
    }
    if (finDelSonido) {
      marcaEnElTiempo = millis();
    }
    if (!haySonido) {
      let ahora = millis();
      if (ahora > marcaEnElTiempo + tiempoLimiteEstado) {
        estado = "modo1";
        marcaEnElTiempo = millis();
      }
    }
  }

  //modos
  else if (estado == "modo1") {
    cambiarTexto("Elegi entre los dos modos de los circulos 𝙧𝙤𝙨𝙖𝙨");
    background(0);
    if (haySonido) {
      for (let i = 0; i < cantidad; i++) {
        circulos[i].setEstado1(gestorPitch.filtrada);
      }
    }
    if (finDelSonido) {
      marcaEnElTiempo = millis();
    }
    if (!haySonido) {
      let ahora = millis();
      if (ahora > marcaEnElTiempo + tiempoLimiteEstado) {
        estado = "modo2";
        marcaEnElTiempo = millis();
      }
    }
  } else if (estado == "modo2") {
    cambiarTexto("Elegi entre los dos modos de los circulos 𝙘𝙚𝙡𝙚𝙨𝙩𝙚𝙨");
    background(0);
    if (haySonido) {
      for (let i = 0; i < cantidad; i++) {
        circulos[i].setEstado2(gestorPitch.filtrada);
      }
    }
    if (finDelSonido) {
      marcaEnElTiempo = millis();
    }
    if (!haySonido) {
      let ahora = millis();
      if (ahora > marcaEnElTiempo + tiempoLimiteEstado) {
        estado = "modo3";
        marcaEnElTiempo = millis();
      }
    }
  } else if (estado == "modo3") {
    cambiarTexto("Elegi entre los modos del circulos 𝙖𝙢𝙖𝙧𝙞𝙡𝙡𝙤");
    background(0);
    if (haySonido) {
      for (let i = 0; i < cantidad; i++) {
        circulos[i].setEstado3(gestorPitch.filtrada);
      }
    }
    if (finDelSonido) {
      marcaEnElTiempo = millis();
    }
    if (!haySonido) {
      let ahora = millis();
      if (ahora > marcaEnElTiempo + tiempoLimiteEstado) {
        estado = "tamano";
        marcaEnElTiempo = millis();
      }
    }
  }

  //tamanos
  else if (estado == "tamano") {
    cambiarTexto("Al variar el pitch cambia el tamaño de los circulos 𝙧𝙤𝙨𝙖𝙨");
    background(0);
    if (haySonido) {
      for (let i = 0; i < cantidad; i++) {
        circulos[i].setTamano(gestorPitch.filtrada);
      }
    }
    if (finDelSonido) {
      marcaEnElTiempo = millis();
    }
    if (!haySonido) {
      let ahora = millis();
      if (ahora > marcaEnElTiempo + tiempoLimiteEstado) {
        estado = "tamano2";
        marcaEnElTiempo = millis();
      }
    }
  } else if (estado == "tamano2") {
    cambiarTexto(
      "Al variar el pitch cambia el tamaño de los circulos 𝙘𝙚𝙡𝙚𝙨𝙩𝙚𝙨 "
    );
    background(0);
    if (haySonido) {
      for (let i = 0; i < cantidad; i++) {
        circulos[i].setTamano2(gestorPitch.filtrada);
      }
    }
    if (finDelSonido) {
      marcaEnElTiempo = millis();
    }
    if (!haySonido) {
      let ahora = millis();
      if (ahora > marcaEnElTiempo + tiempoLimiteEstado) {
        estado = "color";
        marcaEnElTiempo = millis();
      }
    }
  
  }
  else if( estado == "color" ){
    cambiarTexto("Cambiar color");
    background(0);
    if( haySonido ){

      for( let i=0 ; i<cantidad ; i++){
        circulos[i].setColor( gestorPitch.filtrada );

      }
    }
    if( finDelSonido ){
      marcaEnElTiempo = millis();
    }
    if( !haySonido ){
      let ahora = millis();
      if( ahora > marcaEnElTiempo+tiempoLimiteEstado ){
          estado = "fin";
          marcaEnElTiempo = millis();
      }
    }

  }

  else if (estado == "fin") {
    cambiarTexto("Hablar para capturar la imagen");
    background(0);

    if (inicioElSonido) {
      marcaEnElTiempo = millis();
    }
    if (haySonido) {
      let ahora = millis();
      if (ahora > marcaEnElTiempo + tiempoReinicio) {
        estado = "reinicio";
        marcaEnElTiempo = millis();
        noLoop();
        // Activar el ciclo de dibujo nuevamente después de 5 segundos
        setTimeout(function() {
          (estado == "reinicio");
          loop()}, 5000);
  
      }
    }
  } else if (estado == "reinicio") {
    circulos = [];
    cantidad = 0;
    estado = "agrega";
    elColor = colorWhite;
    redBlue = colorWhite;
    cyanOrange = colorWhite;
    magentaWhite = colorWhite;
    marcaEnElTiempo = millis();
    //save("resultado"+frameCount+".jpg");
  }

  for (let i = 0; i < cantidad; i++) {
      circulos[i].dibujar();
      circulos[i].dibujar2();
      circulos[i].dibujar3();
  
  }

  //if( monitorear ){
  //   gestorAmp.dibujar( 100 , 100 );
  //   gestorPitch.dibujar( 100 , 300 );
  // }
  antesHabiaSonido = haySonido;
  console.log(estado);
}
//--------------------------------------------------------------------
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
//--------------------------------------------------------------------
function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
}
//--------------------------------------------------------------------
function modelLoaded() {
  //select('#status').html('Model Loaded');
  getPitch();
  //console.log( "entro aca !" );
}
//--------------------------------------------------------------------
function getPitch() {
  pitch.getPitch(function (err, frequency) {
    if (frequency) {
      let midiNum = freqToMidi(frequency);
      console.log( midiNum );

      gestorPitch.actualizar(midiNum);
    }
    getPitch();
  });
}

function cambiarTexto(texto) {
  // Obtener el elemento con el ID 'estado'
  var elemento = document.querySelector("#estado");

  // Cambiar el texto del elemento
  elemento.textContent = texto;
}
