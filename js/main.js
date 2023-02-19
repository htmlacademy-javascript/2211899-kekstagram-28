// 1 пример
const getStringLenght = (string, stringLength) => {
  return string.length <= stringLength;
};

// 2 пример
const getStringLenght = (string, stringLength) => {
  return string.length <= stringLength;
};
const getIsStringPalindrom = (stringSS) => {
  let stWithoutWS = stringSS.replace(/\s/g, "");
  let arrayOfSymbols = stWithoutWS.toLowerCase().split("");

  for (let i = 0; i <= arrayOfSymbols.length / 2; i++) {
    if (arrayOfSymbols.at(i) != arrayOfSymbols.at(-i - 1)) {
      return "Word is not a palindrom";
    } else {
      return "Word is a palindrom";
    }
  }
};
console.log(getIsStringPalindrom("Лёша на полке клопа нашёл "));

// 3 пример

const getNumberFromString = (str) => {
  let regex = /\d+/g;
  let matches = str.match(regex);
  let resultStr = "";
  if (matches != null) {
    let result = matches.forEach((match) => {
      resultStr += match;
    });
    return resultStr;
  } else {
    return NaN;
  }
};
console.log(getNumberFromString("4а 3я то2м23ат"));

// 4 пример

const getStringWithAdditional = (str, maxStrLength, additionalSymb) => {
  let cuttedAdditionalSymb = additionalSymb.substring(0, maxStrLength);
  let reversedArrayOfAddSymb = cuttedAdditionalSymb
    .split("")
    .reverse()
    .join("");
  let arrayOfSymbols = str.split("");
  if (maxStrLength > str.length) {
    for (let index = 1; index < maxStrLength; index++) {
      //Проверка для одного символа
      if (reversedArrayOfAddSymb.length == 1) {
        arrayOfSymbols.unshift(reversedArrayOfAddSymb[0]);
      }
      //Проверка для полтора
      else if (
        additionalSymb.length > 1 &&
        additionalSymb.length + str.length < maxStrLength
      ) {
        arrayOfSymbols.unshift(reversedArrayOfAddSymb[index - 1]);
        if (arrayOfSymbols.length < maxStrLength) {
          arrayOfSymbols.unshift(cuttedAdditionalSymb[0]);
        }
      }
      //Проверка на совпадение суммы длинны доп. выражения и строки с максимальной длиной строки
      else if (additionalSymb.length + str.length == maxStrLength) {
        arrayOfSymbols.unshift(reversedArrayOfAddSymb[index - 1]);
      }
      //Проверка, когда длина доб. символа превышает максимальную длину строки
      else {
        arrayOfSymbols.unshift(reversedArrayOfAddSymb[index]);
      }
    }
    console.log(arrayOfSymbols.join(""));
  }
  //Когда нет добавочных символов
  else {
    console.log(str);
  }
};

// Добавочный символ использован один раз
getStringWithAdditional("1", 2, "0");
// Результат: строка '01'

// Добавочный символ использован три раза
getStringWithAdditional("1", 4, "0");
// Результат: строка '0001'

// Добавочные символы обрезаны с конца
getStringWithAdditional("q", 4, "werty");
// Результат: строка 'werq'

// Добавочные символы использованы полтора раза
getStringWithAdditional("q", 4, "we");
// Результат: строка 'wweq'

// Добавочные символы не использованы, исходная строка не изменена
getStringWithAdditional("qwerty", 4, "0");
// Результат: строка 'qwerty'

// Добавочные символы использованы полтора раза
getStringWithAdditional("q", 4, "wew");
// Результат: строка 'wewq'
