var env;
if(typeof window === 'undefined') {
  env = 'nodejs';
  HPDF = require('../hpdf.js').HPDF;
}
else
  env = 'browser';


// [ left, bottom, right, top ]
var rect1 = [50, 350, 150, 400];
var rect2 = [210, 350, 350, 400];
var rect3 = [50, 250, 150, 300];
var rect4 = [210, 250, 350, 300];
var rect5 = [50, 150, 150, 200];
var rect6 = [210, 150, 350, 200];
var rect7 = [50, 50, 150, 100];
var rect8 = [210, 50, 350, 100];

var pdf = new HPDF();

/* use Times-Roman font. */
var font = pdf.font("Times-Roman", "WinAnsiEncoding");

var page = pdf.addPage();

page.setWidth(400);
page.setHeight(500);

page.beginText();
page.setFontAndSize(font, 16);
page.moveTextPos(130, 450);
page.showText("Annotation Demo");
page.endText();


var annot = page.createTextAnnot(rect1, "Annotation with Comment Icon. \n This annotation set to be opened initially.");

annot.setIcon('comment');
annot.setOpened(true);

annot = page.createTextAnnot(rect2,
            "Annotation with Key Icon");
annot.setIcon('PARAGRAPH');

annot = page.createTextAnnot(rect3,
            "Annotation with Note Icon");
annot.setIcon('NOTE');

annot = page.createTextAnnot(rect4,
            "Annotation with Help Icon");
annot.setIcon('HELP');

annot = page.createTextAnnot(rect5,
            "Annotation with NewParagraph Icon");
annot.setIcon('NEW_PARAGRAPH');

annot = page.createTextAnnot(rect6,
            "Annotation with Paragraph Icon");
annot.setIcon('PARAGRAPH');

annot = page.createTextAnnot(rect7,
            "Annotation with Insert Icon");
annot.setIcon('INSERT');

var encoding = pdf.encoder("ISO8859-2");

page.createTextAnnot(rect8,
            "Annotation with ISO8859 text ÓÔÕÖ×ØÙ", encoding);

page.setFontAndSize(font, 11);

page.beginText();
page.moveTextPos(rect1[0] + 35, rect1[3] - 20);
page.showText("Comment Icon.");
page.endText();

page.beginText();
page.moveTextPos(rect2[0] + 35, rect2[3] - 20);
page.showText("Key Icon");
page.endText();

page.beginText();
page.moveTextPos(rect3[0] + 35, rect3[3] - 20);
page.showText("Note Icon.");
page.endText();

page.beginText();
page.moveTextPos(rect4[0] + 35, rect4[3] - 20);
page.showText("Help Icon");
page.endText();

page.beginText();
page.moveTextPos(rect5[0] + 35, rect5[3] - 20);
page.showText("NewParagraph Icon");
page.endText();

page.beginText();
page.moveTextPos(rect6[0] + 35, rect6[3] - 20);
page.showText("Paragraph Icon");
page.endText();

page.beginText();
page.moveTextPos(rect7[0] + 35, rect7[3] - 20);
page.showText("Insert Icon");
page.endText();

page.beginText();
page.moveTextPos(rect8[0] + 35, rect8[3] - 20);
page.showText("Text Icon(ISO8859-2 text)");
page.endText();


if(env === 'browser')
  // this code is called in the browser
  window.open( pdf.toDataUri() )
else {
  // this code is called in nodejs
  var filename = '/tmp/'+Math.round(Math.random()*1e10)+'.pdf'
  pdf.saveToFile(filename);
  console.log('Result written to '+filename);
}

pdf.free()

