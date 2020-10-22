new Vue({
    el: '#app',
    data: {
        title: 'Becoming a Ninja',
        name: 'vince'
        
    },
    methods: {
        updateName(e){
            this.name = e.target.value
        }
    }
})