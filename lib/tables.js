const stringMagic = (variable, key) => {
  let v;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  if (!variable) {
    v = "";
  } else if (key == "Salary") {
    v = formatter.format(variable);
  } else {
    v= String(variable)
  }
  return v;
}

const getColumnLengths = (obj) => {
  let sizeArray = [];

  for (const key in obj[0]) {
    sizeArray.push(key.length);
  }
  for (let i = 0; i < obj.length; i++) {
    keyNumber = 0;
    for (const key in obj[i]) {
      if (obj[i][key]) {
        const str = stringMagic(obj[i][key], key);
        if (str.length > sizeArray[keyNumber]) {
          sizeArray[keyNumber] = str.length;
        }
      }
      keyNumber++;
    }
  }
  return sizeArray;
};

const lineBreaks = (sizeArray) => {
  let lineStr = "";
  sizeArray.map((size) => {
    for (let i = 0; i < size; i++) {
      lineStr+= "-";
    }
    lineStr += "  ";
  })
  return lineStr;
}


const makeTable = (obj) => {
  let columnLengths = getColumnLengths(obj);
  let header = "";
  let keyNumber;
  keyNumber = 0;

  for (const key in obj[0]) {
    header += String(key).padEnd(columnLengths[keyNumber] + 2);
    keyNumber++;
  }
  console.log("");
  console.log(header);
  console.log(lineBreaks(columnLengths));
  for (let i = 0; i < obj.length; i++) {
    let line = "";
    keyNumber = 0;
    for (const key in obj[i]) {
      line += stringMagic(obj[i][key], key).padEnd(columnLengths[keyNumber] + 2);
      keyNumber++;
    }
    console.log(line);
  }
  console.log("");
};

module.exports = { makeTable };
