var PAGE_HEIGHT = 210;

function main(response) {
  var samp_text = this.responseText;

  var pdf = new HPDF();

  /* configure pdf-document to be compressed. */
  pdf.setCompressionMode('a');

  /* declaration for using Japanese font, encoding. */
  pdf.useJPEncodings();
  pdf.useJPFonts();

  detail_font = []
  detail_font[0] = pdf.font("MS-Mincyo", "90ms-RKSJ-H");
  detail_font[1] = pdf.font("MS-Mincyo,Bold", "90ms-RKSJ-H");
  detail_font[2] = pdf.font("MS-Mincyo,Italic", "90ms-RKSJ-H");
  detail_font[3] = pdf.font("MS-Mincyo,BoldItalic", "90ms-RKSJ-H");
  detail_font[4] = pdf.font("MS-PMincyo", "90msp-RKSJ-H");
  detail_font[5] = pdf.font("MS-PMincyo,Bold", "90msp-RKSJ-H");
  detail_font[6] = pdf.font("MS-PMincyo,Italic", "90msp-RKSJ-H");
  detail_font[7] = pdf.font("MS-PMincyo,BoldItalic",
          "90msp-RKSJ-H");
  detail_font[8] = pdf.font("MS-Gothic", "90ms-RKSJ-H");
  detail_font[9] = pdf.font("MS-Gothic,Bold", "90ms-RKSJ-H");
  detail_font[10] = pdf.font("MS-Gothic,Italic", "90ms-RKSJ-H");
  detail_font[11] = pdf.font("MS-Gothic,BoldItalic", "90ms-RKSJ-H");
  detail_font[12] = pdf.font("MS-PGothic", "90msp-RKSJ-H");
  detail_font[13] = pdf.font("MS-PGothic,Bold", "90msp-RKSJ-H");
  detail_font[14] = pdf.font("MS-PGothic,Italic", "90msp-RKSJ-H");
  detail_font[15] = pdf.font("MS-PGothic,BoldItalic",
          "90msp-RKSJ-H");

  /* Set page mode to use outlines. */
  pdf.setPageMode('outline');

  /* create outline root. */
  root = pdf.createOutline(undefined, "JP font demo");
  root.setOpened(true);

  for (var i = 0; i <= 15; i++) {
      /* add a new page object. */
      var page = pdf.addPage();

      /* create outline entry */
      var outline = pdf.createOutline(root, detail_font[i].fontName());
      var dst = page.createDestination();
      outline.setDestination(dst);

      var title_font = pdf.font("Helvetica");
      page.setFontAndSize(title_font, 10);

      page.beginText();

      /* move the position of the text to top of the page. */
      page.moveTextPos(10, 190);
      page.showText(detail_font[i].fontName());

      page.setFontAndSize(detail_font[i], 15);
      page.moveTextPos(10, -20);
      page.showText("abcdefghijklmnopqrstuvwxyz");
      page.moveTextPos(0, -20);
      page.showText("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
      page.moveTextPos(0, -20);
      page.showText("1234567890");
      page.moveTextPos(0, -20);

      page.setFontAndSize(detail_font[i], 10);
      page.showText(samp_text);
      page.moveTextPos(0, -18);

      page.setFontAndSize(detail_font[i], 16);
      page.showText(samp_text);
      page.moveTextPos(0, -27);

      page.setFontAndSize(detail_font[i], 23);
      page.showText(samp_text);
      page.moveTextPos(0, -36);

      page.setFontAndSize(detail_font[i], 30);
      page.showText(samp_text);

      var p = page.currentTextPos();
      console.warn(p);

      /* finish to print text. */
      page.endText();

      page.setLineWidth(0.5);

      var x_pos = 20;
      for (var j = 0; j <= samp_text.length / 2; j++) {
          page.moveTo(x_pos, p.y - 10);
          page.lineTo(x_pos, p.y - 12);
          page.stroke();
          x_pos = x_pos + 30;
      }

      page.setWidth(p.x + 20);
      page.setHeight(PAGE_HEIGHT);

      page.moveTo(10, PAGE_HEIGHT - 25);
      page.lineTo(p.x + 10, PAGE_HEIGHT - 25);
      page.stroke()

      page.moveTo(10, PAGE_HEIGHT - 85);
      page.lineTo(p.x + 10, PAGE_HEIGHT - 85);
      page.stroke()

      page.moveTo(10, p.y - 12);
      page.lineTo(p.x + 10, p.y - 12);
      page.stroke()
  }

  window.addFile( pdf.toDataUri() )

  pdf.destroy()
}

var xhr = new XMLHttpRequest();
xhr.open('GET', 'demo/mbtext/sjis.txt', true);
xhr.responseType = 'text';
xhr.onload = main;
xhr.send();

