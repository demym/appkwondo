(function(){var p=this,ba=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b},ca=function(a,b,c){return a.call.apply(a.bind,arguments)},da=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}},q=function(a,b,c){q=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?
ca:da;return q.apply(null,arguments)},t=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}},v=Date.now||function(){return+new Date},ea=function(a,b){function c(){}c.prototype=b.prototype;a.Na=b.prototype;a.prototype=new c;a.La=function(a,c,g){for(var f=Array(arguments.length-2),h=2;h<arguments.length;h++)f[h-2]=arguments[h];return b.prototype[c].apply(a,f)}};var fa=(new Date).getTime();var ga=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},ha=/&/g,ia=/</g,ja=/>/g,ka=/"/g,la=/'/g,na=/\x00/g,oa={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\","<":"<"},pa={"'":"\\'"},qa=function(a,b){return a<b?-1:a>b?1:0};var ra=function(a,b){this.start=a<b?a:b;this.end=a<b?b:a};var sa=function(a,b){this.width=a;this.height=b};sa.prototype.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};sa.prototype.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};var ta=function(a){ta[" "](a);return a};ta[" "]=function(){};var ua=function(a){try{var b;if(b=!!a&&null!=a.location.href)a:{try{ta(a.foo);b=!0;break a}catch(c){}b=!1}return b}catch(c){return!1}},va=function(a){return ua(a.top)?a.top:null},wa=function(a,b){return b.getComputedStyle?b.getComputedStyle(a,null):a.currentStyle},w=function(a,b){if(!(1E-4>Math.random())){var c=Math.random();if(c<b)return c=xa(window),a[Math.floor(c*a.length)]}return null},xa=function(a){try{var b=new Uint32Array(1);a.crypto.getRandomValues(b);return b[0]/65536/65536}catch(c){return Math.random()}},
ya=function(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.call(void 0,a[c],c,a)},za=function(a){var b=a.length;if(0==b)return 0;for(var c=305419896,d=0;d<b;d++)c^=(c<<5)+(c>>2)+a.charCodeAt(d)&4294967295;return 0<c?c:4294967296+c},Aa=/^([0-9.]+)px$/,Ba=/^(-?[0-9.]{1,30})$/,Ca=function(a){return Ba.test(a)&&(a=Number(a),!isNaN(a))?a:null},Da=function(a){return(a=Aa.exec(a))?+a[1]:null};var Ea=function(a){var b;try{b=parseInt(a.localStorage.getItem("google_experiment_mod"),10)}catch(c){return null}if(0<=b&&1E3>b)return b;b=Math.floor(1E3*xa(a));try{return a.localStorage.setItem("google_experiment_mod",""+b),b}catch(c){return null}};var Fa=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d||!1):a.attachEvent&&a.attachEvent("on"+b,c)};var Ia=function(a,b,c,d,e,g){try{if((d?a.da:Math.random())<(e||a.V)){var f=a.T+b+Ga(c),f=f.substring(0,2E3);"undefined"===typeof g?Ha(f):Ha(f,g)}}catch(h){}},Ga=function(a){var b="";ya(a,function(a,d){if(0===a||a)b+="&"+d+"="+encodeURIComponent(String(a))});return b},Ha=function(a,b){p.google_image_requests||(p.google_image_requests=[]);var c=p.document.createElement("img");if(b){var d=function(a){b(a);a=d;c.removeEventListener?c.removeEventListener("load",a,!1):c.detachEvent&&c.detachEvent("onload",
a);a=d;c.removeEventListener?c.removeEventListener("error",a,!1):c.detachEvent&&c.detachEvent("onerror",a)};Fa(c,"load",d);Fa(c,"error",d)}c.src=a;p.google_image_requests.push(c)};var Ja=function(a,b,c){this.aa=a;this.X=b;this.P=c;this.J=null;this.W=this.u;this.ja=!1},Ka=function(a,b,c){this.message=a;this.fileName=b||"";this.lineNumber=c||-1},Ma=function(a,b,c,d,e,g){var f;try{f=c()}catch(k){var h=a.P;try{var l=La(k),h=(g||a.W).call(a,b,l,void 0,d)}catch(m){a.u("pAR",m)}if(!h)throw k;}finally{if(e)try{e()}catch(k){}}return f},z=function(a,b,c){var d=y;return function(){var e=arguments;return Ma(d,a,function(){return b.apply(void 0,e)},void 0,c)}};
Ja.prototype.u=function(a,b,c,d,e){var g={};g.context=a;b instanceof Ka||(b=La(b));g.msg=b.message.substring(0,512);b.fileName&&(g.file=b.fileName);0<b.lineNumber&&(g.line=b.lineNumber.toString());a=p.document;g.url=a.URL.substring(0,512);g.ref=a.referrer.substring(0,512);Na(this,g,d);Ia(this.aa,e||this.X,g,this.ja,c);return this.P};
var Na=function(a,b,c){if(a.J)try{a.J(b)}catch(d){}if(c)try{c(b)}catch(d){}},La=function(a){var b=a.toString();a.name&&-1==b.indexOf(a.name)&&(b+=": "+a.name);a.message&&-1==b.indexOf(a.message)&&(b+=": "+a.message);if(a.stack){var c=a.stack,d=b;try{-1==c.indexOf(d)&&(c=d+"\n"+c);for(var e;c!=e;)e=c,c=c.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/,"$1");b=c.replace(/\n */g,"\n")}catch(g){b=d}}return new Ka(b,a.fileName,a.lineNumber)};var B;a:{var Oa=p.navigator;if(Oa){var Pa=Oa.userAgent;if(Pa){B=Pa;break a}}B=""}var D=function(a){return-1!=B.indexOf(a)};var Qa=D("Opera")||D("OPR"),E=D("Trident")||D("MSIE"),Ra=D("Edge"),Sa=D("Gecko")&&!(-1!=B.toLowerCase().indexOf("webkit")&&!D("Edge"))&&!(D("Trident")||D("MSIE"))&&!D("Edge"),Ta=-1!=B.toLowerCase().indexOf("webkit")&&!D("Edge"),Ua=function(){var a=B;if(Sa)return/rv\:([^\);]+)(\)|;)/.exec(a);if(Ra)return/Edge\/([\d\.]+)/.exec(a);if(E)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Ta)return/WebKit\/(\S+)/.exec(a)},Va=function(){var a=p.document;return a?a.documentMode:void 0},Wa=function(){if(Qa&&
p.opera){var a;var b=p.opera.version;try{a=b()}catch(c){a=b}return a}a="";(b=Ua())&&(a=b?b[1]:"");return E&&(b=Va(),b>parseFloat(a))?String(b):a}(),Xa={},Ya=function(a){if(!Xa[a]){for(var b=0,c=ga(String(Wa)).split("."),d=ga(String(a)).split("."),e=Math.max(c.length,d.length),g=0;0==b&&g<e;g++){var f=c[g]||"",h=d[g]||"",l=RegExp("(\\d*)(\\D*)","g"),k=RegExp("(\\d*)(\\D*)","g");do{var m=l.exec(f)||["","",""],n=k.exec(h)||["","",""];if(0==m[0].length&&0==n[0].length)break;b=qa(0==m[1].length?0:parseInt(m[1],
10),0==n[1].length?0:parseInt(n[1],10))||qa(0==m[2].length,0==n[2].length)||qa(m[2],n[2])}while(0==b)}Xa[a]=0<=b}},Za=p.document,$a=Za&&E?Va()||("CSS1Compat"==Za.compatMode?parseInt(Wa,10):5):void 0;var ab;if(!(ab=!Sa&&!E)){var bb;if(bb=E)bb=9<=$a;ab=bb}ab||Sa&&Ya("1.9.1");E&&Ya("9");var cb=document,G=window;var db=function(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.call(null,a[c],c,a)},I=function(a){return!!a&&"function"==typeof a&&!!a.call},eb=function(a,b){if(!(2>arguments.length))for(var c=1,d=arguments.length;c<d;++c)a.push(arguments[c])},J=function(a,b){if(a.indexOf){var c=a.indexOf(b);return 0<c||0===c}for(c=0;c<a.length;c++)if(a[c]===b)return!0;return!1},fb=function(a){a.google_unique_id?++a.google_unique_id:a.google_unique_id=1},gb=function(a){a=a.google_unique_id;return"number"==
typeof a?a:0},hb=!!window.google_async_iframe_id,ib=/(^| )adsbygoogle($| )/,jb={"http://googleads.g.doubleclick.net":!0,"http://pagead2.googlesyndication.com":!0,"https://googleads.g.doubleclick.net":!0,"https://pagead2.googlesyndication.com":!0};var kb,y;kb=new function(){this.T="http"+("http:"==G.location.protocol?"":"s")+"://pagead2.googlesyndication.com/pagead/gen_204?id=";this.V=.01;this.da=Math.random()};y=new Ja(kb,"jserror",!0);var lb=function(a,b,c,d){Ma(y,a,c,d,void 0,b)},mb=y.u,nb=function(a,b,c){Ia(kb,a,b,"jserror"!=a,c,void 0)},ob=function(a){return z("aa:reactiveTag",a,void 0)};var pb=null,qb=function(){if(!pb){for(var a=window,b=a,c=0;a&&a!=a.parent;)if(a=a.parent,c++,ua(a))b=a;else break;pb=b}return pb};var K={Ia:{j:"453848100",i:"453848101"},va:{j:"828064124",i:"828064125"},ua:{j:"828064127",i:"828064128"},wa:{j:"828064170",i:"828064171"},ya:{j:"24819308",i:"24819309",la:"24819320"},xa:{j:"24819330",i:"24819331"},Aa:{j:"828064162",i:"828064163"},za:{j:"828064164",i:"828064165",oa:"828064166"},sa:{j:"86724438",i:"86724439"},ta:{j:"828064190",i:"828064191"},Ea:{j:"10573505",i:"10573506"},D:{j:"10573595",i:"10573596"},Ha:{j:"10573511",i:"10573512"},F:{j:"10573581",i:"10573582"},Fa:{j:"10573531",i:"10573532"},
v:{j:"10573561",i:"10573562"},Ga:{j:"10573551",i:"10573552"},Da:{j:"312815004",i:"312815005"},C:{j:"312815104",i:"312815105"},na:{j:"26835103",i:"26835104"},qa:{j:"35923720",i:"35923721"},G:{j:"35923760",i:"35923761"},Ja:{j:"27415001",i:"27415002"},H:{j:"20040000",i:"20040001"},ma:{j:"20040016",i:"20040017"},pa:{j:"828064202",i:"828064203"},ra:{j:"314159284",Ka:"314159285"},Ba:{j:"19188000",i:"19188001"},Ca:{j:"20040026",i:"20040027"}};var N=function(a){a=parseFloat(a);return isNaN(a)||1<a||0>a?0:a},rb=function(a,b){var c=parseInt(a,10);return isNaN(c)?b:c},sb=function(a,b){return/^true$/.test(a)?!0:/^false$/.test(a)?!1:b},tb=/^([\w-]+\.)*([\w-]{2,})(\:[0-9]+)?$/,ub=function(a,b){if(!a)return b;var c=a.match(tb);return c?c[0]:b};var vb=N("0.15"),wb=rb("101",-1),xb=rb("10",0),yb=N("0.05"),zb=N("0.001"),Ab=N("0.0"),Bb=N(""),Cb=N("0.001"),Db=sb("true",!0),Eb=N(""),Fb=N("0.001"),
Gb=N(""),Hb=N(""),Ib=N("0.1");var Jb=sb("false",!1),Kb=sb("true",!1),Mb=Kb||!Jb;var Nb=function(){return ub("","pagead2.googlesyndication.com")};var Ob=function(){},Qb=function(a,b,c){switch(typeof b){case "string":Pb(b,c);break;case "number":c.push(isFinite(b)&&!isNaN(b)?b:"null");break;case "boolean":c.push(b);break;case "undefined":c.push("null");break;case "object":if(null==b){c.push("null");break}if(b instanceof Array||void 0!=b.length&&b.splice){var d=b.length;c.push("[");for(var e="",g=0;g<d;g++)c.push(e),Qb(a,b[g],c),e=",";c.push("]");break}c.push("{");d="";for(e in b)b.hasOwnProperty(e)&&(g=b[e],"function"!=typeof g&&(c.push(d),Pb(e,
c),c.push(":"),Qb(a,g,c),d=","));c.push("}");break;case "function":break;default:throw Error("Unknown type: "+typeof b);}},Rb={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Sb=/\uffff/.test("\uffff")?/[\\\"\x00-\x1f\x7f-\uffff]/g:/[\\\"\x00-\x1f\x7f-\xff]/g,Pb=function(a,b){b.push('"');b.push(a.replace(Sb,function(a){if(a in Rb)return Rb[a];var b=a.charCodeAt(0),e="\\u";16>b?e+="000":256>b?e+="00":4096>b&&(e+="0");return Rb[a]=e+b.toString(16)}));
b.push('"')};var Tb=null,Ub=Sa||Ta||Qa||"function"==typeof p.atob;var Vb={google_ad_modifications:!0,google_analytics_domain_name:!0,google_analytics_uacct:!0},Wb=function(a){a.google_page_url&&(a.google_page_url=String(a.google_page_url));var b=[];db(a,function(a,d){if(null!=a){var e;try{var g=[];Qb(new Ob,a,g);e=g.join("")}catch(f){}e&&(e=e.replace(/\//g,"\\$&"),eb(b,d,"=",e,";"))}});return b.join("")};var Xb=function(a,b,c){lb("files::getSrc",mb,function(){if("https:"==G.location.protocol&&"http"==c)throw c="https",Error("Requested url "+a+b);});return[c,"://",a,b].join("")},Yb=function(a,b,c){c||(c=Mb?"https":"http");return Xb(a,b,c)};var Zb=function(a){var b=Ea(p);a=a.mods;if(isNaN(b)||!a)return!1;for(var c=0;c<a.length;c++){var d=a[c],e=d.max;if(b>=d.min&&b<=e)return!0}return!1};var $b={overlays:1,interstitials:2,vignettes:2,inserts:3,immersives:4};var O=function(a){a=a.document;return("CSS1Compat"==a.compatMode?a.documentElement:a.body)||{}};var ac=new function(){this.ba=new ra(100,199)};var P=function(a){return(a=a.google_ad_modifications)?a.loeids||[]:[]},bc=function(a,b,c){if(!a)return null;for(var d=0;d<a.length;++d)if((a[d].ad_slot||b)==b&&(a[d].ad_tag_origin||c)==c)return a[d];return null};var cc=function(a,b,c){return G.location&&G.location.hash=="#google_plle_"+c?c:w([b,c],a)},dc=function(a,b,c,d){a=a.google_active_plles=a.google_active_plles||[];return J(P(b),c)?(a.push(c),c):J(P(b),d)?(a.push(d),d):null};var ec=null;var fc=function(a){this.s=a;a.google_iframe_oncopy||(a.google_iframe_oncopy={handlers:{},upd:q(this.ia,this)});this.fa=a.google_iframe_oncopy},gc;var R="var i=this.id,s=window.google_iframe_oncopy,H=s&&s.handlers,h=H&&H[i],w=this.contentWindow,d;try{d=w.document}catch(e){}if(h&&d&&(!d.body||!d.body.firstChild)){if(h.call){setTimeout(h,0)}else if(h.match){try{h=s.upd(h,i)}catch(e){}w.location.replace(h)}}";
/[\x00&<>"']/.test(R)&&(-1!=R.indexOf("&")&&(R=R.replace(ha,"&amp;")),-1!=R.indexOf("<")&&(R=R.replace(ia,"&lt;")),-1!=R.indexOf(">")&&(R=R.replace(ja,"&gt;")),-1!=R.indexOf('"')&&(R=R.replace(ka,"&quot;")),-1!=R.indexOf("'")&&(R=R.replace(la,"&#39;")),-1!=R.indexOf("\x00")&&(R=R.replace(na,"&#0;")));gc=R;fc.prototype.set=function(a,b){this.fa.handlers[a]=b;this.s.addEventListener&&this.s.addEventListener("load",q(this.Y,this,a),!1)};
fc.prototype.Y=function(a){a=this.s.document.getElementById(a);try{var b=a.contentWindow.document;if(a.onload&&b&&(!b.body||!b.body.firstChild))a.onload()}catch(c){}};fc.prototype.ia=function(a,b){var c=hc("rx",a),d;a:{if(a&&(d=a.match("dt=([^&]+)"))&&2==d.length){d=d[1];break a}d=""}d=(new Date).getTime()-d;c=c.replace(/&dtd=(\d+|-?M)/,"&dtd="+(1E5<=d?"M":0<=d?d:"-M"));this.set(b,c);return c};
var hc=function(a,b){var c=new RegExp("\\b"+a+"=(\\d+)"),d=c.exec(b);d&&(b=b.replace(c,a+"="+(+d[1]+1||1)));return b};var ic=!1,jc=function(a,b,c){var d=["<iframe"],e;for(e in a)a.hasOwnProperty(e)&&eb(d,e+"="+a[e]);e="left:0;position:absolute;top:0;";ic&&(e=e+"width:"+b+"px;height:"+c+"px;");d.push('style="'+e+'"');d.push("></iframe>");a=a.id;b="border:none;height:"+c+"px;margin:0;padding:0;position:relative;visibility:visible;width:"+b+"px;background-color:transparent";return['<ins id="',a+"_expand",'" style="display:inline-table;',b,'"><ins id="',a+"_anchor",'" style="display:block;',b,'">',d.join(" "),"</ins></ins>"].join("")};var kc=function(a){if(!a)return"";(a=a.toLowerCase())&&"ca-"!=a.substring(0,3)&&(a="ca-"+a);return a};var lc={"120x90":!0,"160x90":!0,"180x90":!0,"200x90":!0,"468x15":!0,"728x15":!0};var mc="google_ad_client google_ad_format google_ad_height google_ad_width google_city google_country google_encoding google_language google_page_url".split(" "),nc=function(a){try{var b=a.top.google_ads_params_store;if(b)return b;b=a.top.google_ads_params_store={};if(b===a.top.google_ads_params_store)return b}catch(c){}return null};var oc,S=function(a){this.B=[];this.s=a||window;this.o=0;this.A=null;this.S=0},pc=function(a,b){this.Z=a;this.ka=b};S.prototype.enqueue=function(a,b){0!=this.o||0!=this.B.length||b&&b!=window?this.K(a,b):(this.o=2,this.O(new pc(a,window)))};S.prototype.K=function(a,b){this.B.push(new pc(a,b||this.s));qc(this)};S.prototype.$=function(a){this.o=1;if(a){var b=q(this.N,this,!0);this.A=this.s.setTimeout(z("sjr::timeout",b,void 0),a)}};
S.prototype.N=function(a){a&&++this.S;1==this.o&&(null!=this.A&&(this.s.clearTimeout(this.A),this.A=null),this.o=0);qc(this)};S.prototype.ea=function(){return!(!window||!Array)};S.prototype.ga=function(){return this.S};S.prototype.nq=S.prototype.enqueue;S.prototype.nqa=S.prototype.K;S.prototype.al=S.prototype.$;S.prototype.rl=S.prototype.N;S.prototype.sz=S.prototype.ea;S.prototype.tc=S.prototype.ga;var qc=function(a){var b=q(a.ha,a);a.s.setTimeout(z("sjr::tryrun",b,void 0),0)};
S.prototype.ha=function(){if(0==this.o&&this.B.length){var a=this.B.shift();this.o=2;var b=q(this.O,this,a);a.ka.setTimeout(z("sjr::run",b,void 0),0);qc(this)}};S.prototype.O=function(a){this.o=0;a.Z()};
var rc=function(a){try{return a.sz()}catch(b){return!1}},sc=function(a){return!!a&&("object"==typeof a||"function"==typeof a)&&rc(a)&&I(a.nq)&&I(a.nqa)&&I(a.al)&&I(a.rl)},tc=function(){if(oc&&rc(oc))return oc;var a=qb(),b=a.google_jobrunner;return sc(b)?oc=b:a.google_jobrunner=oc=new S(a)},uc=function(a,b){tc().nq(a,b)},vc=function(a,b){tc().nqa(a,b)};var T=function(a){this.name="TagError";this.message=a||"";Error.captureStackTrace?Error.captureStackTrace(this,T):this.stack=Error().stack||""};ea(T,Error);
var wc=hb?1==gb(G):!gb(G),xc=function(){var a=Kb?"https":"http",b=ta("script");return["<",b,' src="',Yb(Nb(),"/pagead/js/r20151110/r20151006/show_ads_impl.js",a),'"></',b,">"].join("")},yc=function(a,b,c,d){return function(){var e=!1;d&&tc().al(3E4);var g=a.document.getElementById(b);g&&!ua(g.contentWindow)&&3==a.google_top_js_status&&(a.google_top_js_status=
6);try{var f=a.document.getElementById(b).contentWindow;if(ua(f)){var h=a.document.getElementById(b).contentWindow,l=h.document;l.body&&l.body.firstChild||(l.open(),h.google_async_iframe_close=!0,l.write(c))}else{for(var k=a.document.getElementById(b).contentWindow,g=c,g=String(g),f=['"'],h=0;h<g.length;h++){var m=g.charAt(h),n=m.charCodeAt(0),l=h+1,F;if(!(F=oa[m])){var H;if(31<n&&127>n)H=m;else{var x=m;if(x in pa)H=pa[x];else if(x in oa)H=pa[x]=oa[x];else{var u=x,r=x.charCodeAt(0);if(31<r&&127>r)u=
x;else{if(256>r){if(u="\\x",16>r||256<r)u+="0"}else u="\\u",4096>r&&(u+="0");u+=r.toString(16).toUpperCase()}H=pa[x]=u}}F=H}f[l]=F}f.push('"');k.location.replace("javascript:"+f.join(""))}e=!0}catch(A){k=qb().google_jobrunner,sc(k)&&k.rl()}e&&(e=hc("google_async_rrc",c),(new fc(a)).set(b,yc(a,b,e,!1)))}},zc=function(a){var b=["<iframe"];db(a,function(a,d){null!=a&&b.push(" "+d+'="'+a+'"')});b.push("></iframe>");return b.join("")},Bc=function(a,b,c){Ac(a,b,c,function(a,b,g){for(var f=a.document,h=
b.id,l=0;!h||f.getElementById(h);)h="aswift_"+l++;b.id=h;b.name=h;var h=Number(g.google_ad_width),l=Number(g.google_ad_height),k=K.G;dc(g,a,k.j,k.i);ic=J(P(a),k.i);16==g.google_reactive_ad_format?(a=f.createElement("div"),a.innerHTML=jc(b,h,l),c.appendChild(a.firstChild)):c.innerHTML=jc(b,h,l);return b.id})},Ac=function(a,b,c,d){var e=ta("script"),g,f;a:{try{var h=a.top.google_pubvars_reuse_experiment;if("undefined"!==typeof h){f=h;break a}h=w(["C","E"],Eb)||null;a.top.google_pubvars_reuse_experiment=
h;if(a.top.google_pubvars_reuse_experiment===h){f=h;break a}}catch(ma){}f=null}if("E"===f){g=null!=b.google_ad_client;f=null!=b.google_ad_width;var h=null!=b.google_ad_height,l=nc(a);if(l){for(var k=0;k<mc.length;k++){var m=mc[k];null!=b[m]&&(l[m]=b[m])}if(l=nc(a)){var k=l.google_ad_width,m=l.google_ad_height,n=l.google_ad_format;k&&m&&n&&(n=(n=n&&n.match(/(\d+)x(\d+)/))?{width:n[1],height:n[2]}:null,!n||n.width==k&&n.height==m||delete l.google_ad_format)}}if(l=nc(a))for(k=0;k<mc.length;k++)m=mc[k],
null==b[m]&&null!=l[m]&&(b[m]=l[m]);l=null!=b.google_ad_client;k=null!=b.google_ad_width;m=null!=b.google_ad_height;g=[g?"c2":l?"c1":"c0",f?"w2":k?"w1":"w0",h?"h2":m?"h1":"h0"].join()}f={};h=b.google_ad_height;f.width='"'+b.google_ad_width+'"';f.height='"'+h+'"';f.frameborder='"0"';f.marginwidth='"0"';f.marginheight='"0"';f.vspace='"0"';f.hspace='"0"';f.allowtransparency='"true"';f.scrolling='"no"';f.allowfullscreen='"true"';f.onload='"'+gc+'"';d=d(a,f,b);h=b.google_ad_output;f=b.google_ad_format;
f||"html"!=h&&null!=h||(f=b.google_ad_width+"x"+b.google_ad_height,b.google_ad_format_suffix&&(f+=b.google_ad_format_suffix));h=!b.google_ad_slot||b.google_override_format||!lc[b.google_ad_width+"x"+b.google_ad_height]&&"aa"==b.google_loader_used;f=f&&h?f.toLowerCase():"";b.google_ad_format=f;f=[b.google_ad_slot,b.google_ad_format,b.google_ad_type,b.google_ad_width,b.google_ad_height];h=[];l=0;for(k=c;k&&25>l;k=k.parentNode,++l)h.push(9!=k.nodeType&&k.id||"");(h=h.join())&&f.push(h);b.google_ad_unit_key=
za(f.join(":")).toString();f=a.google_adk2_experiment=a.google_adk2_experiment||w(["C","E"],Cb)||"N";if("E"==f){f=[];for(h=0;c&&25>h;++h){l="";l=(l=9!=c.nodeType&&c.id)?"/"+l:"";a:{if(c&&c.nodeName&&c.parentElement)for(var k=c.nodeName.toString().toLowerCase(),m=c.parentElement.childNodes,F=n=0;F<m.length;++F){var H=m[F];if(H.nodeName&&H.nodeName.toString().toLowerCase()==k){if(c==H){k="."+n;break a}++n}}k=""}f.push((c.nodeName&&c.nodeName.toString().toLowerCase())+l+k);c=c.parentElement}c=f.join()+
":";f=a;h=[];if(f)try{for(var x=f.parent,l=0;x&&x!=f&&25>l;++l){for(var u=x.frames,k=0;k<u.length;++k)if(f==u[k]){h.push(k);break}f=x;x=f.parent}}catch(ma){}b.google_ad_unit_key_2=za(c+h.join()).toString()}else"C"==f&&(b.google_ad_unit_key_2="ctrl");x=Wb(b);u=null;c=w(["C","E"],Fb);if("E"==c){a:{try{if(window.JSON&&window.JSON.stringify&&window.encodeURIComponent){var r=encodeURIComponent(window.JSON.stringify(b)),A;if(Ub)A=p.btoa(r);else{f=[];for(l=h=0;l<r.length;l++){for(var Q=r.charCodeAt(l);255<
Q;)f[h++]=Q&255,Q>>=8;f[h++]=Q}if(!Tb)for(Tb={},r=0;65>r;r++)Tb[r]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(r);r=Tb;Q=[];for(h=0;h<f.length;h+=3){var L=f[h],U=h+1<f.length,V=U?f[h+1]:0,aa=h+2<f.length,Lb=aa?f[h+2]:0,l=L>>2,k=(L&3)<<4|V>>4,m=(V&15)<<2|Lb>>6,n=Lb&63;aa||(n=64,U||(m=64));Q.push(r[l],r[k],r[m],r[n])}A=Q.join("")}u=A;break a}nb("sblob",{json:window.JSON?1:0,eURI:window.encodeURIComponent?1:0})}catch(ma){y.u("sblob",ma,void 0,void 0)}u=""}u||(u="{X}")}else"C"==
c&&(u="{C}");var C;b=b.google_ad_client;if(A=wc){if(!ec)b:{L=[p.top];A=[];for(U=0;V=L[U++];){A.push(V);try{if(V.frames)for(var M=V.frames.length,aa=0;aa<M&&1024>L.length;++aa)L.push(V.frames[aa])}catch(ma){}}for(M=0;M<A.length;M++)try{if(C=A[M].frames.google_esf){ec=C;break b}}catch(ma){}ec=null}A=!ec}A?(C={style:"display:none"},C["data-ad-client"]=kc(b),C.id="google_esf",C.name="google_esf",C.src=Yb(ub("","googleads.g.doubleclick.net"),"/pagead/html/r20151110/r20151006/zrt_lookup.html"),
C=zc(C)):C="";M=fa;b=(new Date).getTime();A=a.google_top_experiment;if(L=a.google_async_for_oa_experiment)a.google_async_for_oa_experiment=void 0;U=a.google_always_use_delayed_impressions_experiment;C=["<!doctype html><html><body>",C,"<",e,">",x,"google_show_ads_impl=true;google_unique_id=",gb(a),';google_async_iframe_id="',d,'";google_start_time=',M,";",c?'google_pub_vars = "'+u+'";':"",g?'google_pubvars_reuse_experiment_result = "'+g+'";':"",A?'google_top_experiment="'+A+'";':"",L?'google_async_for_oa_experiment="'+
L+'";':"",U?'google_always_use_delayed_impressions_experiment="'+U+'";':"","google_bpp=",b>M?b-M:1,";google_async_rrc=0;google_iframe_start_time=new Date().getTime();</",e,">",xc(),"</body></html>"].join("");(a.document.getElementById(d)?uc:vc)(yc(a,d,C,!0))},Cc=Math.floor(1E6*Math.random()),Dc=function(a){var b;try{b={};for(var c=a.data.split("\n"),d=0;d<c.length;d++){var e=c[d].indexOf("=");-1!=e&&(b[c[d].substr(0,e)]=c[d].substr(e+1))}}catch(g){}c=b[3];if(b[1]==Cc&&(window.google_top_js_status=
4,a.source==top&&0==c.indexOf(a.origin)&&(window.google_top_values=b,window.google_top_js_status=5),window.google_top_js_callbacks)){for(a=0;a<window.google_top_js_callbacks.length;a++)window.google_top_js_callbacks[a]();window.google_top_js_callbacks.length=0}},Ec=function(a,b){var c=navigator;if(Db&&a&&b&&c){var d=a.document,c=d.createElement("script"),e=kc(b);c.async=!0;c.type="text/javascript";c.src=Yb("pagead2.googlesyndication.com","/pub-config/"+e+".js");d=d.getElementsByTagName("script")[0];
d.parentNode.insertBefore(c,d)}};var W=function(a,b){this.M=a;this.L=b};W.prototype.minWidth=function(){return this.M};W.prototype.height=function(){return this.L};W.prototype.w=function(a){return 300<a&&300<this.L?this.M:1200<a?1200:Math.round(a)};var Fc={rectangle:1,horizontal:2,vertical:4,autorelaxed:1},X=function(a,b,c){W.call(this,a,b);this.ca=c};ea(X,W);var Gc=function(a){return function(b){return!!(b.ca&a)}},Hc=[new X(970,90,2),new X(728,90,2),new X(468,60,2),new X(336,280,1),new X(320,100,2),new X(320,50,2),new X(300,600,4),new X(300,250,1),new X(250,250,1),new X(234,60,2),new X(200,200,1),new X(180,150,1),new X(160,600,4),new X(125,125,1),new X(120,600,4),new X(120,240,4)];var Ic=function(a,b){for(var c=["width","height"],d=0;d<c.length;d++){var e="google_ad_"+c[d];if(!b.hasOwnProperty(e)){var g;g=Da(a[c[d]]);g=null===g?null:Math.round(g);null!=g&&(b[e]=g)}}},Jc=function(a,b){try{var c=b.document.documentElement.getBoundingClientRect(),d=a.getBoundingClientRect();return{x:d.left-c.left,y:d.top-c.top}}catch(e){return null}},Kc=function(a){var b=0,c;for(c in Fc)-1!=a.indexOf(c)&&(b|=Fc[c]);return b};var Lc=function(a){return function(b){return b.minWidth()<=a}},Nc=function(a,b,c){var d=a&&Mc(c,b);return function(a){return!(d&&250<=a.height())}},Mc=function(a,b){var c=Math.min(O(b).clientHeight,16*O(b).clientWidth/9),d=Jc(a,b);return(d?d.y:0)<c-100},Pc=function(a,b){var c=b,d=Infinity;do{var e=Oc(c,a,"height");e&&(d=Math.min(d,e));(e=Oc(c,a,"maxHeight"))&&(d=Math.min(d,e))}while((c=c.parentElement)&&"HTML"!=c.tagName);return d},Oc=function(a,b,c){if(a.style){var d=Da(a.style[c]);if(d)return d}if(a=
wa(a,b))if(d=Da(a[c]))return d;return null};var Qc=function(a){return function(b){for(var c=a.length-1;0<=c;--c)if(!a[c](b))return!1;return!0}},Rc=function(a,b,c){for(var d=a.length,e=null,g=0;g<d;++g){var f=a[g];if(b(f)){if(!c||c(f))return f;null===e&&(e=f)}}return e};var Tc=function(a,b,c,d){var e=Hc.slice(0);if(J(P(c),K.F.i))for(var g=Math.random,f=e.length-1;0<f;f--){var h=Math.floor(g()*(f+1)),l=e[f];e[f]=e[h];e[h]=l}g=488>O(c).clientWidth;b=[Lc(a),Sc(g),Nc(g,c,d),Gc(b)];e=Rc(e,Qc(b));if(!e)throw new T("adsbygoogle.push() error: No slot size for availableWidth="+a);return e},Sc=function(a){return function(b){return!(320==b.minWidth()&&(a&&50==b.height()||!a&&100==b.height()))}};var Y=function(a,b){W.call(this,a,b)};ea(Y,W);Y.prototype.w=function(a){return Math.min(1200,Math.round(a))};var Uc=[new Y(468,300),new Y(414,828),new Y(384,768),new Y(375,750),new Y(360,720),new Y(320,640),new Y(120,600)],Vc=[new Y(468,350),new Y(414,828),new Y(384,768),new Y(375,750),new Y(360,720),new Y(320,640),new Y(120,600)],Wc=function(a,b){var c=Rc(a,Lc(b));if(!c)throw new T("adsbygoogle.push() error: No autorelaxed size for width="+b+"px");return c};var Yc=function(){return!Xc()&&(D("iPod")||D("iPhone")||D("Android")||D("IEMobile"))},Xc=function(){return D("iPad")||D("Android")&&!D("Mobile")||D("Silk")};var Zc=[{l:[3,0,0],m:[6,12,14,0,1,3,2,4,13,5,7,8,9,10,11,15]},{l:[3,0,1],m:[6,15,0,1,2,3,4,13,5,7,8,9,10,11,12,14]},{l:[3,0,2],m:[6,15,0,1,2,3,4,7,8,9,10,13,5,11,12,14]},{l:[3,1,0],m:[6,12,15,0,1,3,4,13,2,5,7,8,9,10,11,14]},{l:[3,1,1],m:[6,15,0,1,7,8,11,2,3,4,5,9,10,12,13,14]},{l:[3,1,2],m:[6,15,0,1,2,3,4,7,9,11,5,8,10,12,13,14]},{l:[3,2,0],m:[0,6,12,15,1,2,3,4,13,5,7,8,9,10,11,14]},{l:[3,2,1],m:[0,6,12,14,1,2,3,4,13,5,7,8,9,10,11,15]},{l:[3,2,2],m:[0,15,1,2,3,4,13,9,5,6,7,8,10,11,12,14]},{l:[2,0,
0],m:[6,15,0,1,3,2,7,8,10,13,9,4,5,11,12,14]},{l:[2,0,1],m:[6,15,0,1,2,3,7,8,4,10,9,13,5,11,12,14]},{l:[2,0,2],m:[0,15,1,2,3,4,7,8,13,5,6,9,10,11,12,14]},{l:[4,0,0],m:[6,12,14,15,0,1,7,2,8,11,9,3,4,5,10,13]},{l:[4,0,1],m:[6,12,14,0,1,2,3,4,7,8,11,13,5,9,10,15]},{l:[4,0,2],m:[6,15,0,1,2,3,5,7,8,13,9,4,10,11,12,14]}],$c=function(a,b,c){return"auto"==c?(b/=Math.min(1200,O(a).clientWidth),.6<b&&!(488>O(a).clientWidth)?2:.25>=b?4:3):Kc(c)},ad=function(a,b){var c=Pc(a,b);return function(a){return a.height()<=
c}},cd=function(a,b,c,d,e){var g;a:{var f;f=Yc()?2:Xc()?4:3;g=Jc(d,c);f=[f,g&&3==f?83>g.x?0:265>g.x?1:2:0,bd(f,g)];for(g=0;g<Zc.length;++g){var h=Zc[g],l;b:if(l=h.l,f&&"number"==typeof f.length&&l&&"number"==typeof l.length&&f.length==l.length){for(var k=f.length,m=0;m<k;m++)if(f[m]!==l[m]){l=!1;break b}l=!0}else l=!1;if(l){g=h.m;break a}}throw Error("No format for "+f);}f=[];for(h=0;h<g.length;++h)f.push(Hc[g[h]]);g=488>O(c).clientWidth;a=[ad(c,d),Lc(a),Nc(g,c,d)];c=[];(e?c:a).push(Gc(b));return Rc(f,
Qc(a),Qc(c))},bd=function(a,b){if(!b)return 0;var c=b.y;switch(a){case 2:return 285>c?0:1396>c?1:2;case 4:return 275>c?0:1057>c?1:2;default:return 216>c?0:838>c?1:2}};var Z=function(a,b){W.call(this,a,b)};ea(Z,W);Z.prototype.w=function(){return this.minWidth()};var dd=[new Z(728,15),new Z(468,15),new Z(200,90),new Z(180,90),new Z(160,90),new Z(120,90)];var hd=function(){var a=window;if(void 0===a.google_dre){var b="";a.postMessage&&va(a)&&Yc()&&(b=w(["20050000","20050001"],Gb))&&(a.google_ad_modifications=a.google_ad_modifications||{},a.google_ad_modifications.eids=a.google_ad_modifications.eids||[],a.google_ad_modifications.eids.push(b));a.google_dre=b;"20050001"==a.google_dre&&(Fa(a.top,"message",z("dr::mh",t(ed,a),t(fd,a)),void 0),a.setTimeout(z("dr::to",t(gd,a,!0),t(fd,a)),2E3),a.google_drc=0,a.google_q=a.google_q||{},a.google_q.tags=a.google_q.tags||
[])}},id=function(a){"20050001"==p.google_dre&&(a.params=a.params||{},a.params.google_delay_requests_delay=0,a.params.google_delay_requests_count=p.google_drc++,a.U=v())},jd=function(a){if("20050001"==p.google_dre){var b=v()-a.U;a.params.google_delay_requests_delay=b}},ed=function(a,b){b&&"afb"==b.data&&jb[b.origin]&&gd(a,!1)},gd=function(a,b){if(a.google_q&&a.google_q.tags){var c=a.google_q.tags;fd(a);c.length&&(b&&nb("drt",{Ma:c.length,duration:2E3},1),kd(c))}};var ld=function(a){return ib.test(a.className)&&"done"!=a.getAttribute("data-adsbygoogle-status")},nd=function(a,b){var c=window;a.setAttribute("data-adsbygoogle-status","done");md(a,b,c)},md=function(a,b,c){od(a,b,c);if(!pd(a,b,c)){if(b.google_reactive_ads_config){if(qd)throw new T("adsbygoogle.push() error: Only one 'enable_page_level_ads' allowed per page.");qd=!0}else fb(c);rd||(rd=!0,Ec(c,b.google_ad_client));db(Vb,function(a,d){b[d]=b[d]||c[d]});b.google_loader_used="aa";var d=b.google_ad_output;
if(d&&"html"!=d)throw new T("adsbygoogle.push() error: No support for google_ad_output="+d);lb("aa::load",mb,function(){Bc(c,b,a)})}},pd=function(a,b,c){var d=b.google_reactive_ads_config;if(d)var e=d.page_level_pubvars,g=(ba(e)?e:{}).google_tag_origin;var f=b.google_ad_slot,e=c.google_ad_modifications;!e||bc(e.ad_whitelist,f,g||b.google_tag_origin)?e=null:(g=e.space_collapsing||"none",e=(f=bc(e.ad_blacklist,f))?{I:!0,R:f.space_collapsing||g}:e.remove_ads_by_default?{I:!0,R:g}:null);return e&&e.I&&
"on"!=b.google_adtest?("slot"==e.R&&(null!==Ca(a.getAttribute("width"))&&a.setAttribute("width",0),null!==Ca(a.getAttribute("height"))&&a.setAttribute("height",0),a.style.width="0px",a.style.height="0px"),!0):!(e=wa(a,c))||"none"!=e.display||"on"==b.google_adtest||0<b.google_reactive_ad_format||d?!1:(c.document.createComment&&a.appendChild(c.document.createComment("No ad requested because of display:none on the adsbygoogle tag")),!0)},sd=function(a,b){var c;try{c=a.getBoundingClientRect()}catch(e){}if(!c||
0==c.left&&0==c.right&&0==c.width&&0==c.height)return!1;var d=wa(a,b);if(!d)return!1;c=Da(d.width);d=Da(d.height);return null==c||null==d||lc[c+"x"+d]?!1:!0},od=function(a,b,c){for(var d=a.attributes,e=d.length,g=0;g<e;g++){var f=d[g];if(/data-/.test(f.name)){var h=f.name.replace("data","google").replace(/-/g,"_");if(!b.hasOwnProperty(h)){var f=f.value,l={google_reactive_ad_format:rb,google_allow_expandable_ads:sb},f=l.hasOwnProperty(h)?l[h](f,null):f;null===f||(b[h]=f)}}}if(b.google_enable_content_recommendations&&
1==b.google_reactive_ad_format)b.google_ad_width=O(c).clientWidth,b.google_ad_height=50,a.style.display="none";else if(1==b.google_reactive_ad_format)b.google_ad_width=320,b.google_ad_height=50,a.style.display="none";else if(8==b.google_reactive_ad_format)b.google_ad_width=O(c).clientWidth||0,b.google_ad_height=O(c).clientHeight||0,a.style.display="none";else if(9==b.google_reactive_ad_format)b.google_ad_width=O(c).clientWidth||0,b.google_ad_height=O(c).clientHeight||0,a.style.display="none";else{d=
b.google_ad_format;"autorelaxed"==d?(d=K.C,dc(b,c,d.j,d.i),d=J(P(c),K.C.i)?3:2):"auto"==d||/^((^|,) *(horizontal|vertical|rectangle) *)+$/.test(d)?(d=K.D,dc(b,c,d.j,d.i),d=J(P(c),K.D.i)||J(P(c),K.v.i)?5:1):d="link"==d?4:void 0;if(e=!d)sd(a,c)?(e=K.v,dc(b,c,e.j,e.i)!==e.i?e=!1:(b.google_ad_format="auto",e=!0)):e=!1;e&&(d=5);if(d){var k=a.offsetWidth;a:{var m=b.google_ad_format;switch(d){default:case 1:var n="auto"==m?.25>=k/Math.min(1200,O(c).clientWidth)?4:3:Kc(m);b&&(b.google_responsive_formats=
n,m=K.F,dc(b,c,m.j,m.i));c=Tc(k,n,c,a);break a;case 2:c=Wc(Uc,k);break a;case 3:c=Wc(Vc,k);break a;case 5:m=$c(c,k,m);b.google_responsive_formats=m;var F=J(P(c),K.v.i);b:{d=a;do if((e=wa(d,c))&&"fixed"==e.position){d=!1;break b}while(d=d.parentElement);d=!0}d&&(n=cd(k,m,c,a,F));c=n||Tc(k,m,c,a);break a;case 4:c=Rc(dd,Lc(k));if(!c)throw new T("adsbygoogle.push() error: No link unit size for width="+k+"px");b.google_ad_format_suffix="_0ads_al";b.google_override_format=1}}b.google_ad_width=c.w(k);b.google_ad_height=
c.height();a.style.height=c.height()+"px";b.google_ad_resizable=!0;delete b.google_ad_format;b.google_loader_features_used=128}else{n=sd(a,c)?(n=w(["LC","LE"],Bb))?"LE"==(b.google_responsive_override_logs_experiment=n):!1:!1;if(n)try{m=a.offsetWidth,F=cd(m,$c(c,m,"auto"),c,a,!0),k=new sa(F.w(m),F.height()),b.google_ember_w=k.width,b.google_ember_h=k.height}catch(H){b.google_ember_w=b.google_ember_h="e"}!Ba.test(b.google_ad_width)&&!Aa.test(a.style.width)||!Ba.test(b.google_ad_height)&&!Aa.test(a.style.height)?
(c=wa(a,c),a.style.width=c.width,a.style.height=c.height,Ic(c,b),b.google_ad_width||(b.google_ad_width=a.offsetWidth),b.google_ad_height||(b.google_ad_height=a.offsetHeight),b.google_loader_features_used=256):(Ic(a.style,b),b.google_ad_output&&"html"!=b.google_ad_output||300!=b.google_ad_width||250!=b.google_ad_height||(c=a.style.width,a.style.width="100%",n=a.offsetWidth,a.style.width=c,b.google_available_width=n))}}},td=function(a){for(var b=document.getElementsByTagName("ins"),c=0,d=b[c];c<b.length;d=
b[++c]){var e=d;if(ld(e)&&"reserved"!=e.getAttribute("data-adsbygoogle-status")&&(!a||d.id==a))return d}return null},qd=!1,rd=!1,wd=function(a){if(Yc()&&!p.google_q){p.google_q={};var b;a:{try{b=p.JSON.parse(p.localStorage.getItem("google_ama_config")||"");break a}catch(g){}b=null}if(b)if(b.exp>v()&&Zb(b)){p.google_q.tags=[];var c=document.createElement("script"),d=p.document.getElementsByTagName("script")[0];d.parentNode.insertBefore(c,d);d=v();c.onload=z("aa::amarn",t(ud,p,d,a),t(fd,p));var e=z("aa::amaabt",
t(vd,p,c,d),t(fd,p));p.setTimeout(function(){p.setTimeout(e,100)},0);c.src=Yb(Nb(),b.lib)}else try{p.localStorage.removeItem("google_ama_config")}catch(g){}}},ud=function(a,b,c){a.google_q.tags&&(b=v()-b,nb("ama",{stg:!0,t:b},.01),(b=a.google_amar)&&I(b)&&lb("aa::amar",mb,t(b,a,c)),xd(a))},vd=function(a,b,c){a.google_q.tags&&(b.onload=function(){var a=v()-c;nb("ama",{stg:!1,t:a},.01)},xd(a))},xd=function(a){var b=a.google_q.tags;a.google_q.tags=void 0;kd(b)},fd=function(a){a.google_q.tags=void 0},
kd=function(a){if(a&&a.shift)try{for(var b,c=20;(b=a.shift())&&0<c;)yd(b),--c}catch(d){throw window.setTimeout(zd,0),d;}},Ad=function(a,b){var c={};db($b,function(b,d){a.hasOwnProperty(d)&&(c[d]=a[d])});ba(a.enable_page_level_ads)&&(c.page_level_pubvars=a.enable_page_level_ads);var d=document.createElement("ins");d.className="adsbygoogle";d.style.display="none";b?cb.body.appendChild(d):cb.documentElement.appendChild(d);nd(d,{google_reactive_ads_config:c,google_ad_client:a.google_ad_client})},Bd=function(a){if(!va(window))throw new T("adsbygoogle.push() error: Page-level tag does not work inside iframes.");
var b=J(P(G),K.H.i),c=!b;cb.body||b?Ad(a,c):Fa(cb,"DOMContentLoaded",ob(function(){Ad(a,c)}))},Cd=function(a,b,c,d){if(0==b.message.indexOf("TagError")){var e={};Na(y,e,d);e.context=a;e.msg=b.message.substring(0,512);a=p.document;e.url=a.URL.substring(0,512);e.ref=a.referrer.substring(0,512);Ia(kb,"puberror",e,!0,c||.01);return!1}return y.u(a,b,c,d)},Dd=function(a,b,c,d){return 0==b.message.indexOf("TagError")?!1:y.u(a,b,c,d)},yd=function(a){var b={};lb("aa::hqe",Cd,function(){Ed(a,b)},function(c){c.client=
c.client||b.google_ad_client||a.google_ad_client;c.slotname=c.slotname||b.google_ad_slot;c.tag_origin=c.tag_origin||b.google_tag_origin})},Ed=function(a,b){fa=(new Date).getTime();if(p.google_q&&p.google_q.tags)id(a),p.google_q.tags.push(a);else{var c;a:{if(a.enable_page_level_ads){if("string"==typeof a.google_ad_client){c=!0;break a}throw new T("adsbygoogle.push() error: 'google_ad_client' is missing from the tag config.");}c=!1}if(c)wd(a.google_ad_client),Bd(a);else{p.google_q?jd(a):(hd(),id(a));
c=a.element;var d=a.params;d&&db(d,function(a,c){b[c]=a});if(c){if(!ld(c)&&(c=c.id?td(c.id):null,!c))throw new T("adsbygoogle.push() error: 'element' has already been filled.");if(!("innerHTML"in c))throw new T("adsbygoogle.push() error: 'element' is not a good DOM element.");}else if(c=td(),!c)throw new T("adsbygoogle.push() error: All ins elements in the DOM with class=adsbygoogle already have ads in them.");nd(c,b)}}},zd=function(){lb("aa::main",Dd,Fd)},Fd=function(){var a=G.google_ad_modifications=
G.google_ad_modifications||{};if(!a.plle){a.plle=!0;a=a.loeids=a.loeids||[];ga("")&&a.push("");var b=K.D,c=b.i;if(G.location&&G.location.hash=="#google_plle_"+c)b=c;else{var b=[b.j,c],c=new ra(wb,wb+xb-1),d;(d=0>=xb||xb%b.length)||(d=ac.ba,d=!(d.start<=c.start&&d.end>=c.end));d?b=null:(d=Ea(G),b=null!==d&&c.start<=d&&c.end>=d?b[(d-wb)%b.length]:null)}b&&a.push(b);b=K.C;(b=cc(yb,b.j,b.i))&&a.push(b);b=K.F;(b=cc(zb,b.j,b.i))&&a.push(b);
b=K.v;(b=cc(Ab,b.j,b.i))&&a.push(b);b=K.G;(b=cc(Hb,b.j,b.i))&&a.push(b);cb.body||(b=K.H,(b=cc(Ib,b.j,b.i))&&a.push(b))}if(!window.google_top_experiment&&!window.google_top_js_status)if(a=window,2!==(a.top==a?0:ua(a.top)?1:2))window.google_top_js_status=0;else if(top.postMessage){var e;try{e=G.top.frames.google_top_static_frame?!0:!1}catch(f){e=!1}if(e){if(window.google_top_experiment=w(["jp_c","jp_zl","jp_wfpmr","jp_zlt","jp_wnt"],vb),"jp_c"!==window.google_top_experiment){Fa(window,"message",Dc);
window.google_top_js_status=3;e={0:"google_loc_request",1:Cc};var a=[],g;for(g in e)a.push(g+"="+e[g]);top.postMessage(a.join("\n"),"*")}}else window.google_top_js_status=2}else window.google_top_js_status=1;g=window.adsbygoogle;kd(g);if(!g||!g.loaded){window.adsbygoogle={push:yd,loaded:!0};g&&Gd(g.onload);try{Object.defineProperty(window.adsbygoogle,"onload",{set:Gd})}catch(f){}}},Gd=function(a){I(a)&&window.setTimeout(a,0)};zd();}).call(this);