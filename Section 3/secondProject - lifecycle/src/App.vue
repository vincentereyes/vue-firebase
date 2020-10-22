<template>
  <div id="app">
    <h1> {{ title }}</h1>
    <Navbar />
    <Blogs />
  </div>
</template>

<script>
import Navbar from './Navbar'
import Blogs from './Blogs'
export default {
  name: 'app',
  components:{
    Navbar,
    Blogs
  },
  data () {
    return {
      title: 'YHK'
    }
  }
}
</script>

<style>
h1{
  text-align: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
