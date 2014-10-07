# signature-chrome

<img src="https://raw.githubusercontent.com/motdotla/signature-chrome/master/signature-chrome.png" alt="signature-chrome" align="right" width="220" />

```html
<script src="/path/to/signature-chrome.js"></script>
<script src="/path/to/jafja.js"></script>
<script>
  var body = document.getElementsByTagName('body')[0];
  signature_chrome.jafja = jafja;
  signature_chrome.init(body);
  signature_chrome.jafja.bind('state.changed', function(result) {
    console.log('state.changed', result);
  });
</script>
```

## Usage

### init()

```javascript
var body = document.getElementsByTagName('body')[0];
signature_chrome.init(body);
```

### jafja

```javascript
signature_chrome.jafja = jafja
```

Set jafja to a [jafja](https://github.com/motdotla/jafja) object.

This exposes a series of events you can bind to.

### Events

#### state.changed

```javascript
signature_chrome.bind('state.changed', function(result) {
  console.log('state.changed', result);
});
```

#### done_mode.clicked

```javascript
signature_chrome.bind('done_mode.clicked', function(result) {
  console.log('done_mode.clicked', result);
});
```

#### text_mode.clicked

```javascript
signature_chrome.bind('text_mode.clicked', function(result) {
  console.log('text_mode.clicked', result);
});
```

#### sign_mode.clicked

```javascript
signature_chrome.bind('sign_mode.clicked', function(result) {
  console.log('sign_mode.clicked', result);
});
```

#### trash_mode.clicked

```javascript
signature_chrome.bind('trash_mode.clicked', function(result) {
  console.log('trash_mode.clicked', result);
});
```
