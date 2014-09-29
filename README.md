WHAT IF ALL IT DID WAS EXPOSE THE DOM OBJECTS. THEN I BUILD MY OWN EVENTS OFF THOSE DOM OBJECTS IN A SEPARATE LIBRARY - CLICKS, ETC.

THEN THERE IS STILL THE MATTER OF STATE, but maybe this events library would handle state? Or maybe the events is just like my central pipeline log. And everything else subscribes to that, to determine state. 

What are my different states. 

edit_mode (undefined_mode)
- when you tap, and scroll it doesn't effect anything.
- you can still drag items around
text_mode
- where you tap prompts the text box. text_box.show
sign_mode
- where you tap prompts the sign box. signature_pad.show
confirm_mode
- it covers everything else.
signed_mode
- 

so, shouldn't there be a repo that is signature-state, tracking all this.


provide the event queue, this should pass into. it should be an active microevent. Literally a basic class wrapped by microevent. Then, you can send events to the queue. That way you actually have a centralized queue receiving sending out all events. Then you bind to that centralized queue to catch events. That events queue acts as a log. Then everyone else pub/subs on that log by choosing the events they want to watch. 

# signature-chrome

<img src="https://raw.githubusercontent.com/motdotla/signature-chrome/master/signature-chrome.png" alt="signature-chrome" align="right" width="220" />

```html
<script src="/path/to/signature-chrome.js"></script>
<script>
  var body = document.getElementsByTagName('body')[0];
  signature_chrome.init(body);
</script>
```

## Usage

### init()

```javascript
var body = document.getElementsByTagName('body')[0];
signature_chrome.init(body);
```

This exposes a series of events you can bind to.

### Events

#### done.clicked

```javascript
signature_chrome.bind('done.clicked', function(result) {
  console.log('done.clicked', result);
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
