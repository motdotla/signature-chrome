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
  var EVENT_DONE_MODE_CLICKED = DONE_MODE+".clicked";
  var EVENT_TEXT_MODE_CLICKED = TEXT_MODE+".clicked";
  var EVENT_SIGN_MODE_CLICKED = SIGN_MODE+".clicked";
  var EVENT_TRASH_MODE_CLICKED = TRASH_MODE+".clicked";
  var STATE_CHANGED = "state.changed";

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
    this.done_mode_btn.innerHTML       = "i8n.done";
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
