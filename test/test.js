c = {
  config: "preVerifyJSAPI",
  onMenuShareTimeline: "menu:share:timeline",
  onMenuShareAppMessage: "menu:share:appmessage",
  onMenuShareQQ: "menu:share:qq",
  onMenuShareWeibo: "menu:share:weiboApp",
  onMenuShareQZone: "menu:share:QZone",
  previewImage: "imagePreview",
  getLocation: "geoLocation",
  openProductSpecificView: "openProductViewWithPid",
  addCard: "batchAddCard",
  openCard: "batchViewCard",
  chooseWXPay: "getBrandWCPayRequest",
  openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
  startSearchBeacons: "startMonitoringBeacons",
  stopSearchBeacons: "stopMonitoringBeacons",
  onSearchBeacons: "onBeaconsInRange",
  consumeAndShareCard: "consumedShareCard",
  openAddress: "editAddress",
}
a = (function () {
  var e = {};
  for (var n in c) e[c[n]] = n;
  return e;
})()

console.log(a)