(function(SignatureChrome){SignatureChrome.prototype._drawCss = function() {this.css = '@charset "utf-8";.signature-nav{position:absolute;text-align:center;top:0;left:0;background:#E2E3E1;background:rgba(239,65,54,1);width:100%}.signature-no-list-style{padding:0;margin:0;list-style:none}.signature-nav li{display:inline-block}.signature-nav-btn{font-size:18px;color:rgba(255,255,255,1);display:inline-block;height:44px;width:60px;text-decoration:none;text-transform:uppercase;text-align:center;line-height:44px;border-right:1px dashed #fff;border-top:none;border-bottom:none;cursor:pointer}.signature-nav-btn.signature-nav-btn-first{border-left:1px dashed #fff}.signature-nav-disabled,.signature-nav-disabled:visited{color:rgba(255,255,255,0.5)}.signature-nav-active,.signature-nav-active:visited{color:#fff;background:#222}.signature-done-button{font-size:24px;border-radius:2px 2px 0 0}.signature-done-nav{position:fixed;text-align:center;bottom:0;right:0;width:100%;z-index:2000}.signature-nav a,.signature-nav a:visited{}.signature-button{display:inline-block;*display:inline;zoom:1;line-height:normal;white-space:nowrap;vertical-align:baseline;text-align:center;cursor:pointer;-webkit-user-drag:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.signature-button::-moz-focus-inner{padding:0;border:0}.signature-button{font-size:100%;*font-size:90%;*overflow:visible;padding:0.5em 1.5em 0.5em;color:#444;color:rgba(0,0,0,0.80);*color:#444;border:1px solid #999;border:none rgba(0,0,0,0);background-color:#E6E6E6;text-decoration:none;border-radius:2px;-webkit-font-smoothing:antialiased;-webkit-transition:0.1s linear -webkit-box-shadow;-moz-transition:0.1s linear -moz-box-shadow;-ms-transition:0.1s linear box-shadow;-o-transition:0.1s linear box-shadow;transition:0.1s linear box-shadow}.signature-button-hover,.signature-button:hover{filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#00000000",endColorstr="#00000000",GradientType=0);background-image:-webkit-gradient(linear,0 0,0 100%,from(transparent),color-stop(40%,rgba(0,0,0,0.05)),to(rgba(0,0,0,0.05)));background-image:-webkit-linear-gradient(transparent,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.15));background-image:-moz-linear-gradient(top,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.05));background-image:-ms-linear-gradient(transparent,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.15));background-image:-o-linear-gradient(transparent,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.05));background-image:linear-gradient(transparent,rgba(0,0,0,0.05) 40%,rgba(0,0,0,0.05))}.signature-button-active,.signature-button:active{box-shadow:0 0 0 1px rgba(0,0,0,0.15) inset,0 0 6px rgba(0,0,0,0.20) inset}.signature-button[disabled],.signature-button-disabled,.signature-button-disabled:hover,.signature-button-disabled:active{border:none;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled = false);filter:alpha(opacity=40);-khtml-opacity:0.40;-moz-opacity:0.40;opacity:0.40;cursor:not-allowed;box-shadow:none}.signature-button-hidden{display:none}.signature-button::-moz-focus-inner{padding:0;border:0}.signature-button-primary,a.signature-button-primary{background:rgba(239,65,54,1);color:#fff}.signature-button:-moz-focusring{outline-color:rgba(0,0,0,0.85)}@import url(https://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);';var style = document.createElement('style');style.type = 'text/css';if (style.styleSheet) {style.styleSheet.cssText = this.css;} else {style.appendChild(document.createTextNode(this.css));}return document.body.appendChild(style);};}(SignatureChrome));