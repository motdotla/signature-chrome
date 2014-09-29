(function(exports){

  var CLICK             = "click";
  var TOUCH_SUPPORTED   = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) ? true : false;
  if (!!TOUCH_SUPPORTED) {     
    CLICK               = "touchend";
  }
  var EVENT_DONE_CLICKED = "done.clicked";
  var EVENT_TEXT_MODE_CLICKED = "text_mode.clicked";
  var EVENT_SIGN_MODE_CLICKED = "sign_mode.clicked";
  var EVENT_TRASH_MODE_CLICKED = "trash_mode.clicked";

  var SignatureChrome = function() {
    this.signature_nav_btns = [];
    this.mode = undefined;
    return this;
  };

  SignatureChrome.prototype.init = function(document_element) {
    this._drawCss();
    this._drawNav(document_element);
    this._drawDoneNav(document_element);

    var _this = this;

    // event triggers
    this.done_btn.addEventListener(CLICK, function() {
      _this.trigger(EVENT_DONE_CLICKED, {}); 
    }, false);
    this.text_mode_btn.addEventListener(CLICK, function() {
      _this.trigger(EVENT_TEXT_MODE_CLICKED, {});
    }, false);
    this.sign_mode_btn.addEventListener(CLICK, function() {
      _this.trigger(EVENT_SIGN_MODE_CLICKED, {});
    }, false);
    this.trash_mode_btn.addEventListener(CLICK, function() {
      _this.trigger(EVENT_TRASH_MODE_CLICKED, {});
    }, false);
  };

  SignatureChrome.prototype._drawDoneNav = function(document_element) {
    this.done_nav                 = document.createElement('nav');
    this.done_nav.className       = "signature-done-nav";
    this.done_nav.id              = "signature-done-nav-"+this.uuid;
    var done_nav_ul               = document.createElement("ul");
    done_nav_ul.className         = "signature-no-list-style";
    var done_nav_li               = document.createElement("li");
    this.done_btn                 = document.createElement("a");
    this.done_btn.className       = "signature-button signature-button-primary signature-done-button";
    this.done_btn.innerHTML       = "i8n.done";
    done_nav_li.appendChild(this.done_btn);
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
    this.text_mode_btn.className = "signature-nav-btn signature-nav-btn-first";
    this.signature_nav_btns.push(this.text_mode_btn);
    var span1  = document.createElement("span"); 
    span1.className = "signature-nav-span icon-font"; 
    this.text_mode_btn.appendChild(span1);
    li1.appendChild(this.text_mode_btn);
    nav_ul.appendChild(li1);   
  
    // sign_mode_btn
    var li2    = document.createElement("li"); 
    this.sign_mode_btn = document.createElement("a");
    this.sign_mode_btn.className = "signature-nav-btn";
    this.signature_nav_btns.push(this.sign_mode_btn);
    var span2  = document.createElement("span"); 
    span2.className = "signature-nav-span icon-pencil";
    this.sign_mode_btn.appendChild(span2);
    li2.appendChild(this.sign_mode_btn);
    nav_ul.appendChild(li2);

    // trash btn
    var li3    = document.createElement("li"); 
    this.trash_mode_btn = document.createElement("a");
    this.trash_mode_btn.className = "signature-nav-btn signature-nav-disabled";
    this.signature_nav_btns.push(this.trash_mode_btn);
    var span3  = document.createElement("span"); 
    span3.className = "signature-nav-span icon-trash";
    this.trash_mode_btn.appendChild(span3);
    li3.appendChild(this.trash_mode_btn);
    nav_ul.appendChild(li3);

    this.nav.appendChild(nav_ul);   
    this.header.appendChild(this.nav);
    return document_element.appendChild(this.header);
  };

  MicroEvent.mixin(SignatureChrome);
  exports.SignatureChrome = SignatureChrome;

}(this));

var signature_chrome = new SignatureChrome();
