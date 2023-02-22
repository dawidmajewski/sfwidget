const nodeManager = {
  chooseObjectVariant: function (api, groupPrefix, variantName) {
    console.log(groupPrefix, variantName);
    api.getNodeMap(function (err, nodes) {
      if (err) {
        window.console.log(err);
        return;
      }

      let hiddenNodesIds = [];
      let chosenInstanceId = null;

      for (let i in nodes) {
        let node = nodes[i];
        if (node.type !== 'MatrixTransform' || typeof node.name !== 'string' || !node.name.startsWith(groupPrefix)) {
          continue;
        }

        if (typeof variantName === 'string' && node.name == variantName) {
          chosenInstanceId = node.instanceID;
        }

        // console.log(node.instanceID+"")
        api.hide(node.instanceID);
        hiddenNodesIds.push(node.instanceID);
      }

      if (chosenInstanceId === null) {
        chosenInstanceId = hiddenNodesIds[0];
      }

      api.show(chosenInstanceId);

    });
  }
}

function createSfWorkspace(selector, config, callback) {

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
  const client = new Sketchfab(viewerIframe);
  client.init(config.viewer.modelId, {
    success: function onSuccess(api) {
      api.start();
      api.addEventListener('viewerready', function () {

        if (typeof config.viewer.background !== 'undefined') {
          api.setBackground(config.viewer.background, function () { });
        }

        const options = config.configurator.options

        if (typeof options !== 'undefined' && options.length > 0) {
          const optionsWrapper = document.querySelector(config.configurator.selector);

          for (let i in options) {
            switch (options[i].controlType) {
              case 'button':
                let button = document.createElement('div');
                let text = document.createTextNode(options[i].name);
                button.classList.add('btn');
                button.classList.add('btn-primary', 'w-100', 'mt-1');
                button.appendChild(text);

                let events = options[i].events;

                button.addEventListener('click', function(e) {
                  e.preventDefault();

                  for (let j in events) {
                    switch (events[j][0]) {
                      case 'chooseObjectVariant':
                        nodeManager.chooseObjectVariant(api, events[j][1], events[j][2]);
                        break;
                    }
                  }
                });

                optionsWrapper.appendChild(button);
                break;
            }
          }
        }


        if (typeof callback === 'function') {
          callback(api);
        }

      });
    },
    error: function onError() {
      console.log('Viewer error');
    }
  });
}

function insertSketchfabViewer(selector, config, callback) {
  const sfViewerScript = document.createElement('script');
  sfViewerScript.src = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';
  sfViewerScript.type = 'text/javascript';

  document.getElementsByTagName('head')[0].appendChild(sfViewerScript);

  sfViewerScript.onload = function () {
    createSfWorkspace(selector, config, callback);
  };
}
