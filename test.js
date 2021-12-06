const obj1 = {
  name: "peter",
  age: 12,
  hobbies: "playing pingpang",
  arr: [1, 2, 3],
  //   gift: Symbol("obj1"),
  reg: /\w$/gim,
};
const obj2 = {
  name: "bob",
  hobbies: "playing pingpang",
  age: 13,
};
const obj3 = {
  name: "peter",
  age: 12,
  arr: [1, 2, 3],
  hobbies: "playing pingpang",
  //   gift: Symbol("obj3"),
  reg: /^\d$/gim,
};

console.log(_.isEqual(obj1, obj3));
