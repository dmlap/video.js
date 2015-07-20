/**
 * @file merge-options.js
 */
import merge from 'lodash-compat/object/merge';
import isArray from 'lodash-compat/lang/isArray';

const isPlain = function(obj) {
  return !!obj
    && typeof obj === 'object'
    && obj.toString() === '[object Object]'
    && obj.constructor === Object;
};

const customizer = function(destination, source) {
  // If we're not working with a plain object, copy the value as is
  // If source is an array, for instance, it will replace destination
  if (!isPlain(source)) {
    return source;
  }

  // If the new value is a plain object but the first object value is not
  // we need to create a new object for the first object to merge with.
  // This makes it consistent with how merge() works by default
  // and also protects from later changes the to first object affecting
  // the second object's values.
  if (!isPlain(destination)) {
    return mergeOptions({}, source);
  }
};

/**
 * Merge one or more options objects, recursively merging **only**
 * plain object properties.  Previously `deepMerge`.
 *
 * @param  {Object} object    The destination object
 * @param  {...Object} source One or more objects to merge into the first
 * @returns {Object}          a new object that is the union of all
 * provided objects
 * @function mergeOptions
 */
export default function mergeOptions() {
  let args = Array.prototype.slice.call(arguments);
  args.unshift({});
  args.push(customizer);
  merge.apply(null, args);
  return args[0];
}
