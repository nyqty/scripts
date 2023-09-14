
/*
new Env('h5st');
*/
const IlllIll1 = require("jsdom");
let lIil1ll1 = null;
async function ili11IIi(l1i1Iil1) {
  return new Promise((i1I1IiI, i1IIil) => {
    setTimeout(() => {
      i1I1IiI(l1i1Iil1);
    }, l1i1Iil1);
  });
}
async function IiliiI1i() {
  const {
    JSDOM: iiil1iIl
  } = IlllIll1;
  let l1IlI11I = new IlllIll1.ResourceLoader({
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
      "referrer": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu"
    }),
    IIlil11I = new IlllIll1.VirtualConsole(),
    lil1iIl1 = {
      "url": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
      "referrer": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
      "runScripts": "dangerously",
      "resources": l1IlI11I,
      "includeNodeLocations": true,
      "storageQuota": 10000000,
      "pretendToBeVisual": true,
      "virtualConsole": IIlil11I
    };
  const iIIIiI = new iiil1iIl("<body>\n    <script>\n        function Map(){this.elements=new Array();this.size=function(){return this.elements.length},this.isEmpty=function(){return(this.elements.length<1)},this.clear=function(){this.elements=new Array()},this.put=function(_key,_value){if(this.containsKey(_key)==true){if(this.containsValue(_value)){if(this.remove(_key)==true){this.elements.push({key:_key,value:_value})}}else{this.elements.push({key:_key,value:_value})}}else{this.elements.push({key:_key,value:_value})}},this.remove=function(_key){var bln=false;try{for(i=0;i<this.elements.length;i++){if(this.elements[i].key==_key){this.elements.splice(i,1);return true}}}catch(e){bln=false}return bln},this.get=function(_key){try{for(i=0;i<this.elements.length;i++){if(this.elements[i].key==_key){return this.elements[i].value}}}catch(e){return null}},this.element=function(_index){if(_index<0||_index>=this.elements.length){return null}return this.elements[_index]},this.containsKey=function(_key){var bln=false;try{for(i=0;i<this.elements.length;i++){if(this.elements[i].key==_key){bln=true}}}catch(e){bln=false}return bln},this.containsValue=function(_value){var bln=false;try{for(i=0;i<this.elements.length;i++){if(this.elements[i].value==_value){bln=true}}}catch(e){bln=false}return bln},this.keys=function(){var arr=new Array();for(i=0;i<this.elements.length;i++){arr.push(this.elements[i].key)}return arr},this.values=function(){var arr=new Array();for(i=0;i<this.elements.length;i++){arr.push(this.elements[i].value)}return arr}}\n    </script>\n    <script src=\"https://storage.360buyimg.com/webcontainer/js_security_v3_0.1.3.js\"></script>\n    <script src=\"https://fm-price-cdn.jd.com/priceportal-static/script/utilsV1_1.js\"></script>\n    </body>", lil1iIl1);
  await ili11IIi(500);
  lIil1ll1 = iIIIiI.window;
}
async function l1lll1i1(llIiIIii, l111iIi) {
  let IIliIl1l = null;
  return !lIil1ll1 && (await IiliiI1i()), new Promise(async l1I1111I => {
    if (typeof lIil1ll1.signWaap === "function") {
      const lil1Ili1 = await lIil1ll1.signWaap(llIiIIii, l111iIi);
      l1I1111I(lil1Ili1);
    } else IIliIl1l = setInterval(async () => {
      if (typeof lIil1ll1.signWaap === "function") {
        clearInterval(IIliIl1l);
        IIliIl1l = null;
        const Ii1iII1i = await lIil1ll1.signWaap(llIiIIii, l111iIi);
        l1I1111I(Ii1iII1i);
      }
    }, 100);
  });
}
module.exports = l1lll1i1;