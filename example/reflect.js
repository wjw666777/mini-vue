var obj = {};
var initValue = 20;

Object.defineProperty(obj, "age", {
  get: function () {
    console.log('get')
    return initValue;
  },
  set: function (value) {
    console.log('set')
    initValue = value;
  }
});

console.log(obj.age);
obj.age = 22;
console.log(obj.age);

var example = {};

Object.defineProperty(obj,"age",{
  get: function () {
    console.log("get");
    return "get"
  },
  set: function (value) {
    console.log("set");
    return "set"
  }
  
})