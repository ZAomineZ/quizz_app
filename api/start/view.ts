import View from "@ioc:Adonis/Core/View";

View.global('range', (start, size) => {
    return [...Array(size).keys()].map(i => i + start)
})