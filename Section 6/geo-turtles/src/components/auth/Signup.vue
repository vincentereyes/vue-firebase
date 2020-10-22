<template>
    <div class="signup container">
        <form @submit.prevent="signup()" class="card-panel" >
            <h2 class="center deep-purple-text">Add User</h2>
            <div class="field">
                <label for="fname">First Name:</label>
                <input type="text" name="fname" v-model="fname" required>
            </div>
            <div class="field">
                <label for="lname">Last Name:</label>
                <input type="text" name="lname" v-model="lname" required>
            </div>
            <div class="field">
                <label for="email">Email:</label>
                <input type="email" name="email" v-model="email" required>
            </div>
            <div class="field">
                <label for="password">Password:</label>
                <input type="password" name="password" v-model="password" required>
            </div>
            <div class="field">
                <label for="cpassword">Confirm Password:</label>
                <input type="password" name="cpassword" v-model="cpassword" required>
            </div>
            <div class="field">
                <label for="department">Department:</label>
                <input type="text" name="department" v-model="department" required>
            </div>
            <p class="red-text center" v-if="feedback">{{ feedback }}</p>
            <div class="field center">
                <button class="btn deep-purple">Signup</button>
            </div>
        </form>
    </div>
</template>

<script>
import slugify from 'slugify'
import db from '@/firebase/init'
import firebase from 'firebase'


export default {
    name: 'Signup',
    data() {
        return {
            fname: null,
            lname: null,
            email: null,
            password: null,
            cpassword: null,
            department: null,
            feedback: null,
            createdUid: null
        }  
    },
    methods: {
        signup() {
            // var firebaseConfig = {
            //     apiKey: "AIzaSyD1RusSDlkaBUVKJgFBowTQgyO2-Gqc2Ss",
            //     authDomain: "geo-turtles.firebaseapp.com",
            //     databaseURL: "https://geo-turtles.firebaseio.com"
            // }
            // var secondaryApp = firebase.initializeApp(firebaseConfig);

            let authWorkerApp = this.getFirebaseApp('auth-worker')
            let authWorkerAuth = firebase.auth(authWorkerApp);
            authWorkerAuth.setPersistence(firebase.auth.Auth.Persistence.NONE); // disables caching of account credentials

            authWorkerAuth.createUserWithEmailAndPassword(this.email, this.password)
            .then(cred => {
                let ref = db.collection('users').doc(cred.user.uid)
                ref.get().then(doc => {
                    ref.set({
                        fname: this.fname,
                        lname: this.lname,
                        department: this.department
                    })
                })
            }).catch(err => {
                this.feedback = err.message
            })
            
            // this.slug = slugify(this.alias, {
            //     replacement: '-',
            //     remove: /[$*_+~.()'"!\-:@]/g,
            //     lower: true
            // })
            // let ref = db.collection('users').doc(this.slug)
            // ref.get().then(doc => {
            //     if (doc.exists) {
            //         this.feedback = 'The alias already exists'
            //     } else {
            //         firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            //         .then(cred => {
            //             ref.set({
            //                 alias: this.alias,
            //                 geolocation: null,
            //                 user_id: cred.user.uid
            //             })
            //         }).then(() => {
            //             this.$router.push({ name: 'GMap' })
            //         })
            //         .catch(err => {
            //             console.log(err)
            //             this.feedback = err.message
            //         })
            //     }
            // })

        },
        getFirebaseApp(name, config) {
            let foundApp = firebase.apps.find(app => app.name === name);
            return foundApp ? foundApp : firebase.initializeApp(config || firebase.app().options, 'auth-worker');
        }
    }
}
</script>

<style>
.signup {
    max-width: 400px;
    margin-top: 60px;
}
.signup h2 {
    font-size: 2.4em;
}
.signup .field {
    margin-bottom: 16px;
}

</style>