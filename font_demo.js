font_list = [
    "Courier",
    "Courier-Bold",
    "Courier-Oblique",
    "Courier-BoldOblique",
    "Helvetica",
    "Helvetica-Bold",
    "Helvetica-Oblique",
    "Helvetica-BoldOblique",
    "Times-Roman",
    "Times-Bold",
    "Times-Italic",
    "Times-BoldItalic",
    "Symbol",
    "ZapfDingbats",
    false
];

var page_title = "Font Demo"
var pdf = new HPDF()

var page = pdf.addPage()

var height = page.height()
var width = page.width()

// Print the lines of the page.
page.setLineWidth(1)
page.rectangle(50, 50, width - 100, height - 110)
page.stroke()

// Print the title of the page (with positioning center).
var def_font = pdf.font("Helvetica")
page.setFontAndSize(def_font, 24)

var tw = page.textWidth(page_title)
page.beginText()
page.textOut((width - tw) / 2, height - 50, page_title)
page.endText()

// output subtitle.
page.beginText()
page.setFontAndSize(def_font, 16)
page.textOut(60, height - 80, "<Standerd Type1 fonts samples>")
page.endText()

page.beginText()
page.moveTextPos(60, height - 105);

var i = 0;
while(font_list[i]) {
  samp_text = "abcdefgABCDEFG12345!#$%&+-@?"
  font = pdf.font(font_list[i])

  // print a label of text
  page.setFontAndSize(def_font, 9)
  page.showText(font_list[i])
  page.moveTextPos(0, -18)

  // print a sample text.
  page.setFontAndSize(font, 20)
  page.showText(samp_text)
  page.moveTextPos(0, -20)

  i++
}

page.endText()

window.addFile( pdf.toDataUri() )

pdf.destroy()

