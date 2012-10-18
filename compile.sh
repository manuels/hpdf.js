#!/bin/bash
set -e -x

EMSCRIPTEN=~/bin/emscripten
EMCC=$EMSCRIPTEN/emcc
CFLAGS=
COFFEE=/usr/bin/coffee
INCLUDES="./zlib/*.c \
  ./libpng/png.c \
  ./libpng/pngerror.c \
  ./libpng/pngget.c \
  ./libpng/pngmem.c \
  ./libpng/pngpread.c \
  ./libpng/pngread.c \
  ./libpng/pngrio.c \
  ./libpng/pngrtran.c \
  ./libpng/pngrutil.c \
  ./libpng/pngset.c \
  ./libpng/pngtrans.c \
  ./libpng/pngwio.c \
  ./libpng/pngwrite.c \
  ./libpng/pngwtran.c \
  ./libpng/pngwutil.c \
  ./libharu/src/*.c \
  -I./libharu/include \
  -I./libpng \
  -I$EMSCRIPTEN/system/include/emscripten main.c"


$COFFEE -c post.coffee

$EMCC $CFLAGS \
  -D 'HPDF_EXPORT(type)=__attribute__((used)) type' \
  $INCLUDES --post-js post.js -o hpdf.js

$EMCC --minify 1 $CFLAGS \
  -D 'HPDF_EXPORT(type)=__attribute__((used)) type' \
  $INCLUDES --post-js post.js -o hpdf.min.js

