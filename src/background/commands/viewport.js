import browser from "webextension-polyfill";

export function setViewportSize(width, height, playbackOptions) {
  const compensatedSize = {};
  return browser.tabs.sendMessage(playbackOptions.tabId, {
    compensateSize: true
  }).then(compensation => {
    compensatedSize.width = width + compensation.width;
    compensatedSize.height = height + compensation.height;
    return browser.windows.update(playbackOptions.windowId, compensatedSize);
  }).then(() => fixInaccuracies({
    wantedSize: {
      width,
      height
    },
    compensatedSize
  }, playbackOptions));
}

function fixInaccuracies(sizes, playbackOptions, retries = 3) {
  if (!retries) return Promise.reject(`Can not accurately set viewport size, set as ${sizes.actualSize.width}px x ${sizes.actualSize.height}px`);
  return browser.tabs.sendMessage(playbackOptions.tabId, {
    getSize: true
  }).then(actualSize => {
    if (actualSize.width === sizes.wantedSize.width && actualSize.height === sizes.wantedSize.height) {
      return Promise.resolve(true);
    } else {
      let resizedWidth = sizes.compensatedSize.width + (sizes.wantedSize.width - actualSize.width);
      let resizedHeight = sizes.compensatedSize.height + (sizes.wantedSize.height - actualSize.height);
      return browser.windows.update(playbackOptions.windowId, {
        width: resizedWidth,
        height: resizedHeight
      }).then(() => fixInaccuracies({
        compensatedSize: {
          height: resizedHeight,
          width: resizedWidth
        },
        wantedSize: sizes.wantedSize,
        actualSize
      }, playbackOptions, --retries));
    }
  });
}