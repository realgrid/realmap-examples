
/** 
 * RealMap Heatmap v1.0.9
 * Copyright (C) 2023-2025 WooriTech Inc.
 * All Rights Reserved. 
 */
import{HeatmapSeriesType as e,extend as r,MarkerSeries as s,MarkerSeriesPoint as t,MarkerSeriesView as a,PointViewPool as i,SeriesAnimation as o,MarkerSeriesPointView as d}from"./realmap.1.0.9.mjs";class n extends t{_readObject(e,r){super._readObject(e,r)}}class u extends s{_doApply(e){super._doApply(e)}_createPoint(e){return new n(e)}_defLabelOff(){return 2}}u.type=e,u.defaults=r(s.defaults,{mode:"grid"});class p extends d{constructor(e){super(e)}}class _ extends a{constructor(e){super(e,"rm-heatmap-series")}_createMarkers(e){return new i(e,p)}_doPrepeare(e,r,s){this.$_prepareMarkers(r,r._visPoints)}_doRender(e,r){this.$_layoutMarkers(e,r)}_doReset(){}_runShowEffect(e){e&&o.grow(this)}_doViewRateChanged(e){this.$_layoutMarkers(this.width,this.height)}$_prepareMarkers(e,r){}$_layoutMarkers(e,r){}}function c(e){(function(e){return e.Series&&e.SeriesView})(e)&&(e.Series.register(u),e.SeriesView.register([u,_]))}export{u as HeatmapSeries,c as default};
