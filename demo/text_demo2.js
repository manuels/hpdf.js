var env;
if(typeof window === 'undefined') {
  env = 'nodejs';
  HPDF = require('../hpdf.js').HPDF;
}
else
  env = 'browser';

var no = 0;

function print_grid(pdf, page) {
  var height = page.height();
  var width = page.width();
  var font = pdf.font('Helvetica');

  page.setFontAndSize(font, 5);
  page.setGrayFill(0.5);
  page.setGrayStroke(0.8);

  /* Draw horizontal lines */
  var y = 0;
  while (y < height) {
    if (y % 10 == 0)
      page.setLineWidth(0.5);
    else {
      if (page.getLineWidth() != 0.25)
        page.setLineWidth(0.25);
    }

    page.moveTo(0, y);
    page.lineTo(width, y);
    page.stroke();

    if (y % 10 == 0 && y > 0) {
        page.setGrayStroke(0.5);

        page.moveTo(0, y);
        page.lineTo(5, y);
        page.stroke();

        page.setGrayStroke(0.8);
    }

    y += 5;
  }


  /* Draw virtical lines */
  var x = 0;
  while (x < width) {
    if (x % 10 == 0)
      page.setLineWidth(0.5);
    else {
      if (page.setLineWidth() != 0.25)
        page.setLineWidth(0.25);
    }

    page.moveTo(x, 0);
    page.lineTo(x, height);
    page.stroke()

    if (x % 50 == 0 && x > 0) {
      page.setGrayStroke(0.5);

      page.moveTo(x, 0);
      page.lineTo(x, 5);
      page.stroke();

      page.moveTo(x, height);
      page.lineTo(x, height - 5);
      page.stroke();

      page.setGrayStroke(0.8);
    }

    x += 5;
  }

  /* Draw horizontal text */
  y = 0;
  while (y < height) {
    if (y % 10 == 0 && y > 0) {
      page.beginText();
      page.moveTextPos(5, y - 2);
      page.showText(y.toString());
      page.endText();
    }

    y += 5;
  }


  /* Draw virtical text */
  x = 0;
  while (x < width) {
    if (x % 50 == 0 && x > 0) {
      page.beginText();
      page.moveTextPos(x, 5);
      page.showText(x.toString());
      page.endText();

      page.beginText();
      page.moveTextPos(x, height - 10);
      page.showText(x.toString());
      page.endText();
    }

    x += 5;
  }

  page.setGrayFill(0);
  page.setGrayStroke(0);
}


var PrintText = function(page) {
    var pos = page.currentTextPos();

    no++;
    buf = ".["+no+"]"+pos.x+" "+pos.y; 
    page.showText(buf);
}


SAMP_TXT = "The quick brown fox jumps over the lazy dog. ";

var pdf = new HPDF();

/* add a new page object. */
var page = pdf.addPage();
page.setSize('A5', 'PORTRAIT');

print_grid(pdf, page);

var page_height = page.height();

var font = pdf.font("Helvetica");
page.setTextLeading(20);

/* text_rect method */

/* HPDF_TALIGN_LEFT */
rect = {};
rect.left = 25;
rect.top = 545;
rect.right = 200;
rect.bottom = rect.top - 40;

page.rectangle(rect.left, rect.bottom, rect.right - rect.left,
               rect.top - rect.bottom);
page.stroke();

page.beginText();

page.setFontAndSize(font, 10);
page.textOut(rect.left, rect.top + 3, "HPDF_TALIGN_LEFT");

page.setFontAndSize(font, 13);
page.textRect(rect.left, rect.top, rect.right, rect.bottom,
            SAMP_TXT, 'l');

page.endText();

/* HPDF_TALIGN_RIGTH */
rect.left = 220;
rect.right = 395;

page.rectangle(rect.left, rect.bottom, rect.right - rect.left,
            rect.top - rect.bottom);
page.stroke();

page.beginText();

page.setFontAndSize(font, 10);
page.textOut(rect.left, rect.top + 3, "HPDF_TALIGN_RIGTH");

page.setFontAndSize(font, 13);
page.textRect(rect.left, rect.top, rect.right, rect.bottom,
            SAMP_TXT, 'RIGHT');

page.endText();

/* HPDF_TALIGN_CENTER */
rect.left = 25;
rect.top = 475;
rect.right = 200;
rect.bottom = rect.top - 40;

page.rectangle(rect.left, rect.bottom, rect.right - rect.left,
            rect.top - rect.bottom);
page.stroke();

page.beginText();

page.setFontAndSize(font, 10);
page.textOut(rect.left, rect.top + 3, "HPDF_TALIGN_CENTER");

page.setFontAndSize(font, 13);
page.textRect(rect.left, rect.top, rect.right, rect.bottom,
            SAMP_TXT, 'c');

page.endText();

/* HPDF_TALIGN_JUSTIFY */
rect.left = 220;
rect.right = 395;

page.rectangle(rect.left, rect.bottom, rect.right - rect.left,
            rect.top - rect.bottom);
page.stroke();

page.beginText();

page.setFontAndSize(font, 10);
page.textOut(rect.left, rect.top + 3, "HPDF_TALIGN_JUSTIFY");

page.setFontAndSize(font, 13);
page.textRect(rect.left, rect.top, rect.right, rect.bottom,
            SAMP_TXT, 'j');

page.endText();



/* Skewed coordinate system */
page.gSave();

angle1 = 5;
angle2 = 10;
rad1 = angle1 / 180 * 3.141592;
rad2 = angle2 / 180 * 3.141592;

page.concat(1, Math.tan(rad1), Math.tan(rad2), 1, 25, 350);
rect.left = 0;
rect.top = 40;
rect.right = 175;
rect.bottom = 0;

page.rectangle(rect.left, rect.bottom, rect.right - rect.left,
            rect.top - rect.bottom);
page.stroke();

page.beginText();

page.setFontAndSize(font, 10);
page.textOut(rect.left, rect.top + 3, "Skewed coordinate system");

page.setFontAndSize(font, 13);
page.textRect(rect.left, rect.top, rect.right, rect.bottom,
            SAMP_TXT, 'l');

page.endText();

page.gRestore();


/* Rotated coordinate system */
page.gSave();

angle1 = 5;
rad1 = angle1 / 180 * 3.141592;

page.concat(Math.cos(rad1), Math.sin(rad1), -Math.sin(rad1), Math.cos(rad1), 220, 350);
rect.left = 0;
rect.top = 40;
rect.right = 175;
rect.bottom = 0;

page.rectangle(rect.left, rect.bottom, rect.right - rect.left,
            rect.top - rect.bottom);
page.stroke();

page.beginText();

page.setFontAndSize(font, 10);
page.textOut(rect.left, rect.top + 3, "Rotated coordinate system");

page.setFontAndSize(font, 13);
page.textRect(rect.left, rect.top, rect.right, rect.bottom,
            SAMP_TXT, 'l');

page.endText();

page.gRestore();


/* text along a circle */
page.setGrayStroke(0);
page.circle(210, 190, 145);
page.circle(210, 190, 113);
page.stroke();

angle1 = 360 / (SAMP_TXT.length);
angle2 = 180;

page.beginText();
font = pdf.font("Courier-Bold");
page.setFontAndSize(font, 30);

for (i = 0; i < SAMP_TXT.length; i++) {
  var rad1 = (angle2 - 90) / 180 * 3.141592;
  var rad2 = angle2 / 180 * 3.141592;

  var x = 210 + Math.cos(rad2) * 122;
  var y = 190 + Math.sin(rad2) * 122;

  page.setTextMatrix(Math.cos(rad1), Math.sin(rad1), -Math.sin(rad1), Math.cos(rad1), x, y);

  page.showText(SAMP_TXT[i]);
  angle2 -= angle1;
}

page.endText();



if(env === 'nodejs') {
  var filename = '/tmp/'+Math.round(Math.random()*1e10)+'.pdf'
  pdf.saveToFile(filename);
  console.log('Result written to '+filename);
}
else
  window.open( pdf.toDataUri() )
  
pdf.free()

