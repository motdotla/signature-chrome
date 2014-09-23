/*! signature-chrome.js - 0.0.1 - 2014-09-22 - scottmotte */
var MicroEvent  = function(){};
MicroEvent.prototype  = {
  bind  : function(event, fct){
    this._events = this._events || {};
    this._events[event] = this._events[event] || [];
    this._events[event].push(fct);
  },
  unbind  : function(event, fct){
    this._events = this._events || {};
    if( event in this._events === false  )  return;
    this._events[event].splice(this._events[event].indexOf(fct), 1);
  },
  trigger : function(event /* , args... */){
    this._events = this._events || {};
    if( event in this._events === false  )  return;
    for(var i = 0; i < this._events[event].length; i++){
      this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
    }
  }
};

/**
 * mixin will delegate all MicroEvent.js function in the destination object
 *
 * - require('MicroEvent').mixin(Foobar) will make Foobar able to use MicroEvent
 *
 * @param {Object} the object which will support MicroEvent
*/
MicroEvent.mixin  = function(destObject){
  var props = ['bind', 'unbind', 'trigger'];
  for(var i = 0; i < props.length; i ++){
    if( typeof destObject === 'function' ){
      destObject.prototype[props[i]]  = MicroEvent.prototype[props[i]];
    }else{
      destObject[props[i]] = MicroEvent.prototype[props[i]];
    }
  }
}

// export in common js
if( typeof module !== "undefined" && ('exports' in module)){
  module.exports  = MicroEvent;
}


(function(exports){

  var SignatureChrome = function() {
    this.document_element   = null;
    this.signature_nav_btns = [];
    return this;
  };

  SignatureChrome.prototype.init = function(document_element) {
    // do something
    this.document_element = document_element;
    this._drawCss();
    this._drawNav();
    this._drawDoneNav();
  };

  SignatureChrome.prototype._drawDoneNav = function() {
    this.done_nav                 = document.createElement('nav');
    this.done_nav.className       = "signature-done-nav";
    this.done_nav.id              = "signature-done-nav-"+this.uuid;
    var done_nav_ul               = document.createElement("ul");
    done_nav_ul.className         = "signature-no-list-style";
    var done_nav_li               = document.createElement("li");
    this.done_btn                 = document.createElement("a");
    this.done_btn.className       = "signature-button signature-button-primary signature-done-button";
    this.done_btn.innerHTML       = "Terminé";
    done_nav_li.appendChild(this.done_btn);
    done_nav_ul.appendChild(done_nav_li);
    this.done_nav.appendChild(done_nav_ul);

    return this.document_element.appendChild(this.done_nav);
  };

  SignatureChrome.prototype._drawNav = function() {
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
    return this.document_element.appendChild(this.header);
  };

  exports.SignatureChrome = SignatureChrome;

}(this));

MicroEvent.mixin(SignatureChrome);
var signature_chrome = new SignatureChrome();


(function(SignatureChrome){SignatureChrome.prototype._drawCss = function() {this.css = '@charset "utf-8";.signature-nav{position:absolute;text-align:center;top:0;left:0;background:#E2E3E1;background:rgba(239,65,54,1);width:100%}.signature-no-list-style{padding:0;margin:0;list-style:none}.signature-nav li{display:inline-block}.signature-nav-btn{font-size:18px;color:rgba(255,255,255,1);display:inline-block;height:44px;width:60px;text-decoration:none;text-transform:uppercase;text-align:center;line-height:44px;border-right:1px dashed #fff;border-top:none;border-bottom:none;cursor:pointer}.signature-nav-btn.signature-nav-btn-first{border-left:1px dashed #fff}.signature-nav-disabled,.signature-nav-disabled:visited{color:rgba(255,255,255,0.5)}.signature-nav-active,.signature-nav-active:visited{color:#fff;background:#222}.signature-done-button{font-size:24px;border-radius:2px 2px 0 0}.signature-done-nav{position:fixed;text-align:center;bottom:0;right:0;width:100%;z-index:2000}.signature-nav a,.signature-nav a:visited{}.signature-button{display:inline-block;*display:inline;zoom:1;line-height:normal;white-space:nowrap;vertical-align:baseline;text-align:center;cursor:pointer;-webkit-user-drag:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.signature-button::-moz-focus-inner{padding:0;border:0}.signature-button{font-size:100%;*font-size:90%;*overflow:visible;padding:0.5em 1.5em 0.5em;color:#444;color:rgba(0,0,0,0.80);*color:#444;border:1px solid #999;border:none rgba(0,0,0,0);background-color:#E6E6E6;text-decoration:none;border-radius:2px;-webkit-font-smoothing:antialiased;-webkit-transition:0.1s linear -webkit-box-shadow;-moz-transition:0.1s linear -moz-box-shadow;-ms-transition:0.1s linear box-shadow;-o-transition:0.1s linear box-shadow;transition:0.1s linear box-shadow}.signature-button-hover,.signature-button:hover{filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#00000000",endColorstr="#00000000",GradientType=0);background-image:-webkit-gradient(linear,0 0,0 100%,from(transparent),color-stop(40%,rgba(0,0,0,0.05)),to(rgba(0,0,0,0.05)));background-image:-webkit-linear-gradient(transparent,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.15));background-image:-moz-linear-gradient(top,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.05));background-image:-ms-linear-gradient(transparent,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.15));background-image:-o-linear-gradient(transparent,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.05));background-image:linear-gradient(transparent,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.05))}.signature-button-active,.signature-button:active{box-shadow:0 0 0 1px rgba(0,0,0,0.15) inset,0 0 6px rgba(0,0,0,0.20) inset}.signature-button[disabled],.signature-button-disabled,.signature-button-disabled:hover,.signature-button-disabled:active{border:none;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled = false);filter:alpha(opacity=40);-khtml-opacity:0.40;-moz-opacity:0.40;opacity:0.40;cursor:not-allowed;box-shadow:none}.signature-button-hidden{display:none}.signature-button::-moz-focus-inner{padding:0;border:0}.signature-button-primary,a.signature-button-primary{background:rgba(239,65,54,1);color:#fff}.signature-button:-moz-focusring{outline-color:rgba(0,0,0,0.85)}@import url(https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);';var style = document.createElement('style');style.type = 'text/css';if (style.styleSheet) {style.styleSheet.cssText = this.css;} else {style.appendChild(document.createTextNode(this.css));}return document.body.appendChild(style);};}(SignatureChrome));