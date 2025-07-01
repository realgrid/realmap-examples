
/** 
 * RealMap Tiledweb v1.0.6
 * Copyright (C) 2023-2025 WooriTech Inc.
 * All Rights Reserved. 
 */
import{TiledWebSeriesType as e,extend as t,Series as r,DataPoint as s}from"./realmap.1.0.6.mjs";class n extends s{}class a extends r{_createPoint(e){return new n(e)}}function i(e){(function(e){return e.Series&&e.SeriesView})(e)&&e.Series.register(a)}a.type=e,a.defaults=t(r.defaults,{});export{a as TiledWebSeries,i as default};
