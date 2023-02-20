function createSfWorkspace(selector)
{

  // Get the div element by the selector
  const viewerDiv = document.querySelector(selector);
  
  // Create the iframe element for the Sketchfab viewer
  const viewerIframe = document.createElement('iframe');
  viewerIframe.setAttribute('src', '');
  viewerIframe.setAttribute('width', '100%');
  viewerIframe.setAttribute('height', '480');
  viewerIframe.setAttribute('frameborder', '0');
  viewerIframe.setAttribute('allow', 'autoplay; fullscreen; vr');
  
  // Append the iframe element to the div element
  viewerDiv.appendChild(viewerIframe);
  var uid = '4bb5d595e4474f68b0696badf51d221f';

  // By default, the latest version of the viewer API will be used.
  const client = new Sketchfab( viewerIframe );
  client.init( uid, {
    success: function onSuccess( api ){
        api.start();
        api.addEventListener( 'viewerready', function() {

            // API is ready to use
            // Insert your code here
            console.log( 'Viewer is ready' );

        } );
    },
    error: function onError() {
        console.log( 'Viewer error' );
    }
} );
}

function insertSketchfabViewer(selector) {
  const sfViewrScript = document.createElement('script');
  sfViewrScript.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
  sfViewrScript.type = 'text/javascript';
  
  document.getElementsByTagName('head')[0].appendChild(sfViewrScript);

  script.onload = function () {
    createSfWorkspace(selector);
  };
}
