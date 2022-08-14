const i = [
    {
        "item1": 123,
        "item2": 345
    },
    {
        "item1": 333,
        "item2": 444
    },
    {
        "item1": 123141,
        "item2": 1231144
    }
]

console.log(i.map(v => v.item1).reduce((a,b) => Math.max(a,b)));
