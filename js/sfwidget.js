function insertSketchfabViewer(selector) {
  // Get the div element by the selector
  const viewerDiv = document.querySelector(selector);
  
  // Create the iframe element for the Sketchfab viewer
  const viewerIframe = document.createElement('iframe');
  viewerIframe.setAttribute('src', 'https://sketchfab.com/models/4bb5d595e4474f68b0696badf51d221f/embed');
  viewerIframe.setAttribute('width', '100%');
  viewerIframe.setAttribute('height', '480');
  viewerIframe.setAttribute('frameborder', '0');
  viewerIframe.setAttribute('allow', 'autoplay; fullscreen; vr');
  
  // Append the iframe element to the div element
  viewerDiv.appendChild(viewerIframe);
}
