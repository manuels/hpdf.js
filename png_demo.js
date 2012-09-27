function draw_image(pdf, filename, x, y, text) {
    var page = pdf.getCurrentPage();

    var image = pdf.loadPngImage(image_contents[filename]);

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


var images = [
  "basn0g01.png",
  "basn0g02.png",
  "basn0g04.png",
  "basn0g08.png",
  "basn2c08.png",
  "basn2c16.png",
  "basn3p01.png",
  "basn3p02.png",
  "basn3p04.png",
  "basn3p08.png",
  "basn4a08.png",
  "basn4a16.png",
  "basn6a08.png",
  "basn6a16.png"
];


var loaded = 0;
var image_contents = {};
function callMainWhenAllLoaded(url, array) {
  image_contents[url] = array;
  loaded++;

  if(loaded === images.length)
    main();
}


for(var i = 0; i < images.length; i++) {
  var url = images[i];
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'pngsuite/'+url, true);
  xhr.responseType = 'arraybuffer';

  xhr.onload = (function(xhr, url) {
     return function() { callMainWhenAllLoaded(url, xhr.response); }
  })(xhr, url);
  xhr.send()
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
  paeg.showText("PngDemo");
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

  window.addFile( pdf.toDataUri() )

  pdf.destroy()
}

