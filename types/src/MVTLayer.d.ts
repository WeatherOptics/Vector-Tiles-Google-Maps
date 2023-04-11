export type VectorTileLayer = any;
export type VectorTileFeature = any;
export type TileContext = import('./MVTSource').TileContext;
export type MVTSource = import('./MVTSource').MVTSource;
export type StyleOptions = import('./MVTSource').StyleOptions;
export type featureIdFn = import('./MVTSource').featureIdFn;
export type styleFn = import('./MVTSource').styleFn;
export type filterFn = import('./MVTSource').filterFn;
export type drawFn = import('./MVTSource').drawFn;
export type MVTFeatureOptions = import('./MVTFeature').MVTFeatureOptions;
export type MVTLayerOptions = {
    name: string;
    style: styleFn | StyleOptions;
    getIDForLayerFeature: featureIdFn;
    filter: filterFn;
    customDraw: drawFn;
};
export type TileEvent = {
    tileContext: TileContext;
    feature: MVTFeature;
    tilePoint: google.maps.Point;
};
export type TileMapMouseEvent = google.maps.MapMouseEvent & TileEvent;
/**
 * @typedef {import('@mapbox/vector-tile').VectorTileLayer} VectorTileLayer
 * @typedef {import('@mapbox/vector-tile').VectorTileFeature} VectorTileFeature
 *
 * @typedef {import('./MVTSource').TileContext} TileContext
 * @typedef {import('./MVTSource').MVTSource} MVTSource
 * @typedef {import('./MVTSource').StyleOptions} StyleOptions
 * @typedef {import('./MVTSource').featureIdFn} featureIdFn
 * @typedef {import('./MVTSource').styleFn} styleFn
 * @typedef {import('./MVTSource').filterFn} filterFn
 * @typedef {import('./MVTSource').drawFn} drawFn
 * @typedef {import('./MVTFeature').MVTFeatureOptions} MVTFeatureOptions
 *
 * @typedef {object} MVTLayerOptions
 * @property {string} name
 * @property {styleFn|StyleOptions} style
 * @property {featureIdFn} getIDForLayerFeature
 * @property {filterFn} filter
 * @property {drawFn} customDraw
 *
 * @typedef {object} TileEvent
 * @property {TileContext} tileContext
 * @property {MVTFeature} feature
 * @property {google.maps.Point} tilePoint
 *
 * @typedef {google.maps.MapMouseEvent&TileEvent} TileMapMouseEvent
 */
export class MVTLayer {
    /**
     * @param {MVTLayerOptions} options
     */
    constructor(options?: MVTLayerOptions);
    /** @type {featureIdFn} */
    _getIDForLayerFeature: featureIdFn;
    /** @type {styleFn|StyleOptions} */
    style: styleFn | StyleOptions;
    /** @type {string} */
    name: string;
    /** @type {filterFn} */
    _filter: filterFn;
    /** @type {number} */
    _lineClickTolerance: number;
    /** @type {Record<String, {canvas: HTMLCanvasElement, features: Array<MVTFeature>}>} */
    _canvasAndMVTFeatures: Record<string, {
        canvas: HTMLCanvasElement;
        features: Array<MVTFeature>;
    }>;
    /** @type {Record<String, MVTFeature>} */
    _mVTFeatures: Record<string, MVTFeature>;
    /** @type {drawFn} */
    _customDraw: drawFn;
    /**
     * @param {MVTSource} mVTSource
     * @param {VectorTileLayer} vectorTileLayer
     * @param {TileContext} tileContext
     */
    parseVectorTileFeatures(mVTSource: MVTSource, vectorTileLayer: any, tileContext: TileContext): void;
    /**
     * @param {MVTSource} mVTSource
     * @param {VectorTileFeature} vectorTileFeature
     * @param {TileContext} tileContext
     * @param {number} index
     */
    _parseVectorTileFeature(mVTSource: MVTSource, vectorTileFeature: any, tileContext: TileContext, index: number): void;
    /**
     * draws all the non-selected features first, then the selected features to ensure they appear on top.
     * @param {TileContext} tileContext
     */
    drawTile(tileContext: TileContext): void;
    /**
     * @param {VectorTileFeature} feature
     * @return {StyleOptions}
     */
    getStyle(feature: any): StyleOptions;
    /**
     * updates the style for all features in the layer
     * @param {styleFn|StyleOptions} style
     */
    setStyle(style: styleFn | StyleOptions): void;
    /**
     * Set the given feature as selected
     * @param {string} featureId
     */
    setSelected(featureId: string): void;
    /**
     * Set the filter function for the layer
     * @param {filterFn} filter
     */
    setFilter(filter: filterFn): void;
    /**
     * Attaches the clicked feature to the event if it exists
     * @param {TileMapMouseEvent} event
     * @param {MVTSource} mVTSource
     * @return {TileMapMouseEvent}
     */
    handleClickEvent(event: TileMapMouseEvent, mVTSource: MVTSource): TileMapMouseEvent;
    /**
     * First searches for a clicked feature in the currently selected features in the tile, then searches for a clicked
     * feature in all features in the tile. Returns the first feature that is found to be clicked.
     * @param {TileMapMouseEvent} event
     * @param {Array<MVTFeature>} mVTFeatures
     * @param {MVTSource} mVTSource
     * @return {MVTFeature}
     */
    _handleClickEvent(event: TileMapMouseEvent, mVTFeatures: Array<MVTFeature>, mVTSource: MVTSource): MVTFeature;
    /**
     * Returns the first feature that is found to be clicked
     * @param {TileMapMouseEvent} event
     * @param {Array<MVTFeature>} mVTFeatures
     * @return {MVTFeature}
     */
    _handleClickFeatures(event: TileMapMouseEvent, mVTFeatures: Array<MVTFeature>): MVTFeature;
    /**
     * Dispatches to the appropriate handler based on the feature type and returns the result
     * @param {TileMapMouseEvent} event
     * @param {MVTFeature} mVTFeature
     * @return {boolean}
     */
    _handleClickFeature(event: TileMapMouseEvent, mVTFeature: MVTFeature): boolean;
    /**
     * Returns true if the clicked point is within the polygon feature
     * @param {TileMapMouseEvent} event
     * @param {MVTFeature} mVTFeature
     * @return {boolean}
     */
    _handleClickFeaturePolygon(event: TileMapMouseEvent, mVTFeature: MVTFeature): boolean;
    /**
     * Returns true if the clicked point is within the radius of the Point feature
     * @param {TileMapMouseEvent} event
     * @param {MVTFeature} mVTFeature
     * @return {boolean}
     */
    _handleClickFeaturePoint(event: TileMapMouseEvent, mVTFeature: MVTFeature): boolean;
    /**
     * Returns true if the click event is within the line width and tolerance of any of the line segments
     * @param {TileMapMouseEvent} event
     * @param {MVTFeature} mVTFeature
     * @return {boolean}
     */
    _handleClickFeatureLineString(event: TileMapMouseEvent, mVTFeature: MVTFeature): boolean;
}
import { MVTFeature } from "./MVTFeature.js";
