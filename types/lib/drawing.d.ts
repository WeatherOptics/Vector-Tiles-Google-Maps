/**
 * Accepts a canvas and optionally applies styles from a StyleOptions object before returning the context2d for
 * drawing.
 * @param {HTMLCanvasElement} canvas
 * @param {StyleOptions} [style={}]
 * @return {CanvasRenderingContext2D}
 */
export function getContext2d(canvas: HTMLCanvasElement, style?: StyleOptions): CanvasRenderingContext2D;
/**
 * Builds a line along all the paths in the geometry and adds each to the tile's paths2d without closing the path
 * or drawing the stroke
 * @param {TileContext} tileContext
 * @param {FeatureTile} tile
 * @return {Path2D}
 */
export function drawGeometry(tileContext: TileContext, tile: FeatureTile): Path2D;
/**
 * @param {TileContext} tileContext
 * @param {FeatureTile} tile
 * @param {StyleOptions} style
 */
export function drawPoint(tileContext: TileContext, tile: FeatureTile, style: StyleOptions): void;
/**
 * @param {TileContext} tileContext
 * @param {FeatureTile} tile
 * @param {StyleOptions} style
 */
export function drawLineString(tileContext: TileContext, tile: FeatureTile, style: StyleOptions): void;
/**
 * @param {TileContext} tileContext
 * @param {FeatureTile} tile
 * @param {StyleOptions} style
 */
export function drawPolygon(tileContext: TileContext, tile: FeatureTile, style: StyleOptions): void;
