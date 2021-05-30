<template>
  <div>
    <b-navbar class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Web CMS</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Home'}">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/Newest" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'Newest'}">Newest</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/mostViewed" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'MostViewed'}">Most Viewed</router-link>
            </li>
            <b-nav-item-dropdown text="Categories" class="nav-item">
                <b-dropdown-item-btn v-for="category in categories" :key="category.id" @click="findNewsForCategory(category)">{{category.name}}</b-dropdown-item-btn>
            </b-nav-item-dropdown>
          </ul>
        </div>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
      return {
          categories: []
      }
  },
  mounted() {
      this.$axios.get('/read/categories').then((response) => {
          this.categories = response.data;
      });
  },
  methods: {
      findNewsForCategory(category){
          this.$router.push({
              name: "NewsForCategory",
              params: { categoryId: category.id }
          })
      }
  }
}
</script>

<style scoped>

</style>
