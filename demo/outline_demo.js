var env;
if(typeof window === 'undefined') {
  env = 'nodejs';
  HPDF = require('../hpdf.js').HPDF;
}
else
  env = 'browser';


function print_page(page, page_num) {
  page.setWidth(800);
  page.setHeight(800);

  page.beginText();
  page.moveTextPos(30, 740);
  page.showText(page_num.toString());
  page.endText();
}

var pdf = new HPDF();

/* create default-font */
var font = pdf.font("Helvetica");

/* Set page mode to use outlines. */
pdf.setPageMode('OUTLINE');

var page = [];
/* Add 3 pages to the document. */
page[0] = pdf.addPage();
page[0].setFontAndSize(font, 30);
print_page(page[0], 0);

page[1] = pdf.addPage();
page[1].setFontAndSize(font, 30);
print_page(page[1], 1);

page[2] = pdf.addPage();
page[2].setFontAndSize(font, 30);
print_page(page[2], 2);

/* create outline root. */
var root = pdf.createOutline(undefined, "OutlineRoot");
root.setOpened(true);

var outline = []
outline[0] = pdf.createOutline(root, "page1");
outline[1] = pdf.createOutline(root, "page2");

/* create outline with test which is ISO8859-2 encoding */
outline[2] = pdf.createOutline(root, "ISO8859-2 text ÓÔÕÖ×ØÙ",
                pdf.encoder("ISO8859-2"));

/* create destination objects on each pages
 * and link it to outline items.
 */
var dst = page[0].createDestination();
dst.setXYZ(0, page[0].height(), 1);
outline[0].setDestination(dst);
//  HPDF_Catalog_SetOpenAction(dst);

dst = page[1].createDestination();
dst.setXYZ(0, page[1].height(), 1);
outline[1].setDestination(dst);

dst = page[2].createDestination();
dst.setXYZ(0, page[2].height(), 1);
outline[2].setDestination(dst);


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

