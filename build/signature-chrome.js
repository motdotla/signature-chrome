/*! signature-chrome.js - 0.0.1 - 2014-10-12 - scottmotte */
(function(exports){

  var CLICK             = "click";
  var TOUCH_SUPPORTED   = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) ? true : false;
  if (!!TOUCH_SUPPORTED) {     
    CLICK               = "touchend";
  }
  var EDIT_MODE = "edit_mode";
  var DONE_MODE = "done_mode";
  var TEXT_MODE = "text_mode";
  var SIGN_MODE = "sign_mode";
  var TRASH_MODE = "trash_mode";
  var EVENT_DONE_MODE_CLICKED = "signature_chrome"+DONE_MODE+".clicked";
  var EVENT_TEXT_MODE_CLICKED = "signature_chrome"+TEXT_MODE+".clicked";
  var EVENT_SIGN_MODE_CLICKED = "signature_chrome"+SIGN_MODE+".clicked";
  var EVENT_TRASH_MODE_CLICKED = "signature_chrome"+TRASH_MODE+".clicked";
  var STATE_CHANGED = "signature_chrome.state.changed";

  var SignatureChrome = function() {
    this.signature_nav_btns = [];
    this.state = EDIT_MODE;
    this.jafja = undefined;
    return this;
  };

  SignatureChrome.prototype.setState = function(document_element, new_state) {
    var _this = this;
    var old_state = _this.state;
    _this.state = new_state;

    _this.jafja.trigger(STATE_CHANGED, {previous: old_state, current: _this.state});
  };

  SignatureChrome.prototype._watchStateAndChangeCss = function(document_element) {
    var _this = this;
    this.jafja.bind(STATE_CHANGED, function(result) {
      _this.removeClass(document_element, result.previous);
      _this.addClass(document_element, result.current);
    });
  };

  SignatureChrome.prototype._stateMachine = function(document_element) {
    var _this = this;
    _this.jafja.bind(EVENT_DONE_MODE_CLICKED, function() {
      if (_this.state == DONE_MODE) {
        _this.setState(document_element, EDIT_MODE);
      } else {
        _this.setState(document_element, DONE_MODE);
      }
    });
    _this.jafja.bind(EVENT_TEXT_MODE_CLICKED, function() {
      if (_this.state == TEXT_MODE) {
        _this.setState(document_element, EDIT_MODE);
      } else {
        _this.setState(document_element, TEXT_MODE);
      }
    });
    _this.jafja.bind(EVENT_SIGN_MODE_CLICKED, function() {
      if (_this.state == SIGN_MODE) {
        _this.setState(document_element, EDIT_MODE);
      } else {
        _this.setState(document_element, SIGN_MODE);
      }
    });
    _this.jafja.bind(EVENT_TRASH_MODE_CLICKED, function() {
      if (_this.state == TRASH_MODE) {
        _this.setState(document_element, EDIT_MODE);
      } else {
        _this.setState(document_element, TRASH_MODE);
      }
    });
  };

  SignatureChrome.prototype.init = function(document_element) {
    this._stateMachine(document_element);
    this._drawCss();
    this._drawNav(document_element);
    this._drawDoneNav(document_element);
    this._watchStateAndChangeCss(document_element);
    this.setState(document_element, EDIT_MODE);

    var _this = this;

    // event triggers
    this.done_mode_btn.addEventListener(CLICK, function() {
      _this.jafja.trigger(EVENT_DONE_MODE_CLICKED, {}); 
    }, false);
    this.text_mode_btn.addEventListener(CLICK, function() {
      _this.jafja.trigger(EVENT_TEXT_MODE_CLICKED, {});
    }, false);
    this.sign_mode_btn.addEventListener(CLICK, function() {
      _this.jafja.trigger(EVENT_SIGN_MODE_CLICKED, {});
    }, false);
    this.trash_mode_btn.addEventListener(CLICK, function() {
      _this.jafja.trigger(EVENT_TRASH_MODE_CLICKED, {});
    }, false);
  };

  SignatureChrome.prototype._drawDoneNav = function(document_element) {
    this.done_nav                 = document.createElement('nav');
    this.done_nav.className       = "signature-done-nav";
    this.done_nav.id              = "signature-done-nav-"+this.uuid;
    var done_nav_ul               = document.createElement("ul");
    done_nav_ul.className         = "signature-no-list-style";
    var done_nav_li               = document.createElement("li");
    this.done_mode_btn                 = document.createElement("a");
    this.done_mode_btn.className       = "signature-button signature-button-primary signature-done-button";
    this.done_mode_btn.innerHTML       = "Done";
    done_nav_li.appendChild(this.done_mode_btn);
    done_nav_ul.appendChild(done_nav_li);
    this.done_nav.appendChild(done_nav_ul);


    return document_element.appendChild(this.done_nav);
  };

  SignatureChrome.prototype._drawNav = function(document_element) {
    this.header                   = document.createElement('header');
    this.header.className         = "signature-header";
    this.header.id                = "signature-header"+this.uuid; 

    this.nav                      = document.createElement('nav');
    this.nav.className            = "signature-nav";
    this.nav.id                   = "signature-nav-"+this.uuid;   
    var nav_ul                    = document.createElement('ul'); 
    nav_ul.className              = "signature-no-list-style";    
  
    // text_mode_btn           
    var li1    = document.createElement("li"); 
    this.text_mode_btn = document.createElement("a");
    this.text_mode_btn.className = "signature-nav-btn signature-nav-btn-first signature-nav-"+TEXT_MODE;
    this.signature_nav_btns.push(this.text_mode_btn);
    var span1  = document.createElement("span"); 
    span1.className = "signature-nav-span fa fa-font"; 
    this.text_mode_btn.appendChild(span1);
    li1.appendChild(this.text_mode_btn);
    nav_ul.appendChild(li1);   
  
    // sign_mode_btn
    var li2    = document.createElement("li"); 
    this.sign_mode_btn = document.createElement("a");
    this.sign_mode_btn.className = "signature-nav-btn signature-nav-"+SIGN_MODE;
    this.signature_nav_btns.push(this.sign_mode_btn);
    var span2  = document.createElement("span"); 
    span2.className = "signature-nav-span fa fa-pencil";
    this.sign_mode_btn.appendChild(span2);
    li2.appendChild(this.sign_mode_btn);
    nav_ul.appendChild(li2);

    // trash btn
    var li3    = document.createElement("li"); 
    this.trash_mode_btn = document.createElement("a");
    this.trash_mode_btn.className = "signature-nav-btn signature-nav-disabled";
    this.signature_nav_btns.push(this.trash_mode_btn);
    var span3  = document.createElement("span"); 
    span3.className = "signature-nav-span fa fa-trash";
    this.trash_mode_btn.appendChild(span3);
    li3.appendChild(this.trash_mode_btn);
    nav_ul.appendChild(li3);

    this.nav.appendChild(nav_ul);   
    this.header.appendChild(this.nav);
    return document_element.appendChild(this.header);
  };

  SignatureChrome.prototype.hasClass = function(el, name) {
    return new RegExp('(\\s|^)'+name+'(\\s|$)').test(el.className); 
  };                                                             
                                                                 
  SignatureChrome.prototype.addClass = function(el, name) {    
    if (!this.hasClass(el, name)) {                              
      el.className += (el.className ? ' ' : '') +name;           
    }                                                            
  };                                                             
                                                                 
  SignatureChrome.prototype.removeClass = function(el, name) { 
    if (this.hasClass(el, name)) {                               
      el.className=el.className.replace(new RegExp('(\\s|^)'+name+'(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
    }
  };

  exports.SignatureChrome = SignatureChrome;

}(this));

var signature_chrome = new SignatureChrome();


(function(SignatureChrome){SignatureChrome.prototype._drawCss = function() {this.css = '@charset "utf-8";@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);.signature-header{position:fixed;top:0;left:0;width:100%;z-index:2000}.signature-nav-span:before{line-height:43px;font-size:30px}.signature-nav{position:absolute;text-align:center;top:0;left:0;background:#E2E3E1;background:rgba(239,65,54,1);width:100%}.signature-no-list-style{padding:0;margin:0;list-style:none}.signature-nav li{display:inline-block}.signature-nav-btn{font-size:18px;color:rgba(255,255,255,1);display:inline-block;height:44px;width:60px;text-decoration:none;text-transform:uppercase;text-align:center;line-height:44px;border-right:1px dashed #fff;border-top:none;border-bottom:none;cursor:pointer}.text_mode .signature-nav-text_mode,.text_mode .signature-nav-text_mode:visited{color:#fff;background:#222}.sign_mode .signature-nav-sign_mode,.sign_mode .signature-nav-sign_mode:visited{color:#fff;background:#222}.signature-nav-btn.signature-nav-btn-first{border-left:1px dashed #fff}.signature-nav-disabled,.signature-nav-disabled:visited{color:rgba(255,255,255,0.5)}.signature-nav-active,.signature-nav-active:visited{color:#fff;background:#222}.signature-done-button{font-size:24px;border-radius:2px 2px 0 0}.signature-done-nav{position:fixed;text-align:center;bottom:0;right:0;width:100%;z-index:2000}.signature-nav a,.signature-nav a:visited{}.signature-button{display:inline-block;*display:inline;zoom:1;line-height:normal;white-space:nowrap;vertical-align:baseline;text-align:center;cursor:pointer;-webkit-user-drag:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.signature-button::-moz-focus-inner{padding:0;border:0}.signature-button{font-size:100%;*font-size:90%;*overflow:visible;padding:0.5em 1.5em 0.5em;color:#444;color:rgba(0,0,0,0.80);*color:#444;border:1px solid #999;border:none rgba(0,0,0,0);background-color:#E6E6E6;text-decoration:none;border-radius:2px;-webkit-font-smoothing:antialiased;-webkit-transition:0.1s linear -webkit-box-shadow;-moz-transition:0.1s linear -moz-box-shadow;-ms-transition:0.1s linear box-shadow;-o-transition:0.1s linear box-shadow;transition:0.1s linear box-shadow}.signature-button-hover,.signature-button:hover{filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#00000000",endColorstr="#00000000",GradientType=0);background-image:-webkit-gradient(linear,0 0,0 100%,from(transparent),color-stop(40%,rgba(0,0,0,0.05)),to(rgba(0,0,0,0.05)));background-image:-webkit-linear-gradient(transparent,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.15));background-image:-moz-linear-gradient(top,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.05));background-image:-ms-linear-gradient(transparent,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.15));background-image:-o-linear-gradient(transparent,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.05));background-image:linear-gradient(transparent,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.05))}.signature-button-active,.signature-button:active{box-shadow:0 0 0 1px rgba(0,0,0,0.15) inset,0 0 6px rgba(0,0,0,0.20) inset}.signature-button[disabled],.signature-button-disabled,.signature-button-disabled:hover,.signature-button-disabled:active{border:none;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled = false);filter:alpha(opacity=40);-khtml-opacity:0.40;-moz-opacity:0.40;opacity:0.40;cursor:not-allowed;box-shadow:none}.signature-button-hidden{display:none}.signature-button::-moz-focus-inner{padding:0;border:0}.signature-button-primary,a.signature-button-primary{background:rgba(239,65,54,1);color:#fff}.signature-button:-moz-focusring{outline-color:rgba(0,0,0,0.85)}.signature-hidden{display:none}';var style = document.createElement('style');style.type = 'text/css';if (style.styleSheet) {style.styleSheet.cssText = this.css;} else {style.appendChild(document.createTextNode(this.css));}return document.body.appendChild(style);};}(SignatureChrome));