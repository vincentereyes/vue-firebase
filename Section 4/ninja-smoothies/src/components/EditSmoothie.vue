<template>
    <div v-if="smoothie" class="edit-smoothie container">
        <!-- Below is how to access slug from url parameter -->
        <h2>Edit {{ smoothie.title }}</h2> 
        <form @submit.prevent="editSmoothie()">
            <div class="field title">
                <label for="title">Smoothie Title</label>
                <!-- v-model is to bind value to variable (title) -->
                <!-- putting v-model is like declaring a variable -->
                <input type="text" name="title" v-model="smoothie.title">
            </div>
            <div v-for="(ingredient, index) in smoothie.ingredients" :key="index" class="field">
                <label for="ingredients">Ingredient:</label>
                <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ingredient)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add another Ingredient (Tab to enter)</label>
                <input type="text" name="ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Update</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'EditSmoothie',
    data() {
        return {
            smoothie: null,
            another: null, 
            feedback: null
        }
    },
    methods: {
        editSmoothie(){
            if(this.smoothie.title) {
                this.feedback = null
                //create slug
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[*+~.()'"!:@]/g,
                    lower: true
                })
                // Updating smoothie using auto-generated id which is accessible thru created()
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
                    slug: this.smoothie.slug
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
                this.smoothie.ingredients.push(this.another)
                this.another = null
                this.feedback = null
                
            } else {
                this.feedback = "Ingredient field cannot be left blank!"
            }
        },
        deleteIng(ing) { //DELETING FROM ARRAYS
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    },
    created() {
        //WHERE - FETCHES DOCUMENT WHERE PROPERTY = PROPERTY (ID = ID)
        //PARAMETERS WHERE(PROPERTY, COMPARISON(==, >, <), EQUAL OR GREATER THAN TO WHAT? )
        let ref = db.collection('smoothies').where('slug', '==', this.$route.params.slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            })
        })
    }
}
</script>

<style>
.edit-smoothie {
    margin-top: 60px;
    padding: 60px;

}

.edit-smoothie h2{
    font-size: 2em;
    margin: 20px auto;
}

.edit-smoothie .field{
    margin: 20p auto;
    position: relative;
}

.edit-smoothie .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaaaaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>