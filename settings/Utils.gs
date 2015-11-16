// Private Utility Functions
// =========================

/**
 * 
 */

function setDefault_(value, defaultValue) {

  return (typeof value === 'undefined') ? defaultValue : value 
  
} // setDefault_()

/**
 * 
 */

function assertDefined_(value) {

  if (typeof value === 'undefined') {
    throw new Error('value not defined')
  }

} // assertDefined_()

/**
 * Assert a value is a string
 *
 * @param {object} testValue The value to test
 * @param {string} errorMessage The error message to throw 
 */

function assertStringNotEmpty_(testValue, errorMessage) {

  if (typeof testValue !== 'string' && testValue !== '') {
  
    throw new TypeError(errorMessage)
  }
  
} // assertStringNotEmpty_()

/**
 * 
 */

var OnNull = Object.freeze({
  ERROR: true,
  IGNORE: false,
})

function getProperty_(name, errorOnNull, errorMessage) {

  var value = PropertiesService
    .getScriptProperties()
    .getProperty(name)

  if (errorOnNull && value === null) {
    throw new Error(errorMessage)
  }

  return value

} // getProperty_()

/**
 * 
 */

function setProperty_(name, value, errorString) {

  assertStringNotEmpty_(value, errorString)

  PropertiesService
    .getScriptProperties()
    .setProperty(name, value)

} // setProperty_()

