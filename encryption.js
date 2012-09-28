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

window.addFile( pdf.toDataUri() )

pdf.destroy()

