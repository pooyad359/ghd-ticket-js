/**
 * Compares two arrays of objects and returns an array containing only the objects that have changed,
 * including only the modified fields from each object.
 * 
 * @param {Array<Object>} originalArray - The original array of objects
 * @param {Array<Object>} modifiedArray - The modified array of objects to compare against the original
 * @param {string} [idField='id'] - The field name to use as the identifier for each object
 * @returns {Array<Object>} An array of objects containing only the changed fields (plus the id field)
 * @throws {Error} If the arrays have different lengths
 * 
 * @example
 * const original = [{id: 1, name: 'John', age: 30}, {id: 2, name: 'Jane', age: 25}];
 * const modified = [{id: 1, name: 'John', age: 31}, {id: 2, name: 'Jane', age: 25}];
 * const changes = getChangedObjects(original, modified);
 * // Returns: [{id: 1, age: 31}]
 */
function getChangedObjects(originalArray, modifiedArray, idField = 'id') {
    // Ensure the arrays have the same length
    if (originalArray.length !== modifiedArray.length) {
      throw new Error("Arrays must have the same length");
    }
    
    const changes = [];
    
    for (let i = 0; i < originalArray.length; i++) {
      const original = originalArray[i];
      const modified = modifiedArray[i];
      const changedFields = {};
      let hasChanges = false;
      
      // Compare all fields in the modified object
      for (const key in modified) {
        // Check if the field exists in both objects and has changed
        if (original.hasOwnProperty(key) && 
            JSON.stringify(original[key]) !== JSON.stringify(modified[key])) {
          changedFields[key] = modified[key];
          hasChanges = true;
        }
        // Check for new fields added to the modified object
        else if (!original.hasOwnProperty(key)) {
          changedFields[key] = modified[key];
          hasChanges = true;
        }
      }
      
      // If any changes were found, add the object with only changed fields to the result
      if (hasChanges) {
        // Include the id of the modified object
        changes.push({
          [idField]: modified[idField],
          ...changedFields
        });
      } else {
        // No changes for this object, push null
        changes.push(null);
      }
    }
    
    // Filter out null values (unchanged objects)
    return changes.filter(item => item !== null);
  }

  export { getChangedObjects };