
/*
new Env('h5st');
*/
const i1ilIl1l = require("jsdom");
let i1i111il = null,
  lli1llIl = null;
async function i1111ill(Iiil1ili) {
  return new Promise((l11iiiIl, l1ii1i1I) => {
    setTimeout(() => {
      l11iiiIl(Iiil1ili);
    }, Iiil1ili);
  });
}
async function iIli1l(III1111I) {
  const {
    JSDOM: lIlI11l
  } = i1ilIl1l;
  let IlllI1i = new i1ilIl1l.ResourceLoader({
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
      "referrer": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu"
    }),
    lI1IIIIi = new i1ilIl1l.VirtualConsole(),
    I111il = {
      "url": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
      "referrer": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
      "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
      "runScripts": "dangerously",
      "resources": IlllI1i,
      "includeNodeLocations": true,
      "storageQuota": 10000000,
      "pretendToBeVisual": true,
      "virtualConsole": lI1IIIIi
    };
  const l1lliIi = new lIlI11l("<body>\n    <script>\n        function Map(){this.elements=new Array();this.size=function(){return this.elements.length},this.isEmpty=function(){return(this.elements.length<1)},this.clear=function(){this.elements=new Array()},this.put=function(_key,_value){if(this.containsKey(_key)==true){if(this.containsValue(_value)){if(this.remove(_key)==true){this.elements.push({key:_key,value:_value})}}else{this.elements.push({key:_key,value:_value})}}else{this.elements.push({key:_key,value:_value})}},this.remove=function(_key){var bln=false;try{for(i=0;i<this.elements.length;i++){if(this.elements[i].key==_key){this.elements.splice(i,1);return true}}}catch(e){bln=false}return bln},this.get=function(_key){try{for(i=0;i<this.elements.length;i++){if(this.elements[i].key==_key){return this.elements[i].value}}}catch(e){return null}},this.element=function(_index){if(_index<0||_index>=this.elements.length){return null}return this.elements[_index]},this.containsKey=function(_key){var bln=false;try{for(i=0;i<this.elements.length;i++){if(this.elements[i].key==_key){bln=true}}}catch(e){bln=false}return bln},this.containsValue=function(_value){var bln=false;try{for(i=0;i<this.elements.length;i++){if(this.elements[i].value==_value){bln=true}}}catch(e){bln=false}return bln},this.keys=function(){var arr=new Array();for(i=0;i<this.elements.length;i++){arr.push(this.elements[i].key)}return arr},this.values=function(){var arr=new Array();for(i=0;i<this.elements.length;i++){arr.push(this.elements[i].value)}return arr}}\n    </script>\n    <script src=\"https://storage.360buyimg.com/webcontainer/js_security_" + (III1111I.charAt(0) === "3" ? "v3_0.1.3" : "v3_0.1.8") + ".js\"></script>\n    <script src=\"https://fm-price-cdn.jd.com/priceportal-static/script/utilsV1_1.js\"></script>\n    </body>", I111il);
  await i1111ill(500);
  switch (III1111I.charAt(0)) {
    case "3":
      i1i111il = l1lliIi.window;
      break;
    case "4":
      lli1llIl = l1lliIi.window;
      break;
  }
}
async function Il1iI11i(l111IiII, iIlilli, Ili1ll1 = "4.1") {
  Ili1ll1 !== "3.1" && (Ili1ll1 = "4.1");
  switch (Ili1ll1.charAt(0)) {
    case "3":
      !i1i111il && (await iIli1l(Ili1ll1));
      break;
    case "4":
      !lli1llIl && (await iIli1l(Ili1ll1));
      break;
  }
  return new Promise(async IIiliiIl => {
    switch (Ili1ll1.charAt(0)) {
      case "3":
        if (typeof i1i111il.signWaap === "function") {
          const lllilii1 = await i1i111il.signWaap(l111IiII, iIlilli);
          IIiliiIl(lllilii1);
        } else {
          let iIii1lI = null;
          iIii1lI = setInterval(async () => {
            if (typeof i1i111il.signWaap === "function") {
              clearInterval(iIii1lI);
              iIii1lI = null;
              const IIli1iii = await i1i111il.signWaap(l111IiII, iIlilli);
              IIiliiIl(IIli1iii);
            }
          }, 100);
        }
        break;
      case "4":
        if (typeof lli1llIl.signWaap === "function") {
          const IiIIllil = await lli1llIl.signWaap(l111IiII, iIlilli);
          IIiliiIl(IiIIllil);
        } else {
          let IIlII1ii = null;
          IIlII1ii = setInterval(async () => {
            if (typeof lli1llIl.signWaap === "function") {
              clearInterval(IIlII1ii);
              IIlII1ii = null;
              const i1ili = await lli1llIl.signWaap(l111IiII, iIlilli);
              IIiliiIl(i1ili);
            }
          }, 100);
        }
        break;
    }
  });
}
module.exports = Il1iI11i;