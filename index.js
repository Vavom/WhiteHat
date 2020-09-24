
const childOf = function(){ return this.parents.map(p => p.name) }
const parentOf = function() { return this.children.map(c => c.name)}
const oldAge = function() {if (this.age > 60) {console.log('They are the elderly')} else {console.log('They are young!')}}

const grandma1 = {name:'Marilyn', age:77 ,parents: [],parentOf ,childOf,oldAge}
const grandma2 = {name:'Sarah', age:67 ,parents: [], parentOf ,childOf,oldAge}
const grandpa1 = {name:'Ian', age:79 ,parents: [],parentOf ,childOf,oldAge}
const grandpa2 = {name:'Moshe', age:70 ,parents: [],parentOf ,childOf,oldAge}

const mum = {name:'Ann', age:50 ,parents:[grandma1, grandpa1] ,parentOf , childOf,oldAge}
const dad = {name:'Ronnie', age:51 ,parents: [grandma2, grandpa2],parentOf , childOf,oldAge}

const noah = {name:'Noah', age:18 ,parents: [mum, dad], childOf,oldAge};
const moshe = {name:'Moshe', age:22 ,parents: [mum, dad], childOf,oldAge}
const samantha = {name:'Samantha', age:24 ,parents: [mum, dad], childOf,oldAge}

const auntie1 = {name:'Jaquelin', age:50 ,parents: [grandpa1, grandma1] , childOf,oldAge}
const auntie2 = {name:'Hela', age:64 ,parents: [grandpa2, grandma2], childOf,oldAge}
const auntie3 = {name:'Martina', age:32 ,parents: [grandpa2, grandma2], childOf,oldAge}

const uncle1 = {name:'Michael', age:52 ,parents: [grandpa1, grandma1], childOf,oldAge}
const uncle2 = {name:'Sunny', age:48 ,parents: [grandpa2, grandma2], childOf,oldAge}

// class Moshe {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     ageOf() {
//         return this.age;
//     }
// }

// const mosheObj = new Moshe("mo", 24);





const genChild = [noah, moshe, samantha]
const genParent = [mum, dad, uncle1, uncle2, auntie1, auntie2, auntie3]




