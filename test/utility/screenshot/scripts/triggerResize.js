/**
 * trigger window.resize to relayout js components
 */
module.exports = function triggerResize() {
  const evt = window.document.createEvent('UIEvents');
  evt.initUIEvent('resize', true, false, window, 0);
  window.dispatchEvent(evt);
}
