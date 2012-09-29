Module ?= []

fileCounter = 0

FLOAT_SIZE = 4

HPDF = {}

class Font
  constructor: (@doc, @font) ->


  fontName: ->
    ccall(@doc, 'HPDF_Font_GetFontName', 'string', ['number'], [@font])



class Encoder
  constructor: (@doc, @encoder) ->



class Annotation
  constructor: (@doc, @annot) ->



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


  setFontAndSize: (font, size) ->
    ccall(@doc, 'HPDF_Page_SetFontAndSize', 'number', ['number', 'number', 'number'], [@page, font.font, size])


  setGrayFill: (grayness) ->
    ccall(@doc, 'HPDF_Page_SetGrayFill', 'number', ['number', 'number'], [@page, grayness])


  setGrayStroke: (stroke) ->
    ccall(@doc, 'HPDF_Page_SetGrayStroke', 'number', ['number', 'number'], [@page, stroke])


  currentTextPos: ->
    ptr = Module['allocate']([123,321], 'float', ALLOC_NORMAL)
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
    ret = ccall(@doc, 'HPDF_Page_CreateTextAnnot', 'number', ['number', 'number','number','number','number', 'string', 'number'], [@page, rect[0], rect[1], rect[2], rect[3], text, encoder?.encoder])
    new TextAnnotation(@doc, ret)


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
    ccall(@doc, 'HPDF_Page_TextWidth', 'number', ['number', 'string'], [@page, text])


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
    ccall(@doc, 'HPDF_Page_MoveTextPos', 'number', ['number'], [@page, x, y])

          
  showText: (text) ->
    ccall(@doc, 'HPDF_Page_ShowText', 'number', ['number', 'string'], [@page, text])
          

  textOut: (x,y,text) ->
    ccall(@doc, 'HPDF_Page_TextOut', 'number', ['number','number','number','string'], [@page,x,y,text])
          

  moveTo: (x,y) ->
    ccall(@doc, 'HPDF_Page_MoveTo', 'number', ['number','number','number'], [@page,x,y])
          

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
    ccall(@doc, 'HPDF_Page_ShowTextNextLine', 'number', ['number','string'], [@page,text])


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




class HPDF
  constructor: ->
    @hpdf = Module['ccall']('HPDF_New', 'number', ['number', 'number'], [0,0])

    if @hpdf == 0
      throw 'Error calling HPDF_New'


  destroy: ->
    Module['ccall']('HPDF_Free', 'void', ['number'], [@hpdf])


  font: (name, encoding) ->
    ret = ccall(this, 'HPDF_GetFont', 'number', ['number', 'string', 'string'], [@hpdf, name, encoding])
    new Font(this, ret)


  encoder: (name) ->
    ret = ccall(this, 'HPDF_GetEncoder', 'number', ['number', 'string'], [@hpdf, name])
    new Encoder(this, ret)


  toArrayBuffer: ->
    filename = "pdf_file#{fileCounter++}.pdf"
    FS.createDataFile('/', filename, '', true, true)
    ccall(this, 'HPDF_SaveToFile', 'number', ['number', 'string'], [@hpdf, filename])
    FS.analyzePath(filename).object.contents


  loadTtFont: (file, opts) ->
    embed_flag = 1 # true
    opts ?= {}
    if opts.embed? and opts.embed == no
      embed_flag = 0 # false

    filename = fileify(file)
    font_name = ccall(this, 'HPDF_LoadTTFontFromFile', 'string', ['number', 'string', 'number'], [@hpdf, filename, embed_flag])
    
    @font(font_name, opts.encoding)


  loadType1Font: (afm_contents, pfm_contents, opts) ->
    opts ?= {}

    afm_filename = "afm_file#{fileCounter++}.afm"
    pfm_filename = "pdf_file#{fileCounter++}.pfm"

    FS.createDataFile('/', afm_filename, afm_contents, true, true)
    FS.createDataFile('/', pfm_filename, pfm_contents, true, true)

    if not pfm_contents?
      pfm_filename = null

    font_name = ccall(this, 'HPDF_LoadType1FontFromFile', 'string', ['number', 'string', 'string'], [@hpdf, afm_filename, pfm_filename])
    
    @font(font_name, opts.encoding)


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
    ccall(this, 'HPDF_SetPassword', 'number', ['number', 'string', 'string'], [@hpdf, owner_passwd, user_passwd])


  loadPngImage: (file) ->
    filename = fileify(file)
    image = ccall(this, 'HPDF_LoadPngImageFromFile', 'number', ['number', 'string'], [@hpdf, filename])
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
    ret = ccall(this, 'HPDF_CreateOutline', 'number', ['number', 'number', 'string', 'number'], [@hpdf, parent, title, encoder?.encoder])
    return new Outline(this, ret)


fileify = (file) ->
  filename = 'cannot_fileify_'
  if file instanceof ArrayBuffer
    filename = "file#{fileCounter++}"
    FS.createDataFile('/', filename, new Uint8Array(file), true, true)

  if file instanceof String
    filename = file
    throw 'Filenames will only be supported for node.js (not done yet)!'
    # TODO: create emscripten fake file for real file
  filename


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

