
/** 
 * RealMap Tiledweb v1.0.9
 * Copyright (C) 2023-2025 WooriTech Inc.
 * All Rights Reserved. 
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("realmap")):"function"==typeof define&&define.amd?define(["exports","realmap"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).RealMaptiledweb={},e.RealMap)}(this,(function(e,t){"use strict";function r(e){var t=Object.create(null);return e&&Object.keys(e).forEach((function(r){if("default"!==r){var n=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(t,r,n.get?n:{enumerable:!0,get:function(){return e[r]}})}})),t.default=e,Object.freeze(t)}var n=r(t);class i extends t.DataPoint{}class a extends t.Series{_createPoint(e){return new i(e)}}function f(e){(function(e){return e.Series&&e.SeriesView})(e)&&e.Series.register(a)}a.type=t.TiledWebSeriesType,a.defaults=t.extend(t.Series.defaults,{}),f(n),e.TiledWebSeries=a,e.default=f,Object.defineProperty(e,"__esModule",{value:!0})}));
