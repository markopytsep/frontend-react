import {DOLLAR, EURO, POUND, SWISS_FRANK} from './constantsjs';

export function calculatePrices(input) {
  const currencies = ['£', '$', '€']
  const lines = input.split("\n")

  if (lines.length < 6) {
    return
  }

  let currency = ''
  let block = 0
  let result = {}
  result.items = []

  let item = {}
  for (var line of lines) {
    block++;
    // total shipping of package
    if (line.startsWith('Shipping')) {
      let shipping = line.split('\t')
      if (shipping.length === 2) {
        let shippingString = shipping[1]
        shippingString = shippingString.replace('£', '')
        shippingString = shippingString.replace('€', '')
        shippingString = shippingString.replace('$', '')
        shippingString = shippingString.replace('CHF', '')
        result.shipping = shippingString
      }
      break
    }

    // Item name and item price
    if (block === 2) {
      item = {}
      item.name = line
      result.items.push(item)
    }

    if (currencies.includes(line.charAt(0))) {
      currency = getCurrency(line)
      item.price = line.substr(1)
      block = 0
    }
  }
  result.currency = currency
  return result
}

export function getCurrency(input) {
  if (input.charAt(0) === '£') {
    return 'POUND'
  } else if (input.charAt(0) === '$') {
    return 'DOLLAR'
  } else if (input.charAt(0) === 'CHF') {
    return 'SWISS_FRANK'
  } else {
    return 'EURO'
  }
}
