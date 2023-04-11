export type TileLocation = {
    x: number;
    y: number;
    z: number;
};
export type TileBounds = {
    sw: google.maps.LatLngLiteral;
    ne: google.maps.LatLngLiteral;
};
/**
 * @typedef {Object} TileLocation
 * @property {Number} x
 * @property {Number} y
 * @property {Number} z
 */
/**
 * @typedef {Object} TileBounds
 * @property {google.maps.LatLngLiteral} sw
 * @property {google.maps.LatLngLiteral} ne
 */
/**
 * Convert a `LatLng` Google Maps object to a `Point` object.
 * @param {google.maps.LatLng} latLng
 * @return {google.maps.Point}
 */
export function fromLatLngToPoint(latLng: google.maps.LatLng): google.maps.Point;
/**
 * Converts a `Point` object to a `LatLng` literal object.
 * @param {google.maps.Point} point
 * @return {google.maps.LatLngLiteral}
 */
export function fromPointToLatLng(point: google.maps.Point): google.maps.LatLngLiteral;
/**
 * Returns a `TileLocation` object given a `LatLng` Google Maps object and a specified `zoom`.
 * @param {google.maps.LatLng} latLng
 * @param {Number} zoom
 * @return {TileLocation}
 */
export function getTileAtLatLng(latLng: google.maps.LatLng, zoom: number): TileLocation;
/**
 * Returns a `TileBounds` object containing the Northeast and Southwest edges of a `TileLocation`.
 * @param {TileLocation} tile
 * @return {TileBounds}
 */
export function getTileBounds(tile: TileLocation): TileBounds;
/**
 * Normalizes the `x` and `y` of a `TileLocation` object.
 * @param {TileLocation} tile
 * @return {TileLocation}
 */
export function normalizeTile(tile: TileLocation): TileLocation;
/**
 * Converts a `LatLng` Google Maps object from coordinates on a `map` to pixels on screen.
 * @param {google.maps.Map} map
 * @param {google.maps.LatLng} latLng
 * @return {google.maps.Point}
 */
export function fromLatLngToPixels(map: google.maps.Map, latLng: google.maps.LatLng): google.maps.Point;
/**
 * Converts a `LatLng` literal object, provided through `evt`, to a `Point`.
 * @param {google.maps.Map} map
 * @param {google.maps.MapMouseEvent} evt
 * @return {google.maps.Point}
 */
export function fromLatLngToTilePoint(map: google.maps.Map, evt: google.maps.MapMouseEvent): google.maps.Point;
/**
 * Checks if a provided `point` is within a `polygon`.
 * @param {google.maps.Point} point
 * @param {google.maps.Point[]} polygon
 * @return {Boolean}
 */
export function isPointInPolygon(point: google.maps.Point, polygon: google.maps.Point[]): boolean;
/**
 * Checks if a given `x` and `y` are inside a circle.
 * @param {Number} centerX x-coordinate for the cirlce's center
 * @param {Number} centerY y-coordinate for the circle's center
 * @param {Number} radius The radius of the circle
 * @param {Number} x
 * @param {Number} y
 * @return {Boolean}
 */
export function inCircle(centerX: number, centerY: number, radius: number, x: number, y: number): boolean;
/**
 * Returns the distance a point is from a line.
 * @param {google.maps.Point} point
 * @param {google.maps.Point[]} line
 * @return {Number}
 */
export function getDistanceFromLine(point: google.maps.Point, line: google.maps.Point[]): number;
/**
 * Returns the projection of a point onto a segment of a line.
 * @param {google.maps.Point} point
 * @param {google.maps.Point} r0
 * @param {google.maps.Point} r1
 * @return {Number}
 */
export function projectPointOnLineSegment(point: google.maps.Point, r0: google.maps.Point, r1: google.maps.Point): number;
