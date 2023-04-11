export type VectorTileLayer = any;
export type VectorTileFeature = any;
export type FeatureTile = import('./MVTFeature').FeatureTile;
export type MVTFeature = import('./MVTFeature').MVTFeature;
export type TileMapMouseEvent = import('./MVTLayer').TileMapMouseEvent;
/**
 * - A function that generates a url
 */
export type urlFn = (zoom: number, x: number, y: number) => string;
/**
 * - A function that returns a unique id for a feature
 */
export type featureIdFn = (feature: any) => string | number;
/**
 * - A function that returns a style for a feature
 */
export type styleFn = (feature: any, name: string) => StyleOptions;
/**
 * - A function that returns a style for a feature
 */
export type drawFn = (tileContext: TileContext, tile: FeatureTile, style: StyleOptions) => void;
/**
 * - A function that returns a style for a feature
 */
export type filterFn = (feature: any, context: TileContext) => boolean;
export type MVTSourceOptions = {
    /**
     * Url to Vector Tile Source
     */
    url?: (string | urlFn);
    /**
     * Source max zoom to enable over zoom
     */
    sourceMaxZoom?: number;
    /**
     * Draw tiles lines and ids
     */
    debug?: boolean;
    /**
     * Load tiles in cache to avoid duplicated requests
     */
    cache?: boolean;
    /**
     * Tile size
     */
    tileSize?: number;
    /**
     * List of visible layers
     */
    visibleLayers?: Array<string>;
    /**
     * List of layers that are clickable
     */
    clickableLayers?: Array<string>;
    /**
     * List of selected features
     */
    selectedFeatures?: Array<string>;
    /**
     * Function to get id for layer feature
     */
    getIDForLayerFeature?: featureIdFn;
    /**
     * Styling function
     */
    style?: styleFn;
    /**
     * Filter function
     */
    filter?: filterFn;
    /**
     * Custom draw function
     */
    customDraw?: drawFn;
};
export type TileContext = {
    /**
     * Tile id in format 'zoom:x:y'
     */
    id: string;
    /**
     * Canvas element for drawing tile
     */
    canvas: HTMLCanvasElement;
    /**
     * Zoom level this tile belongs to
     */
    zoom: number;
    /**
     * Tile size
     */
    tileSize: number;
    /**
     * Parent tile id in format 'zoom:x:y'
     */
    parentId: string;
    vectorTile?: VectorTile;
};
export type StyleOptions = {
    /**
     * Fill color
     */
    fillStyle: string;
    /**
     * Stroke color
     */
    strokeStyle: string;
    /**
     * Stroke width
     */
    lineWidth: number;
    /**
     * Point radius
     */
    radius: number;
    /**
     * Selected style
     */
    selected: StyleOptions;
};
export type ClickHandlerOptions = {
    /**
     * Trigger events only to the first visible layer
     */
    limitToFirstVisibleLayer?: boolean;
    /**
     * Multiple feature selection
     */
    multipleSelection?: boolean;
    /**
     * Set feature selected style
     */
    setSelected?: boolean;
    /**
     * Toggle feature selected style
     */
    toggleSelection?: boolean;
    /**
     * If new event is triggered before delay, old event will be ignored. Used to avoid
     * overload on mousemove event
     */
    delay?: number;
};
/**
 * MVTSource is a class to load and draw Vector Tiles from a source.
 * @class
 * @implements {google.maps.MapType}
 */
export class MVTSource implements google.maps.MapType {
    /**
     * @param {google.maps.Map} map
     * @param {MVTSourceOptions} options
     */
    constructor(map: google.maps.Map, options?: MVTSourceOptions);
    /** @type {(string|urlFn)} Url to Vector Tile Source */
    _url: (string | urlFn);
    /** @type {number} Source max zoom to enable over zoom */
    _sourceMaxZoom: number;
    /** @type {boolean} Draw tiles lines and ids */
    _debug: boolean;
    /** @type {Array<String>} List of visible layers */
    _visibleLayers: Array<string>;
    /** @type {Array<String>} List of layers that are clickable */
    _clickableLayers: Array<string>;
    /** @type {boolean} Load tiles in cache to avoid duplicated requests */
    _cache: boolean;
    /** @type {number} Default tile size */
    _tileSize: number;
    /** @type {filterFn} filter function to allow/deny features */
    _filter: filterFn;
    /** @type {Record<string, string>} Additional headers to add when requesting tiles from the server */
    _xhrHeaders: Record<string, string>;
    /** @type {drawFn} */
    _customDraw: drawFn;
    /** @type {boolean} Allow multiple selection */
    _multipleSelection: boolean;
    /** @type {Record<string, TileContext>} List of tiles drawn. Only populated when cache enabled */
    _tilesDrawn: Record<string, TileContext>;
    /** @type {Record<string, TileContext>} List of tiles currently in the viewport */
    _visibleTiles: Record<string, TileContext>;
    /** @type {Record<string, MVTFeature>} List of selected features */
    _selectedFeatures: Record<string, MVTFeature>;
    /** @type {google.maps.Map} */
    map: google.maps.Map;
    /** @type {featureIdFn} Function to get id for layer feature */
    getIDForLayerFeature: featureIdFn;
    /** @type {google.maps.Size} */
    tileSize: google.maps.Size;
    /** @type {styleFn|StyleOptions} */
    style: styleFn | StyleOptions;
    /** @type {Record<string, MVTLayer>} Keep a list of the layers contained in the PBFs */
    mVTLayers: Record<string, MVTLayer>;
    /**
     * Invoked by the Google Maps API as part of the MapType interface.
     * Returns a tile for the given tile coordinate (x, y) and zoom level. This tile will be appended to the given
     * ownerDocument. Not available for base map types.
     * @param {google.maps.Point} tileCoord
     * @param {number} zoom
     * @param {Document} ownerDocument
     * @return {Element}
     */
    getTile(tileCoord: google.maps.Point, zoom: number, ownerDocument: Document): Element;
    /**
     * Invoked by the Google Maps API as part of the MapType interface.
     * Releases the given tile, performing any necessary cleanup. The provided tile will have already been removed from
     * the document. Optional.
     * @param {Element} tile
     */
    releaseTile(tile: Element): void;
    /**
     * @param {google.maps.Point} coord
     * @param {number} zoom
     * @param {Document} ownerDocument
     * @return {TileContext}
     */
    drawTile(coord: google.maps.Point, zoom: number, ownerDocument: Document): TileContext;
    /**
     * @param {TileContext} tileContext
     */
    _fetchTile(tileContext: TileContext): Promise<void>;
    /**
     * @param {VectorTile} vectorTile
     * @param {TileContext} tileContext
     */
    _drawVectorTile(vectorTile: VectorTile, tileContext: TileContext): void;
    /**
     * @param {VectorTileLayer} vectorTileLayer
     * @param {string} name
     * @param {TileContext} tileContext
     */
    _drawVectorTileLayer(vectorTileLayer: any, name: string, tileContext: TileContext): void;
    /**
     * Creates a new MVTLayer instance
     * @param {string} name name of the layer
     * @return {MVTLayer} MVTLayer instance
     */
    _createMVTLayer(name: string): MVTLayer;
    /**
     * @param {TileContext} tileContext
     */
    _drawDebugInfo(tileContext: TileContext): void;
    /**
     * Wrap a mouse click event with a callback function
     * @param {google.maps.MapMouseEvent} event
     * @param {(event: TileMapMouseEvent)} callbackFunction
     * @param {ClickHandlerOptions} options
     */
    onClick(event: google.maps.MapMouseEvent, callbackFunction: (event: TileMapMouseEvent) => any, options: ClickHandlerOptions): void;
    /**
     * Wrap a mouse hover event with a callback function
     * @param {google.maps.MapMouseEvent} event
     * @param {(event: TileMapMouseEvent)} callbackFunction
     * @param {ClickHandlerOptions} options
     */
    onMouseHover(event: google.maps.MapMouseEvent, callbackFunction: (event: TileMapMouseEvent) => any, options: ClickHandlerOptions): void;
    /**
     * @param {google.maps.MapMouseEvent} event
     * @param {(event: TileMapMouseEvent)} callbackFunction
     * @param {ClickHandlerOptions} options
     */
    _mouseEvent(event: google.maps.MapMouseEvent, callbackFunction: (event: TileMapMouseEvent) => any, options: ClickHandlerOptions): void;
    /**
     * @param {google.maps.MapMouseEvent} event
     * @param {(event: TileMapMouseEvent)} [callbackFunction=()=>{}]
     * @param {ClickHandlerOptions} options
     */
    _mouseEventContinue(event: google.maps.MapMouseEvent, callbackFunction?: (event: TileMapMouseEvent) => any, options: ClickHandlerOptions): void;
    /**
     * @param {TileMapMouseEvent} event
     * @param {(event: TileMapMouseEvent)} callbackFunction
     * @param {ClickHandlerOptions} options
     */
    _mouseSelectedFeature(event: TileMapMouseEvent, callbackFunction: (event: TileMapMouseEvent) => any, options: ClickHandlerOptions): void;
    deselectAllFeatures(): void;
    /**
     * @param {MVTFeature} mVTFeature
     */
    featureSelected(mVTFeature: MVTFeature): void;
    /**
     * @param {MVTFeature} mvtFeature
     */
    featureDeselected(mvtFeature: MVTFeature): void;
    /**
     * @param {Array<String>} featuresIds
     */
    setSelectedFeatures(featuresIds: Array<string>): void;
    /**
     * @param {string} featureId
     * @return {boolean}
     */
    isFeatureSelected(featureId: string): boolean;
    /**
     * @return {Array<MVTFeature>}
     */
    getSelectedFeatures(): Array<MVTFeature>;
    /**
     * @param {string} tileContextId tile id in the format 'zoom:x:y'
     * @return {Array<MVTFeature>}
     */
    getSelectedFeaturesInTile(tileContextId: string): Array<MVTFeature>;
    /**
     * @param {filterFn} filter
     * @param {boolean} [redrawTiles=true]
     */
    setFilter(filter: filterFn, redrawTiles?: boolean): void;
    /**
     * @param {styleFn|StyleOptions} style
     * @param {boolean} [redrawTiles=true]
     */
    setStyle(style: styleFn | StyleOptions, redrawTiles?: boolean): void;
    /**
     * @param {Array<string>} visibleLayers
     * @param {boolean} [redrawTiles=true]
     */
    setVisibleLayers(visibleLayers: Array<string>, redrawTiles?: boolean): void;
    /**
     * @return {Array<string>}
     */
    getVisibleLayers(): Array<string>;
    /**
     * @param {Array<string>} clickableLayers
     */
    setClickableLayers(clickableLayers: Array<string>): void;
    /**
     * Redraw all visible tiles
     */
    redrawAllTiles(): void;
    /**
     * Redraw the tiles specified by ab array of tile ids
     * @param {Array<string>} tiles
     */
    redrawTiles(tiles?: Array<string>): void;
    /**
     * Redraw the tile specified by the tile id
     * @param {string} id
     */
    redrawTile(id: string): void;
    /**
     * @param {HTMLCanvasElement} canvas
     */
    clearTile(canvas: HTMLCanvasElement): void;
    /**
     * @param {string} url url of the MVT source
     * @param {boolean} [redrawTiles=true]
     */
    setUrl(url: string, redrawTiles?: boolean): void;
}
import { MVTLayer } from "./MVTLayer.js";
