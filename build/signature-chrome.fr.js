/*! signature-chrome.js - 0.0.1 - 2014-10-18 - scottmotte */
/*! signature-pad.js - 0.0.1 - 2014-10-13 - motdotla */
var MicroEvent=function(){};MicroEvent.prototype={bind:function(a,b){this._events=this._events||{},this._events[a]=this._events[a]||[],this._events[a].push(b)},unbind:function(a,b){this._events=this._events||{},a in this._events!=!1&&this._events[a].splice(this._events[a].indexOf(b),1)},trigger:function(a){if(this._events=this._events||{},a in this._events!=!1)for(var b=0;b<this._events[a].length;b++)this._events[a][b].apply(this,Array.prototype.slice.call(arguments,1))}},MicroEvent.mixin=function(a){for(var b=["bind","unbind","trigger"],c=0;c<b.length;c++)"function"==typeof a?a.prototype[b[c]]=MicroEvent.prototype[b[c]]:a[b[c]]=MicroEvent.prototype[b[c]]},"undefined"!=typeof module&&"exports"in module&&(module.exports=MicroEvent),function(a){var b=function(a){return this instanceof b?(this.canvas=a,this.init(),this):new b(a)};b.prototype.init=function(){this.initVariables(),this.initPainters(),this.initEvents()},a.SignatureMark=b}(this),function(a){a.prototype.initEvents=function(){var a=this;a.canvas.addEventListener(a.mouse_down,function(b){a.onCanvasMouseDown(a,b)},!1),a.canvas.addEventListener(a.mouse_move,function(b){a.onCanvasMouseMove(a,b)},!1),a.canvas.addEventListener("contextmenu",function(b){a.preventRightClick(a,b)},!1),document.addEventListener(a.mouse_up,function(b){a.onCanvasMouseUp(a,b)},!1),a.canvas.addEventListener(a.mouse_up,function(b){a.onCanvasMouseUp(a,b)},!1)},a.prototype.preventRightClick=function(a,b){b.preventDefault()},a.prototype.onCanvasMouseDown=function(a,b){b.preventDefault(),a.setCanvasOffset(a),a.startDrawingStroke(a),a.setMouseXAndMouseY(a,b),a.setPainters(a)},a.prototype.onCanvasMouseMove=function(a,b){b.preventDefault(),a.setMouseXAndMouseY(a,b)},a.prototype.onCanvasMouseUp=function(a){a.stopDrawingStroke(a)},a.prototype.setMouseXAndMouseY=function(a,b){a.touch_supported?(target=b.touches[0],a.mouseX=target.pageX-a.canvasOffsetLeft,a.mouseY=target.pageY-a.canvasOffsetTop):(a.mouseX=b.pageX-a.canvasOffsetLeft,a.mouseY=b.pageY-a.canvasOffsetTop)},a.prototype.setCanvasOffset=function(a){canvasOffset=a.Offset(a.canvas),a.canvasOffsetLeft=canvasOffset.left,a.canvasOffsetTop=canvasOffset.top}}(SignatureMark),function(a){a.prototype.Offset=function(a){if(void 0===a)return null;var b=a.getBoundingClientRect();return{left:b.left+window.pageXOffset,top:b.top+window.pageYOffset}}}(SignatureMark),function(a){a.prototype.initPainters=function(){this.painters=[];for(var a=0;a<this.max_strokes;a++){var b=.05*Math.random()+this.easing;this.painters.push({dx:0,dy:0,ax:0,ay:0,div:.1,ease:b})}},a.prototype.setPainters=function(a){for(var b=0;b<a.painters.length;b++)pntr=a.painters[b],pntr.dx=a.mouseX,pntr.dy=a.mouseY}}(SignatureMark),function(a){a.prototype.drawStroke=function(a){var b;for(b=0;b<a.painters.length;b++){a.context.beginPath(),pntr=a.painters[b],a.context.moveTo(pntr.dx,pntr.dy);var c=pntr.ax=(pntr.ax+(pntr.dx-a.mouseX)*pntr.div)*pntr.ease;pntr.dx-=c;var d=pntr.dx,e=pntr.ay=(pntr.ay+(pntr.dy-a.mouseY)*pntr.div)*pntr.ease;pntr.dy-=e;var f=pntr.dy;a.context.lineTo(d,f),a.context.stroke()}},a.prototype.startDrawingStroke=function(a){var b=setInterval(function(){a.drawStroke(a)},a.refresh_rate);a.strokeIntervals.push(b)},a.prototype.stopDrawingStroke=function(a){for(var b=0;b<a.strokeIntervals.length;b++)clearInterval(a.strokeIntervals[b])}}(SignatureMark),function(a){a.prototype.initVariables=function(){this.touch_supported="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch?!0:!1,this.context=this.canvas.getContext("2d"),this.color=[0,0,0],this.brush_pressure=.5,this.context.strokeStyle="rgba("+this.color[0]+", "+this.color[1]+", "+this.color[2]+", "+this.brush_pressure+")",this.context.lineWidth=2.5,this.painters=[],this.mouseX=0,this.mouseY=0,this.strokeIntervals=[],this.refresh_rate=5,this.max_strokes=12,this.easing=.7,this.mouse_down="mousedown",this.mouse_move="mousemove",this.mouse_up="mouseup",this.touch_supported?(this.mouse_down="touchstart",this.mouse_move="touchmove",this.mouse_up="touchend"):(this.refresh_rate=10,this.max_strokes=100)}}(SignatureMark),function(a){var b=function(){return this instanceof b?(this.uuid=this.Uuid(),this.script=this.CurrentlyExecutedScript(),this.init(),this):new b};b.prototype.init=function(){this.script?(this.script.className+=" signature-pad-script",this.script.id="signature-pad-script-"+this.uuid,this.draw(),this.events(),SignatureMark(this.canvas)):console.error("Could not find script tag to initialize on.")},MicroEvent.mixin(b),a.SignaturePad=b}(this),function(a){var b="data:image/gif;base64,R0lGODlhRAIEAaIAAOLi1v7+5enp2ubm2Pf34e7u3QAAAAAAACH5BAAHAP8ALAAAAABEAgQBAAP/GLrc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAMKHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mix/6PHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJs6fPn0CDCh1KtKjRo0iTKl3KtKnTp1CjSp1KtarVq1izat3KtavXr2DDih1LtqzZs2jTql3Ltq3bt3Djyp1Lt67du3jz6t3Lt6/fv4ADCx5MuLDhw4gTK17MuLHjx5AjS55MubLly5gza97MubPnz6BDix5NurTp06hTq17NurXr17Bjy55Nu7bt27hz697Nu7fv38CDCx9OvLjx48iTK1/OvLnz59CjS59Ovbr169g5CADAnUCE7QAEZE9DgDuAARAKmB+vZoB57w3Ud2dP3rx4BuXn009jHgD8AP/5AVDAfmrIF94C5g1IoBr9eQfefQumYWABBkbIRn/vWbgGeBlqqEaAAnq4BogKingGiNyZiAaG+qk4xoMBoueiGPLJ2OCMYBgIn4EQ4rhFgP8FcKOPWgRYogITEqlFgg/0pyQWD6bHZAMsYuhAlVZSieV6Wm4JwJVeftnllmB6WSaZY2J5ppppVrmmm22y+KaccWbJQJhi3hnmnHYiuGedTgLKpZ5mCpqioXn6WSihaDLKpqNwQkrnC1FGEKiklyraqKaPchqpp5OC2qcCePKZKal/YnqqkKmKumqpiJo6qKuzoroorYeqWiurt9q6qa+dAvupsKESOyqvvyIbrLKKwzJbLAsERDtBtNIaKmuuuCZq7KutbrsrrLpi6624zh4LbrbXalsut72u+2237pJ77rjqzhtvvfDaq2++/LZr75MAByzwwAQXbPDBCCes8MIMN+zwwxBHLPHEFFds8cUYZ6zxxhx37PHHIIcs8sgkl2zyySinrPLKLLfs8sswxyzzzDTXbPPNbiUAADs=";a.prototype.draw=function(){this._drawCss(),this._drawPad(),this._drawOverlay(),this._drawRotator(),this.setSize()},a.prototype.setSize=function(){this.StandardScreen()?(this.wrapper.width=580,this.wrapper.setAttribute("style","width:580px"),this.canvas.height=260,this.canvas.width=580):(this.wrapper.style.width=446,this.wrapper.setAttribute("style","width:446px"),this.wrapper.className+=" signature-iphone",this.canvas.height=200,this.canvas.width=446)},a.prototype._drawPad=function(){this.pad=document.createElement("div"),this.pad.className="signature-pad",this.pad.id="signature-pad-"+this.uuid,this.pad_img=document.createElement("img"),this.pad_img.className="signature-pad-img",this.pad_img.id="signature-pad-img-"+this.uuid,this.pad_img.src=b,this.pad.appendChild(this.pad_img);var a=document.createElement("div"),c=document.createTextNode("Click to Sign"),d=document.createElement("span");return d.setAttribute("data-icon","A"),a.className="signature-pad-msg",a.id="signature-pad-msg-"+this.uuid,a.appendChild(c),a.appendChild(d),this.pad.appendChild(a),this.InsertAfter(this.script,this.pad)},a.prototype._drawOverlay=function(){this.overlay=document.createElement("div"),this.overlay.className="signature-overlay",this.overlay.id="signature-overlay-"+this.uuid,this.wrapper=document.createElement("div"),this.wrapper.className="signature-wrapper",this.wrapper.id="signature-wrapper-"+this.uuid,this.overlay.appendChild(this.wrapper),this.canvas=document.createElement("canvas"),this.canvas.className="signature-canvas",this.canvas.id="signature-canvas-"+this.uuid,this.close_signature=document.createElement("a");var a=document.createTextNode(" x "),b=document.createElement("span");b.setAttribute("data-icon","G"),this.close_signature.className="signature-btn close-signature-btn",this.close_signature.id="close-signature-btn-"+this.uuid,this.close_signature.appendChild(a),this.close_signature.appendChild(b),this.clear_signature=document.createElement("a");var c=document.createTextNode("Clear");this.clear_signature.className="signature-btn clear-signature-btn",this.clear_signature.id="clear-signature-btn-"+this.uuid,this.clear_signature.appendChild(c),this.add_signature=document.createElement("a");var d=document.createTextNode("Done"),e=document.createElement("span");e.setAttribute("data-icon","A"),this.add_signature.className="signature-btn add-signature-btn",this.add_signature.id="add-signature-btn-"+this.uuid,this.add_signature.appendChild(d),this.add_signature.appendChild(e);var f=document.createElement("div");return f.className="signature-clearer",this.wrapper.appendChild(this.canvas),this.wrapper.appendChild(this.close_signature),this.wrapper.appendChild(this.clear_signature),this.wrapper.appendChild(this.add_signature),this.wrapper.appendChild(f),document.body.appendChild(this.overlay)},a.prototype._drawRotator=function(){this.rotator=document.createElement("div"),this.rotator.className="signature-rotator",this.rotator.id="signature-rotator-"+this.uuid;var a=document.createElement("div");a.className="signature-rotator-msg";var b=document.createTextNode("Rotate 90°");a.appendChild(b);var c=document.createElement("div");c.className="signature-rotator-icon",c.setAttribute("data-icon","L"),this.rotator_close=document.createElement("div"),this.rotator_close.className="signature-rotator-close",this.rotator_close.id="signature-rotator-close-"+this.uuid;var d=document.createTextNode(" x ");return this.rotator_close.appendChild(d),this.rotator.appendChild(a),this.rotator.appendChild(c),this.rotator.appendChild(this.rotator_close),document.body.appendChild(this.rotator)},a.prototype._drawCss=function(){this.css="@font-face{font-family:'Pictos Pad';src:url(data:font/truetype;charset=utf-8;base64,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) format('truetype');src:url(data:font/woff;charset=utf-8;base64,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) format('woff');font-weight:normal;font-style:normal}.signature-pad{position:relative;cursor:pointer;text-decoration:underline;background:rgba(253,253,0,0.1);width:200px;height:90px;border:2px dashed #cbd0d5;text-decoration:none}.signature-pad [data-icon]:after{font-family:'Pictos Pad'!important;content:attr(data-icon);padding-left:5px}.signature-pad .signature-pad-msg{position:absolute;color:#313440;font-family:sans-serif;font-size:14px;background:#eceef1;color:#313440;padding:0;filter:alpha(opacity=80);opacity:.80;top:0;right:0;text-align:center;padding:10px 35px 10px 10px}.signature-pad .signature-pad-msg span{line-height:100%;position:absolute;top:4px;right:5px;font-size:30px;height:29px}.signature-pad .signature-pad-img{position:absolute;top:0;left:0;width:100%;height:100%;border:none}.signature-rotator{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:#dd4a38;z-index:1;text-align:center;font-family:sans-serif;z-index:99999999}.signature-rotator [data-icon]:after{font-family:'Pictos Pad'!important;content:attr(data-icon);padding-left:5px}.signature-rotator.signature-show{display:block}.signature-rotator div{position:absolute;left:60%;top:44%;width:100%;margin-left:-50%;text-align:center;font-size:100px;line-height:100%}.signature-rotator .signature-rotator-icon{top:37%;left:40%}.signature-rotator .signature-rotator-msg{font-size:40px;-webkit-transform:rotate(-90deg);-moz-transform:rotate(-90deg);-ms-transform:rotate(-90deg);-o-transform:rotate(-90deg);filter:progid:dximagetransform.microsoft.basicimage(rotation=3)}.signature-rotator .signature-rotator-close{font-size:50px;top:0;left:0;color:#9c3528;display:block;cursor:pointer;width:50px;margin-left:0;text-align:center}.signature-overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:#eceef1;z-index:88888888}.signature-overlay.signature-show{display:block}.signature-overlay .signature-clearer{clear:both}.signature-overlay .signature-powered-by{float:right;filter:alpha(opacity=80);opacity:.80;text-decoration:none;display:block}.signature-overlay .signature-powered-by text{text-decoration:none}.signature-overlay .signature-wrapper{display:block;position:relative;width:100%;max-width:580px;margin:0 auto;margin-top:120px;background:none}.signature-overlay .signature-wrapper.signature-iphone{margin-top:3px}.signature-overlay .signature-wrapper [data-icon]:after{font-family:'Pictos Pad'!important;content:attr(data-icon);padding-left:5px}.signature-overlay canvas{cursor:pointer;background:#fff;background:url(data:image/gif;base64,R0lGODlhRAIEAaIAAOHh4f///+bm5u/v7/j4+AAAAAAAAAAAACH5BAAHAP8ALAAAAABEAgQBAAP/SLHc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/AAMKHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mix/6PHjyBDihxJsqTJkyhTqlzJsqXLlzBjypxJs6bNmzhz6tzJs6fPn0CDCh1KtKjRo0iTKl3KtKnTp1CjSp1KtarVq1izat3KtavXr2DDih1LtqzZs2jTql3Ltq3bt3Djyp1Lt67du3jz6t3Lt6/fv4ADCx5MuLDhw4gTK17MuLHjx5AjS55MubLly5gza97MubPnz6BDix5NurTp06hTq17NurXr17Bjy55Nu7bt27hz697Nu7fv38CDCx9OvLjx48iTK1/OvLnz59CjS59Ovbr169izcxAAoLuCCALCD9CuZkB3AAIimEdPfg337uMdrBfwvT0aAufTN1gPgEB9+/9nvNcfAwS8Fx+AafBHnwLhCTDAfwiecV5/BTboX4TlnTfAfBBiKOGE3nnIBn8hirgGfhqayAaK8KmoRoET6ufihyB2OCMY4aHHIgA3ksFhAAIe2KMXPwag4JBfsFjfjv7ZiOQULApppIYXPnlFhQBIucCETloJxXsyypeiAyCW+UCZZpKJ5oRnrnlem27yqGacEMbp3X92UthAnlVuaWefAfCJp51wulnomoeimWiaexI6p6GPrlnnn4PSWambgAraqKWbQtopopEqGiqjDOQpw3wTsDmqqp+K2iqpfsa5KIizcnkpqK/SuqqtubJa6p+7vhlsd7UK26uxv8o6rJynxxK7bKaONstsspje6iq1ki5brLPSbjttrJ6+0GSX43YYLbbXgosrurAGeq666bqrbLfa1kvvvezqii+87Zpqb76+8qsvwMgKHLC84RpcMMLrKswtwQ87/C3D8frr5cUYZ6zxxhx37PHHIIcs8sgkl2zyySinrPLKLLfs8sswxyzzzDTXbPPNOOes88489+zzz0AHLfTQRBdt9NFIJ6300kw37fRcCQAAOw%3D%3D) no-repeat;background-size:100%;zoom:1;border:2px solid #cbd0d5;border-top:none;border-left:none}.signature-overlay canvas:active{cursor:crosshair}.signature-overlay .signature-btn{font-family:sans-serif;position:absolute;padding:9px;cursor:pointer;font-size:14px;text-align:center;background:#eceef1;color:#313440;-webkit-appearance:none;border:none;filter:alpha(opacity=50);opacity:.50;line-height:100%;border-radius:3px;-webkit-border-radius:3px;-moz-border-radius:3px}.signature-overlay .signature-btn:hover{text-decoration:none}.signature-overlay .signature-btn span{position:absolute;top:10.5px;right:5px;font-size:20px;filter:alpha(opacity=80);opacity:.80}.signature-overlay .signature-btn.close-signature-btn{top:5px;left:5px;padding:9px 14px 9px 14px;color:#eceef1}.signature-overlay .signature-btn.close-signature-btn span{color:#313440;right:10px}.signature-overlay .signature-btn.clear-signature-btn{top:5px;left:45px}.signature-overlay .signature-btn.add-signature-btn{top:10px;right:10px;padding-right:34px;border:2px solid #cbd0d5;border-top:1px solid #cbd0d5;border-left:1px solid #cbd0d5;text-transform:uppercase;filter:alpha(opacity=80);opacity:.80}.signature-overlay .signature-btn.add-signature-btn span{top:9px;font-size:30px}";var a=document.createElement("style");return a.type="text/css",a.styleSheet?a.styleSheet.cssText=this.css:a.appendChild(document.createTextNode(this.css)),document.body.appendChild(a)}}(SignaturePad),function(a){var b,c="click",d="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch?!0:!1;d&&(c="touchend"),a.prototype.events=function(){b=this,this.pad.addEventListener(c,this.show,!1),this.add_signature.addEventListener(c,this.saveSignature,!1),this.close_signature.addEventListener(c,this.hide,!1),this.clear_signature.addEventListener(c,this.clear,!1),this.wrapper.addEventListener(c,function(a){a.stopPropagation()},!1),this.rotator_close.addEventListener(c,this.hideRotatorAndPad,!1),this.rotator_close.addEventListener(c,this.hideRotatorAndPad,!1),window.onresize=function(a){b.showOrHideRotator(a)}},a.prototype.saveSignature=function(a){var c=b.canvas.toDataURL("png");b.trigger("signature_pad.data_url",c),b.hide(a),b.pad_img.src=c},a.prototype.show=function(a){a&&a.preventDefault(),b.overlay.className+=" signature-show",b.showOrHideRotator()},a.prototype.hide=function(a){a&&a.preventDefault(),b.overlay.className="signature-overlay"},a.prototype.clear=function(a){a&&a.preventDefault();var c=b.canvas.getContext("2d");c.clearRect(0,0,b.canvas.width,b.canvas.height)},a.prototype.showOrHideRotator=function(a){if(a&&a.preventDefault(),!b.StandardScreen()&&b.visible()){var c=window.matchMedia("(orientation: portrait)");c.matches?b.showRotator():b.hideRotator()}else b.hideRotator()},a.prototype.visible=function(a){return a&&a.preventDefault(),b.overlay.className.indexOf("signature-show")>0},a.prototype.showRotator=function(a){a&&a.preventDefault(),b.visible()&&(b.rotator.className+=" signature-show")},a.prototype.hideRotator=function(a){a&&a.preventDefault(),b.rotator.className="signature-rotator"},a.prototype.hideRotatorAndPad=function(a){a&&a.preventDefault(),b.hide(),b.hideRotator()}}(SignaturePad),function(a){a.prototype.Uuid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b,c;return b=16*Math.random()|0,c="x"===a?b:3&b|8,c.toString(16)})},a.prototype.CurrentlyExecutedScript=function(){var a;if(document){var b=document.getElementsByTagName("script");a=b[b.length-1]}return a},a.prototype.InsertAfter=function(a,b){return a.parentNode.insertBefore(b,a.nextSibling)},a.prototype.StandardScreen=function(){return document.body.clientWidth>=580},a.prototype.FireEvent=function(a,b,c){var d=!0,e=!0,f=document.createEvent("Events");f.initEvent(a,d,e),f.data=c,b.dispatchEvent(f)}}(SignaturePad);var signature_pad=SignaturePad();

(function(exports){

  var CLICK             = "click";
  var TOUCH_SUPPORTED   = (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) ? true : false;
  if (!!TOUCH_SUPPORTED) {     
    CLICK               = "touchend";
  }
  var EDIT_MODE = "edit_mode";
  var CONFIRMATION_MODE = "confirmation_mode";
  var TEXT_MODE = "text_mode";
  var SIGN_MODE = "sign_mode";
  var TRASH_MODE = "trash_mode";
  var SIGNED_MODE = "signed_mode";
  var EVENT_CONFIRMATION_MODE_CLICKED = "signature_chrome."+CONFIRMATION_MODE+".clicked";
  var EVENT_TEXT_MODE_CLICKED = "signature_chrome."+TEXT_MODE+".clicked";
  var EVENT_SIGN_MODE_CLICKED = "signature_chrome."+SIGN_MODE+".clicked";
  var EVENT_TRASH_MODE_CLICKED = "signature_chrome."+TRASH_MODE+".clicked";
  var EVENT_CONFIRMATION_NO_CLICKED = "signature_chrome.confirmation_no.clicked";
  var EVENT_CONFIRMATION_YES_CLICKED = "signature_chrome.confirmation_yes.clicked";
  var EVENT_STATE_CHANGED = "signature_chrome.state.changed";
  var EVENT_TEXT = "signature_chrome.text";
  var EVENT_SIGNATURE = "signature_chrome.signature";

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

    _this.jafja.trigger(EVENT_STATE_CHANGED, {previous: old_state, current: _this.state});
  };

  SignatureChrome.prototype._watchStateAndChangeCss = function(document_element) {
    var _this = this;
    this.jafja.bind(EVENT_STATE_CHANGED, function(result) {
      _this.removeClass(document_element, result.previous);
      _this.addClass(document_element, result.current);
    });
  };

  SignatureChrome.prototype._stateMachine = function(document_element) {
    var _this = this;
    _this.jafja.bind(EVENT_CONFIRMATION_MODE_CLICKED, function() {
      if (_this.state == CONFIRMATION_MODE) {
        _this.setState(document_element, EDIT_MODE);
      } else {
        _this.setState(document_element, CONFIRMATION_MODE);
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
        _this.setState(document_element, EDIT_MODE);
    });
    _this.jafja.bind(EVENT_CONFIRMATION_NO_CLICKED, function() {
      _this.setState(document_element, EDIT_MODE);
    });
    _this.jafja.bind(EVENT_CONFIRMATION_YES_CLICKED, function() {
      _this.setState(document_element, SIGNED_MODE);
    });
  };

  SignatureChrome.prototype.init = function(document_element) {
    this._stateMachine(document_element);
    this._drawCss();
    this._drawNav(document_element);
    this._drawDoneNav(document_element);
    this._drawDoneConfirmation(document_element);
    this._drawSigned(document_element);
    this._watchStateAndChangeCss(document_element);
    this.setState(document_element, EDIT_MODE);

    var _this = this;

    // event triggers
    this.done_mode_btn.addEventListener(CLICK, function() {
      _this.jafja.trigger(EVENT_CONFIRMATION_MODE_CLICKED, {}); 
    }, false);
    this.text_mode_btn.addEventListener(CLICK, function() {
      _this.jafja.trigger(EVENT_TEXT_MODE_CLICKED, {});
    }, false);
    this.sign_mode_btn.addEventListener(CLICK, function() {
      _this.jafja.trigger(EVENT_SIGN_MODE_CLICKED, {});
    }, false);
    this.trash_mode_btn.addEventListener(CLICK, function() {
       if (_this.state == TRASH_MODE) {
        _this.jafja.trigger(EVENT_TRASH_MODE_CLICKED, {});
      }
    }, false);
    this.done_confirmation_no.addEventListener(CLICK, function() {
      _this.jafja.trigger(EVENT_CONFIRMATION_NO_CLICKED, {});
    }, false);
    this.done_confirmation_yes.addEventListener(CLICK, function() {
      _this.jafja.trigger(EVENT_CONFIRMATION_YES_CLICKED, {});
    }, false);

    signature_pad.bind('signature_pad.data_url', function(data_url) {
      _this.jafja.trigger(EVENT_SIGNATURE, data_url);
    });
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
    this.done_mode_btn.innerHTML       = "Terminé";
    done_nav_li.appendChild(this.done_mode_btn);
    done_nav_ul.appendChild(done_nav_li);
    this.done_nav.appendChild(done_nav_ul);


    return document_element.appendChild(this.done_nav);
  };

  SignatureChrome.prototype._drawDoneConfirmation = function(document_element) {
    this.done_confirmation                = document.createElement('div');
    this.done_confirmation.className      = "signature-done-confirmation";

    var done_confirmation_msg             = document.createElement('p');
    done_confirmation_msg.className       = "signature-done-confirmation-msg";
    done_confirmation_msg.innerHTML       = "Etes-vous sûr que vous avez terminé la signature?";

    this.done_confirmation.appendChild(done_confirmation_msg);

    this.done_confirmation_yes            = document.createElement('a');
    this.done_confirmation_yes.className  = "signature-button signature-button-primary signature-done-confirmation-yes";
    this.done_confirmation_yes.innerHTML  = "Oui";
    this.done_confirmation.appendChild(this.done_confirmation_yes);

    this.done_confirmation_no            = document.createElement('a');
    this.done_confirmation_no.className  = "signature-button signature-done-confirmation-no";
    this.done_confirmation_no.innerHTML  = "Pas";
    this.done_confirmation.appendChild(this.done_confirmation_no);

    return document_element.appendChild(this.done_confirmation);
  };

  SignatureChrome.prototype._drawSigned = function(document_element) {
    this.signed                = document.createElement('div');
    this.signed.className      = "signature-signed";

    var signed_msg             = document.createElement('p');
    signed_msg.className       = "signature-signed-msg";
    signed_msg.innerHTML       = "This document has been signed.";

    this.signed.appendChild(signed_msg);

    return document_element.appendChild(this.signed);
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
    this.trash_mode_btn.className = "signature-nav-btn signature-nav-"+TRASH_MODE;
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

  SignatureChrome.prototype.promptText = function() {
    var _this = this;
    var text = prompt('Entrez le texte', '');

    if (!!text) {
      _this.jafja.trigger(EVENT_TEXT, text);
    }
  };

  SignatureChrome.prototype.promptSignature = function() {
    var _this = this;
    signature_pad.show();
    // the event stuff is happening above - because it's an external signature-pad plugin
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


(function(SignatureChrome){SignatureChrome.prototype._drawCss = function() {this.css = '@charset "utf-8";@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css);.signature-pad{display:none}.signature-header{position:fixed;top:0;left:0;width:100%;z-index:2000}.signature-nav-span:before{line-height:43px;font-size:30px}.signature-nav{position:absolute;text-align:center;top:0;left:0;background:#E2E3E1;background:rgba(239,65,54,1);width:100%}.signature-no-list-style{padding:0;margin:0;list-style:none}.signature-nav li{display:inline-block}.signature-nav-btn{font-size:18px;color:rgba(255,255,255,1);display:inline-block;height:44px;width:60px;text-decoration:none;text-transform:uppercase;text-align:center;line-height:44px;border-right:1px dashed #fff;border-top:none;border-bottom:none;cursor:pointer}.text_mode .signature-nav-text_mode,.text_mode .signature-nav-text_mode:visited{color:#fff;background:#222}.sign_mode .signature-nav-sign_mode,.sign_mode .signature-nav-sign_mode:visited{color:#fff;background:#222}.signature-nav-trash_mode,.signature-nav-trash_mode{color:rgba(255,255,255,0.5)}.trash_mode .signature-nav-trash_mode,.trash_mode .signature-nav-trash_mode:visited{color:rgba(255,255,255,1)}.signature-nav-btn.signature-nav-btn-first{border-left:1px dashed #fff}.signature-nav-disabled,.signature-nav-disabled:visited{color:rgba(255,255,255,0.5)}.signature-nav-active,.signature-nav-active:visited{color:#fff;background:#222}.signature-done-button{font-size:24px;border-radius:2px 2px 0 0}.signature-done-nav{position:fixed;text-align:center;bottom:0;right:0;width:100%;z-index:2000}.signature-nav a,.signature-nav a:visited{}.confirmation_mode .signature-done-confirmation{display:block}.edit_mode .signature-done-confirmation{display:none}.signed_mode .signature-signed{display:none}.signature-done-confirmation{display:none;z-index:2010;background:rgba(255,255,255,0.9);width:100%;height:100%;position:fixed;top:0;left:0;text-align:center}.signature-done-confirmation-msg{font-size:300%;color:#000;margin-top:10px}.signature-done-confirmation-yes,.signature-done-confirmation-no{font-size:24px;margin:20px}.signed_mode .signature-signed{display:block}.edit_mode .signature-signed{display:none}.confirmation_mode .signature-signed{display:none}.signature-signed{display:none;z-index:2020;background:rgba(255,255,255,0.9);width:100%;height:100%;position:fixed;top:0;left:0;text-align:center}.signature-signed-msg{font-size:300%;color:#000;margin-top:10px}.signature-button{display:inline-block;*display:inline;zoom:1;line-height:normal;white-space:nowrap;vertical-align:baseline;text-align:center;cursor:pointer;-webkit-user-drag:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.signature-button::-moz-focus-inner{padding:0;border:0}.signature-button{font-size:100%;*font-size:90%;*overflow:visible;padding:0.5em 1.5em 0.5em;color:#444;color:rgba(0,0,0,0.80);*color:#444;border:1px solid #999;border:none rgba(0,0,0,0);background-color:#E6E6E6;text-decoration:none;border-radius:2px;-webkit-font-smoothing:antialiased;-webkit-transition:0.1s linear -webkit-box-shadow;-moz-transition:0.1s linear -moz-box-shadow;-ms-transition:0.1s linear box-shadow;-o-transition:0.1s linear box-shadow;transition:0.1s linear box-shadow}.signature-button-hover,.signature-button:hover{filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#00000000",endColorstr="#00000000",GradientType=0);background-image:-webkit-gradient(linear,0 0,0 100%,from(transparent),color-stop(40%,rgba(0,0,0,0.05)),to(rgba(0,0,0,0.05)));background-image:-webkit-linear-gradient(transparent,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.15));background-image:-moz-linear-gradient(top,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.05));background-image:-ms-linear-gradient(transparent,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.15));background-image:-o-linear-gradient(transparent,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.05));background-image:linear-gradient(transparent,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.05))}.signature-button-active,.signature-button:active{box-shadow:0 0 0 1px rgba(0,0,0,0.15) inset,0 0 6px rgba(0,0,0,0.20) inset}.signature-button[disabled],.signature-button-disabled,.signature-button-disabled:hover,.signature-button-disabled:active{border:none;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled = false);filter:alpha(opacity=40);-khtml-opacity:0.40;-moz-opacity:0.40;opacity:0.40;cursor:not-allowed;box-shadow:none}.signature-button-hidden{display:none}.signature-button::-moz-focus-inner{padding:0;border:0}.signature-button-primary,a.signature-button-primary{background:rgba(239,65,54,1);color:#fff}.signature-button:-moz-focusring{outline-color:rgba(0,0,0,0.85)}.signature-hidden{display:none}';var style = document.createElement('style');style.type = 'text/css';if (style.styleSheet) {style.styleSheet.cssText = this.css;} else {style.appendChild(document.createTextNode(this.css));}return document.body.appendChild(style);};}(SignatureChrome));