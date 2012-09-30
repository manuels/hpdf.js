var PAGE_WIDTH = 420;
var PAGE_HEIGHT = 400;
var CELL_WIDTH = 20;
var CELL_HEIGHT = 20;
var CELL_HEADER = 10;

function draw_graph(page) {
  var i;

  /* Draw 16 X 15 cells */

  /* Draw vertical lines. */
  page.setLineWidth(0.5);

  for (i = 0; i <= 17; i++) {
    var x = i * CELL_WIDTH + 40;

    page.moveTo(x, PAGE_HEIGHT - 60);
    page.lineTo( x, 40);
    page.stroke();

    if (i > 0 && i <= 16) {
      page.beginText();
      page.moveTextPos( x + 5, PAGE_HEIGHT - 75);
      page.showText(i.toString());
      page.endText()
    }
  }

  /* Draw horizontal lines. */
  for (i = 0; i <= 15; i++) {
    var y = i * CELL_HEIGHT + 40;

    page.moveTo(40, y);
    page.lineTo( PAGE_WIDTH - 40, y);
    page.stroke();

    if (i < 14) {
      page.beginText();
      page.moveTextPos( 45, y + 5);
      page.showText(i.toString());
      page.endText();
    }
  }
}


function draw_fonts(page) {
  var i,j;

  page.beginText();

  var char;
  /* Draw all character from 0x20 to 0xFF to the canvas. */
  for (i = 1; i < 17; i++) {
    for (j = 1; j < 17; j++) {
      var y = PAGE_HEIGHT - 55 - ((i - 1) * CELL_HEIGHT);
      var x = j * CELL_WIDTH + 50;

      char = (i - 1) * 16 + (j - 1);
      if (char >= 32) {
        var d  = x - page.textWidth(String.fromCharCode(char)) / 2;
        page.textOut(d, y, String.fromCharCode(char));
      }
    }
  }

  page.endText()
}


var encodings = [
  "StandardEncoding",
  "MacRomanEncoding",
  "WinAnsiEncoding",
  "ISO8859-2",
  "ISO8859-3",
  "ISO8859-4",
  "ISO8859-5",
  "ISO8859-9",
  "ISO8859-10",
  "ISO8859-13",
  "ISO8859-14",
  "ISO8859-15",
  "ISO8859-16",
  "CP1250",
  "CP1251",
  "CP1252",
  "CP1254",
  "CP1257",
  "KOI8-R",
  "Symbol-Set",
  "ZapfDingbats-Set",
  false
];

var resources = {
  "type1/a010013l.afm": undefined,
  "type1/a010013l.pfb": undefined
}


function main() {
  var pdf = new HPDF();

  /* set compression mode */
  pdf.setCompressionMode('all');

  /* Set page mode to use outlines. */
  pdf.setPageMode('OUTLINE');

  /* get default font */
  var font = pdf.font("Helvetica");

  var font_name = pdf.loadType1Font(resources["type1/a010013l.afm"],
          resources["type1/a010013l.pfb"]);

  /* create outline root. */
  var root = pdf.createOutline(undefined, "Encoding list");
  root.setOpened(true);

  var i = 0;
  while (encodings[i]) {
    var page = pdf.addPage();

    page.setWidth(PAGE_WIDTH);
    page.setHeight(PAGE_HEIGHT);

    var outline = pdf.createOutline(root, encodings[i]);
    var dst = page.createDestination();
    dst.setXYZ(0, page.height(), 1);
    /* HPDF_Destination_SetFitB(dst); */
    outline.setDestination(dst);

    page.setFontAndSize(font, 15);
    draw_graph(page);

    page.beginText();
    page.setFontAndSize(font, 20);
    page.moveTextPos(40, PAGE_HEIGHT - 50);
    page.showText(encodings[i]);
    page.showText(" Encoding");
    page.endText()

    var font2;
    if (encodings[i] == "Symbol-Set")
      font2 = pdf.font("Symbol");
    else if (encodings[i] == "ZapfDingbats-Set")
      font2 = pdf.font("ZapfDingbats");
    else
      font2 = pdf.font(font_name, encodings[i]);

    page.setFontAndSize(font2, 14);
    draw_fonts(page);

    i++;
  }


  window.addFile( pdf.toDataUri() )

  pdf.free()
}

var loaded = 0;
for(var url in resources) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'demo/'+url, true);
  xhr.responseType = 'arraybuffer';

  xhr.onload = (function(url) {
    return function(ev) {
      loaded++;
      resources[url] = ev.target.response;
      if(loaded == Object.keys(resources).length)
        main();
    }
  })(url);
  xhr.send()
}


