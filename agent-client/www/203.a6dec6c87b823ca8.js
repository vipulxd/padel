"use strict";(self.webpackChunkagent_client=self.webpackChunkagent_client||[]).push([[203],{4203:(w,s,t)=>{t.r(s),t.d(s,{Network:()=>l,NetworkWeb:()=>i});var c=t(5861),r=t(7423);function a(){const o=window.navigator.connection||window.navigator.mozConnection||window.navigator.webkitConnection;let n="unknown";const e=o?o.type||o.effectiveType:null;if(e&&"string"==typeof e)switch(e){case"bluetooth":case"cellular":case"slow-2g":case"2g":case"3g":n="cellular";break;case"none":n="none";break;case"ethernet":case"wifi":case"wimax":case"4g":n="wifi";break;case"other":case"unknown":n="unknown"}return n}class i extends r.Uw{constructor(){super(),this.handleOnline=()=>{const n=a();this.notifyListeners("networkStatusChange",{connected:!0,connectionType:n})},this.handleOffline=()=>{this.notifyListeners("networkStatusChange",{connected:!1,connectionType:"none"})},"undefined"!=typeof window&&(window.addEventListener("online",this.handleOnline),window.addEventListener("offline",this.handleOffline))}getStatus(){var n=this;return(0,c.Z)(function*(){if(!window.navigator)throw n.unavailable("Browser does not support the Network Information API");const e=window.navigator.onLine,u=a();return{connected:e,connectionType:e?u:"none"}})()}}const l=new i}}]);