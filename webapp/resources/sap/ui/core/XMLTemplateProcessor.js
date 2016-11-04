/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/DataType','sap/ui/base/ManagedObject','sap/ui/core/CustomData','./mvc/View','./ExtensionPoint','./StashedControlSupport'],function(q,D,M,C,V,E,S){"use strict";function p(t,v,n,c){var b=M.bindingParser(v,c,true);if(b&&typeof b==="object"){return b;}var a=v=b||v;var T=D.getType(t);if(T){if(T instanceof D){a=T.parseValue(v);}}else{throw new Error("Property "+n+" has unknown type "+t);}return typeof a==="string"?M.bindingParser.escape(a):a;}function l(x){return x.localName||x.baseName||x.nodeName;}var X={};X.loadTemplate=function(t,s){var r=q.sap.getResourceName(t,"."+(s||"view")+".xml");return q.sap.loadResource(r).documentElement;};X.parseViewAttributes=function(x,v,s){var a=v.getMetadata().getAllProperties();for(var i=0;i<x.attributes.length;i++){var b=x.attributes[i];if(b.name==='controllerName'){v._controllerName=b.value;}else if(b.name==='resourceBundleName'){v._resourceBundleName=b.value;}else if(b.name==='resourceBundleUrl'){v._resourceBundleUrl=b.value;}else if(b.name==='resourceBundleLocale'){v._resourceBundleLocale=b.value;}else if(b.name==='resourceBundleAlias'){v._resourceBundleAlias=b.value;}else if(b.name==='class'){v.addStyleClass(b.value);}else if(!s[b.name]&&a[b.name]){s[b.name]=p(a[b.name].type,b.value,b.name,v._oContainingView.oController);}}};var e=false;X.enrichTemplateIds=function(x,v){var r=(e!==false);e=true;try{X.parseTemplate(x,v);}finally{e=r;}return x;};X.parseTemplate=function(x,v){var d=sap.ui.getCore().getConfiguration().getDesignMode();var r=[];if(d){v._sapui_declarativeSourceInfo={xmlNode:x,xmlRootNode:v._oContainingView===v?x:v._oContainingView._sapui_declarativeSourceInfo.xmlRootNode};}var c=v.sViewName||v._sFragmentName;if(!c){var t=v;var L=0;while(++L<1000&&t&&t!==t._oContainingView){t=t._oContainingView;}c=t.sViewName;}if(v.isSubView()){a(x,true);}else{if(x.localName==="View"&&x.namespaceURI!=="sap.ui.core.mvc"){q.sap.log.warning("XMLView root node must have the 'sap.ui.core.mvc' namespace, not '"+x.namespaceURI+"'"+(c?" (View name: "+c+")":""));}b(x);}return r;function a(x,R,I){if(x.nodeType===1){var j=l(x);if(x.namespaceURI==="http://www.w3.org/1999/xhtml"||x.namespaceURI==="http://www.w3.org/2000/svg"){r.push("<"+j+" ");for(var i=0;i<x.attributes.length;i++){var n=x.attributes[i];var o=n.value;if(n.name==="id"){o=m(v,x);}r.push(n.name+"=\""+q.sap.encodeHTML(o)+"\" ");}if(R===true){r.push("data-sap-ui-preserve"+"=\""+v.getId()+"\" ");}r.push(">");if(window.HTMLTemplateElement&&x instanceof HTMLTemplateElement&&x.content instanceof DocumentFragment){b(x.content);}else{b(x);}r.push("</"+j+">");}else if(j==="FragmentDefinition"&&x.namespaceURI==="sap.ui.core"){b(x,false,true);}else{var u=h(x);for(var i=0;i<u.length;i++){var w=u[i];if(v.getMetadata().hasAggregation("content")){v.addAggregation("content",w);}else if(v.getMetadata().hasAssociation(("content"))){v.addAssociation("content",w);}r.push(w);}}}else if(x.nodeType===3&&!I){var y=x.textContent||x.text,z=l(x.parentNode);if(y){if(z!="style"){y=q.sap.encodeHTML(y);}r.push(y);}}}function b(x,R,I){var j=x.childNodes;for(var i=0;i<j.length;i++){a(j[i],R,I);}}function f(n,i){var j;var o=sap.ui.getCore().getLoadedLibraries();q.each(o,function(w,y){if(n===y.namespace||n===y.name){j=y.name+"."+((y.tagNames&&y.tagNames[i])||i);}});j=j||n+"."+i;q.sap.require(j);var u=q.sap.getObject(j);if(u){return u;}else{q.sap.log.error("Can't find object class '"+j+"' for XML-view","","XMLTemplateProcessor.js");}}function g(n){if(n.namespaceURI==="http://www.w3.org/1999/xhtml"||n.namespaceURI==="http://www.w3.org/2000/svg"){var i=n.attributes['id']?n.attributes['id'].textContent||n.attributes['id'].text:null;if(e){X.enrichTemplateIds(n,v);return[];}else{var j=sap.ui.requireSync("sap/ui/core/mvc/XMLView");return[new j({id:i?m(v,n,i):undefined,xmlNode:n,containingView:v._oContainingView})];}}else{return h(n);}}function h(n){if(l(n)==="ExtensionPoint"&&n.namespaceURI==="sap.ui.core"){return E(v,n.getAttribute("name"),function(){var j=n.childNodes;var o=[];for(var i=0;i<j.length;i++){var u=j[i];if(u.nodeType===1){o=q.merge(o,g(u));}}return o;});}else{return k(n);}}function k(n){var o=n.namespaceURI,u=f(o,l(n)),w={},y="",z=[];if(!u){return[];}var A=u.getMetadata();var K=A.getAllSettings();if(!e){for(var i=0;i<n.attributes.length;i++){var B=n.attributes[i],N=B.name,I=K[N],F=B.value;if(N==="id"){w[N]=m(v,n,F);}else if(N==="class"){y+=F;}else if(N==="viewName"){w[N]=F;}else if(N==="fragmentName"){w[N]=F;w['containingView']=v._oContainingView;}else if((N==="binding"&&!I)||N==='objectBindings'){var G=M.bindingParser(F,v._oContainingView.oController);if(G){w.objectBindings=w.objectBindings||{};w.objectBindings[G.model||undefined]=G;}}else if(N.indexOf(":")>-1){if(B.namespaceURI==="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1"){var H=l(B);z.push(new C({key:H,value:p("any",F,H,v._oContainingView.oController)}));}else if(N.indexOf("xmlns:")!==0){q.sap.log.warning(v+": XMLView parser encountered and ignored attribute '"+N+"' (value: '"+F+"') with unknown namespace");}}else if(I&&I._iKind===0){w[N]=p(I.type,F,N,v._oContainingView.oController);}else if(I&&I._iKind===1&&I.altTypes){w[N]=p(I.altTypes[0],F,N,v._oContainingView.oController);}else if(I&&I._iKind===2){var G=M.bindingParser(F,v._oContainingView.oController);if(G){w[N]=G;}else{q.sap.log.error(v+": aggregations with cardinality 0..n only allow binding paths as attribute value (wrong value: "+N+"='"+F+"')");}}else if(I&&I._iKind===3){w[N]=v._oContainingView.createId(F);}else if(I&&I._iKind===4){w[N]=q.map(F.split(/[\s,]+/g),function(j){return j?v._oContainingView.createId(j):null;});}else if(I&&I._iKind===5){var J=V._resolveEventHandler(F,v._oContainingView.oController);if(J){w[N]=J;}else{q.sap.log.warning(v+": event handler function \""+F+"\" is not a function or does not exist in the controller.");}}else if(I&&I._iKind===-1){if(V.prototype.isPrototypeOf(u.prototype)&&N=="async"){w[N]=p(I.type,F,N,v._oContainingView.oController);}else{q.sap.log.warning(v+": setting '"+N+"' for class "+A.getName()+" (value:'"+F+"') is not supported");}}else{}}if(z.length>0){w.customData=z;}}function O(n,Q,R){var j;for(j=n.firstChild;j;j=j.nextSibling){P(n,Q,R,j);}}function P(n,Q,R,U,W){var Y;if(U.nodeType===1){Y=U.namespaceURI===o&&R&&R[l(U)];if(Y){O(U,Y);}else if(Q){if(!W&&U.getAttribute("stashed")==="true"){S.createStashedControl(m(v,U),{stashedAlias:U.getAttribute("stashedAlias"),sParentId:w["id"],sParentAggregationName:Q.name,fnCreate:function(){return P(n,Q,R,U,true);}});if(e){X.enrichTemplateIds(U,v);}return;}var Z=g(U);for(var j=0;j<Z.length;j++){var $=Z[j];var _=Q.name;if(Q.multiple){if(!w[_]){w[_]=[];}if(typeof w[_].path==="string"){w[_].template=$;}else{w[_].push($);}}else{w[_]=$;}}return Z;}else if(l(n)!=="FragmentDefinition"||n.namespaceURI!=="sap.ui.core"){throw new Error("Cannot add direct child without default aggregation defined for control "+A.getElementName());}}else if(U.nodeType===3){if(q.trim(U.textContent||U.text)){throw new Error("Cannot add text nodes as direct child of an aggregation. For adding text to an aggregation, a surrounding html tag is needed: "+q.trim(U.textContent||U.text));}}return[];}var Q=A.getDefaultAggregation();var R=A.getAllAggregations();O(n,Q,R);var T;if(e&&n.hasAttribute("id")){s(v,n);}else{if(V.prototype.isPrototypeOf(u.prototype)&&typeof u._sType==="string"){T=sap.ui.view(w,undefined,u._sType);}else{T=new u(w);}if(y&&T.addStyleClass){T.addStyleClass(y);}}if(!T){T=[];}else if(!q.isArray(T)){T=[T];}if(d){T.forEach(function(j){j._sapui_declarativeSourceInfo={xmlNode:n,xmlRootNode:v._sapui_declarativeSourceInfo.xmlRootNode,fragmentName:A.getName()==='sap.ui.core.Fragment'?w['fragmentName']:null};});}return T;}function m(v,x,i){if(x.getAttributeNS("http://schemas.sap.com/sapui5/extension/sap.ui.core.Internal/1","id")){return x.getAttribute("id");}else{return v._oContainingView.createId(i?i:x.getAttribute("id"));}}function s(v,x){x.setAttribute("id",v._oContainingView.createId(x.getAttribute("id")));x.setAttributeNS("http://schemas.sap.com/sapui5/extension/sap.ui.core.Internal/1","id",true);}};return X;},true);
