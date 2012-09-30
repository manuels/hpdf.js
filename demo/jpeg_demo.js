function draw_image(pdf, filename, x, y, text) {
  var page = pdf.currentPage();

  var image = pdf.loadJpegImage(image_contents[filename]);

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

var images = ['rgb.jpg', 'gray.jpg'];

// load images and call main() function when finished loading
for(var i = 0; i < images.length; i++) {
  var url = images[i];
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'images/'+url, true);
  xhr.responseType = 'arraybuffer';

  xhr.onload = (function(xhr, url) {
     return function() { callMainWhenAllLoaded(url, xhr.response); }
  })(xhr, url);
  xhr.send()
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

  draw_image (pdf, "rgb.jpg", 70, page.height() - 410,
              "24bit color image");
  draw_image (pdf, "gray.jpg", 340, page.height() - 410,
              "8bit grayscale image");

  window.addFile( pdf.toDataUri() )

  pdf.free()
}
