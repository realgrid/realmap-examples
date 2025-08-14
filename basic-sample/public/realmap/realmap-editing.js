
/** 
 * RealMap Editing v1.0.10
 * Copyright (C) 2023-2025 WooriTech Inc.
 * All Rights Reserved. 
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("realmap")):"function"==typeof define&&define.amd?define(["realmap"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).RealMap)}(this,(function(e){"use strict";function t(e){var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var r=t(e);class n extends e.MapTool{_getDragTracker(e,t,r){return console.log("get drag tracker"),super._getDragTracker(e,t,r)}}class a extends e.ChartControl{_creatDefaultTool(){return new n(this)}}r.setGlobals({chartControl:a})}));
