
/** 
 * RealMap Table v1.0.9
 * Copyright (C) 2023-2025 WooriTech Inc.
 * All Rights Reserved. 
 */
import{TableSeriesType as e,extend as r,MarkerSeries as s,MarkerSeriesPoint as t,MarkerSeriesView as a,PointViewPool as i,SeriesAnimation as o,MarkerSeriesPointView as n}from"./realmap.1.0.9.mjs";class d extends t{_readObject(e,r){super._readObject(e,r)}}class u extends s{_doApply(e){super._doApply(e)}_createPoint(e){return new d(e)}_defLabelOff(){return 2}}u.type=e,u.defaults=r(s.defaults,{});class _ extends n{constructor(e){super(e)}}class p extends a{constructor(e){super(e,"rm-table-series")}_createMarkers(e){return new i(e,_)}_doPrepeare(e,r,s){this.$_prepareMarkers(r,r._visPoints)}_doRender(e,r){this.$_layoutMarkers(e,r)}_doReset(){}_runShowEffect(e){e&&o.grow(this)}_doViewRateChanged(e){this.$_layoutMarkers(this.width,this.height)}$_prepareMarkers(e,r){}$_layoutMarkers(e,r){}}function c(e){(function(e){return e.Series&&e.SeriesView})(e)&&(e.Series.register(u),e.SeriesView.register([u,p]))}export{u as TableSeries,c as default};
