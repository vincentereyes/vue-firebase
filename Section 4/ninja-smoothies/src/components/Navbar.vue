<template>
    <div class="navbar">
        <nav class="nav-extended indigo darkened-2"> <!-- navextended takes up whole top part/colors -->
            <div class="nav-content">
                <router-link :to="{ name: 'Index' }">
                    <span class="nav-title">Ninja Smoothies</span>
                    <a href="" class="btn-floating btn-large halfway-fab pink">
                        <router-link :to="{ name: 'AddSmoothie'  }">
                            <i class="material-icons">add</i>
                        </router-link>
                    </a>
                </router-link>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    data() {
        return {

        }
    }
}
</script>

<style>
.navbar nav {
    padding: 0px 20px;
}
</style>