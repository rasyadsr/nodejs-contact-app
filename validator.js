import validator from "validator";

console.log(validator.isEmail("m.rasyad.cr7@gmail.com")); // true
console.log(validator.isEmail("m.rasyad.cr7")); // false

console.log(validator.isMobilePhone("6254678976546567", "id-ID")); // false
console.log(validator.isMobilePhone("08124157147", "id-ID")); // true

console.log(validator.isNumeric("08124157147a")); // false
