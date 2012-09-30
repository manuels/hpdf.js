function print_page(page, font, page_num) {
  page.setWidth(200);
  page.setHeight(200);

  page.setFontAndSize(font, 20);

  page.beginText();
  page.moveTextPos(50, 150);
  page.showText(page_num.toString());
  page.endText();
}

var uri = 'http://manuels.github.com/hpdf.js'

var pdf = new HPDF();

/* create default-font */
var font = pdf.font("Helvetica");

/* create index page */
var index_page = pdf.addPage();
index_page.setWidth(300);
index_page.setHeight(220);

var page = [];
/* Add 7 pages to the document. */
for (var i = 0; i < 7; i++) {
    page[i] = pdf.addPage();
    print_page(page[i], font, i + 1);
}

index_page.beginText();
index_page.setFontAndSize(font, 10);
index_page.moveTextPos(15, 200);
index_page.showText("Link Annotation Demo");
index_page.endText();

/*
 * Create Link-Annotation object on index page.
 */
index_page.beginText();
index_page.setFontAndSize(font, 8);
index_page.moveTextPos(20, 180);
index_page.setTextLeading(23);

/* page1 (HPDF_ANNOT_NO_HIGHTLIGHT) */
var tp = index_page.currentTextPos();

index_page.showText("Jump to Page1 (HilightMode=HPDF_ANNOT_NO_HIGHTLIGHT)");
var rect = {}
rect.left = tp.x - 4;
rect.bottom = tp.y - 4;
rect.right = index_page.currentTextPos().x + 4;
rect.top = tp.y + 10;

index_page.moveToNextLine();

var dst = page[0].createDestination();

var annot = index_page.createLinkAnnot(rect, dst);

annot.setHighlightMode('NO_HIGHTLIGHT');


/* page2 (HPDF_ANNOT_INVERT_BOX) */
tp = index_page.currentTextPos();

index_page.showText("Jump to Page2 (HilightMode=HPDF_ANNOT_INVERT_BOX)");
rect.left = tp.x - 4;
rect.bottom = tp.y - 4;
rect.right = index_page.currentTextPos().x + 4;
rect.top = tp.y + 10;

index_page.moveToNextLine();

dst = page[1].createDestination();

annot = index_page.createLinkAnnot(rect, dst);

annot.setHighlightMode('INVERT_BOX');


/* page3 (HPDF_ANNOT_INVERT_BORDER) */
tp = index_page.currentTextPos();

index_page.showText("Jump to Page3 (HilightMode=HPDF_ANNOT_INVERT_BORDER)");
rect.left = tp.x - 4;
rect.bottom = tp.y - 4;
rect.right = index_page.currentTextPos().x + 4;
rect.top = tp.y + 10;

index_page.moveToNextLine();

dst = page[2].createDestination();

annot = index_page.createLinkAnnot(rect, dst);

annot.setHighlightMode('INVERT_BORDER');


/* page4 (HPDF_ANNOT_DOWN_APPEARANCE) */
tp = index_page.currentTextPos();

index_page.showText("Jump to Page4 (HilightMode=HPDF_ANNOT_DOWN_APPEARANCE)");
rect.left = tp.x - 4;
rect.bottom = tp.y - 4;
rect.right = index_page.currentTextPos().x + 4;
rect.top = tp.y + 10;

index_page.moveToNextLine();

dst = page[3].createDestination();

annot = index_page.createLinkAnnot(rect, dst);

annot.setHighlightMode('DOWN_APPEARANCE');


/* page5 (dash border) */
tp = index_page.currentTextPos();

index_page.showText("Jump to Page5 (dash border)");
rect.left = tp.x - 4;
rect.bottom = tp.y - 4;
rect.right = index_page.currentTextPos().x + 4;
rect.top = tp.y + 10;

index_page.moveToNextLine();

dst = page[4].createDestination();

annot = index_page.createLinkAnnot(rect, dst);

annot.setBorderStyle(1, 3, 2);


/* page6 (no border) */
tp = index_page.currentTextPos();

index_page.showText("Jump to Page6 (no border)");
rect.left = tp.x - 4;
rect.bottom = tp.y - 4;
rect.right = index_page.currentTextPos().x + 4;
rect.top = tp.y + 10;

index_page.moveToNextLine();

dst = page[5].createDestination();

annot = index_page.createLinkAnnot(rect, dst);

annot.setBorderStyle(0, 0, 0);


/* page7 (bold border) */
tp = index_page.currentTextPos();

index_page.showText("Jump to Page7 (bold border)");
rect.left = tp.x - 4;
rect.bottom = tp.y - 4;
rect.right = index_page.currentTextPos().x + 4;
rect.top = tp.y + 10;

index_page.moveToNextLine();

dst = page[6].createDestination();

annot = index_page.createLinkAnnot(rect, dst);

annot.setBorderStyle(2, 0, 0);


/* URI link */
tp = index_page.currentTextPos();

index_page.showText("URI (");
index_page.showText(uri);
index_page.showText(")");

rect.left = tp.x - 4;
rect.bottom = tp.y - 4;
rect.right = index_page.currentTextPos().x + 4;
rect.top = tp.y + 10;

index_page.createURILinkAnnot(rect, uri);

index_page.endText();


window.addFile( pdf.toDataUri() )

pdf.free()

