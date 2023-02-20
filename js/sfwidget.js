function createSfWorkspace(selector, modelId, callback)
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

  // By default, the latest version of the viewer API will be used.
  const client = new Sketchfab( viewerIframe );
  client.init( modelId, {
    success: function onSuccess( api ){
        api.start();
        api.addEventListener( 'viewerready', function() {

            // API is ready to use
            // Insert your code here
          console.log( 'Viewer is ready' );

          if (typeof callback === 'function') {
              callback(api);
          }

        } );
    },
    error: function onError() {
        console.log( 'Viewer error' );
    }
} );
}

function insertSketchfabViewer(selector, modelId, callback) {
  const sfViewerScript = document.createElement('script');
  sfViewerScript.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
  sfViewerScript.type = 'text/javascript';
  
  document.getElementsByTagName('head')[0].appendChild(sfViewerScript);

  sfViewerScript.onload = function () {
    createSfWorkspace(selector, callback);
  };
}
