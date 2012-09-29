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


var pdf = new HPDF();

/* add a new page object. */
var page = pdf.addPage();

page.setHeight(600);
page.setWidth(400);

print_grid(pdf, page);


window.addFile( pdf.toDataUri() )

pdf.destroy()

