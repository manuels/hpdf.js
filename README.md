hpdf.js
=======

Create PDFs in your browser (port of libharu)
[See the demo page](http://manuels.github.com/hpdf.js/)


Why?
====

Because current projects with the same goal do not support custom fonts.


Dependencies
============

None. You just need [emscripten](https://github.com/kripken/emscripten) if you want to help developing hpdf.js


How to use
==========

Include `hpdf.js` or `hpdf.min.js` in your HTML file and [see examples](http://manuels.github.com/hpdf.js/) or [libharu API reference](https://github.com/libharu/libharu/wiki)


How to compile (for devs)
===============================

1. Configure libhaku
``cmake ./libharu``

1. Configure libpng
``cmake ./libpng``

2. Compile hpdf.js
``./compile.sh``
(You might want to change some paths in this bash script!)

