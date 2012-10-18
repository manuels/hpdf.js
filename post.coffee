Module ?= []

env = if window? then 'browser' else 'nodejs'

fileCounter = 0

FLOAT_SIZE = 4

HPDF = {}

class Font
  constructor: (@doc, @font) ->


  fontName: ->
    ccall(@doc, 'HPDF_Font_GetFontName', 'string', ['number'], [@font])



class Encoder
  constructor: (@doc, @encoder) ->



class ExtGState
  constructor: (@doc, @gstate) ->


  setAlphaFill: (alpha) ->
    ccall(@doc, 'HPDF_ExtGState_SetAlphaFill', 'number', ['number', 'number'], [@gstate, alpha])


  setAlphaStroke: (alpha) ->
    ccall(@doc, 'HPDF_ExtGState_SetAlphaStroke', 'number', ['number', 'number'], [@gstate, alpha])


  setBlendMode: (mode) ->
    id = 0
    switch mode.toLowerCase()
      when 'normal'      then id = 0  # HPDF_BM_NORMAL
      when 'multiply'    then id = 1  # HPDF_BM_MULTIPLY
      when 'screen'      then id = 2  # HPDF_BM_SCREEN
      when 'overlay'     then id = 3  # HPDF_BM_OVERLAY
      when 'darken'      then id = 4  # HPDF_BM_DARKEN
      when 'lighten'     then id = 5  # HPDF_BM_LIGHTEN
      when 'color_dodge' then id = 6  # HPDF_BM_COLOR_DODGE
      when 'color_bum'   then id = 7  # HPDF_BM_COLOR_BUM
      when 'hard_light'  then id = 8  # HPDF_BM_HARD_LIGHT
      when 'soft_light'  then id = 9  # HPDF_BM_SOFT_LIGHT
      when 'difference'  then id = 10 # HPDF_BM_DIFFERENCE
      when 'exclushon'   then id = 11 # HPDF_BM_EXCLUSHON
    ccall(@doc, 'HPDF_ExtGState_SetBlendMode', 'number', ['number', 'number'], [@gstate, id])



class Annotation
  constructor: (@doc, @annot) ->


  setBorderStyle: (subtype, width, dash_on, dash_off, dash_phase) ->
    switch subtype.toLowerCase()[0]
      when 's' then 0 # HPDF_BS_SOLID 
      when 'd' then 1 # HPDF_BS_DASHED 
      when 'b' then 2 # HPDF_BS_BEVELED
      when 'i' then 3 # HPDF_BS_INSET
      when 'u' then 4 # HPDF_BS_UNDERLINED
    ccall(@doc, 'HPDF_Annot_SetBorderStyle', 'number', ['number','number','number','number','number','number'], [@annot, id, width, dash_on, dash_off, dash_phase])    



class LinkAnnotation extends Annotation
  setHighlightMode: (mode) ->
    id = 0
    switch mode.toUpperCase()
      when 'NO_HIGHTLIGHT'   then id = 0 # HPDF_ANNOT_NO_HIGHTLIGHT
      when 'INVERT_BOX'      then id = 1 # HPDF_ANNOT_INVERT_BOX
      when 'INVERT_BORDER'   then id = 2 # HPDF_ANNOT_INVERT_BORDER
      when 'DOWN_APPEARANCE' then id = 3 # HPDF_ANNOT_DOWN_APPEARANCE
    ccall(@doc, 'HPDF_LinkAnnot_SetHighlightMode', 'number', ['number'], [@annot, id])    


  setBorderStyle: (width, dash_on, dash_off) ->
    ccall(@doc, 'HPDF_LinkAnnot_SetBorderStyle', 'number', ['number','number','number','number'], [@annot, width, dash_on, dash_off])    



class TextAnnotation extends Annotation
  setIcon: (icon) ->
    id = 0
    switch icon.toLowerCase()[0]
      when 'c' then id = 0 # HPDF_ANNOT_ICON_COMMENT
      when 'k' then id = 1 # HPDF_ANNOT_ICON_KEY
      when 'n' then id = 2 # HPDF_ANNOT_ICON_NOTE
      when 'h' then id = 3 # HPDF_ANNOT_ICON_HELP
      when 'n' then id = 4 # HPDF_ANNOT_ICON_NEW_PARAGRAPH
      when 'p' then id = 5 # HPDF_ANNOT_ICON_PARAGRAPH
      when 'i' then id = 6 # HPDF_ANNOT_ICON_INSERT
    ccall(@doc, 'HPDF_TextAnnot_SetIcon', 'number', ['number'], [@annot, id])    


  setOpened: (opened) ->
    ccall(@doc, 'HPDF_TextAnnot_SetOpened', 'number', ['number'], [@annot, if opened then 1 else 0])    


class Outline
  constructor: (@doc, @outline) ->


  setDestination: (dst) ->
    ccall(@doc, 'HPDF_Outline_SetDestination', 'number', ['number', 'number'], [@outline, dst.dst])


  setOpened: (is_open) ->
    ccall(@doc, 'HPDF_Outline_SetOpened', 'number', ['number', 'number'], [@outline, if is_open then 1 else 0])



class Destination
  constructor: (@doc, @dst) ->


  setXYZ: (left, top, zoom) ->
    ccall(@doc, 'HPDF_Destination_SetXYZ', 'number', ['number', 'number', 'number', 'number'], [@dst, left, top, zoom])



class Image
  constructor: (@doc, @image) ->

  width: ->
    ccall(@doc, 'HPDF_Image_GetWidth', 'number', ['number'], [@image])


  height: ->
    ccall(@doc, 'HPDF_Image_GetHeight', 'number', ['number'], [@image])



class Page
  constructor: (@doc, @page) ->

  
  concat: (a,b,c,d,x,y) ->
    ccall(@doc, 'HPDF_Page_Concat', 'number', ['number','number','number','number','number','number','number'], [@page,a,b,c,d,x,y])


  setTextMatrix: (a,b,c,d,x,y) ->
    ccall(@doc, 'HPDF_Page_SetTextMatrix', 'number', ['number','number','number','number','number','number','number'], [@page,a,b,c,d,x,y])


  textMatrix: ->
    ccall(@doc, 'HPDF_Page_GetTextMatrix', 'number', ['number'], [@page])


  closePathFillStroke: ->
    ccall(@doc, 'HPDF_Page_ClosePathFillStroke', 'number', ['number'], [@page])


  setFontAndSize: (font, size) ->
    ccall(@doc, 'HPDF_Page_SetFontAndSize', 'number', ['number', 'number', 'number'], [@page, font.font, size])


  setGrayFill: (grayness) ->
    ccall(@doc, 'HPDF_Page_SetGrayFill', 'number', ['number', 'number'], [@page, grayness])


  setGrayStroke: (stroke) ->
    ccall(@doc, 'HPDF_Page_SetGrayStroke', 'number', ['number', 'number'], [@page, stroke])


  currentPos: ->
    ptr = Module['allocate']([0,0], 'float', ALLOC_NORMAL)
    ccall(@doc, 'HPDF_Page_GetCurrentPos', 'number', ['number','number'], [ptr, @page])
    return {
      x: getValue(ptr, 'float')
      y: getValue(ptr+FLOAT_SIZE, 'float')
    }


  currentTextPos: ->
    ptr = Module['allocate']([0,0], 'float', ALLOC_NORMAL)
    ccall(@doc, 'HPDF_Page_GetCurrentTextPos', 'number', ['number','number'], [ptr, @page])
    return {
      x: getValue(ptr, 'float')
      y: getValue(ptr+FLOAT_SIZE, 'float')
    }


  createDestination: ->
    ret = ccall(@doc, 'HPDF_Page_CreateDestination', 'number', ['number'], [@page])
    new Destination(@doc, ret)


  createTextAnnot: (rect, text, encoder) ->
    if rect not instanceof Array
      rect = [rect.left, rect.bottom, rect.right, rect.top]
    ret = ccall(@doc, 'HPDF_Page_CreateTextAnnot', 'number', ['number', 'number','number','number','number', 'number', 'number'], [@page, rect[0], rect[1], rect[2], rect[3], toAscii(text), encoder?.encoder])
    new TextAnnotation(@doc, ret)


  createURILinkAnnot: (rect, uri) ->
    if rect not instanceof Array
      rect = [rect.left, rect.bottom, rect.right, rect.top]
    ret = ccall(@doc, 'HPDF_Page_CreateURILinkAnnot', 'number', ['number', 'number','number','number','number', 'string'], [@page, rect[0], rect[1], rect[2], rect[3], uri])
    new Annotation(@doc, ret)


  createLinkAnnot: (rect, dst) ->
    if rect not instanceof Array
      rect = [rect.left, rect.bottom, rect.right, rect.top]
    ret = ccall(@doc, 'HPDF_Page_CreateLinkAnnot', 'number', ['number', 'number','number','number','number', 'number'], [@page, rect[0], rect[1], rect[2], rect[3], dst.dst])
    new LinkAnnotation(@doc, ret)


  setSize: (size, orientation) ->
    switch size.toLowerCase()
      when 'letter' then s = HPDF_PAGE_SIZE_LETTER
      when 'legal'  then s = HPDF_PAGE_SIZE_LEGAL
      when 'a3'     then s = HPDF_PAGE_SIZE_A3
      when 'a4'     then s = HPDF_PAGE_SIZE_A4
      when 'a5'     then s = HPDF_PAGE_SIZE_A5
      when 'b4'     then s = HPDF_PAGE_SIZE_B4
      when 'b5'     then s = HPDF_PAGE_SIZE_B5
      when 'executive' then s = HPDF_PAGE_SIZE_EXECUTIVE
      when 'us4x6'  then s = HPDF_PAGE_SIZE_US4x6
      when 'us4x8'  then s = HPDF_PAGE_SIZE_US4x8
      when 'us5x7'  then s = HPDF_PAGE_SIZE_US5x7

    if orientation == 'l' or orientation == 'landscape'
      o = HPDF_PAGE_LANDSCAPE
    else
      o = HPDF_PAGE_PORTRAIT

    ccall(@doc, 'HPDF_Page_SetSize', 'number', ['number', 'number', 'number'], [@page, s, o])


  drawImage: (image, x, y, w, h) ->
    ccall(@doc, 'HPDF_Page_DrawImage', 'number', ['number', 'number', 'number', 'number', 'number', 'number'], [@page, image.image, x, y, w, h])


  textWidth: (text) ->
    ccall(@doc, 'HPDF_Page_TextWidth', 'number', ['number', 'number'], [@page, toAscii(text)])


  setWidth: (w) ->
    ccall(@doc, 'HPDF_Page_SetWidth', 'number', ['number', 'number'], [@page, w])


  setHeight: (h) ->
    ccall(@doc, 'HPDF_Page_SetHeight', 'number', ['number', 'number'], [@page, h])


  beginText: ->
    ccall(@doc, 'HPDF_Page_BeginText', 'number', ['number'], [@page])


  height: ->
    ccall(@doc, 'HPDF_Page_GetHeight', 'number', ['number'], [@page])


  width: ->
    ccall(@doc, 'HPDF_Page_GetWidth', 'number', ['number'], [@page])


  setLineWidth: (w) ->
    ccall(@doc, 'HPDF_Page_SetLineWidth', 'number', ['number', 'number'], [@page, w])


  getLineWidth: ->
    ccall(@doc, 'HPDF_Page_GetLineWidth', 'number', ['number'], [@page])


  rectangle: (x1,y1,x2,y2) ->
    ccall(@doc, 'HPDF_Page_Rectangle', 'number', ['number', 'number', 'number', 'number', 'number'], [@page, x1,y1,x2,y2])


  stroke: ->
    ccall(@doc, 'HPDF_Page_Stroke', 'number', ['number'], [@page])


  moveTextPos: (x,y) ->
    ccall(@doc, 'HPDF_Page_MoveTextPos', 'number', ['number','number','number'], [@page, x, y])

          
  showText: (text) ->
    ccall(@doc, 'HPDF_Page_ShowText', 'number', ['number', 'number'], [@page, toAscii(text)])
          

  textOut: (x,y,text) ->
    ccall(@doc, 'HPDF_Page_TextOut', 'number', ['number','number','number','number'], [@page,x,y,toAscii(text)])
          

  textRect: (left, top, right, bottom, text, align) ->
    # allow call signature textRect([left, top, right, bottom], text, align)
    if left instanceof Array
      rect = left
      text = top
      align = right

      [left, top, right, bottom] = rect

    # allow call signature textRect({left: left, top: top, right: right, bottom: bottom], text, align)
    if left instanceof Object
      rect = left
      text = top
      align = right

      left = rect.left
      top = rect.top
      right = rect.right
      bottom = rect.bottom

    switch align[0].toLowerCase()
      when 'l' then align = 0
      when 'r' then align = 1
      when 'c' then align = 2
      when 'j' then align = 3

    len_ptr = Module['allocate']([0], 'i32', ALLOC_NORMAL)
    ccall(@doc, 'HPDF_Page_TextRect', 'number',
      ['number', 'number', 'number', 'number', 'number', 'number',      'number', 'number'],
      [@page,    left,     top,      right,    bottom,   toAscii(text), align,    len_ptr])

    return getValue(len_ptr, 'i32')


  moveTo: (x,y) ->
    ccall(@doc, 'HPDF_Page_MoveTo', 'number', ['number','number','number'], [@page,x,y])


  moveToNextLine: ->
    ccall(@doc, 'HPDF_Page_MoveToNextLine', 'number', ['number'], [@page])
          

  setRGBStroke: (r,g,b) ->
    ccall(@doc, 'HPDF_Page_SetRGBStroke', 'number', ['number','number','number','number'], [@page,r,g,b])
          

  setRGBFill: (r,g,b) ->
    ccall(@doc, 'HPDF_Page_SetRGBFill', 'number', ['number','number','number','number'], [@page,r,g,b])
          

  lineTo: (x,y) ->
    ccall(@doc, 'HPDF_Page_LineTo', 'number', ['number','number','number'], [@page,x,y])


  curveTo2: (x2,y2,x3,y3) ->
    ccall(@doc, 'HPDF_Page_CurveTo2', 'number', ['number','number','number','number','number'], [@page,x2,y2,x3,y3])


  curveTo3: (x1,y1,x3,y3) ->
    ccall(@doc, 'HPDF_Page_CurveTo3', 'number', ['number','number','number','number','number'], [@page,x1,y1,x3,y3])


  curveTo: (x1,y1,x2,y2,x3,y3) ->
    ccall(@doc, 'HPDF_Page_CurveTo', 'number', ['number','number','number','number','number','number','number'], [@page,x1,y1,x2,y2,x3,y3])


  setTextLeading: (leading) ->
    ccall(@doc, 'HPDF_Page_SetTextLeading', 'number', ['number','number'], [@page,leading])


  showTextNextLine: (text) ->
    ccall(@doc, 'HPDF_Page_ShowTextNextLine', 'number', ['number','number'], [@page,toAscii(text)])


  fill: ->
    ccall(@doc, 'HPDF_Page_Fill', 'number', ['number'], [@page])


  fillStroke: ->
    ccall(@doc, 'HPDF_Page_FillStroke', 'number', ['number'], [@page])


  setLineCap: (type) ->
    switch type.toLowerCase()[0]
      when 'b' then id = 0 # HPDF_BUTT_END
      when 'r' then id = 1 # HPDF_ROUND_END
      when 'p' then id = 2 # HPDF_SCUARE_END
      else id = 0
    ccall(@doc, 'HPDF_Page_SetLineCap', 'number', ['number','number'], [@page, id])


  setDash: (dash, phase) ->
    if dash.length == 0
      ccall(@doc, 'HPDF_Page_SetDash', 'number', ['number','number', 'number', 'number'], [@page, 0, 0, phase])
    else
      #TODO
      console.warn 'setDash() TODO: understand why the "dash" variable is not passed correctly'
      #ccall(@doc, 'HPDF_Page_SetDash', 'number', ['number','array', 'number', 'number'], [@page, dash, dash.length, phase])


  gSave: ->
    ccall(@doc, 'HPDF_Page_GSave', 'number', ['number'], [@page])
          

  gRestore: ->
    ccall(@doc, 'HPDF_Page_GRestore', 'number', ['number'], [@page])
          

  clip: ->
    ccall(@doc, 'HPDF_Page_Clip', 'number', ['number'], [@page])
          

  setLineJoin: (type) ->
    switch type.toLowerCase()[0]
      when 'm' then id = 0 # HPDF_MITER_JOIN
      when 'r' then id = 1 # HPDF_ROUND_JOIN
      when 'b' then id = 2 # HPDF_BEVEL_JOIN
      else id = 0
    ccall(@doc, 'HPDF_Page_SetLineJoin', 'number', ['number','number'], [@page,id])


  endText: ->
    ccall(@doc, 'HPDF_Page_EndText', 'number', ['number'], [@page])


  setFillRGB: (r,g,b) ->
    ccall(@doc, 'HPDF_Page_SetFillRGB', 'number', ['number','number','number','number'], [@page,r,g,b])


  arc: (x,y,ray,arc1,arc2) ->
    ccall(@doc, 'HPDF_Page_Arc', 'number', ['number','number','number','number','number','number'], [@page,x,y,ray,arc1,arc2])


  setExtGState: (gstate) ->
    ccall(@doc, 'HPDF_Page_SetExtGState', 'number', ['number','number'], [@page, gstate.gstate])


  circle: (x,y,ray) ->
    ccall(@doc, 'HPDF_Page_Circle', 'number', ['number','number','number','number'], [@page,x,y,ray])



class HPDF
  constructor: ->
    @hpdf = Module['ccall']('HPDF_New', 'number', ['number', 'number'], [0,0])

    if @hpdf == 0
      throw 'Error calling HPDF_New'


  free: ->
    Module['ccall']('HPDF_Free', 'void', ['number'], [@hpdf])


  font: (name, encoding) ->
    ret = ccall(this, 'HPDF_GetFont', 'number', ['number', 'string', 'string'], [@hpdf, name, encoding])
    new Font(this, ret)


  setCurrentEncoder: (encoding) ->
    ccall(this, 'HPDF_SetCurrentEncoder', 'number', ['number', 'string'], [@hpdf, encoding])


  createExtGState: ->
    ret = ccall(this, 'HPDF_CreateExtGState', 'number', ['number'], [@hpdf])
    new ExtGState(this, ret)


  encoder: (name) ->
    ret = ccall(this, 'HPDF_GetEncoder', 'number', ['number', 'string'], [@hpdf, name])
    new Encoder(this, ret)


  toArrayBuffer: ->
    filename = "pdf_file#{fileCounter++}.pdf"
    FS.createDataFile('/', filename, '', true, true)
    ccall(this, 'HPDF_SaveToFile', 'number', ['number', 'string'], [@hpdf, filename])
    FS.analyzePath(filename).object.contents


  # convert to nodejs' Buffer
  toBuffer: ->
    new Buffer(new Uint8Array(@toArrayBuffer()))


  saveToFile: (file_name) ->
    if env != 'nodejs'
      throw 'saveToFile() is only supported for NodeJS and not for browsers'
    fs = require('fs')
    fs.writeFileSync(file_name, @toBuffer())


  loadTTFont: (file, opts) ->
    embed_flag = 1 # true
    opts ?= {}
    if opts.embed? and opts.embed == no
      embed_flag = 0 # false

    filename = fileify(file)
    font_name = ccall(this, 'HPDF_LoadTTFontFromFile', 'string', ['number', 'string', 'number'], [@hpdf, filename, embed_flag])
    
    @font(font_name, opts.encoding)


  loadType1Font: (afm_file, pfm_file, opts) ->
    opts ?= {}

    afm_filename = fileify(afm_file)

    if not pfm_file?
      font_name = ccall(this, 'HPDF_LoadType1FontFromFile', 'string', ['number', 'string', 'number'], [@hpdf, afm_filename, 0])
    else
      pfm_filename = fileify(pfm_file)
      font_name = ccall(this, 'HPDF_LoadType1FontFromFile', 'string', ['number', 'string', 'string'], [@hpdf, afm_filename, pfm_filename])
    return font_name


  setCompressionMode: (mode) ->
    mode = mode.toLowerCase()
    id = 0
    if mode.indexOf('t') != -1 then id |= 0x1  # HPDF_COMP_TEXT
    if mode.indexOf('i') != -1 then id |= 0x2  # HPDF_COMP_IMAGE
    if mode.indexOf('m') != -1 then id |= 0x4  # HPDF_COMP_METADATA
    if mode.indexOf('a') != -1 then id |= 0xf  # HPDF_COMP_METADATA

    ccall(this, 'HPDF_SetCompressionMode', 'number', ['number', 'number'], [@hpdf, id])


  currentPage: ->
    page = ccall(this, 'HPDF_GetCurrentPage', 'number', ['number'], [@hpdf])
    return new Page(this, page)


  setPassword: (owner_passwd, user_passwd) ->
    ccall(this, 'HPDF_SetPassword', 'number', ['number', 'number', 'number'], [@hpdf, toAscii(owner_passwd), toAscii(user_passwd)])


  loadPngImage: (file) ->
    filename = fileify(file)
    image = ccall(this, 'HPDF_LoadPngImageFromFile', 'number', ['number', 'string'], [@hpdf, filename])
    return new Image(this, image)


  loadRawImage: (file, width, height, color_space) ->
    filename = fileify(file)

    id = 0
    switch color_space.toLowerCase()[0]
      when 'g' then id = 0 # HPDF_CS_DEVICE_GRAY
      when 'r' then id = 1 # HPDF_CS_DEVICE_RGB
      when 'c' then id = 2 # HPDF_CS_DEVICE_CMYK

    image = ccall(this, 'HPDF_LoadRawImageFromFile', 'number', ['number', 'string', 'number', 'number', 'number'], [@hpdf, filename, width, height, id])
    return new Image(this, image)


  loadJpegImage: (file) ->
    filename = fileify(file)
    image = ccall(this, 'HPDF_LoadJpegImageFromFile', 'number', ['number', 'string'], [@hpdf, filename])
    return new Image(this, image)


  toDataUri: ->
    bytes = new Uint8Array(@toArrayBuffer())
    base64 = window.btoa( String.fromCharCode.apply(null, bytes) )
    'data:application/pdf;base64,'+base64


  setOpenAction: (dst) ->
    ccall(this, 'HPDF_SetOpenAction', 'number', ['number', 'number'], [@hpdf, dst.dst])


  useJPEncodings: ->
    ccall(this, 'HPDF_UseJPEncodings', 'number', ['number'], [@hpdf])


  useJPFonts: ->
    ccall(this, 'HPDF_UseJPFonts', 'number', ['number'], [@hpdf])


  setPageMode: (mode) ->
    switch mode.toLowerCase()[0]
      when 'n' then id = 0 # HPDF_PAGE_MODE_USE_NONE
      when 'o' then id = 1 # HPDF_PAGE_MODE_USE_OUTLINE
      when 't' then id = 2 # HPDF_PAGE_MODE_USE_THUMBS
      when 'f' then id = 3 # HPDF_PAGE_MODE_USE_FULL_SCREEN
    ccall(this, 'HPDF_SetPageMode', 'number', ['number', 'number'], [@hpdf, id])


  addPage: ->
    ret = ccall(this, 'HPDF_AddPage', 'number', ['number'], [@hpdf])
    return new Page(this, ret)


  createOutline: (parent, title, encoder) ->
    ret = ccall(this, 'HPDF_CreateOutline', 'number', ['number', 'number', 'number', 'number'], [@hpdf, parent, toAscii(title), encoder?.encoder])
    return new Outline(this, ret)


fileify = (file) ->
  filename = 'cannot_fileify_'
  if file instanceof ArrayBuffer
    filename = "file#{fileCounter++}"
    FS.createDataFile('/', filename, new Uint8Array(file), true, true)

  if typeof file == 'string'
    if env!='nodejs'
      throw 'Filenames are only be supported for nodejs'
    real_fs = require('fs')
    contents = real_fs.readFileSync(file)

    filename = "file#{fileCounter++}"
    FS.createDataFile('/', filename, contents, true, true)

  return filename


# convert UTF-8 string to ASCII byte array
toAscii = (text) ->
  tmp = []
  for i in [1..text.length]
    tmp[i-1] = text.charCodeAt(i-1)
  tmp[text.length] = 0
  return Module['allocate'](tmp, 'i8', ALLOC_NORMAL)



ccall = (args...) ->
  doc = args.shift()
  console.log doc, args
  ret = Module['ccall'](args...)
  fn_name = args[0]
  throwIfFailed(doc, fn_name)
  return ret


HPDF_OK = 0
throwIfFailed = (doc, function_name) ->
  ret = Module['ccall']('HPDF_GetError', 'number', ['number'], [doc.hpdf])
  if ret == HPDF_INVALID_DOCUMENT
    throw 'Error calling HPDF_GetError'
  if ret != HPDF_OK
    throw "Error calling #{function_name}: error code "+ret
  return true

HPDF_ARRAY_COUNT_ERR           =           0x1001
HPDF_ARRAY_ITEM_NOT_FOUND      =           0x1002
HPDF_ARRAY_ITEM_UNEXPECTED_TYPE=           0x1003
HPDF_BINARY_LENGTH_ERR         =           0x1004
HPDF_CANNOT_GET_PALLET         =           0x1005
HPDF_DICT_COUNT_ERR            =           0x1007
HPDF_DICT_ITEM_NOT_FOUND       =           0x1008
HPDF_DICT_ITEM_UNEXPECTED_TYPE =           0x1009
HPDF_DICT_STREAM_LENGTH_NOT_FOUND=         0x100A
HPDF_DOC_ENCRYPTDICT_NOT_FOUND =           0x100B
HPDF_DOC_INVALID_OBJECT        =           0x100C
#/*                                        0x100D */
HPDF_DUPLICATE_REGISTRATION    =           0x100E
HPDF_EXCEED_JWW_CODE_NUM_LIMIT =           0x100F
#/*                                        0x1010 */
HPDF_ENCRYPT_INVALID_PASSWORD  =           0x1011
#/*                                        0x1012 */
HPDF_ERR_UNKNOWN_CLASS         =           0x1013
HPDF_EXCEED_GSTATE_LIMIT       =           0x1014
HPDF_FAILD_TO_ALLOC_MEM        =           0x1015
HPDF_FILE_IO_ERROR             =           0x1016
HPDF_FILE_OPEN_ERROR           =           0x1017
#/*                                        0x1018 */
HPDF_FONT_EXISTS               =           0x1019
HPDF_FONT_INVALID_WIDTHS_TABLE =           0x101A
HPDF_INVALID_AFM_HEADER        =           0x101B
HPDF_INVALID_ANNOTATION        =           0x101C
#/*                                        0x101D */
HPDF_INVALID_BIT_PER_COMPONENT =           0x101E
HPDF_INVALID_CHAR_MATRICS_DATA =           0x101F
HPDF_INVALID_COLOR_SPACE       =           0x1020
HPDF_INVALID_COMPRESSION_MODE  =           0x1021
HPDF_INVALID_DATE_TIME         =           0x1022
HPDF_INVALID_DESTINATION       =           0x1023
#/*                                        0x1024 */
HPDF_INVALID_DOCUMENT          =           0x1025
HPDF_INVALID_DOCUMENT_STATE    =           0x1026
HPDF_INVALID_ENCODER           =           0x1027
HPDF_INVALID_ENCODER_TYPE      =           0x1028
#/*                                        0x1029 */
#/*                                        0x102A */
HPDF_INVALID_ENCODING_NAME     =           0x102B
HPDF_INVALID_ENCRYPT_KEY_LEN   =           0x102C
HPDF_INVALID_FONTDEF_DATA      =           0x102D
HPDF_INVALID_FONTDEF_TYPE      =           0x102E
HPDF_INVALID_FONT_NAME         =           0x102F
HPDF_INVALID_IMAGE             =           0x1030
HPDF_INVALID_JPEG_DATA         =           0x1031
HPDF_INVALID_N_DATA            =           0x1032
HPDF_INVALID_OBJECT            =           0x1033
HPDF_INVALID_OBJ_ID            =           0x1034
HPDF_INVALID_OPERATION         =           0x1035
HPDF_INVALID_OUTLINE           =           0x1036
HPDF_INVALID_PAGE              =           0x1037
HPDF_INVALID_PAGES             =           0x1038
HPDF_INVALID_PARAMETER         =           0x1039
#/*                                        0x103A */
HPDF_INVALID_PNG_IMAGE         =           0x103B
HPDF_INVALID_STREAM            =           0x103C
HPDF_MISSING_FILE_NAME_ENTRY   =           0x103D
#/*                                        0x103E */
HPDF_INVALID_TTC_FILE          =           0x103F
HPDF_INVALID_TTC_INDEX         =           0x1040
HPDF_INVALID_WX_DATA           =           0x1041
HPDF_ITEM_NOT_FOUND            =           0x1042
HPDF_LIBPNG_ERROR              =           0x1043
HPDF_NAME_INVALID_VALUE        =           0x1044
HPDF_NAME_OUT_OF_RANGE         =           0x1045
#/*                                        0x1046 */
#/*                                        0x1047 */
HPDF_PAGE_INVALID_PARAM_COUNT  =           0x1048
HPDF_PAGES_MISSING_KIDS_ENTRY  =           0x1049
HPDF_PAGE_CANNOT_FIND_OBJECT   =           0x104A
HPDF_PAGE_CANNOT_GET_ROOT_PAGES=           0x104B
HPDF_PAGE_CANNOT_RESTORE_GSTATE=           0x104C
HPDF_PAGE_CANNOT_SET_PARENT    =           0x104D
HPDF_PAGE_FONT_NOT_FOUND       =           0x104E
HPDF_PAGE_INVALID_FONT         =           0x104F
HPDF_PAGE_INVALID_FONT_SIZE    =           0x1050
HPDF_PAGE_INVALID_GMODE        =           0x1051
HPDF_PAGE_INVALID_INDEX        =           0x1052
HPDF_PAGE_INVALID_ROTATE_VALUE =           0x1053
HPDF_PAGE_INVALID_SIZE         =           0x1054
HPDF_PAGE_INVALID_XOBJECT      =           0x1055
HPDF_PAGE_OUT_OF_RANGE         =           0x1056
HPDF_REAL_OUT_OF_RANGE         =           0x1057
HPDF_STREAM_EOF                =           0x1058
HPDF_STREAM_READLN_CONTINUE    =           0x1059
#/*                                        0x105A */
HPDF_STRING_OUT_OF_RANGE       =           0x105B
HPDF_THIS_FUNC_WAS_SKIPPED     =           0x105C
HPDF_TTF_CANNOT_EMBEDDING_FONT =           0x105D
HPDF_TTF_INVALID_CMAP          =           0x105E
HPDF_TTF_INVALID_FOMAT         =           0x105F
HPDF_TTF_MISSING_TABLE         =           0x1060
HPDF_UNSUPPORTED_FONT_TYPE     =           0x1061
HPDF_UNSUPPORTED_FUNC          =           0x1062
HPDF_UNSUPPORTED_JPEG_FORMAT   =           0x1063
HPDF_UNSUPPORTED_TYPE1_FONT    =           0x1064
HPDF_XREF_COUNT_ERR            =           0x1065
HPDF_ZLIB_ERROR                =           0x1066
HPDF_INVALID_PAGE_INDEX        =           0x1067
HPDF_INVALID_URI               =           0x1068
HPDF_PAGE_LAYOUT_OUT_OF_RANGE  =           0x1069
HPDF_PAGE_MODE_OUT_OF_RANGE    =           0x1070
HPDF_PAGE_NUM_STYLE_OUT_OF_RANGE=          0x1071
HPDF_ANNOT_INVALID_ICON        =           0x1072
HPDF_ANNOT_INVALID_BORDER_STYLE=           0x1073
HPDF_PAGE_INVALID_DIRECTION    =           0x1074
HPDF_INVALID_FONT              =           0x1075
HPDF_PAGE_INSUFFICIENT_SPACE   =           0x1076
HPDF_PAGE_INVALID_DISPLAY_TIME =           0x1077
HPDF_PAGE_INVALID_TRANSITION_TIME=         0x1078
HPDF_INVALID_PAGE_SLIDESHOW_TYPE=          0x1079
HPDF_EXT_GSTATE_OUT_OF_RANGE   =           0x1080
HPDF_INVALID_EXT_GSTATE        =           0x1081
HPDF_EXT_GSTATE_READ_ONLY      =           0x1082
HPDF_INVALID_U3D_DATA          =           0x1083
HPDF_NAME_CANNOT_GET_NAMES     =           0x1084
HPDF_INVALID_ICC_COMPONENT_NUM =           0x1085


HPDF_PAGE_SIZE_LETTER = 0
HPDF_PAGE_SIZE_LEGAL  = 1
HPDF_PAGE_SIZE_A3     = 2
HPDF_PAGE_SIZE_A4     = 3
HPDF_PAGE_SIZE_A5     = 4
HPDF_PAGE_SIZE_B4     = 5
HPDF_PAGE_SIZE_B5     = 6
HPDF_PAGE_SIZE_EXECUTIVE = 7
HPDF_PAGE_SIZE_US4x6  = 8
HPDF_PAGE_SIZE_US4x8  = 9
HPDF_PAGE_SIZE_US5x7  = 10
HPDF_PAGE_SIZE_COMM10 = 11
HPDF_PAGE_SIZE_EOF    = 12

HPDF_PAGE_PORTRAIT    = 0
HPDF_PAGE_LANDSCAPE   = 1

this['HPDF'] = HPDF

