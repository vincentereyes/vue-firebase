<template>
    <div class="add-smoothie">
        <h2 class="center-align indigo-text">Add New Smoothie</h2>
        <form @submit.prevent="addSmoothie()">
            <div class="field title">
                <label for="title">Smoothie Title</label>
                <!-- v-model is to bind value to variable (title) -->
                <!-- putting v-model is like declaring a variable -->
                <input type="text" name="title" v-model="title">
            </div>
            <div v-for="(ingredient, index) in ingredients" :key="index" class="field">
                <label for="ingredients">Ingredient:</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ingredient)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add another Ingredient (Tab to enter)</label>
                <input type="text" name="ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Submit</button>
            </div>
        </form>
    </div>
    
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: 'AddSmoothie',
    data() {
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null
        }
    },
    methods: {
        addSmoothie() {
            if(this.title) {
                this.feedback = null
                //create slug
                this.slug = slugify(this.title), {
                    replacement: '-',
                    remove: /[*+~.()'"!:@]/g,
                    lower: true
                }
                db.collection('smoothies').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
                }).then(() => {
                    this.$router.push({ name: 'Index'})
                }).catch(err => {
                    console.log(err)
                })
            } else {
                feedback: "Title field cannot be left blank"
            }
        },
        addIng() {
            if(this.another) {
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
                
            } else {
                this.feedback = "Ingredient field cannot be left blank!"
            }
        },
        deleteIng(ing) { //DELETING FROM ARRAYS
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    }
}
</script>

<style>

.add-smoothie {
    padding: 60px;

}

.add-smoothie h2{
    font-size: 2em;
    margin: 20px auto;
}

.add-smoothie .field{
    margin: 20p auto;
    position: relative;
}

.add-smoothie .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaaaaa;
    font-size: 1.4em;
    cursor: pointer;
}

</style>