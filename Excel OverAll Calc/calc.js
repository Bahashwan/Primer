const augYandex = require('./augYandex');
// const sepNd = require('./ExcelToJs/08-14.09.js') // 20348.56
const excelConverter = require('./excelConverter');
const filterByName = require('./filterByName');

const name = 'Аль-Карам';

function monthCalc(arr) {
  var result = 0;

  for (let i = 0; i < arr.length; i++) {
    let ICalc =
      Number(arr[i].price) + Number(arr[i].comTotal) + Number(arr[i].paidSub);
    result += ICalc;
  }
  result = 0.92 * result;
  return result;
}

function weekCalc(arr) {
  var result = 0;

  for (let i = 0; i < arr.length; i++) {
    result += Number(arr[i].price);
  }
  //  result = 0.92 * result
  return result;
}

function getResultsWeek(path,name ) {
  const convertedPath = excelConverter(path, name);

  console.log(weekCalc(convertedPath));
}

getResultsWeek('./sepNd.xlsx', 'Аль-Карам')