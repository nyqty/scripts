const ii1l1li = require("jsdom");
let ll1IIlii = null;
async function ii1i1l1l(I1IIll) {
  return new Promise((llli11, llIi1llI) => {
    setTimeout(() => {
      llli11(I1IIll);
    }, I1IIll);
  });
}
async function IiilIIIi() {
  const {
    JSDOM: I1llil11
  } = ii1l1li;
  let Il1Il1Il = new ii1l1li.ResourceLoader({
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
      "referrer": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu"
    }),
    l1iiii = new ii1l1li.VirtualConsole(),
    iill1ili = {
      "url": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
      "referrer": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
      "runScripts": "dangerously",
      "resources": Il1Il1Il,
      "includeNodeLocations": true,
      "storageQuota": 10000000,
      "pretendToBeVisual": true,
      "virtualConsole": l1iiii
    };
  const IIiI11l1 = new I1llil11("<body>\n    <script src=\"https://static.360buyimg.com/siteppStatic/script/mescroll/map.js\"></script>\n    <script src=\"https://storage.360buyimg.com/webcontainer/js_security_v3_0.1.8.js\"></script>\n    <script src=\"https://static.360buyimg.com/siteppStatic/script/utils.js\"></script>\n    </body>", iill1ili);
  await ii1i1l1l(500);
  ll1IIlii = IIiI11l1.window;
}
async function I1l1i1i1(iIill1l1, lI1Il1i) {
  let ilI1li1l = null;
  return !ll1IIlii && (await IiilIIIi()), new Promise(async I1II11l1 => {
    if (typeof ll1IIlii.signWaap === "function") {
      const l1ili11l = await ll1IIlii.signWaap(iIill1l1, lI1Il1i);
      I1II11l1(l1ili11l);
    } else ilI1li1l = setInterval(async () => {
      if (typeof ll1IIlii.signWaap === "function") {
        clearInterval(ilI1li1l);
        ilI1li1l = null;
        const i1lII111 = await ll1IIlii.signWaap(iIill1l1, lI1Il1i);
        I1II11l1(i1lII111);
      }
    }, 100);
  });
}
module.exports = I1l1i1i1;