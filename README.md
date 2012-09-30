hpdf.js
=======

Create PDFs in your browser (port of libharu)
[See the demo page](http://manuels.github.com/hpdf.js/)


Why?
====

Because other projects with the same goal lack a lot of features (e.g. custom fonts).


Features
========
- Custom Fonts (Type1 and TTF)
- PNG, JPG and RAW images
- Password encryption
- Text and Link Annotations
- Outlines
- Drawing function (lines, cycles etc.)
- Encoding support


How to use
==========

Include `hpdf.js` or `hpdf.min.js` in your HTML file and [see examples](http://manuels.github.com/hpdf.js/) or [libharu API reference](https://github.com/libharu/libharu/wiki)


API naming convention
=====================

- Function names are like their [libharu API](https://github.com/libharu/libharu/wiki) pendants but object-oriented and their first letter is lowercase.
```
    // javascript code                     C code
    var pdf = new HPDF();                  HPDF_Doc pdf = HPDF_New (error_handler, NULL);
    var page = pdf.addPage();              HPDF_Page page = HPDF_AddPage(pdf);
    pdf.free();                            HPDF_Free(pdf);
```

- ``Get``s are ommitted and ``Set``s are kept
```
    // javascript code                     C code
    var width = page.width();              HPDF_REAL width = HPDF_Page_GetWidth(page);
    page.setLineWidth(5);                  HPDF_Page_SetLineWidth(page, 5);
```

- Use ``undefined`` in Javascript where you would use ``NULL`` in C
```
    // javascript code                           C code
    var root = pdf.createOutline(undefined,      root = HPDF_CreateOutline (pdf, NULL, "OutlineRoot", NULL);
       "OutlineRoot", undefined);
```

- Use strings (case irrelevant) in Javascript where you would use constants in C
```
    // javascript code                           C code
    page.setSize('B5', 'landscape');             HPDF_Page_SetSize(page, HPDF_PAGE_SIZE_B5, HPDF_PAGE_LANDSCAPE);
```

- Tailing ``NULL``s/``undefined``s can be ommitted
```
    // javascript code                           C code
    var font = pdf.font('Helvetica');           HPDF_Font font = HPDF_PDF_GetFont(pdf, 'Helvetica', NULL);
```

- Instead of the error handling function in C ``Exception``s are thrown in Javascript


Dependencies
============

None. You just need [emscripten](https://github.com/kripken/emscripten) and [CoffeeScript](http://www.coffeescript.org/) if you want to help developing hpdf.js


How to compile (for devs only)
===============================

1. Configure libhaku
``cmake ./libharu``

1. Configure libpng
``cd ./libpng; cmake .; cd ..``

2. Compile hpdf.js
``./compile.sh``
(You might want to change some paths in this bash script!)

