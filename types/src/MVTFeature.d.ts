export type MVTSource = import('./MVTSource').MVTSource;
export type TileContext = import('./MVTSource').TileContext;
export type StyleOptions = import('./MVTSource').StyleOptions;
export type drawFn = import('./MVTSource').drawFn;
export type VectorTileFeature = any;
export type MVTFeatureOptions = {
    mVTSource: MVTSource;
    /**
     * Indicates if these feature has ben selected and should be using the "selected" styles
     */
    selected: boolean;
    /**
     * The feature id
     */
    featureId: string;
    style: StyleOptions;
    vectorTileFeature: any;
    tileContext: TileContext;
    customDraw: drawFn;
};
export type FeatureTile = {
    vectorTileFeature: any;
    divisor: number;
    paths2d: Path2D;
};
export class MVTFeature {
    /**
     * @param {MVTFeatureOptions} options
     */
    constructor(options?: MVTFeatureOptions);
    /** @type {MVTSource} */
    mVTSource: MVTSource;
    /** @type {boolean} Indicates if these feature has ben selected and should be using the "selected" styles */
    selected: boolean;
    /** @type {string} The feature id */
    featureId: string;
    /** @type {StyleOptions} */
    style: StyleOptions;
    /** @type {1|2|3} */
    type: 1 | 2 | 3;
    /** @type {object} */
    properties: object;
    /** @type {drawFn} */
    _draw: drawFn;
    /** @type {Record<string, FeatureTile>} */
    tiles: Record<string, FeatureTile>;
    /**
     * @param {VectorTileFeature} vectorTileFeature
     * @param {TileContext} tileContext
     */
    addTileFeature(vectorTileFeature: any, tileContext: TileContext): void;
    /**
     * Redraw all the tiles that this feature is in. Used to apply styling changes
     */
    redrawTiles(): void;
    /**
     * Set this feature as selected or not. The feature will be redrawn with the correct style
     * @param {boolean} selected
     */
    setSelected(selected: boolean): void;
    /**
     * Draws the given tile using the correct style based on selected state
     * @param {TileContext} tileContext
     */
    draw(tileContext: TileContext): void;
    /**
     * Returns the scaled paths for this feature
     * @param {TileContext} tileContext
     * @return {Array<Array<Point>>}
     */
    getPaths(tileContext: TileContext): Array<Array<Point>>;
    /**
     * Returns whether or not a given point exists in any path in the feature
     * @param {Point} point
     * @param {TileContext} tileContext
     * @return {boolean}
     */
    isPointInPath(point: Point, tileContext: TileContext): boolean;
}
