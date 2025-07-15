/* eslint-disable arrow-parens */
// Converts a string representation of a number (with optional commas) into a number.

// import moment from 'moment'

export const formatValue = value => {
  const str = value.toString()

  // Remove commas from the string
  const cleanedString = str.replace(/,/g, '')
  // Convert the cleaned string to a number
  const number = Number(cleanedString)
  // Return the number
  return number
}

export const deepCopy = array => JSON.parse(JSON.stringify(array))

export const formatDate = (str, that) => {
  // check if date is valid date by moment.js
  const isValidDate = that.$moment(str, 'YYYY-MM-DD', true).isValid()

  if (isValidDate) {
    return that.$moment(str).format('YYYY-MM-DD')
  } else {
    return ''
  }
}

export const findItem = (array, value, key = 'id') => {
  const findItem = new Map(array.map(obj => [obj[key], obj]))

  const find = findItem.get(value)

  return find
}
