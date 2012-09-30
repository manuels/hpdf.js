var env;
if(typeof window === 'undefined') {
  env = 'nodejs';
  HPDF = require('../hpdf.js').HPDF;
}
else
  env = 'browser';


function draw_image(pdf, filename, x, y, text) {
    var page = pdf.currentPage();

    console.log(filename, resources[filename]);
    var image = pdf.loadPngImage(resources[filename]);

    /* Draw image to the canvas. */
    page.drawImage(image, x, y, image.width(), image.height());

    /* Print the text. */
    page.beginText();
    page.setTextLeading(16);
    page.moveTextPos (x, y);
    page.showTextNextLine(filename);
    page.showTextNextLine(text);
    page.endText();
}


function main() {
  var pdf = new HPDF();

  pdf.setCompressionMode('a'); // HPDF_COMP_ALL

  /* create default-font */
  var font = pdf.font("Helvetica");

  /* add a new page object. */
  var page = pdf.addPage();

  page.setWidth(550);
  page.setHeight(650);

  var dst = page.createDestination();
  dst.setXYZ(0, page.height(),1);
  pdf.setOpenAction(dst);

  page.beginText();
  page.setFontAndSize(font, 20);
  page.moveTextPos(220, page.height() - 70);
  page.showText("PngDemo");
  page.endText();

  page.setFontAndSize(font, 12);


  draw_image(pdf, "basn0g01.png", 100, page.height() - 150,
              "1bit grayscale.");
  draw_image(pdf, "basn0g02.png", 200, page.height() - 150,
              "2bit grayscale.");
  draw_image(pdf, "basn0g04.png", 300, page.height() - 150,
              "4bit grayscale.");
  draw_image(pdf, "basn0g08.png", 400, page.height() - 150,
              "8bit grayscale.");

  draw_image(pdf, "basn2c08.png", 100, page.height() - 250,
              "8bit color.");
  draw_image(pdf, "basn2c16.png", 200, page.height() - 250,
              "16bit color.");

  draw_image(pdf, "basn3p01.png", 100, page.height() - 350,
              "1bit pallet.");
  draw_image(pdf, "basn3p02.png", 200, page.height() - 350,
              "2bit pallet.");
  draw_image(pdf, "basn3p04.png", 300, page.height() - 350,
              "4bit pallet.");
  draw_image(pdf, "basn3p08.png", 400, page.height() - 350,
              "8bit pallet.");

  draw_image(pdf, "basn4a08.png", 100, page.height() - 450,
              "8bit alpha.");
  draw_image(pdf, "basn4a16.png", 200, page.height() - 450,
              "16bit alpha.");

  draw_image(pdf, "basn6a08.png", 100, page.height() - 550,
              "8bit alpha.");
  draw_image(pdf, "basn6a16.png", 200, page.height() - 550,
              "16bit alpha.");

  return pdf;
}

var path = 'demo/pngsuite/';
var resources = {
  "basn0g01.png": undefined,
  "basn0g02.png": undefined,
  "basn0g04.png": undefined,
  "basn0g08.png": undefined,
  "basn2c08.png": undefined,
  "basn2c16.png": undefined,
  "basn3p01.png": undefined,
  "basn3p02.png": undefined,
  "basn3p04.png": undefined,
  "basn3p08.png": undefined,
  "basn4a08.png": undefined,
  "basn4a16.png": undefined,
  "basn6a08.png": undefined,
  "basn6a16.png": undefined
};

if(env === 'browser') {
  // this code is called in the browser

  var loaded = 0;
  for(var url in resources) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path+url, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = (function(url) {
      return function(ev) {
        loaded++;
        resources[url] = ev.target.response;
        if(loaded == Object.keys(resources).length) {
          pdf = main();
          window.open( pdf.toDataUri() )
          pdf.free()
        }
      }
    })(url);
    xhr.send();
  }
}
else {
  // this code is called in nodejs
  for(var url in resources)
    resources[url] = path+url;

  var pdf = main();

  var filename = '/tmp/'+Math.round(Math.random()*1e10)+'.pdf'
  pdf.saveToFile(filename);
  console.log('Result written to '+filename);
  pdf.free()
}
  

