# Simple Canvas Resize
Shows one method of resizing user-uploaded images using canvas APIs.
Uses [canvas.toBlob](https://caniuse.com/mdn-api_htmlcanvaselement_toblob) and so requires IE10 or higher.
Input and output are both type [File](https://developer.mozilla.org/en-US/docs/Web/API/File) to fascilitate easy uploading.

## Behaviour
This simplified demo will create a square image using the specified side length.
If the input image is not square: the output will be cropped to the center content.