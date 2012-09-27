(function() {
  var HPDF, fileCounter,
    __slice = Array.prototype.slice;

  if (typeof Module === "undefined" || Module === null) Module = [];

  fileCounter = 0;

  HPDF = (function() {
    var Font, HPDF_ANNOT_INVALID_BORDER_STYLE, HPDF_ANNOT_INVALID_ICON, HPDF_ARRAY_COUNT_ERR, HPDF_ARRAY_ITEM_NOT_FOUND, HPDF_ARRAY_ITEM_UNEXPECTED_TYPE, HPDF_BINARY_LENGTH_ERR, HPDF_CANNOT_GET_PALLET, HPDF_DICT_COUNT_ERR, HPDF_DICT_ITEM_NOT_FOUND, HPDF_DICT_ITEM_UNEXPECTED_TYPE, HPDF_DICT_STREAM_LENGTH_NOT_FOUND, HPDF_DOC_ENCRYPTDICT_NOT_FOUND, HPDF_DOC_INVALID_OBJECT, HPDF_DUPLICATE_REGISTRATION, HPDF_ENCRYPT_INVALID_PASSWORD, HPDF_ERR_UNKNOWN_CLASS, HPDF_EXCEED_GSTATE_LIMIT, HPDF_EXCEED_JWW_CODE_NUM_LIMIT, HPDF_EXT_GSTATE_OUT_OF_RANGE, HPDF_EXT_GSTATE_READ_ONLY, HPDF_FAILD_TO_ALLOC_MEM, HPDF_FILE_IO_ERROR, HPDF_FILE_OPEN_ERROR, HPDF_FONT_EXISTS, HPDF_FONT_INVALID_WIDTHS_TABLE, HPDF_INVALID_AFM_HEADER, HPDF_INVALID_ANNOTATION, HPDF_INVALID_BIT_PER_COMPONENT, HPDF_INVALID_CHAR_MATRICS_DATA, HPDF_INVALID_COLOR_SPACE, HPDF_INVALID_COMPRESSION_MODE, HPDF_INVALID_DATE_TIME, HPDF_INVALID_DESTINATION, HPDF_INVALID_DOCUMENT, HPDF_INVALID_DOCUMENT_STATE, HPDF_INVALID_ENCODER, HPDF_INVALID_ENCODER_TYPE, HPDF_INVALID_ENCODING_NAME, HPDF_INVALID_ENCRYPT_KEY_LEN, HPDF_INVALID_EXT_GSTATE, HPDF_INVALID_FONT, HPDF_INVALID_FONTDEF_DATA, HPDF_INVALID_FONTDEF_TYPE, HPDF_INVALID_FONT_NAME, HPDF_INVALID_ICC_COMPONENT_NUM, HPDF_INVALID_IMAGE, HPDF_INVALID_JPEG_DATA, HPDF_INVALID_N_DATA, HPDF_INVALID_OBJECT, HPDF_INVALID_OBJ_ID, HPDF_INVALID_OPERATION, HPDF_INVALID_OUTLINE, HPDF_INVALID_PAGE, HPDF_INVALID_PAGES, HPDF_INVALID_PAGE_INDEX, HPDF_INVALID_PAGE_SLIDESHOW_TYPE, HPDF_INVALID_PARAMETER, HPDF_INVALID_PNG_IMAGE, HPDF_INVALID_STREAM, HPDF_INVALID_TTC_FILE, HPDF_INVALID_TTC_INDEX, HPDF_INVALID_U3D_DATA, HPDF_INVALID_URI, HPDF_INVALID_WX_DATA, HPDF_ITEM_NOT_FOUND, HPDF_LIBPNG_ERROR, HPDF_MISSING_FILE_NAME_ENTRY, HPDF_NAME_CANNOT_GET_NAMES, HPDF_NAME_INVALID_VALUE, HPDF_NAME_OUT_OF_RANGE, HPDF_OK, HPDF_PAGES_MISSING_KIDS_ENTRY, HPDF_PAGE_CANNOT_FIND_OBJECT, HPDF_PAGE_CANNOT_GET_ROOT_PAGES, HPDF_PAGE_CANNOT_RESTORE_GSTATE, HPDF_PAGE_CANNOT_SET_PARENT, HPDF_PAGE_FONT_NOT_FOUND, HPDF_PAGE_INSUFFICIENT_SPACE, HPDF_PAGE_INVALID_DIRECTION, HPDF_PAGE_INVALID_DISPLAY_TIME, HPDF_PAGE_INVALID_FONT, HPDF_PAGE_INVALID_FONT_SIZE, HPDF_PAGE_INVALID_GMODE, HPDF_PAGE_INVALID_INDEX, HPDF_PAGE_INVALID_PARAM_COUNT, HPDF_PAGE_INVALID_ROTATE_VALUE, HPDF_PAGE_INVALID_SIZE, HPDF_PAGE_INVALID_TRANSITION_TIME, HPDF_PAGE_INVALID_XOBJECT, HPDF_PAGE_LANDSCAPE, HPDF_PAGE_LAYOUT_OUT_OF_RANGE, HPDF_PAGE_MODE_OUT_OF_RANGE, HPDF_PAGE_NUM_STYLE_OUT_OF_RANGE, HPDF_PAGE_OUT_OF_RANGE, HPDF_PAGE_PORTRAIT, HPDF_PAGE_SIZE_A3, HPDF_PAGE_SIZE_A4, HPDF_PAGE_SIZE_A5, HPDF_PAGE_SIZE_B4, HPDF_PAGE_SIZE_B5, HPDF_PAGE_SIZE_COMM10, HPDF_PAGE_SIZE_EOF, HPDF_PAGE_SIZE_EXECUTIVE, HPDF_PAGE_SIZE_LEGAL, HPDF_PAGE_SIZE_LETTER, HPDF_PAGE_SIZE_US4x6, HPDF_PAGE_SIZE_US4x8, HPDF_PAGE_SIZE_US5x7, HPDF_REAL_OUT_OF_RANGE, HPDF_STREAM_EOF, HPDF_STREAM_READLN_CONTINUE, HPDF_STRING_OUT_OF_RANGE, HPDF_THIS_FUNC_WAS_SKIPPED, HPDF_TTF_CANNOT_EMBEDDING_FONT, HPDF_TTF_INVALID_CMAP, HPDF_TTF_INVALID_FOMAT, HPDF_TTF_MISSING_TABLE, HPDF_UNSUPPORTED_FONT_TYPE, HPDF_UNSUPPORTED_FUNC, HPDF_UNSUPPORTED_JPEG_FORMAT, HPDF_UNSUPPORTED_TYPE1_FONT, HPDF_XREF_COUNT_ERR, HPDF_ZLIB_ERROR, Page, ccall, fileify, throwIfFailed;

    Font = (function() {

      function Font(doc, font) {
        this.doc = doc;
        this.font = font;
      }

      return Font;

    })();

    Page = (function() {

      function Page(doc, page) {
        this.doc = doc;
        this.page = page;
      }

      Page.prototype.setFontAndSize = function(font, size) {
        return ccall(this.doc, 'HPDF_Page_SetFontAndSize', 'number', ['number', 'number', 'number'], [this.page, font.font, size]);
      };

      Page.prototype.setSize = function(size, orientation) {
        var o, s;
        switch (size.toLowerCase()) {
          case 'letter':
            s = HPDF_PAGE_SIZE_LETTER;
            break;
          case 'legal':
            s = HPDF_PAGE_SIZE_LEGAL;
            break;
          case 'a3':
            s = HPDF_PAGE_SIZE_A3;
            break;
          case 'a4':
            s = HPDF_PAGE_SIZE_A4;
            break;
          case 'a5':
            s = HPDF_PAGE_SIZE_A5;
            break;
          case 'b4':
            s = HPDF_PAGE_SIZE_B4;
            break;
          case 'b5':
            s = HPDF_PAGE_SIZE_B5;
            break;
          case 'executive':
            s = HPDF_PAGE_SIZE_EXECUTIVE;
            break;
          case 'us4x6':
            s = HPDF_PAGE_SIZE_US4x6;
            break;
          case 'us4x8':
            s = HPDF_PAGE_SIZE_US4x8;
            break;
          case 'us5x7':
            s = HPDF_PAGE_SIZE_US5x7;
        }
        if (orientation === 'l' || orientation === 'landscape') {
          o = HPDF_PAGE_LANDSCAPE;
        } else {
          o = HPDF_PAGE_PORTRAIT;
        }
        return ccall(this.doc, 'HPDF_Page_SetSize', 'number', ['number', 'number', 'number'], [this.page, s, o]);
      };

      Page.prototype.textWidth = function(text) {
        return ccall(this.doc, 'HPDF_Page_TextWidth', 'number', ['number', 'string'], [this.page, text]);
      };

      Page.prototype.beginText = function() {
        return ccall(this.doc, 'HPDF_Page_BeginText', 'number', ['number'], [this.page]);
      };

      Page.prototype.height = function() {
        return ccall(this.doc, 'HPDF_Page_GetHeight', 'number', ['number'], [this.page]);
      };

      Page.prototype.width = function() {
        return ccall(this.doc, 'HPDF_Page_GetWidth', 'number', ['number'], [this.page]);
      };

      Page.prototype.setLineWidth = function(w) {
        return ccall(this.doc, 'HPDF_Page_SetLineWidth', 'number', ['number', 'number'], [this.page, w]);
      };

      Page.prototype.rectangle = function(x1, y1, x2, y2) {
        return ccall(this.doc, 'HPDF_Page_Rectangle', 'number', ['number', 'number', 'number', 'number', 'number'], [this.page, x1, y1, x2, y2]);
      };

      Page.prototype.stroke = function() {
        return ccall(this.doc, 'HPDF_Page_Stroke', 'number', ['number'], [this.page]);
      };

      Page.prototype.moveTextPos = function(x, y) {
        return ccall(this.doc, 'HPDF_Page_MoveTextPos', 'number', ['number'], [this.page, x, y]);
      };

      Page.prototype.showText = function(text) {
        return ccall(this.doc, 'HPDF_Page_ShowText', 'number', ['number', 'string'], [this.page, text]);
      };

      Page.prototype.textOut = function(x, y, text) {
        return ccall(this.doc, 'HPDF_Page_TextOut', 'number', ['number', 'number', 'number', 'string'], [this.page, x, y, text]);
      };

      Page.prototype.moveTo = function(x, y) {
        return ccall(this.doc, 'HPDF_Page_MoveTo', 'number', ['number', 'number', 'number'], [this.page, x, y]);
      };

      Page.prototype.setRGBStroke = function(r, g, b) {
        return ccall(this.doc, 'HPDF_Page_SetRGBStroke', 'number', ['number', 'number', 'number', 'number'], [this.page, r, g, b]);
      };

      Page.prototype.setRGBFill = function(r, g, b) {
        return ccall(this.doc, 'HPDF_Page_SetRGBFill', 'number', ['number', 'number', 'number', 'number'], [this.page, r, g, b]);
      };

      Page.prototype.lineTo = function(x, y) {
        return ccall(this.doc, 'HPDF_Page_LineTo', 'number', ['number', 'number', 'number'], [this.page, x, y]);
      };

      Page.prototype.curveTo2 = function(x2, y2, x3, y3) {
        return ccall(this.doc, 'HPDF_Page_CurveTo2', 'number', ['number', 'number', 'number', 'number', 'number'], [this.page, x2, y2, x3, y3]);
      };

      Page.prototype.curveTo3 = function(x1, y1, x3, y3) {
        return ccall(this.doc, 'HPDF_Page_CurveTo3', 'number', ['number', 'number', 'number', 'number', 'number'], [this.page, x1, y1, x3, y3]);
      };

      Page.prototype.curveTo = function(x1, y1, x2, y2, x3, y3) {
        return ccall(this.doc, 'HPDF_Page_CurveTo', 'number', ['number', 'number', 'number', 'number', 'number', 'number', 'number'], [this.page, x1, y1, x2, y2, x3, y3]);
      };

      Page.prototype.setTextLeading = function(leading) {
        return ccall(this.doc, 'HPDF_Page_SetTextLeading', 'number', ['number', 'number'], [this.page, leading]);
      };

      Page.prototype.showTextNextLine = function(text) {
        return ccall(this.doc, 'HPDF_Page_ShowTextNextLine', 'number', ['number', 'string'], [this.page, text]);
      };

      Page.prototype.fill = function() {
        return ccall(this.doc, 'HPDF_Page_Fill', 'number', ['number'], [this.page]);
      };

      Page.prototype.fillStroke = function() {
        return ccall(this.doc, 'HPDF_Page_FillStroke', 'number', ['number'], [this.page]);
      };

      Page.prototype.setLineCap = function(type) {
        var id;
        switch (type.toLowerCase()[0]) {
          case 'b':
            id = 0;
            break;
          case 'r':
            id = 1;
            break;
          case 'p':
            id = 2;
            break;
          default:
            id = 0;
        }
        return ccall(this.doc, 'HPDF_Page_SetLineCap', 'number', ['number', 'number'], [this.page, id]);
      };

      Page.prototype.setDash = function(dash, phase) {
        if (dash.length === 0) {
          return ccall(this.doc, 'HPDF_Page_SetDash', 'number', ['number', 'number', 'number', 'number'], [this.page, 0, 0, phase]);
        } else {
          return console.warn('setDash() TODO: understand why the "dash" variable is not passed correctly');
        }
      };

      Page.prototype.gSave = function() {
        return ccall(this.doc, 'HPDF_Page_GSave', 'number', ['number'], [this.page]);
      };

      Page.prototype.gRestore = function() {
        return ccall(this.doc, 'HPDF_Page_GRestore', 'number', ['number'], [this.page]);
      };

      Page.prototype.clip = function() {
        return ccall(this.doc, 'HPDF_Page_Clip', 'number', ['number'], [this.page]);
      };

      Page.prototype.setLineJoin = function(type) {
        var id;
        switch (type.toLowerCase()[0]) {
          case 'm':
            id = 0;
            break;
          case 'r':
            id = 1;
            break;
          case 'b':
            id = 2;
            break;
          default:
            id = 0;
        }
        return ccall(this.doc, 'HPDF_Page_SetLineJoin', 'number', ['number', 'number'], [this.page, id]);
      };

      Page.prototype.endText = function() {
        return ccall(this.doc, 'HPDF_Page_EndText', 'number', ['number'], [this.page]);
      };

      return Page;

    })();

    function HPDF() {
      this.hpdf = Module['ccall']('HPDF_New', 'number', ['number', 'number'], [0, 0]);
      if (this.hpdf === 0) throw 'Error calling HPDF_New';
    }

    HPDF.prototype.destroy = function() {
      return Module['ccall']('HPDF_Free', 'void', ['number'], [this.hpdf]);
    };

    HPDF.prototype.font = function(name, encoding) {
      var ret;
      ret = ccall(this, 'HPDF_GetFont', 'number', ['number', 'string', 'string'], [this.hpdf, name, encoding]);
      return new Font(this, ret);
    };

    HPDF.prototype.toArrayBuffer = function() {
      var filename;
      filename = "pdf_file" + (fileCounter++) + ".pdf";
      FS.createDataFile('/', filename, '', true, true);
      ccall(this, 'HPDF_SaveToFile', 'number', ['number', 'string'], [this.hpdf, filename]);
      return FS.analyzePath(filename).object.contents;
    };

    HPDF.prototype.loadTtFont = function(file, opts) {
      var embed_flag, filename, font_name;
      embed_flag = 1;
      if (opts == null) opts = {};
      if ((opts.embed != null) && opts.embed === false) embed_flag = 0;
      filename = fileify(file);
      font_name = ccall(this, 'HPDF_LoadTTFontFromFile', 'string', ['number', 'string', 'number'], [this.hpdf, filename, embed_flag]);
      return this.font(font_name, opts.encoding);
    };

    HPDF.prototype.loadType1Font = function(afm_contents, pfm_contents, opts) {
      var afm_filename, font_name, pfm_filename;
      if (opts == null) opts = {};
      afm_filename = "afm_file" + (fileCounter++) + ".afm";
      pfm_filename = "pdf_file" + (fileCounter++) + ".pfm";
      FS.createDataFile('/', afm_filename, afm_contents, true, true);
      FS.createDataFile('/', pfm_filename, pfm_contents, true, true);
      if (!(pfm_contents != null)) pfm_filename = null;
      font_name = ccall(this, 'HPDF_LoadType1FontFromFile', 'string', ['number', 'string', 'string'], [this.hpdf, afm_filename, pfm_filename]);
      return this.font(font_name, opts.encoding);
    };

    HPDF.prototype.toDataUri = function() {
      var base64, bytes;
      bytes = new Uint8Array(this.toArrayBuffer());
      base64 = window.btoa(String.fromCharCode.apply(null, bytes));
      return 'data:application/pdf;base64,' + base64;
    };

    HPDF.prototype.addPage = function() {
      var ret;
      ret = ccall(this, 'HPDF_AddPage', 'number', ['number'], [this.hpdf]);
      return new Page(this, ret);
    };

    fileify = function(file) {
      var filename;
      filename = 'cannot_fileify_';
      if (file instanceof ArrayBuffer) {
        filename = "ttf_file" + (fileCounter++) + ".ttf";
        FS.createDataFile('/', filename, new Uint8Array(file), true, true);
      }
      if (file instanceof String) {
        filename = file;
        throw 'Filenames will only be supported for node.js (not done yet)!';
      }
      return filename;
    };

    ccall = function() {
      var args, doc, fn_name, ret;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      doc = args.shift();
      console.log(doc, args);
      ret = Module['ccall'].apply(Module, args);
      fn_name = args[0];
      throwIfFailed(doc, fn_name);
      return ret;
    };

    HPDF_OK = 0;

    throwIfFailed = function(doc, function_name) {
      var ret;
      ret = Module['ccall']('HPDF_GetError', 'number', ['number'], [doc.hpdf]);
      if (ret === HPDF_INVALID_DOCUMENT) throw 'Error calling HPDF_GetError';
      if (ret !== HPDF_OK) {
        throw ("Error calling " + function_name + ": error code ") + ret;
      }
      return true;
    };

    HPDF_ARRAY_COUNT_ERR = 0x1001;

    HPDF_ARRAY_ITEM_NOT_FOUND = 0x1002;

    HPDF_ARRAY_ITEM_UNEXPECTED_TYPE = 0x1003;

    HPDF_BINARY_LENGTH_ERR = 0x1004;

    HPDF_CANNOT_GET_PALLET = 0x1005;

    HPDF_DICT_COUNT_ERR = 0x1007;

    HPDF_DICT_ITEM_NOT_FOUND = 0x1008;

    HPDF_DICT_ITEM_UNEXPECTED_TYPE = 0x1009;

    HPDF_DICT_STREAM_LENGTH_NOT_FOUND = 0x100A;

    HPDF_DOC_ENCRYPTDICT_NOT_FOUND = 0x100B;

    HPDF_DOC_INVALID_OBJECT = 0x100C;

    HPDF_DUPLICATE_REGISTRATION = 0x100E;

    HPDF_EXCEED_JWW_CODE_NUM_LIMIT = 0x100F;

    HPDF_ENCRYPT_INVALID_PASSWORD = 0x1011;

    HPDF_ERR_UNKNOWN_CLASS = 0x1013;

    HPDF_EXCEED_GSTATE_LIMIT = 0x1014;

    HPDF_FAILD_TO_ALLOC_MEM = 0x1015;

    HPDF_FILE_IO_ERROR = 0x1016;

    HPDF_FILE_OPEN_ERROR = 0x1017;

    HPDF_FONT_EXISTS = 0x1019;

    HPDF_FONT_INVALID_WIDTHS_TABLE = 0x101A;

    HPDF_INVALID_AFM_HEADER = 0x101B;

    HPDF_INVALID_ANNOTATION = 0x101C;

    HPDF_INVALID_BIT_PER_COMPONENT = 0x101E;

    HPDF_INVALID_CHAR_MATRICS_DATA = 0x101F;

    HPDF_INVALID_COLOR_SPACE = 0x1020;

    HPDF_INVALID_COMPRESSION_MODE = 0x1021;

    HPDF_INVALID_DATE_TIME = 0x1022;

    HPDF_INVALID_DESTINATION = 0x1023;

    HPDF_INVALID_DOCUMENT = 0x1025;

    HPDF_INVALID_DOCUMENT_STATE = 0x1026;

    HPDF_INVALID_ENCODER = 0x1027;

    HPDF_INVALID_ENCODER_TYPE = 0x1028;

    HPDF_INVALID_ENCODING_NAME = 0x102B;

    HPDF_INVALID_ENCRYPT_KEY_LEN = 0x102C;

    HPDF_INVALID_FONTDEF_DATA = 0x102D;

    HPDF_INVALID_FONTDEF_TYPE = 0x102E;

    HPDF_INVALID_FONT_NAME = 0x102F;

    HPDF_INVALID_IMAGE = 0x1030;

    HPDF_INVALID_JPEG_DATA = 0x1031;

    HPDF_INVALID_N_DATA = 0x1032;

    HPDF_INVALID_OBJECT = 0x1033;

    HPDF_INVALID_OBJ_ID = 0x1034;

    HPDF_INVALID_OPERATION = 0x1035;

    HPDF_INVALID_OUTLINE = 0x1036;

    HPDF_INVALID_PAGE = 0x1037;

    HPDF_INVALID_PAGES = 0x1038;

    HPDF_INVALID_PARAMETER = 0x1039;

    HPDF_INVALID_PNG_IMAGE = 0x103B;

    HPDF_INVALID_STREAM = 0x103C;

    HPDF_MISSING_FILE_NAME_ENTRY = 0x103D;

    HPDF_INVALID_TTC_FILE = 0x103F;

    HPDF_INVALID_TTC_INDEX = 0x1040;

    HPDF_INVALID_WX_DATA = 0x1041;

    HPDF_ITEM_NOT_FOUND = 0x1042;

    HPDF_LIBPNG_ERROR = 0x1043;

    HPDF_NAME_INVALID_VALUE = 0x1044;

    HPDF_NAME_OUT_OF_RANGE = 0x1045;

    HPDF_PAGE_INVALID_PARAM_COUNT = 0x1048;

    HPDF_PAGES_MISSING_KIDS_ENTRY = 0x1049;

    HPDF_PAGE_CANNOT_FIND_OBJECT = 0x104A;

    HPDF_PAGE_CANNOT_GET_ROOT_PAGES = 0x104B;

    HPDF_PAGE_CANNOT_RESTORE_GSTATE = 0x104C;

    HPDF_PAGE_CANNOT_SET_PARENT = 0x104D;

    HPDF_PAGE_FONT_NOT_FOUND = 0x104E;

    HPDF_PAGE_INVALID_FONT = 0x104F;

    HPDF_PAGE_INVALID_FONT_SIZE = 0x1050;

    HPDF_PAGE_INVALID_GMODE = 0x1051;

    HPDF_PAGE_INVALID_INDEX = 0x1052;

    HPDF_PAGE_INVALID_ROTATE_VALUE = 0x1053;

    HPDF_PAGE_INVALID_SIZE = 0x1054;

    HPDF_PAGE_INVALID_XOBJECT = 0x1055;

    HPDF_PAGE_OUT_OF_RANGE = 0x1056;

    HPDF_REAL_OUT_OF_RANGE = 0x1057;

    HPDF_STREAM_EOF = 0x1058;

    HPDF_STREAM_READLN_CONTINUE = 0x1059;

    HPDF_STRING_OUT_OF_RANGE = 0x105B;

    HPDF_THIS_FUNC_WAS_SKIPPED = 0x105C;

    HPDF_TTF_CANNOT_EMBEDDING_FONT = 0x105D;

    HPDF_TTF_INVALID_CMAP = 0x105E;

    HPDF_TTF_INVALID_FOMAT = 0x105F;

    HPDF_TTF_MISSING_TABLE = 0x1060;

    HPDF_UNSUPPORTED_FONT_TYPE = 0x1061;

    HPDF_UNSUPPORTED_FUNC = 0x1062;

    HPDF_UNSUPPORTED_JPEG_FORMAT = 0x1063;

    HPDF_UNSUPPORTED_TYPE1_FONT = 0x1064;

    HPDF_XREF_COUNT_ERR = 0x1065;

    HPDF_ZLIB_ERROR = 0x1066;

    HPDF_INVALID_PAGE_INDEX = 0x1067;

    HPDF_INVALID_URI = 0x1068;

    HPDF_PAGE_LAYOUT_OUT_OF_RANGE = 0x1069;

    HPDF_PAGE_MODE_OUT_OF_RANGE = 0x1070;

    HPDF_PAGE_NUM_STYLE_OUT_OF_RANGE = 0x1071;

    HPDF_ANNOT_INVALID_ICON = 0x1072;

    HPDF_ANNOT_INVALID_BORDER_STYLE = 0x1073;

    HPDF_PAGE_INVALID_DIRECTION = 0x1074;

    HPDF_INVALID_FONT = 0x1075;

    HPDF_PAGE_INSUFFICIENT_SPACE = 0x1076;

    HPDF_PAGE_INVALID_DISPLAY_TIME = 0x1077;

    HPDF_PAGE_INVALID_TRANSITION_TIME = 0x1078;

    HPDF_INVALID_PAGE_SLIDESHOW_TYPE = 0x1079;

    HPDF_EXT_GSTATE_OUT_OF_RANGE = 0x1080;

    HPDF_INVALID_EXT_GSTATE = 0x1081;

    HPDF_EXT_GSTATE_READ_ONLY = 0x1082;

    HPDF_INVALID_U3D_DATA = 0x1083;

    HPDF_NAME_CANNOT_GET_NAMES = 0x1084;

    HPDF_INVALID_ICC_COMPONENT_NUM = 0x1085;

    HPDF_PAGE_SIZE_LETTER = 0;

    HPDF_PAGE_SIZE_LEGAL = 1;

    HPDF_PAGE_SIZE_A3 = 2;

    HPDF_PAGE_SIZE_A4 = 3;

    HPDF_PAGE_SIZE_A5 = 4;

    HPDF_PAGE_SIZE_B4 = 5;

    HPDF_PAGE_SIZE_B5 = 6;

    HPDF_PAGE_SIZE_EXECUTIVE = 7;

    HPDF_PAGE_SIZE_US4x6 = 8;

    HPDF_PAGE_SIZE_US4x8 = 9;

    HPDF_PAGE_SIZE_US5x7 = 10;

    HPDF_PAGE_SIZE_COMM10 = 11;

    HPDF_PAGE_SIZE_EOF = 12;

    HPDF_PAGE_PORTRAIT = 0;

    HPDF_PAGE_LANDSCAPE = 1;

    return HPDF;

  })();

  this['HPDF'] = HPDF;

}).call(this);
