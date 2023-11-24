const xlsx = require('xlsx');
const fs = require('fs');
const filterByName = require('./filterByName')

// Define the path to your Excel file
//  path = './08-14.09.xls';

function jsonKeyEditor (arr){

    const newArr = []

    for (let i = 0; i < arr.length; i++) {
        const obj={
            name:arr[i]["__EMPTY_5"],
            price:arr[i]["__EMPTY_9"]
        }
        newArr.push(obj)
    }
    return newArr
}

function converter(path, name){
    // Read the Excel file
    const workbook = xlsx.readFile(path);
    
    // Get the first sheet of the workbook
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Convert the sheet to JSON
    const jsonDataNonFiltered = xlsx.utils.sheet_to_json(sheet);

    


    const jsonData = jsonKeyEditor(jsonDataNonFiltered)

    const jsonDataFilteredByName = filterByName(jsonData, name)

    // Write the JSON data to a file
    fs.writeFileSync((path.slice(0, path.length - 4) + 'js'), `const ${path.slice(2, path.length - 5)} = ${JSON.stringify(jsonData, null, 2)}; module.exports = ${path.slice(2, path.length - 5)} `);
    
    console.log('Conversion complete!');

    return(jsonDataFilteredByName)
}


// converter('./sepNd.xlsx')
module.exports = converter