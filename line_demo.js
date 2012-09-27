var draw_line = function(page, x, y, label) {
  page.beginText()
  page.moveTextPos(x, y - 10);
  page.showText(label);
  page.endText()

  page.moveTo(x, y - 15);
  page.lineTo(x + 220, y - 15);
  page.stroke();
}

var draw_line2 = function(page, x, y, label) {
    page.beginText();
    page.moveTextPos(x, y);
    page.showText(label);
    page.endText();

    page.moveTo(x + 30, y - 25);
    page.lineTo(x + 160, y - 25);
    page.stroke()
}

var draw_rect = function(page, x, y, label) {
    page.beginText();
    page.moveTextPos(x, y - 10);
    page.showText(label);
    page.endText();

    page.rectangle(x, y - 40, 220, 25);
}

var page_title = "Line Example";

var DASH_MODE1 = [3];
var DASH_MODE2 = [3, 7];
var DASH_MODE3 = [8, 7, 2, 7];

var pdf = new HPDF();

/* create default-font */
var font = pdf.font ("Helvetica");

/* add a new page object. */
page = pdf.addPage(pdf);

/* print the lines of the page. */
page.setLineWidth(1);
page.rectangle(50, 50, page.width() - 100,
            page.height() - 110);
page.stroke();

/* print the title of the page (with positioning center). */
page.setFontAndSize(font, 24);
var tw = page.textWidth(page_title);
page.beginText();
page.moveTextPos((page.width() - tw) / 2,
            page.height() - 50);
page.showText(page_title);
page.endText();

page.setFontAndSize(font, 10);

/* Draw verious widths of lines. */
page.setLineWidth(0);
draw_line(page, 60, 770, "line width = 0");

page.setLineWidth(1.0);
draw_line(page, 60, 740, "line width = 1.0");

page.setLineWidth(2.0);
draw_line(page, 60, 710, "line width = 2.0");

/* Line dash pattern */
page.setLineWidth(1.0);

page.setDash(DASH_MODE1, 1);
draw_line(page, 60, 680, "dash_ptn=[3], phase=1 --  2 on, 3 off, 3 on...");

page.setDash(DASH_MODE2, 2);
draw_line(page, 60, 650, "dash_ptn=[7, 3], phase=2 --  5 on 3 off, 7 on,...");

page.setDash(DASH_MODE3, 0);
draw_line(page, 60, 620, "dash_ptn=[8, 7, 2, 7], phase=0");

page.setDash([], 0);

page.setLineWidth(30);
page.setRGBStroke(0.0, 0.5, 0.0);

/* Line Cap Style */
page.setLineCap('BUTT_END');
draw_line2(page, 60, 570, "BUTT_END");

page.setLineCap('ROUND_END');
draw_line2(page, 60, 505, "ROUND_END");

page.setLineCap('PROJECTING_SCUARE_END');
draw_line2(page, 60, 440, "PROJECTING_SCUARE_END");

/* Line Join Style */
page.setLineWidth(30);
page.setRGBStroke(0.0, 0.0, 0.5);

page.setLineJoin('MITER_JOIN');
page.moveTo(120, 300);
page.lineTo(160, 340);
page.lineTo(200, 300);
page.stroke();

page.beginText();
page.moveTextPos(60, 360);
page.showText("MITER_JOIN");
page.endText();

page.setLineJoin('ROUND_JOIN');
page.moveTo(120, 195);
page.lineTo(160, 235);
page.lineTo(200, 195);
page.stroke();

page.beginText();
page.moveTextPos(60, 255);
page.showText("ROUND_JOIN");
page.endText();

page.setLineJoin('BEVEL_JOIN');
page.moveTo(120, 90);
page.lineTo(160, 130);
page.lineTo(200, 90);
page.stroke();

page.beginText();
page.moveTextPos(60, 150);
page.showText("BEVEL_JOIN");
page.endText();

/* Draw Rectangle */
page.setLineWidth(2);
page.setRGBStroke(0, 0, 0);
page.setRGBFill(0.75, 0.0, 0.0);

draw_rect(page, 300, 770, "Stroke");
page.stroke();

draw_rect(page, 300, 720, "Fill");
page.fill();

draw_rect(page, 300, 670, "Fill then Stroke");
page.fillStroke();

/* Clip Rect */
page.gSave();  /* Save the current graphic state */
draw_rect(page, 300, 620, "Clip Rectangle");
page.clip();
page.stroke();
page.setFontAndSize(font, 13);

page.beginText();
page.moveTextPos(290, 600);
page.setTextLeading(12);
page.showText("Clip Clip Clip Clip Clip Clipi Clip Clip Clip");
page.showTextNextLine("Clip Clip Clip Clip Clip Clip Clip Clip Clip");
page.showTextNextLine("Clip Clip Clip Clip Clip Clip Clip Clip Clip");
page.endText();
page.gRestore();

/* Curve Example(CurveTo2) */
var x = 330;
var y = 440;
var x1 = 430;
var y1 = 530;
var x2 = 480;
var y2 = 470;
var x3 = 480;
var y3 = 90;

page.setRGBFill(0, 0, 0);

page.beginText();
page.moveTextPos(300, 540);
page.showText("CurveTo2(x1, y1, x2. y2)");
page.endText();

page.beginText();
page.moveTextPos(x + 5, y - 5);
page.showText("Current point");
page.moveTextPos(x1 - x, y1 - y);
page.showText("(x1, y1)");
page.moveTextPos(x2 - x1, y2 - y1);
page.showText("(x2, y2)");
page.endText();

page.setDash(DASH_MODE1, 0);

page.setLineWidth(0.5);
page.moveTo(x1, y1);
page.lineTo(x2, y2);
page.stroke (page);

page.setDash([], 0);

page.setLineWidth(1.5);

page.moveTo(x, y);
page.curveTo2(x1, y1, x2, y2);
page.stroke();

/* Curve Example(CurveTo3) */
y -= 150;
y1 -= 150;
y2 -= 150;

page.beginText();
page.moveTextPos(300, 390);
page.showText("CurveTo3(x1, y1, x2. y2)");
page.endText();

page.beginText();
page.moveTextPos(x + 5, y - 5);
page.showText("Current point");
page.moveTextPos(x1 - x, y1 - y);
page.showText("(x1, y1)");
page.moveTextPos(x2 - x1, y2 - y1);
page.showText("(x2, y2)");
page.endText();

page.setDash(DASH_MODE1, 0);

page.setLineWidth(0.5);
page.moveTo(x, y);
page.lineTo(x1, y1);
page.stroke();

page.setDash([], 0);

page.setLineWidth(1.5);
page.moveTo(x, y);
page.curveTo3(x1, y1, x2, y2);
page.stroke();

/* Curve Example(CurveTo) */
y -= 150;
y1 -= 160;
y2 -= 130;
x2 += 10;

page.beginText();
page.moveTextPos(300, 240);
page.showText("CurveTo(x1, y1, x2. y2, x3, y3)");
page.endText();

page.beginText();
page.moveTextPos(x + 5, y - 5);
page.showText("Current point");
page.moveTextPos(x1 - x, y1 - y);
page.showText("(x1, y1)");
page.moveTextPos(x2 - x1, y2 - y1);
page.showText("(x2, y2)");
page.moveTextPos(x3 - x2, y3 - y2);
page.showText("(x3, y3)");
page.endText();

page.setDash(DASH_MODE1, 0);

page.setLineWidth(0.5);
page.moveTo(x, y);
page.lineTo(x1, y1);
page.stroke (page);
page.moveTo(x2, y2);
page.lineTo(x3, y3);
page.stroke();

page.setDash([], 0);

page.setLineWidth(1.5);
page.moveTo(x, y);
page.curveTo(x1, y1, x2, y2, x3, y3);
page.stroke();

/* save the document to a file */
window.addFile( pdf.toDataUri() )

/* clean up */
pdf.destroy();

