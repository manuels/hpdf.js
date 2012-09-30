function draw_circles(page, description, x, y) {
  page.setLineWidth(1.0);
  page.setRGBStroke(0.0, 0.0, 0.0);
  page.setRGBFill(1.0, 0.0, 0.0);
  page.circle(x + 40, y + 40, 40);
  page.closePathFillStroke();
  page.setRGBFill(0.0, 1.0, 0.0);
  page.circle(x + 100, y + 40, 40);
  page.closePathFillStroke();
  page.setRGBFill(0.0, 0.0, 1.0);
  page.circle(x + 70, y + 74.64, 40);
  page.closePathFillStroke();

  page.setRGBFill(0.0, 0.0, 0.0);
  page.beginText();
  page.textOut(x + 0.0, y + 130.0, description);
  page.endText();
}


var PAGE_WIDTH = 600;
var PAGE_HEIGHT = 900;

var pdf = new HPDF();

var hfont = pdf.font("Helvetica-Bold");

/* add a new page object. */
page = pdf.addPage();

page.setFontAndSize( hfont, 10);

page.setHeight(PAGE_HEIGHT);
page.setWidth(PAGE_WIDTH);

/* normal */
page.gSave()
draw_circles(page, "normal", 40.0, PAGE_HEIGHT - 170);
page.gRestore()

/* transparency (0.8) */
page.gSave()
var gstate = pdf.createExtGState();
gstate.setAlphaFill(0.8);
gstate.setAlphaStroke(0.8);
page.setExtGState(gstate);
draw_circles(page, "alpha fill = 0.8", 230.0, PAGE_HEIGHT - 170);
page.gRestore()

/* transparency (0.4) */
page.gSave()
gstate = pdf.createExtGState();
gstate.setAlphaFill(0.4);
page.setExtGState(gstate);
draw_circles(page, "alpha fill = 0.4", 420.0, PAGE_HEIGHT - 170);
page.gRestore()

/* blend-mode=HPDF_BM_MULTIPLY */
page.gSave()
gstate = pdf.createExtGState();
gstate.setBlendMode('MULTIPLY');
page.setExtGState(gstate);
draw_circles(page, "HPDF_BM_MULTIPLY", 40.0, PAGE_HEIGHT - 340);
page.gRestore()

/* blend-mode=HPDF_BM_SCREEN */
page.gSave()
gstate = pdf.createExtGState();
gstate.setBlendMode('SCREEN');
page.setExtGState(gstate);
draw_circles(page, "HPDF_BM_SCREEN", 230.0, PAGE_HEIGHT - 340);
page.gRestore()

/* blend-mode=HPDF_BM_OVERLAY */
page.gSave()
gstate = pdf.createExtGState();
gstate.setBlendMode('OVERLAY');
page.setExtGState(gstate);
draw_circles(page, "HPDF_BM_OVERLAY", 420.0, PAGE_HEIGHT - 340);
page.gRestore()

/* blend-mode=HPDF_BM_DARKEN */
page.gSave()
gstate = pdf.createExtGState();
gstate.setBlendMode('DARKEN');
page.setExtGState(gstate);
draw_circles(page, "HPDF_BM_DARKEN", 40.0, PAGE_HEIGHT - 510);
page.gRestore()

/* blend-mode=HPDF_BM_LIGHTEN */
page.gSave()
gstate = pdf.createExtGState();
gstate.setBlendMode('LIGHTEN');
page.setExtGState(gstate);
draw_circles(page, "HPDF_BM_LIGHTEN", 230.0, PAGE_HEIGHT - 510);
page.gRestore()

/* blend-mode=HPDF_BM_COLOR_DODGE */
page.gSave()
gstate = pdf.createExtGState();
gstate.setBlendMode('COLOR_DODGE');
page.setExtGState(gstate);
draw_circles(page, "HPDF_BM_COLOR_DODGE", 420.0, PAGE_HEIGHT - 510);
page.gRestore()


/* blend-mode=HPDF_BM_COLOR_BUM */
page.gSave()
gstate = pdf.createExtGState();
gstate.setBlendMode('COLOR_BUM');
page.setExtGState(gstate);
draw_circles(page, "HPDF_BM_COLOR_BUM", 40.0, PAGE_HEIGHT - 680);
page.gRestore()

/* blend-mode=HPDF_BM_HARD_LIGHT */
page.gSave()
gstate = pdf.createExtGState();
gstate.setBlendMode('HARD_LIGHT');
page.setExtGState(gstate);
draw_circles(page, "HPDF_BM_HARD_LIGHT", 230.0, PAGE_HEIGHT - 680);
page.gRestore()

/* blend-mode=HPDF_BM_SOFT_LIGHT */
page.gSave()
gstate = pdf.createExtGState();
gstate.setBlendMode('SOFT_LIGHT');
page.setExtGState(gstate);
draw_circles(page, "HPDF_BM_SOFT_LIGHT", 420.0, PAGE_HEIGHT - 680);
page.gRestore()

/* blend-mode=HPDF_BM_DIFFERENCE */
page.gSave()
gstate = pdf.createExtGState();
gstate.setBlendMode('DIFFERENCE');
page.setExtGState(gstate);
draw_circles(page, "HPDF_BM_DIFFERENCE", 40.0, PAGE_HEIGHT - 850);
page.gRestore()


/* blend-mode=HPDF_BM_EXCLUSHON */
page.gSave()
gstate = pdf.createExtGState();
gstate.setBlendMode('EXCLUSHON');
page.setExtGState(gstate);
draw_circles(page, "HPDF_BM_EXCLUSHON", 230.0, PAGE_HEIGHT - 850);
page.gRestore()


window.addFile( pdf.toDataUri() )

pdf.free()

