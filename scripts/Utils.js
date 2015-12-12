// Private Utility Functions
// =========================

// TODO - Wrap this in an object

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

  var value = PropertiesService.getUserProperties().getProperty(name)

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
  PropertiesService.getUserProperties().setProperty(name, value)

} // setProperty_()

/**
 * This is manually created and kept in the Script Properties to keep it secret
 */

function getApiKey_() {

  return PropertiesService.getScriptProperties().getProperty(PROPERTY_API_KEY)

} // getApiKey_()

/**
 * This is manually created and kept in the Script Properties to keep it secret
 */

function getSecret_() {

  return PropertiesService.getScriptProperties().getProperty(PROPERTY_SECRET)

} // getSecret_()

/**
 * 
 */

function getProjectKey_() {

  return ScriptApp.getProjectKey()

} // getProjectKey_()
