<template>
<div>
<v-container fluid grid-list-md pa-2>

    <h2> Your Search Results For : {{key}}</h2>
  <v-divider></v-divider>

    <v-flex xs11 md11 ma-auto>
      <v-layout class="my-10" align-center justify-center>
        <v-layout wrap>
          <v-flex v-for="(recipe,index) in recipes" :key="recipe.id" xs3 md4>
            <v-hover v-slot:default="{ hover }">
                <v-card :elevation="hover ? 12 : 2" class="mr-1 my-2 pt-2">
                  <v-img @click="$router.push({name:'view',params:{id:recipe.id}})"
                    :src="hover ? recipe.pictures.length>1 ? imageurl+recipe.pictures[1] : imageurl+recipe.pictures[0] : imageurl+recipe.pictures[0]"
                    :lazy-src="'/assets/sys-images/logo.png'" class="white--text mx-2" height="200px"
                    gradient="to bottom,rgba(0,0,0,.3), rgba(0,0,0,0), rgba(0,0,0,.5)">
                    <v-card-title class="fill-height align-end" style="font-size:22px; text-decoration: none;"
                      v-text="recipe.title"></v-card-title>
                  </v-img>
                  <v-card-actions>
                    <span>
                      <v-icon color="black">mdi-account-circle</v-icon>
                      {{recipe.author.username}}
                    </span>

                    <v-spacer></v-spacer>

                    <v-chip v-if="recipe.bestfor" class="purple lighten-2 white--text" pills small>{{recipe.bestfor}}
                    </v-chip>
                    <v-chip v-if="recipe.catagory" class="green lighten-1 white--text" pills small>{{recipe.catagory}}
                    </v-chip>
                    <v-chip v-if="recipe.country" class="red lighten-2 white--text" pills small>{{recipe.country}}
                    </v-chip>
                  </v-card-actions>

                  <v-card-title>
                    <!-- <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon  v-on="on" class="ml-1" @click="!user.authenticated?$router.push({name:'login'}):''">mdi-heart</v-icon>
                  </template>
                  <span>Add to favorite</span>
                    </v-tooltip>-->

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-chip label outlined>
                          Share
                          <v-icon v-on="on" @click="shareRecipe(recipe.id)">mdi-share</v-icon>
                        </v-chip>
                      </template>
                      <span>Share</span>
                    </v-tooltip>


                    <v-spacer></v-spacer>

                    <span>
                      <span
                        class="primary--text subtitle-2 float-right">{{recipe.reviews?recipe.reviews.length:0}}</span>
                      <v-rating :value="recipe.rateScore?recipe.rateScore:0" dense color="orange"
                        background-color="grey lighten-1" empty-icon="mdi-hand-okay" full-icon="mdi-hand-okay" readonly
                        class="mr-2 float-right"></v-rating>
                    </span>
                  </v-card-title>
                </v-card>
              </v-hover>
          </v-flex>
        </v-layout>
        
      </v-layout>
      <div v-if="recipes.length == 0" class="align-center"><h3>No Results Found!</h3></div>
    </v-flex>
  </v-container>

   <!-- Share Options Dialog  -->
    <v-dialog v-model="shareDialg" width="450px">
      <v-card>
        <v-card-title class="red lighten-2 white--text">Share recipe with your freinds!</v-card-title>

        <v-layout align-center justify-center class="mx-3 my-3">
          <v-text-field :value="'http://localhost:3000/view/'+shareId"></v-text-field>
        </v-layout>
        <v-layout align-center justify-space-around>
          <social-sharing :url="'http://localhost:3000/view/'+shareId" inline-template>
            <div>
              <network network="facebook" class="btn btn-primary float-left mr-1" style="background:">
                <i class="mdi mdi-facebook"></i> Facebook
              </network>
              <network network="googleplus" class="btn btn-danger float-left mr-1" style="background:#cc3333">
                <i class="mdi mdi-google-plus"></i> Google +
              </network>
              <network network="twitter" class="btn btn-success" style="background:#00acee">
                <i class="mdi mdi-twitter"></i> Twitter
              </network>
            </div>
          </social-sharing>
        </v-layout>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green lighten-2 white--text" @click="shareDialg =!shareDialg" small>Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    shareDialg: false,
    shareId: null,
    key:"",
    deleteAlert: false,
    deleteId: null,
    deleteIndex: null,
    recipes: [],
    allRecipes: [],
    imageurl: "/api/Storages/recipe-image/download/",
  }),
  // watch for search key change
  watch: { 
     '$route.params.key': {
        handler: function(search) {
           NProgress.start()
          this.key=search
            // Full text Search query
           var search='?filter={"where":{"$text":{"search":"'+search+'"}},"include":[{"relation":"author"},{"relation":"reviews"}]}'
           axios.get('http://localhost:3000/api/Recipes'+search).then(response => {
            this.recipes = response.data.reverse()
            NProgress.done()
            })
        },
        deep: true,
        immediate: true
      }
    },

  mounted() {
    window.console.log("|mounted|")
    var key = this.$route.params.key
    this.key=key
    var search='?filter={"where":{"$text":{"$search":"'+key+'"}}}'

    axios.get('http://localhost:3000/api/Recipes'+search).then(response => {
      this.recipes = response.data.reverse()
      NProgress.done()
    })
  },
  methods: {

    // set share buffer and show share  dialog
    shareRecipe(id) {
      this.shareId = id;
      this.shareDialg = true;
    },
  }
}
</script>
