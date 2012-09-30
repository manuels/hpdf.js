var env;
if(typeof window === 'undefined') {
  env = 'nodejs';
  HPDF = require('../hpdf.js').HPDF;
}
else
  env = 'browser';


function draw_image(pdf, filename, x, y, text) {
  var page = pdf.currentPage();

  var image = pdf.loadJpegImage(resources[filename]);

  page.drawImage(image, x, y, image.width(), image.height());

  /* Print the text. */
  page.beginText();
  page.setTextLeading(16);
  page.moveTextPos(x, y);
  page.showTextNextLine(filename);
  page.showTextNextLine(text);
  page.endText();
}

var loaded = 0;
var image_contents = {};
function callMainWhenAllLoaded(url, array) {
  image_contents[url] = array;
  loaded++;

  if(loaded === images.length)
    main();
}

function main() {
  var pdf = new HPDF();
  pdf.setCompressionMode('a');

  /* create default-font */
  var font = pdf.font("Helvetica");

  /* add a new page object. */
  var page = pdf.addPage();

  page.setWidth(650);
  page.setHeight(500);

  var dst = page.createDestination();
  dst.setXYZ(0, page.height(), 1);
  pdf.setOpenAction(dst);

  page.beginText();
  page.setFontAndSize(font, 20);
  page.moveTextPos(220, page.height() - 70);
  page.showText("JpegDemo");
  page.endText();

  page.setFontAndSize(font, 12);

  draw_image (pdf, "demo/images/rgb.jpg", 70, page.height() - 410,
              "24bit color image");
  draw_image (pdf, "demo/images/gray.jpg", 340, page.height() - 410,
              "8bit grayscale image");
  return pdf;
}

var resources = {
  "demo/images/rgb.jpg": undefined,
  "demo/images/gray.jpg": undefined
}


if(env === 'browser') {
  // this code is called in the browser

  var loaded = 0;
  for(var url in resources) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
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
    resources[url] = url;

  var pdf = main();

  var filename = '/tmp/'+Math.round(Math.random()*1e10)+'.pdf'
  pdf.saveToFile(filename);
  console.log('Result written to '+filename);
  pdf.free()
}

