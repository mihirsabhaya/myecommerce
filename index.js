
var x = 99


// if (x !== '' &&  x !== null && x !== undefined) {
//   console.log("x has an value");
// }

// short form for check value is undefined, null and blank(empty)
if (!!x) {
  console.log("x han an value");
}

function name() {
  var functionData = "function variable"
  // return functionData;
}

var fData = name()
console.log(fData);