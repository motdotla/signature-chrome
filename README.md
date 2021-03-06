# signature-chrome

<img src="https://raw.githubusercontent.com/motdotla/signature-chrome/master/signature-chrome.png" alt="signature-chrome" align="right" width="220" />

```html
<script src="/path/to/signature-chrome.js"></script>
<script src="/path/to/jafja.js"></script>
<script>
  var body = document.getElementsByTagName('body')[0];
  signature_chrome.jafja = jafja;
  signature_chrome.init(body);
  jafja.bind('signature_chrome.state.changed', function(result) {
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

### promptText()

```javascript
signature_chrome.promptText();
```

### promptSignature()

```javascript
signature_chrome.promptSignature();
```

### setState(document_element, new_state)

```javascript
signature_chrome.setState(signature_document.document, "trash_mode");
```

### jafja

```javascript
signature_chrome.jafja = jafja
```

Set jafja to a [jafja](https://github.com/motdotla/jafja) object.

This exposes a series of events you can bind to.

### Events

#### signature_chrome.state.changed

```javascript
jafja.bind('signature_chrome.state.changed', function(result) {
  console.log('signature_chrome.state.changed', result);
});
```

#### signature_chrome.text

```javascript
jafja.bind('signature_chrome.text', function(result) {
  console.log('signature_chrome.text', result);
});
```

#### signature_chrome.signature

```javascript
jafja.bind('signature_chrome.signature', function(result) {
  console.log('signature_chrome.signature', result);
});
```

#### signature_chrome.done_mode.clicked

```javascript
jafja.bind('signature_chrome.done_mode.clicked', function(result) {
  console.log('signature_chrome.done_mode.clicked', result);
});
```

#### signature_chrome.text_mode.clicked

```javascript
jafja.bind('signature_chrome.text_mode.clicked', function(result) {
  console.log('signature_chrome.text_mode.clicked', result);
});
```

#### signature_chrome.sign_mode.clicked

```javascript
jafja.bind('signature_chrome.sign_mode.clicked', function(result) {
  console.log('signature_chrome.sign_mode.clicked', result);
});
```

#### signature_chrome.trash_mode.clicked

```javascript
jafja.bind('signature_chrome.trash_mode.clicked', function(result) {
  console.log('signature_chrome.trash_mode.clicked', result);
});
```

#### signature_chrome.confirmation_no.clicked

```javascript
jafja.bind('signature_chrome.confirmation_no.clicked', function(result) {
  console.log('signature_chrome.confirmation_no.clicked', result);
});

```

#### signature_chrome.confirmation_yes.clicked

```javascript
jafja.bind('signature_chrome.confirmation_yes.clicked', function(result) {
  console.log('signature_chrome.confirmation_yes.clicked', result);
});

```
