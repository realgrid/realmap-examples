
/** 
 * RealMap Editing v1.1.1
 * Copyright (C) 2023-2025 WooriTech Inc.
 * All Rights Reserved. 
 */
import*as r from"./realmap.1.1.1.mjs";import{MapTool as e,ChartControl as a}from"./realmap.1.1.1.mjs";class t extends e{_getDragTracker(r,e,a){return console.log("get drag tracker"),super._getDragTracker(r,e,a,!1)}}r.setGlobals({chartControl:class extends a{_creatDefaultTool(){return new t(this)}}});
