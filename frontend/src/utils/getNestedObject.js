/**
 * Returns nested values from an objects, using an array of keys.
 * Credits for nested object function: https://hackernoon.com/accessing-nested-objects-in-javascript-f02f1bd6387f
 * @param {object} nestedObj - An object with nested values.
 * @param {array} pathArr - Array of string keys to form the nested value path.
 */
const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
    nestedObj
  );
};

export default getNestedObject;