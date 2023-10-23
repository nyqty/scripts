/*
new Env('getH5st');
*/
const IIl111II = require("jsdom");
class l1i1li11 {
  constructor() {
    this.domWindow1 = null;
    this.domWindow2 = null;
  }
  async ["sleep"](IillI1I) {
    return new Promise((I1IiII1, ilII1111) => {
      setTimeout(() => {
        I1IiII1(IillI1I);
      }, IillI1I);
    });
  }
  async ["loadH5Sdk"](lIllliil) {
    const {
      JSDOM: iIIIIIii
    } = IIl111II;
    let IIi11Iil = new IIl111II.ResourceLoader({
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
        "referrer": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu"
      }),
      I1liilii = new IIl111II.VirtualConsole(),
      II11iiI = {
        "url": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
        "referrer": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
        "runScripts": "dangerously",
        "resources": IIi11Iil,
        "includeNodeLocations": true,
        "storageQuota": 10000000,
        "pretendToBeVisual": true,
        "virtualConsole": I1liilii
      };
    const iliIiiI1 = new iIIIIIii("<body>\n    <script>\n        function Map(){this.elements=new Array();this.size=function(){return this.elements.length},this.isEmpty=function(){return(this.elements.length<1)},this.clear=function(){this.elements=new Array()},this.put=function(_key,_value){if(this.containsKey(_key)==true){if(this.containsValue(_value)){if(this.remove(_key)==true){this.elements.push({key:_key,value:_value})}}else{this.elements.push({key:_key,value:_value})}}else{this.elements.push({key:_key,value:_value})}},this.remove=function(_key){var bln=false;try{for(i=0;i<this.elements.length;i++){if(this.elements[i].key==_key){this.elements.splice(i,1);return true}}}catch(e){bln=false}return bln},this.get=function(_key){try{for(i=0;i<this.elements.length;i++){if(this.elements[i].key==_key){return this.elements[i].value}}}catch(e){return null}},this.element=function(_index){if(_index<0||_index>=this.elements.length){return null}return this.elements[_index]},this.containsKey=function(_key){var bln=false;try{for(i=0;i<this.elements.length;i++){if(this.elements[i].key==_key){bln=true}}}catch(e){bln=false}return bln},this.containsValue=function(_value){var bln=false;try{for(i=0;i<this.elements.length;i++){if(this.elements[i].value==_value){bln=true}}}catch(e){bln=false}return bln},this.keys=function(){var arr=new Array();for(i=0;i<this.elements.length;i++){arr.push(this.elements[i].key)}return arr},this.values=function(){var arr=new Array();for(i=0;i<this.elements.length;i++){arr.push(this.elements[i].value)}return arr}}\n    </script>\n    <script src=\"https://storage.360buyimg.com/webcontainer/js_security_" + (lIllliil.charAt(0) === "3" ? "v3_0.1.3" : "v3_0.1.8") + ".js\"></script>\n    <script src=\"https://fm-price-cdn.jd.com/priceportal-static/script/utilsV1_1.js\"></script>\n    </body>", II11iiI);
    await this.sleep(500);
    switch (lIllliil.charAt(0)) {
      case "3":
        this.domWindow1 = iliIiiI1.window;
        break;
      case "4":
        this.domWindow2 = iliIiiI1.window;
        break;
    }
  }
  async ["getH5st"](l1IiIi1i) {
    const liliI1ii = l1IiIi1i?.["version"] === "3.1" ? "3.1" : "4.1",
      {
        appId: III1i1Ii,
        appid: lIli11l,
        body: lliIiIl1,
        client: IiIlIl11,
        clientVersion: ll1lIiii,
        functionId: iilllIlI
      } = l1IiIi1i,
      IIiIlIi1 = {
        "appid": lIli11l,
        "functionId": iilllIlI,
        "clientVersion": ll1lIiii,
        "client": IiIlIl11,
        "body": lliIiIl1
      },
      Il1Ili11 = III1i1Ii;
    switch (liliI1ii.charAt(0)) {
      case "3":
        !this.domWindow1 && (await this.loadH5Sdk(liliI1ii));
        break;
      case "4":
        !this.domWindow2 && (await this.loadH5Sdk(liliI1ii));
        break;
    }
    let I1lIiii1 = {
      ...l1IiIi1i,
      "h5st": "",
      "params": "functionId=" + iilllIlI + "&body=" + encodeURIComponent(JSON.stringify(lliIiIl1)) + "&appid=" + lIli11l + "&client=" + IiIlIl11 + "&clientVersion=" + ll1lIiii + "&h5st="
    };
    return new Promise(async IiI1Iill => {
      switch (liliI1ii.charAt(0)) {
        case "3":
          if (typeof this.domWindow1.signWaap === "function") {
            const lIiI1Iil = await this.domWindow1.signWaap(Il1Ili11, IIiIlIi1);
            I1lIiii1.h5st = lIiI1Iil || "";
            I1lIiii1.params += lIiI1Iil || "";
            IiI1Iill(I1lIiii1);
          } else {
            let iii1I11l = null;
            iii1I11l = setInterval(async () => {
              if (typeof this.domWindow1.signWaap === "function") {
                clearInterval(iii1I11l);
                iii1I11l = null;
                const i11111lI = await this.domWindow1.signWaap(Il1Ili11, IIiIlIi1);
                I1lIiii1.h5st = i11111lI || "";
                I1lIiii1.params += i11111lI || "";
                IiI1Iill(I1lIiii1);
              }
            }, 100);
          }
          break;
        case "4":
          if (typeof this.domWindow2.signWaap === "function") {
            const I11Il1Ii = await this.domWindow2.signWaap(Il1Ili11, IIiIlIi1);
            I1lIiii1.h5st = I11Il1Ii || "";
            I1lIiii1.params += I11Il1Ii || "";
            IiI1Iill(I1lIiii1);
          } else {
            let lli11iII = null;
            lli11iII = setInterval(async () => {
              if (typeof this.domWindow2.signWaap === "function") {
                clearInterval(lli11iII);
                lli11iII = null;
                const llIl1Il1 = await this.domWindow2.signWaap(Il1Ili11, IIiIlIi1);
                I1lIiii1.h5st = llIl1Il1 || "";
                I1lIiii1.params += llIl1Il1 || "";
                IiI1Iill(I1lIiii1);
              }
            }, 100);
          }
          break;
      }
    });
  }
}
module.exports = new l1i1li11();