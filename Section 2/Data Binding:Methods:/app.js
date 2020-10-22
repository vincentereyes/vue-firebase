new Vue({
    el: '#app',
    data: {
        title: 'Becoming a Ninja',
        name: 'vinny',
        url: 'https://davincecode.com',
        classes: ['one', 'two', 'one', 'two', 'one', 'two', 'three', 'four']
    },
    methods: {
        greet(time){
            return `Hello there and good ${time}, ${this.name}`
        }
    }
})