var env;
if(typeof window === 'undefined') {
  env = 'nodejs';
  HPDF = require('../hpdf.js').HPDF;
}
else
  env = 'browser';


var text = "This is an encrypt document example.";

var owner_password = "owner";
var user_password = "user";

var pdf = new HPDF();

/* create default-font */
var font = pdf.font("Helvetica");

/* add a new page object. */
var page = pdf.addPage();

page.setSize('B5', 'l');

page.beginText();
page.setFontAndSize(font, 20);
tw = page.textWidth(text);
page.moveTextPos((page.width() - tw) / 2,
                 (page.height()  - 20) / 2);
page.showText(text);
page.endText();

pdf.setPassword(owner_password, user_password);

if(env==='browser')
  window.open( pdf.toDataUri() )
else {
  var filename = '/tmp/'+Math.round(Math.random()*1e10)+'.pdf'
  pdf.saveToFile(filename);
  console.log('Result written to '+filename);
}

pdf.free()

