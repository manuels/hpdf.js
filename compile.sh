#!/bin/bash
set -e -x

EMSCRIPTEN=~/bin/emscripten
EMCC=$EMSCRIPTEN/emcc
CFLAGS=
COFFEE=/usr/bin/coffee
$COFFEE -c post.coffee
$EMCC $CFLAGS \
  -D 'HPDF_EXPORT(type)=__attribute__((used)) type' \
  ./libharu/src/*.c \
  -I./libharu/include -I$EMSCRIPTEN/system/include/emscripten main.c --post-js post.js -o hpdf.js

