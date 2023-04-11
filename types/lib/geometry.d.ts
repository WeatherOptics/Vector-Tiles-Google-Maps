export type TileLocation = {
    x: number;
    y: number;
    z: number;
};
/**
 * Scales a point to the current tile
 * @param {google.maps.Point} coords
 * @param {TileContext} tileContext
 * @param {Number} [divisor=1]
 * @return {google.maps.Point}
 */
export function getPoint(coords: google.maps.Point, tileContext: TileContext, divisor?: number): google.maps.Point;
/**
 * @param {string} id Tile id in format 'zoom:x:y'
 * @return {TileLocation}
 */
export function getTileFromString(id: string): TileLocation;
/**
 * @typedef {Object} TileLocation
 * @property {Number} x
 * @property {Number} y
 * @property {Number} z
 */
/**
 * @param {number} zoom
 * @param {number} x
 * @param {number} y
 * @return {string}
 */
export function getTileString(zoom: number, x: number, y: number): string;
