(function(exports){

  var SignatureChrome = function() {
    return this;
  };

  SignatureChrome.prototype.init = function() {
    // do something
  };

  exports.SignatureChrome = SignatureChrome;

}(this));

MicroEvent.mixin(SignatureChrome);
var signature_chrome = new SignatureChrome();
