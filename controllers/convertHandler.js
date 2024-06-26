function numberStringSplitter (input) {
  const numberMatches = input.match(/[\d./]+/g) || ['1']
  const stringMatches = input.match(/[a-zA-Z]+/g)

  return [numberMatches[0], stringMatches[0]]
}

function checkDivision (input) {
  const numbers = input.split('/')
  return numbers.length > 2 ? false : numbers
}

function ConvertHandler () {
  this.getNum = function (input) {
    const number = numberStringSplitter(input)[0]
    const numbers = checkDivision(number)

    if (!numbers) {
      return undefined
    } else {
      const numerator = numbers[0]
      const denominator = numbers[1] || '1'

      const result = parseFloat(numerator) / parseFloat(denominator)
      return result
    }
  }

  this.getUnit = function (input) {
    const string = numberStringSplitter(input)[1]
    const result = string.toLowerCase()

    switch (result) {
      case 'km':
        return 'km'
      case 'gal':
        return 'gal'
      case 'lbs':
        return 'lbs'
      case 'mi':
        return 'mi'
      case 'l':
        return 'L'
      case 'kg':
        return 'kg'
      default:
        return undefined
    }
  }

  this.getReturnUnit = function (initUnit) {
    const result = initUnit.toLowerCase()

    switch (result) {
      case 'km':
        return 'mi'
      case 'mi':
        return 'km'
      case 'gal':
        return 'L'
      case 'l':
        return 'gal'
      case 'lbs':
        return 'kg'
      case 'kg':
        return 'lbs'
      default:
        return undefined
    }
  }

  this.spellOutUnit = function (unit) {
    const result = unit.toLowerCase()

    switch (result) {
      case 'km':
        return 'kilometers'
      case 'gal':
        return 'gallons'
      case 'lbs':
        return 'pounds'
      case 'mi':
        return 'miles'
      case 'l':
        return 'liters'
      case 'kg':
        return 'kilograms'
      default:
        return 'unknown unit'
    }
  }

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541
    const lbsToKg = 0.453592
    const miToKm = 1.60934
    let result

    switch (initUnit.toLowerCase()) {
      case 'km':
        result = initNum / miToKm
        break
      case 'gal':
        result = initNum * galToL
        break
      case 'lbs':
        result = initNum * lbsToKg
        break
      case 'mi':
        result = initNum * miToKm
        break
      case 'l':
        result = initNum / galToL
        break
      case 'kg':
        result = initNum / lbsToKg
        break
      default:
        result = undefined
    }

    return parseFloat(result.toFixed(5))
  }

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    const result = `${initNum} ${this.spellOutUnit(
			initUnit
		)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`

    return result
  }
}

module.exports = ConvertHandler
