/* === stringMagic ===
Pass in a variable and it's key and returns a formatted string
Salary is formatted into USD
Null values return empty string
=== stringMagic ===*/
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
    v = String(variable);
  }
  return v;
};

/* === getColumnLengths ===
Pass in an array of objects and returns an array of column lengths based
on the text length of the keys and/or content (whichever is larger)
=== getColumnLengths ===*/
const getColumnLengths = (obj) => {
  let sizeArray = [];

  // sets initial column lengths based on obj key lengths
  for (const key in obj[0]) {
    sizeArray.push(key.length);
  }
  // increases column length based on max length of content
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

/* === lineBreaks ===
Pass in an array of column lengths and returns a string of dashes for the border
between header and contents
=== lineBreaks ===*/
const lineBreaks = (sizeArray) => {
  let lineStr = "";
  sizeArray.map((size) => {
    for (let i = 0; i < size; i++) {
      lineStr += "-";
    }
    lineStr += "  ";
  });
  return lineStr;
};

/* === makeTable ===
Pass in an array of objects to console log a table of the contents
Object keys are used as the header
Assumes each object in the array has the same keys
=== makeTable ===*/
const makeTable = (obj) => {
  let columnLengths = getColumnLengths(obj); //array of column lengths based on obj contents
  let header = "";
  let keyNumber;
  keyNumber = 0;

  // creates string for the table header from object keys in the first array element
  for (const key in obj[0]) {
    header += String(key).padEnd(columnLengths[keyNumber] + 2);
    keyNumber++;
  }
  console.log(header);
  console.log(lineBreaks(columnLengths)); // line between header and contents
  // creates each line of the table from obj contents
  for (let i = 0; i < obj.length; i++) {
    let line = "";
    keyNumber = 0;
    for (const key in obj[i]) {
      line += stringMagic(obj[i][key], key).padEnd(
        columnLengths[keyNumber] + 2
      );
      keyNumber++;
    }
    console.log(line);
  }
  console.log("");
};

module.exports = { makeTable };
