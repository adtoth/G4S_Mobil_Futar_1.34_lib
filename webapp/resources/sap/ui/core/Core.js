/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/Device','sap/ui/Global','sap/ui/base/BindingParser','sap/ui/base/DataType','sap/ui/base/EventProvider','sap/ui/base/Interface','sap/ui/base/Object','sap/ui/base/ManagedObject','./Component','./Configuration','./Control','./Element','./ElementMetadata','./FocusHandler','./RenderManager','./ResizeHandler','./ThemeCheck','./UIArea','./message/MessageManager','jquery.sap.act','jquery.sap.dom','jquery.sap.events','jquery.sap.mobile','jquery.sap.properties','jquery.sap.resources','jquery.sap.script'],function(q,D,G,B,a,E,I,c,M,C,d,g,h,k,F,R,r,T,U,s){"use strict";function t(o,m){var b=sap.ui.require(m);return typeof b==='function'&&(o instanceof b);}var L={};var u={};var _;var w=c.extend("sap.ui.core.Core",{constructor:function(){if(sap.ui.getCore&&sap.ui.getCore()){return sap.ui.getCore();}var b=this,l=q.sap.log,e="sap.ui.core.Core";c.call(this);_=new E();["attachEvent","detachEvent","getEventingParent"].forEach(function(v){w.prototype[v]=_[v].bind(_);});this.bBooted=false;this.bInitialized=false;this.bDomReady=false;this.aPlugins=[];this.mLibraries={};this.mResourceBundles={};this.mUIAreas={};this.oModels={};this.oEventBus=null;this.mElements={};this.mObjects={"component":{},"template":{}};this.oRootComponent=null;this.aInitListeners=[];this.bInitLegacyLib=false;this.aPrerenderingTasks=[];l.info("Creating Core",null,e);q.sap.measure.start("coreComplete","Core.js - complete");q.sap.measure.start("coreBoot","Core.js - boot");q.sap.measure.start("coreInit","Core.js - init");this.oConfiguration=new d(this);var f=this.oConfiguration["frameOptionsConfig"]||{};f.mode=this.oConfiguration.getFrameOptions();f.whitelistService=this.oConfiguration.getWhitelistService();this.oFrameOptions=new q.sap.FrameOptions(f);if(this.oConfiguration["bindingSyntax"]==="complex"){M.bindingParser=B.complexParser;}if(this.oConfiguration["xx-designMode"]==true){B._keepBindingStrings=true;}this._grantFriendAccess();var m=this.oConfiguration.modules;if(this.oConfiguration.getDebug()){m.unshift("sap.ui.debug.DebugEnv");}var i=m.indexOf("sap.ui.core.library");if(i!=0){if(i>0){m.splice(i,1);}m.unshift("sap.ui.core.library");}if(this.oConfiguration["xx-lesssupport"]&&m.indexOf("sap.ui.core.plugin.LessSupport")==-1){l.info("Including LessSupport into declared modules");m.push("sap.ui.core.plugin.LessSupport");}var p=this.oConfiguration.preload;if(window["sap-ui-debug"]===true){p="";}if(p==="auto"){p=(window["sap-ui-optimized"]&&!this.oConfiguration['xx-loadAllMode'])?"sync":"";}this.oConfiguration.preload=p;this.oConfiguration['xx-libraryPreloadFiles'].forEach(function(v){var h1=String(v).trim().split(/\s*:\s*/),i1=h1[0],j1=h1[1];if(h1.length===1){j1=i1;i1='';}if(/^(?:none|js|json|both)$/.test(j1)){x[i1]=j1;}});l.info("Declared modules: "+m,e);this._setupThemes();this._setupRTL();var $=q("html");this._setupBrowser($);this._setupOS($);this._setupLang($);this._setupAnimation($);sap.ui.getCore=q.sap.getter(this.getInterface());this.oRenderManager=new R();var o=q.sap.syncPoint("UI5 Document Ready",function(v,h1){b.handleLoad();});var j=o.startTask("document.ready");var n=o.startTask("preload and boot");q(function(){l.trace("document is ready");o.finishTask(j);});var O=q.sap.syncPoint("UI5 Core Preloads and Bootstrap Script",function(v,h1){l.trace("Core loaded: open="+v+", failures="+h1);b._boot();o.finishTask(n);q.sap.measure.end("coreBoot");});var P=O.startTask("create sp2 tasks task");if(this.oConfiguration["versionedLibCss"]){var V=O.startTask("load version info");var Q=function(v){if(v){l.trace("Loaded \"sap-ui-version.json\".");}else{l.error("Could not load \"sap-ui-version.json\".");}O.finishTask(V);};var W=p==="async";var X=sap.ui.getVersionInfo({async:W,failOnError:false});if(X instanceof Promise){X.then(Q,function(v){l.error("Unexpected error when loading \"sap-ui-version.json\": "+v);O.finishTask(V);});}else{Q(X);}}var Y=this.oConfiguration["xx-bootTask"];if(Y){var Z=O.startTask("custom boot task");Y(function(v){O.finishTask(Z,typeof v==="undefined"||v===true);});}this._polyfillFlexbox();var a1=O.startTask("bootstrap script");this.boot=function(){if(this.bBooted){return;}this.bBooted=true;O.finishTask(a1);};if(p==="sync"||p==="async"){var b1=p!=="sync";var c1=m.reduce(function(v,h1){var i1=h1.search(/\.library$/);if(i1>=0){v.push(h1.slice(0,i1));}return v;},[]);var d1=this.loadLibraries(c1,{async:b1,preloadOnly:true});if(b1){var e1=O.startTask("preload bootstrap libraries");d1.then(function(){O.finishTask(e1);},function(){O.finishTask(e1,false);});}}var f1=this.oConfiguration.getAppCacheBuster();if(f1&&f1.length>0){var g1=sap.ui.requireSync('sap/ui/core/AppCacheBuster');g1.boot(O);}O.finishTask(P);},metadata:{publicMethods:["boot","isInitialized","isThemeApplied","attachInitEvent","attachInit","getRenderManager","createRenderManager","getConfiguration","setRoot","createUIArea","getUIArea","getUIDirty","getElementById","getCurrentFocusedControlId","getControl","getComponent","getTemplate","lock","unlock","isLocked","attachEvent","detachEvent","applyChanges","getEventBus","applyTheme","setThemeRoot","attachThemeChanged","detachThemeChanged","getStaticAreaRef","attachThemeScopingChanged","detachThemeScopingChanged","fireThemeScopingChanged","registerPlugin","unregisterPlugin","getLibraryResourceBundle","byId","getLoadedLibraries","loadLibrary","loadLibraries","initLibrary","includeLibraryTheme","setModel","getModel","hasModel","isMobile","attachControlEvent","detachControlEvent","attachIntervalTimer","detachIntervalTimer","attachParseError","detachParseError","fireParseError","attachValidationError","detachValidationError","fireValidationError","attachFormatError","detachFormatError","fireFormatError","attachValidationSuccess","detachValidationSuccess","fireValidationSuccess","attachLocalizationChanged","detachLocalizationChanged","attachLibraryChanged","detachLibraryChanged","isStaticAreaRef","createComponent","getRootComponent","getApplication","setMessageManager","getMessageManager","byFieldGroupId","addPrerenderingTask"]}});w.M_EVENTS={ControlEvent:"ControlEvent",UIUpdated:"UIUpdated",ThemeChanged:"ThemeChanged",ThemeScopingChanged:"themeScopingChanged",LocalizationChanged:"localizationChanged",LibraryChanged:"libraryChanged",ValidationError:"validationError",ParseError:"parseError",FormatError:"formatError",ValidationSuccess:"validationSuccess"};var S="sap-ui-static";w.prototype._grantFriendAccess=function(){var b=this;k.prototype.register=function(m){b.registerElementClass(m);};h.prototype.register=function(){b.registerElement(this);};h.prototype.deregister=function(){b.deregisterElement(this);};h._updateFocusInfo=function(e){if(b.oFocusHandler){b.oFocusHandler.updateControlFocusInfo(e);}};C.prototype.register=function(){b.registerObject(this);};C.prototype.deregister=function(){var e=this.sId;for(var f in b.mElements){var o=b.mElements[f];if(o._sapui_candidateForDestroy&&o._sOwnerId===e&&!o.getParent()){q.sap.log.debug("destroying dangling template "+o+" when destroying the owner component");o.destroy();}}b.deregisterObject(this);};};w.prototype._setupThemes=function(){var l=q.sap.log,b="sap.ui.core.Core";var o=window["sap-ui-config"];if(this.oConfiguration.themeRoot){o=o||{};o.themeroots=o.themeroots||{};o.themeroots[this.oConfiguration.getTheme()]=this.oConfiguration.themeRoot;}if(o){if(o.themeroots){for(var e in o.themeroots){var f=o.themeroots[e];if(typeof f==="string"){this.setThemeRoot(e,f);}else{for(var i in f){if(i.length>0){this.setThemeRoot(e,[i],f[i]);}else{this.setThemeRoot(e,f[i]);}}}}}}this.sTheme=this.oConfiguration.getTheme();q(document.documentElement).addClass("sapUiTheme-"+this.sTheme);l.info("Declared theme "+this.sTheme,null,b);};w.prototype._setupRTL=function(){var l=q.sap.log,b="sap.ui.core.Core";if(this.oConfiguration.getRTL()){q(document.documentElement).attr("dir","rtl");l.info("RTL mode activated",null,b);}};w.prototype._setupBrowser=function($){var l=q.sap.log,e="sap.ui.core.Core";$=$||q("html");var b=D.browser;var i=b.name;if(i===b.BROWSER.CHROME){q.browser.safari=false;q.browser.chrome=true;}else if(i===b.BROWSER.SAFARI){q.browser.safari=true;q.browser.chrome=false;if(b.mobile){i="m"+i;}}if(i){q.browser.fVersion=b.version;q.browser.mobile=b.mobile;i=i+(b.version===-1?"":Math.floor(b.version));$.attr("data-sap-ui-browser",i);l.debug("Browser-Id: "+i,null,e);}};w.prototype._setupOS=function($){$=$||q("html");$.attr("data-sap-ui-os",D.os.name+D.os.versionStr);var o=null;switch(D.os.name){case D.os.OS.IOS:o="sap-ios";break;case D.os.OS.ANDROID:o="sap-android";break;case D.os.OS.BLACKBERRY:o="sap-bb";break;case D.os.OS.WINDOWS_PHONE:o="sap-winphone";break;}if(o){$.addClass(o);}};w.prototype._setupLang=function($){$=$||q("html");var f=function(){var l=this.oConfiguration.getLocale();if(l){$.attr("lang",l.toString());}else{$.removeAttr("lang");}};f.call(this);this.attachLocalizationChanged(f,this);};w.prototype._setupAnimation=function($){$=$||q("html");var b=this.oConfiguration.getAnimation();$.attr("data-sap-ui-animation",b?"on":"off");q.fx.off=!b;};w.prototype._polyfillFlexbox=function(){var b=new q.sap.Version(this.oConfiguration.getCompatibilityVersion("flexBoxPolyfill"));if(b.compareTo("1.16")>=0){q.support.useFlexBoxPolyfill=false;}else if(!q.support.flexBoxLayout&&!q.support.newFlexBoxLayout&&!q.support.ie10FlexBoxLayout){q.support.useFlexBoxPolyfill=true;}else{q.support.useFlexBoxPolyfill=false;}};w.prototype._boot=function(){this.lock();var b=this.oConfiguration['preloadLibCss'];if(b&&b.length>0&&!b.appManaged){this.includeLibraryTheme("sap-ui-merged",undefined,"?l="+b.join(","));}var e=this;q.each(this.oConfiguration.modules,function(i,f){var m=f.match(/^(.*)\.library$/);if(m){e.loadLibrary(m[1]);}else{q.sap.require(f);}});this.unlock();};w.prototype.applyTheme=function(b,e){b=this.oConfiguration._normalizeTheme(b,e);if(e){this.setThemeRoot(b,e);}if(b&&this.sTheme!=b){var f=this.sTheme;this._updateThemeUrls(b);this.sTheme=b;this.oConfiguration._setTheme(b);q(document.documentElement).removeClass("sapUiTheme-"+f).addClass("sapUiTheme-"+b);if(this.oThemeCheck){this.oThemeCheck.fireThemeChangedEvent(false);}}};w.prototype._updateThemeUrls=function(b){var e=this,f=this.oConfiguration.getRTL()?"-RTL":"";q("link[id^=sap-ui-theme-]").each(function(){var l=this.id.slice(13),i=this.href.slice(this.href.lastIndexOf("/")+1),j="library",m,p,$=q(this);if((p=l.indexOf("-["))>0){j+=l.slice(p+2,-1);l=l.slice(0,p);}if(i===(j+".css")||i===(j+"-RTL.css")){i=j+f+".css";}if($.attr("data-sap-ui-css-count")){$.remove();}m=e._getThemePath(l,b)+i;if(m!=this.href){this.href=m;$.removeAttr("data-sap-ui-ready");}});};w.prototype._ensureThemeRoot=function(l,b){if(this._mThemeRoots){var p=this._mThemeRoots[b+" "+l]||this._mThemeRoots[b];if(p){p=p+l.replace(/\./g,"/")+"/themes/"+b+"/";q.sap.registerModulePath(l+".themes."+b,p);}}};w.prototype._getThemePath=function(l,b){this._ensureThemeRoot(l,b);return q.sap.getModulePath(l+".themes."+b,"/");};w.prototype.setThemeRoot=function(b,l,e){if(!this._mThemeRoots){this._mThemeRoots={};}if(e===undefined){e=l;l=undefined;}e=e+(e.slice(-1)=="/"?"":"/");if(l){for(var i=0;i<l.length;i++){var f=l[i];this._mThemeRoots[b+" "+f]=e;}}else{this._mThemeRoots[b]=e;}return this;};w.prototype.init=function(){if(this.bInitialized){return;}var l=q.sap.log,b="sap.ui.core.Core.init()";this.boot();l.info("Initializing",null,b);this.oFocusHandler=new F(document.body,this);this.oRenderManager._setFocusHandler(this.oFocusHandler);this.oResizeHandler=new r(this);this.oThemeCheck=new T(this);l.info("Initialized",null,b);q.sap.measure.end("coreInit");this.bInitialized=true;l.info("Starting Plugins",null,b);this.startPlugins();l.info("Plugins started",null,b);this._createUIAreas();this.oThemeCheck.fireThemeChangedEvent(true);this._executeOnInit();this._setupRootComponent();this._setBodyAccessibilityRole();this._executeInitListeners();this.renderPendingUIUpdates();q.sap.measure.end("coreComplete");};w.prototype._createUIAreas=function(){var o=this.oConfiguration;if(o.areas){for(var i=0,l=o.areas.length;i<l;i++){this.createUIArea(o.areas[i]);}o.areas=undefined;}};w.prototype._executeOnInit=function(){var o=this.oConfiguration;if(o.onInit){if(typeof o.onInit==="function"){o.onInit();}else{q.sap.globalEval(o.onInit);}o.onInit=undefined;}};w.prototype._setupRootComponent=function(){var l=q.sap.log,b="sap.ui.core.Core.init()",o=this.oConfiguration;var e=o.getRootComponent();if(e){l.info("Loading Root Component: "+e,null,b);var f=sap.ui.component({name:e});this.oRootComponent=f;var i=o["xx-rootComponentNode"];if(i&&t(f,'sap/ui/core/UIComponent')){var j=q.sap.domById(i);if(j){l.info("Creating ComponentContainer for Root Component: "+e,null,b);var m=sap.ui.requireSync('sap/ui/core/ComponentContainer'),n=new m({component:f,propagateModel:true});n.placeAt(j);}}}else{var p=o.getApplication();if(p){l.warning("The configuration 'application' is deprecated. Please use the configuration 'component' instead! Please migrate from sap.ui.app.Application to sap.ui.core.Component.");l.info("Loading Application: "+p,null,b);q.sap.require(p);var v=q.sap.getObject(p);var O=new v();}}};w.prototype._setBodyAccessibilityRole=function(){var o=this.oConfiguration;var $=q("body");if(o.getAccessibility()&&o.getAutoAriaBodyRole()&&!$.attr("role")){$.attr("role","application");}};w.prototype._executeInitListeners=function(){var l=q.sap.log,b="sap.ui.core.Core.init()";var e=this.aInitListeners;this.aInitListeners=undefined;if(e&&e.length>0){l.info("Fire Loaded Event",null,b);q.each(e,function(i,f){f();});}};w.prototype.handleLoad=function(){this.bDomReady=true;var W=this.isLocked();if(!W){this.lock();}this.init();if(!W){this.unlock();}};w.prototype.isInitialized=function(){return this.bInitialized;};w.prototype.isThemeApplied=function(){return T.themeLoaded;};w.prototype.attachInitEvent=function(f){if(this.aInitListeners){this.aInitListeners.push(f);}};w.prototype.attachInit=function(f){if(this.aInitListeners){this.aInitListeners.push(f);}else{f();}};w.prototype.lock=function(){this.bLocked=true;};w.prototype.unlock=function(){this.bLocked=false;};w.prototype.isLocked=function(){return this.bLocked;};w.prototype.getConfiguration=function(){return this.oConfiguration;};w.prototype.getRenderManager=function(){return this.createRenderManager();};w.prototype.createRenderManager=function(){var o=new R();o._setFocusHandler(this.oFocusHandler);return o.getInterface();};w.prototype.getCurrentFocusedControlId=function(){if(!this.isInitialized()){throw new Error("Core must be initialized");}return this.oFocusHandler.getCurrentFocusedControlId();};var x={};function y(l){var f='both';if(typeof l==='object'){if(l.json===true){f='json';}else if(l.json===false){f='js';}l=l.name;}var b=x[l]||x['']||'both';if(b==='both'){b=f;}else if(b!==f&&f!=='both'){b='none';}return{name:l,fileType:b};}function z(l){l=y(l);var b=l.name,f=l.fileType,i=b.replace(/\./g,'/');if(f==='none'||q.sap.isResourceLoaded(i+'/library.js')){return Promise.resolve(true);}var j=u[b]||(u[b]={});if(j.promise){return j.promise;}j.pending=true;j.async=true;var p;if(f!=='json'){var P=i+'/library-preload.js';p=q.sap._loadJSResourceAsync(P).then(function(){return A(b);},function(e){if(f!=='js'){q.sap.log.error("failed to load '"+P+"' ("+(e&&e.message||e)+"), falling back to library-preload.json");return H(b);}});}else{p=H(b);}j.promise=p.then(function(e){if(e&&e.length){return Promise.all(e.map(z)).then(function(){j.pending=false;});}j.pending=false;});return j.promise;}function A(l){var m=l.replace(/\./g,'/')+'/manifest.json';if(q.sap.isResourceLoaded(m)){var b=q.sap.loadResource(m,{dataType:'json',async:false,failOnError:false});var e=b&&b["sap.ui5"]&&b["sap.ui5"].dependencies&&b["sap.ui5"].dependencies.libs;if(e){return Object.keys(e).reduce(function(f,i){if(!e[i].lazy){f.push(i);}return f;},[]);}}}function H(l){var b=q.sap.getModulePath(l+".library-preload",".json");return Promise.resolve(q.ajax({dataType:"json",url:b})).then(function(e){if(e){e.url=b;q.sap.registerPreloadedModules(e);var f=e.dependencies;if(Array.isArray(f)){f=f.map(function(i){return i.replace(/\.library-preload$/,'');});}return f;}},function(e,f,i){q.sap.log.error("failed to load '"+b+"': "+(i||f));});}function J(l){l=y(l);var b=l.name,f=l.fileType,i=b.replace(/\./g,'/');if(f==='none'||q.sap.isResourceLoaded(i+'/library.js')){return;}var j=u[b]||(u[b]={});if(j.pending===false){return;}if(j.pending){if(j.async){q.sap.log.warning("request to load "+b+" synchronously while async loading is pending; this causes a duplicate request and should be avoided by caller");}else{q.sap.log.warning("request to load "+b+" synchronously while sync loading is pending (cycle, ignored)");return;}}j.pending=true;j.async=false;var m;j.promise=new Promise(function(o,v){m=o;});var n;if(f!=='json'){var p=i+'/library-preload';try{sap.ui.requireSync(p);n=A(b);}catch(e){q.sap.log.error("failed to load '"+p+"' ("+(e&&e.message||e)+")");if(e&&e.loadError&&f!=='js'){n=K(b);}}}else{n=K(b);}if(n&&n.length){n.forEach(J);}j.pending=false;m();}function K(l){var b=q.sap.getModulePath(l+".library-preload",".json");var e;q.ajax({dataType:"json",async:false,url:b,success:function(f){if(f){f.url=b;q.sap.registerPreloadedModules(f);e=f.dependencies;}},error:function(f,i,j){q.sap.log.error("failed to load '"+b+"': "+(j||i));}});if(Array.isArray(e)){e=e.map(function(f){return f.replace(/\.library-preload$/,'');});}return e;}w.prototype.loadLibrary=function(l,b){if(!L[l]){var m=l+".library",e;if(b){q.sap.registerModulePath(l,b);}if(this.oConfiguration['xx-loadAllMode']&&!q.sap.isDeclared(m)){e=m+"-all";q.sap.log.debug("load all-in-one file "+e);q.sap.require(e);}else if(this.oConfiguration.preload==='sync'||this.oConfiguration.preload==='async'){J(l);}q.sap.require(m);if(!L[l]){q.sap.log.warning("library "+l+" didn't initialize itself");this.initLibrary(l);}if(this.oThemeCheck&&this.isInitialized()){this.oThemeCheck.fireThemeChangedEvent(true);}}return this.mLibraries[l];};w.prototype.loadLibraries=function(l,o){o=q.extend({async:true,preloadOnly:false},o);var b=this,p=this.oConfiguration.preload==='sync'||this.oConfiguration.preload==='async',e=o.async,f=!o.preloadOnly;function i(){if(f){l.forEach(function(v){if(typeof v==='object'){v=v.name;}q.sap.require(v+".library");});if(b.oThemeCheck&&b.isInitialized()){b.oThemeCheck.fireThemeChangedEvent(true);}}}if(e){var j=p?Promise.all(l.map(z)):Promise.resolve(true);return j.then(i);}else{if(p){l.forEach(J);}i();}};w.prototype.createComponent=function(v,b,i,m){if(typeof v==="string"){v={name:v,url:b};if(typeof i==="object"){v.settings=i;}else{v.id=i;v.settings=m;}}return sap.ui.component(v);};w.prototype.getRootComponent=function(){return this.oRootComponent;};w.prototype.initLibrary=function(l){var b=typeof l==='string';if(b){l={name:l};}var e=l.name,f=q.sap.log,m="sap.ui.core.Core.initLibrary()";if(b){f.warning("[Deprecated] library "+e+" uses old fashioned initLibrary() call (rebuild with newest generator)");}if(!e||L[e]){return;}f.debug("Analyzing Library "+e,null,m);L[e]=true;function n(j,O){var P,V;for(P in O){V=O[P];if(V!==undefined){if(q.isArray(j[P])){if(j[P].length===0){j[P]=V;}else{j[P]=q.sap.unique(j[P].concat(V));}}else if(j[P]===undefined){j[P]=V;}else if(P!="name"){q.sap.log.warning("library info setting ignored: "+P+"="+V);}}}return j;}q.sap.getObject(e,0);this.mLibraries[e]=l=n(this.mLibraries[e]||{name:e,dependencies:[],types:[],interfaces:[],controls:[],elements:[]},l);function o(){var P=q.sap.properties({url:sap.ui.resource(e,"library.properties")});l.version=P.getProperty(e+"[version]");var O=P.getProperty(e+"[dependencies]");f.debug("Required Libraries: "+O,null,m);l.dependencies=(O&&O.split(/[,;| ]/))||[];var V=P.getKeys(),W=/(.+)\.(type|interface|control|element)$/,X;for(var j=0;j<V.length;j++){var Y=P.getProperty(V[j]);if((X=Y.match(W))!==null){l[X[2]+"s"].push(V[j]);}}}if(b){o();}for(var i=0;i<l.dependencies.length;i++){var p=l.dependencies[i];f.debug("resolve Dependencies to "+p,null,m);if(L[p]!==true){f.warning("Dependency from "+e+" to "+p+" has not been resolved by library itself",null,m);this.loadLibrary(p);}}a.registerInterfaceTypes(l.interfaces);for(var i=0;i<l.types.length;i++){if(!/^(any|boolean|float|int|string|object|void)$/.test(l.types[i])){q.sap.declare(l.types[i]);}}var v=l.controls.concat(l.elements);for(var i=0;i<v.length;i++){sap.ui.lazyRequire(v[i],"new extend getMetadata");}if(!l.noLibraryCSS){this._ensureThemeRoot(e,this.sTheme);if(this.oConfiguration['preloadLibCss'].indexOf(e)<0){var Q=this._getLibraryCssQueryParams(l);this.includeLibraryTheme(e,undefined,Q);}}l.sName=l.name;l.aControls=l.controls;if(!q.sap.isDeclared(e+".library")){f.warning("Library Module "+e+".library"+" not loaded automatically",null,m);q.sap.require(e+".library");}this.fireLibraryChanged({name:e,stereotype:"library",operation:"add",metadata:l});};w.prototype.includeLibraryTheme=function(l,v,Q){if((l!="sap.ui.legacy")&&(l!="sap.ui.classic")){if(!v){v="";}var b=(this.oConfiguration.getRTL()?"-RTL":"");var e,f=l+(v.length>0?"-["+v+"]":v);if(l&&l.indexOf(":")==-1){e="library"+v+b;}else{e=l.substring(l.indexOf(":")+1)+v;l=l.substring(0,l.indexOf(":"));}var i=this._getThemePath(l,this.sTheme)+e+".css"+(Q?Q:"");q.sap.log.info("Including "+i+" -  sap.ui.core.Core.includeLibraryTheme()");q.sap.includeStyleSheet(i,"sap-ui-theme-"+f);var P=sap.ui.require("sap/ui/core/theming/Parameters");if(P){P._addLibraryTheme(f,i);}}};w.prototype._getLibraryCssQueryParams=function(l){var Q;if(this.oConfiguration["versionedLibCss"]&&l){Q="?version="+l.version;if(G.versioninfo){Q+="&sap-ui-dist-version="+G.versioninfo.version;}}return Q;};w.prototype.getLoadedLibraries=function(){return q.extend({},this.mLibraries);};w.prototype.getLibraryResourceBundle=function(l,b){l=l||"sap.ui.core";b=b||this.getConfiguration().getLanguage();var e=l+"/"+b;if(!this.mResourceBundles[e]){var f=sap.ui.resource(l,'messagebundle.properties');this.mResourceBundles[e]=q.sap.resources({url:f,locale:b});}return this.mResourceBundles[e];};w.prototype.setRoot=function(o,b){if(b){b.placeAt(o,"only");}};w.prototype.createUIArea=function(o){var b=this;if(!o){throw new Error("oDomRef must not be null");}if(typeof(o)==="string"){var i=o;if(i==S){o=this.getStaticAreaRef();}else{o=q.sap.domById(o);if(!o){throw new Error("DOM element with ID '"+i+"' not found in page, but application tries to insert content.");}}}if(!o.id||o.id.length==0){o.id=q.sap.uid();}var e=o.id;if(!this.mUIAreas[e]){this.mUIAreas[e]=new U(this,o);if(!q.isEmptyObject(this.oModels)){var p={oModels:q.extend({},this.oModels),oBindingContexts:{}};b.mUIAreas[e]._propagateProperties(true,b.mUIAreas[e],p,true);}}else{this.mUIAreas[e].setRootNode(o);}return this.mUIAreas[e];};w.prototype.getUIArea=function(o){var i="";if(typeof(o)=="string"){i=o;}else{i=o.id;}if(i){return this.mUIAreas[i];}return null;};var N=U._oRenderLog;w.prototype.addInvalidatedUIArea=function(o){if(!this._sRerenderTimer){N.debug("Registering timer for delayed re-rendering");this._sRerenderTimer=q.sap.delayedCall(0,this,"renderPendingUIUpdates");}};w.MAX_RENDERING_ITERATIONS=20;w.prototype.renderPendingUIUpdates=function(){N.debug("Render pending UI updates: start");q.sap.measure.start("renderPendingUIUpdates","Render pending UI updates in all UIAreas");var b=false,l=w.MAX_RENDERING_ITERATIONS>0,i=0;this._bRendering=true;do{if(l){i++;if(i>w.MAX_RENDERING_ITERATIONS){this._bRendering=false;throw new Error("Rendering has been re-started too many times ("+i+"). Add URL parameter sap-ui-xx-debugRendering=true for a detailed analysis.");}if(i>1){N.debug("Render pending UI updates: iteration "+i);}}if(this._sRerenderTimer){q.sap.clearDelayedCall(this._sRerenderTimer);this._sRerenderTimer=undefined;}this.runPrerenderingTasks();var m=this.mUIAreas;for(var e in m){b=m[e].rerender()||b;}}while(l&&this._sRerenderTimer);this._bRendering=false;if(b){this.fireUIUpdated();}N.debug("Render pending UI updates: finished");q.sap.measure.end("renderPendingUIUpdates");};w.prototype.getUIDirty=function(){return!!(this._sRerenderTimer||this._bRendering);};w.prototype.attachUIUpdated=function(f,l){_.attachEvent(w.M_EVENTS.UIUpdated,f,l);};w.prototype.detachUIUpdated=function(f,l){_.detachEvent(w.M_EVENTS.UIUpdated,f,l);};w.prototype.fireUIUpdated=function(p){_.fireEvent(w.M_EVENTS.UIUpdated,p);};w.prototype.attachThemeChanged=function(f,l){_.attachEvent(w.M_EVENTS.ThemeChanged,f,l);};w.prototype.detachThemeChanged=function(f,l){_.detachEvent(w.M_EVENTS.ThemeChanged,f,l);};w.prototype.fireThemeChanged=function(p){q.sap.scrollbarSize(true);var P=sap.ui.require("sap/ui/core/theming/Parameters");if(P){P.reset(true);}var e=w.M_EVENTS.ThemeChanged;var o=q.Event(e);o.theme=p?p.theme:null;q.each(this.mElements,function(i,b){b._handleEvent(o);});q.sap.act.refresh();_.fireEvent(e,p);};w.prototype.attachThemeScopingChanged=function(f,l){_.attachEvent(w.M_EVENTS.ThemeScopingChanged,f,l);};w.prototype.detachThemeScopingChanged=function(f,l){_.detachEvent(w.M_EVENTS.ThemeScopingChanged,f,l);};w.prototype.fireThemeScopingChanged=function(p){_.fireEvent(w.M_EVENTS.ThemeScopingChanged,p);};w.prototype.attachLocalizationChanged=function(f,l){_.attachEvent(w.M_EVENTS.LocalizationChanged,f,l);};w.prototype.detachLocalizationChanged=function(f,l){_.detachEvent(w.M_EVENTS.LocalizationChanged,f,l);};w.prototype.fireLocalizationChanged=function(m){var e=w.M_EVENTS.LocalizationChanged,b=q.Event(e,{changes:m}),f=M._handleLocalizationChange;q.sap.log.info("localization settings changed: "+Object.keys(m).join(","),null,"sap.ui.core.Core");q.each(this.oModels,function(i,o){if(o&&o._handleLocalizationChange){o._handleLocalizationChange();}});function n(p){q.each(this.mUIAreas,function(){f.call(this,p);});q.each(this.mObjects["component"],function(){f.call(this,p);});q.each(this.mElements,function(){f.call(this,p);});}n.call(this,1);n.call(this,2);if(m.rtl!=undefined){q(document.documentElement).attr("dir",m.rtl?"rtl":"ltr");this._updateThemeUrls(this.sTheme);q.each(this.mUIAreas,function(){this.invalidate();});q.sap.log.info("RTL mode "+m.rtl?"activated":"deactivated");}q.each(this.mElements,function(i,o){this._handleEvent(b);});_.fireEvent(e,{changes:m});};w.prototype.attachLibraryChanged=function(f,l){_.attachEvent(w.M_EVENTS.LibraryChanged,f,l);};w.prototype.detachLibraryChanged=function(f,l){_.detachEvent(w.M_EVENTS.LibraryChanged,f,l);};w.prototype.fireLibraryChanged=function(p){_.fireEvent(w.M_EVENTS.LibraryChanged,p);};w.prototype.applyChanges=function(){this.renderPendingUIUpdates();};w.prototype.registerElementClass=function(m){var n=m.getName(),l=m.getLibraryName()||"",o=this.mLibraries[l],b=g.prototype.isPrototypeOf(m.getClass().prototype)?'controls':'elements';if(!o){q.sap.getObject(l,0);o=this.mLibraries[l]={name:l,dependencies:[],types:[],interfaces:[],controls:[],elements:[]};}if(o[b].indexOf(n)<0){o[b].push(n);q.sap.log.debug("Class "+m.getName()+" registered for library "+m.getLibraryName());this.fireLibraryChanged({name:m.getName(),stereotype:m.getStereotype(),operation:"add",metadata:m});}};w.prototype.registerElement=function(e){var i=e.getId(),o=this.mElements[i];if(o&&o!==e){if(o._sapui_candidateForDestroy){q.sap.log.debug("destroying dangling template "+o+" when creating new object with same ID");o.destroy();}else{if(this.oConfiguration.getNoDuplicateIds()){q.sap.log.error("adding element with duplicate id '"+i+"'");throw new Error("Error: adding element with duplicate id '"+i+"'");}else{q.sap.log.warning("adding element with duplicate id '"+i+"'");}}}this.mElements[i]=e;};w.prototype.deregisterElement=function(e){delete this.mElements[e.getId()];};w.prototype.registerObject=function(o){var i=o.getId(),b=o.getMetadata().getStereotype(),e=this.getObject(b,i);if(e&&e!==o){q.sap.log.error("adding object \""+b+"\" with duplicate id '"+i+"'");throw new Error("Error: adding object \""+b+"\" with duplicate id '"+i+"'");}this.mObjects[b][i]=o;};w.prototype.deregisterObject=function(o){var i=o.getId(),b=o.getMetadata().getStereotype();delete this.mObjects[b][i];};w.prototype.byId=function(i){return i==null?undefined:this.mElements[i];};w.prototype.getControl=w.prototype.byId;w.prototype.getElementById=w.prototype.byId;w.prototype.getObject=function(b,i){return i==null?undefined:this.mObjects[b]&&this.mObjects[b][i];};w.prototype.getComponent=function(i){return this.getObject("component",i);};w.prototype.getTemplate=function(i){var b=sap.ui.requireSync('sap/ui/core/tmpl/Template');return b.byId(i);};w.prototype.getStaticAreaRef=function(){var o=q.sap.domById(S);if(!o){if(!this.bDomReady){throw new Error("DOM is not ready yet. Static UIArea cannot be created.");}var b={id:S};if(q("body").attr("role")!="application"){b.role="application";}var l=this.getConfiguration().getRTL()?"right":"left";o=q("<DIV/>",b).css({"height":"0","width":"0","overflow":"hidden","float":l}).prependTo(document.body)[0];this.createUIArea(o).bInitial=false;}return o;};w.prototype.isStaticAreaRef=function(o){return o&&(o.id===S);};w._I_INTERVAL=200;r.prototype.I_INTERVAL=w._I_INTERVAL;w.prototype.attachIntervalTimer=function(f,l){if(!this.oTimedTrigger){var b=sap.ui.requireSync("sap/ui/core/IntervalTrigger");this.oTimedTrigger=new b(w._I_INTERVAL);}this.oTimedTrigger.addListener(f,l);};w.prototype.detachIntervalTimer=function(f,l){if(this.oTimedTrigger){this.oTimedTrigger.removeListener(f,l);}};w.prototype.attachControlEvent=function(f,l){_.attachEvent(w.M_EVENTS.ControlEvent,f,l);};w.prototype.detachControlEvent=function(f,l){_.detachEvent(w.M_EVENTS.ControlEvent,f,l);};w.prototype.fireControlEvent=function(p){_.fireEvent(w.M_EVENTS.ControlEvent,p);};w.prototype._handleControlEvent=function(e,b){var o=q.Event(e.type);q.extend(o,e);o.originalEvent=undefined;this.fireControlEvent({"browserEvent":o,"uiArea":b});};w.prototype.getApplication=function(){return sap.ui.getApplication&&sap.ui.getApplication();};w.prototype.registerPlugin=function(p){if(!p){return;}for(var i=0,l=this.aPlugins.length;i<l;i++){if(this.aPlugins[i]===p){return;}}this.aPlugins.push(p);if(this.bInitialized&&p&&p.startPlugin){p.startPlugin(this);}};w.prototype.unregisterPlugin=function(p){if(!p){return;}var P=-1;for(var i=this.aPlugins.length;i--;i>=0){if(this.aPlugins[i]===p){P=i;break;}}if(P==-1){return;}if(this.bInitialized&&p&&p.stopPlugin){p.stopPlugin(this);}this.aPlugins.splice(P,1);};w.prototype.startPlugins=function(){for(var i=0,l=this.aPlugins.length;i<l;i++){var p=this.aPlugins[i];if(p&&p.startPlugin){p.startPlugin(this,true);}}};w.prototype.stopPlugins=function(){for(var i=0,l=this.aPlugins.length;i<l;i++){var p=this.aPlugins[i];if(p&&p.stopPlugin){p.stopPlugin(this);}}};w.prototype.setModel=function(m,n){var b=this,p;if(!m&&this.oModels[n]){delete this.oModels[n];if(q.isEmptyObject(b.oModels)&&q.isEmptyObject(b.oBindingContexts)){p=M._oEmptyPropagatedProperties;}else{p={oModels:q.extend({},b.oModels),oBindingContexts:{}};}q.each(this.mUIAreas,function(i,o){if(m!=o.getModel(n)){o._propagateProperties(n,o,p,false,n);}});}else if(m&&m!==this.oModels[n]){this.oModels[n]=m;q.each(this.mUIAreas,function(i,o){if(m!=o.getModel(n)){var p={oModels:q.extend({},b.oModels),oBindingContexts:{}};o._propagateProperties(n,o,p,false,n);}});}return this;};w.prototype.setMessageManager=function(m){this.oMessageManager=m;};w.prototype.getMessageManager=function(){if(!this.oMessageManager){this.oMessageManager=new s();}return this.oMessageManager;};w.prototype.byFieldGroupId=function(f){var b=[];for(var n in this.mElements){var e=this.mElements[n];if(e instanceof g&&e.checkFieldGroupIds(f)){b.push(e);}}return b;};w.prototype.getModel=function(n){return this.oModels[n];};w.prototype.hasModel=function(){return!q.isEmptyObject(this.oModels);};w.prototype.getEventBus=function(){if(!this.oEventBus){var b=sap.ui.requireSync('sap/ui/core/EventBus');this.oEventBus=new b();}return this.oEventBus;};w.prototype.attachValidationError=function(o,f,l){if(typeof(o)==="function"){l=f;f=o;o=undefined;}_.attachEvent(w.M_EVENTS.ValidationError,o,f,l);return this;};w.prototype.detachValidationError=function(f,l){_.detachEvent(w.M_EVENTS.ValidationError,f,l);return this;};w.prototype.attachParseError=function(o,f,l){if(typeof(o)==="function"){l=f;f=o;o=undefined;}_.attachEvent(w.M_EVENTS.ParseError,o,f,l);return this;};w.prototype.detachParseError=function(f,l){_.detachEvent(w.M_EVENTS.ParseError,f,l);return this;};w.prototype.attachFormatError=function(o,f,l){if(typeof(o)==="function"){l=f;f=o;o=undefined;}_.attachEvent(w.M_EVENTS.FormatError,o,f,l);return this;};w.prototype.detachFormatError=function(f,l){_.detachEvent(w.M_EVENTS.FormatError,f,l);return this;};w.prototype.attachValidationSuccess=function(o,f,l){if(typeof(o)==="function"){l=f;f=o;o=undefined;}_.attachEvent(w.M_EVENTS.ValidationSuccess,o,f,l);return this;};w.prototype.detachValidationSuccess=function(f,l){_.detachEvent(w.M_EVENTS.ValidationSuccess,f,l);return this;};w.prototype.fireParseError=function(m){_.fireEvent(w.M_EVENTS.ParseError,m);return this;};w.prototype.fireValidationError=function(m){_.fireEvent(w.M_EVENTS.ValidationError,m);return this;};w.prototype.fireFormatError=function(m){_.fireEvent(w.M_EVENTS.FormatError,m);return this;};w.prototype.fireValidationSuccess=function(m){_.fireEvent(w.M_EVENTS.ValidationSuccess,m);return this;};w.prototype.isMobile=function(){return D.browser.mobile;};w.prototype._getEventProvider=function(){return _;};w.prototype.addPrerenderingTask=function(p){this.aPrerenderingTasks.push(p);this.addInvalidatedUIArea();};w.prototype.runPrerenderingTasks=function(){var b=this.aPrerenderingTasks.slice();this.aPrerenderingTasks=[];b.forEach(function(p){p();});};w.prototype.destroy=function(){this.oFocusHandler.destroy();_.destroy();c.prototype.destroy.call(this);};sap.ui.setRoot=function(o,b){sap.ui.getCore().setRoot(o,b);};return new w().getInterface();});
