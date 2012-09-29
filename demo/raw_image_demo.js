var image = [
    0xff, 0xff, 0xff, 0xfe, 0xff, 0xff, 0xff, 0xfc,
    0xff, 0xff, 0xff, 0xf8, 0xff, 0xff, 0xff, 0xf0,
    0xf3, 0xf3, 0xff, 0xe0, 0xf3, 0xf3, 0xff, 0xc0,
    0xf3, 0xf3, 0xff, 0x80, 0xf3, 0x33, 0xff, 0x00,
    0xf3, 0x33, 0xfe, 0x00, 0xf3, 0x33, 0xfc, 0x00,
    0xf8, 0x07, 0xf8, 0x00, 0xf8, 0x07, 0xf0, 0x00,
    0xfc, 0xcf, 0xe0, 0x00, 0xfc, 0xcf, 0xc0, 0x00,
    0xff, 0xff, 0x80, 0x00, 0xff, 0xff, 0x00, 0x00,
    0xff, 0xfe, 0x00, 0x00, 0xff, 0xfc, 0x00, 0x00,
    0xff, 0xf8, 0x0f, 0xe0, 0xff, 0xf0, 0x0f, 0xe0,
    0xff, 0xe0, 0x0c, 0x30, 0xff, 0xc0, 0x0c, 0x30,
    0xff, 0x80, 0x0f, 0xe0, 0xff, 0x00, 0x0f, 0xe0,
    0xfe, 0x00, 0x0c, 0x30, 0xfc, 0x00, 0x0c, 0x30,
    0xf8, 0x00, 0x0f, 0xe0, 0xf0, 0x00, 0x0f, 0xe0,
    0xe0, 0x00, 0x00, 0x00, 0xc0, 0x00, 0x00, 0x00,
    0x80, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
];

var RAW_IMAGE_DATA = new ArrayBuffer(128);
var bytes = new Uint8Array(RAW_IMAGE_DATA);
for (var i = 0; i < bytes.length; i++) {
  bytes[i] = image[i];
}


var image_data = {
  'rawimage/32_32_gray.dat': undefined,
  'rawimage/32_32_rgb.dat': undefined
};

function main() {
  var pdf = new HPDF();

  pdf.setCompressionMode('ALL');

  /* create default-font */
  var font = pdf.font("Helvetica");

  /* add a new page object. */
  var page = pdf.addPage();

  page.setWidth(172);
  page.setHeight(80);

  page.beginText(page);
  page.setFontAndSize(font, 20);
  page.moveTextPos(220, page.height() - 70);
  page.showText("RawImageDemo");
  page.endText();

  /* load RGB raw-image file. */
  image = pdf.loadRawImage(image_data['rawimage/32_32_rgb.dat'],
          32, 32, 'RGB');

  var x = 20;
  var y = 20;

  /* Draw image to the canvas. (normal-mode with actual size.)*/
  page.drawImage(image, x, y, 32, 32);

  /* load GrayScale raw-image file. */
  image = pdf.loadRawImage(image_data["rawimage/32_32_gray.dat"],
          32, 32, 'GRAY');

  x = 70;
  y = 20;

  /* Draw image to the canvas. (normal-mode with actual size.)*/
  page.drawImage(image, x, y, 32, 32);

  /* load GrayScale raw-image (1bit) file from memory. */
  /* TODO
  image = pdf.loadRawImageFromMem(RAW_IMAGE_DATA, 32, 32,
              'GRAY', 1);*/

  x = 120;
  y = 20;

  /* Draw image to the canvas. (normal-mode with actual size.)*/
  page.drawImage(image, x, y, 32, 32);

  window.addFile( pdf.toDataUri() )

  pdf.destroy()
}

var loaded = 0;
for(var url in image_data) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'demo/'+url, true);
  xhr.responseType = 'arraybuffer';

  xhr.onload = (function(url) {
    return function(ev) {
      loaded++;
      image_data[url] = ev.target.response;
      if(loaded == Object.keys(image_data).length)
        main();
    }
  })(url);
  xhr.send()
}

