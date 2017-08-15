let isMobile = false;
if ((/android/i).test(navigator.userAgent) || (/iphone|ipad/i).test(navigator.userAgent)) {
  const meta = document.querySelector('meta[name="viewport"]');
  const content = meta.content;
  if (!(/initial-scale=1,/g.test(content))) {
    isMobile = true;
  }
}
var DPR = isMobile ? (window.devicePixelRatio || 1) : 1;
export default DPR;