<template>
  <div>

    <!-- carousel -->
    <v-flex ma-3>
      <v-carousel cycle height="600" width="80%" class="mr-10">
        <v-carousel-item class="white--text" v-for="(item,i) in carousel" :key="i" :src="item.src">
          <div style="margin-top:200px; padding:45px; width:45%; height:200px;border:1px #bdbdbd solid;
            border-radius:5px;background:rgba(0,0,0,.5)" class="mx-12 title">
            <h1 style="font-family: 'Cookie', cursive;">
              {{item.text}}
              <br>
            </h1>
            <span style="font-family: 'Courgette', cursive;" class="float-right">- Mama's Kitchen</span>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-flex>

    <v-container fluid grid-list-md pa-2>
      <v-layout align-center justify-space-around column>
        <h1 style="font-family: 'Courgette', cursive;">Welcome to the world of Food</h1>
        <h3 style="font-family: 'Dancing Script', cursive;">Collection of thousands of food recipes from around the
          world!</h3>
      </v-layout>
      <v-divider></v-divider>

      <v-flex xs12 md12 ma-auto>
        <v-layout class="my-10" align-center justify-center>
          <v-card elevation="12" class="ma-2 pa-1" width="200px" @click="filterRecipe('All')">
            <v-img gradient="to bottom,rgba(0,0,0,.1),rgba(0,0,0,.2), rgba(0,0,0,.4),rgba(0,0,0,.2),rgba(0,0,0,.1)"
              height="100" class="white--text" src="/api/Storages/sys-image/download/allinone.jpg">
              <v-card-title class="fill-height align-center justify-center" style="font-size:22px;">ALL</v-card-title>
            </v-img>
          </v-card>

          <v-card elevation="12" class="ma-2 pa-1" width="200px" @click="filterRecipe('Breakfast')">
            <v-img gradient="to bottom,rgba(0,0,0,.1),rgba(0,0,0,.2), rgba(0,0,0,.4),rgba(0,0,0,.2),rgba(0,0,0,.1)"
              height="100" class="white--text" src="/api/Storages/sys-image/download/breakfast.jpg">
              <v-card-title class="fill-height align-center justify-center" style="font-size:22px;">BreakFast
              </v-card-title>
            </v-img>
          </v-card>

          <v-card elevation="12" class="ma-2 pa-1" width="200px" @click="filterRecipe('Lunch')">
            <v-img gradient="to bottom,rgba(0,0,0,.1),rgba(0,0,0,.2), rgba(0,0,0,.4),rgba(0,0,0,.2),rgba(0,0,0,.1)"
              height="100" class="white--text" src="/api/Storages/sys-image/download/lunch.jpg">
              <v-card-title class="fill-height align-center justify-center" style="font-size:22px;">Lunch</v-card-title>
            </v-img>
          </v-card>

          <v-card elevation="12" class="ma-2 pa-1" width="200px" @click="filterRecipe('Dinner')">
            <v-img gradient="to bottom,rgba(0,0,0,.1),rgba(0,0,0,.2), rgba(0,0,0,.4),rgba(0,0,0,.2),rgba(0,0,0,.1)"
              height="100" class="white--text" src="/api/Storages/sys-image/download/dinner.jpg">
              <v-card-title class="fill-height align-center justify-center" style="font-size:22px;">Dinner
              </v-card-title>
            </v-img>
          </v-card>

          <v-card elevation="12" class="ma-2 pa-1" width="200px" @click="filterRecipe('Snacks')">
            <v-img gradient="to bottom,rgba(0,0,0,.1),rgba(0,0,0,.2), rgba(0,0,0,.4),rgba(0,0,0,.2),rgba(0,0,0,.1)"
              height="100" class="white--text" src="/api/Storages/sys-image/download/snack.jpg">
              <v-card-title class="fill-height align-center justify-center" style="font-size:22px;">Snacks
              </v-card-title>
            </v-img>
          </v-card>
        </v-layout>
      </v-flex>
      <v-divider></v-divider>

      <!-- Recipe List  -->
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

                    <span v-if="user.authenticated && user.id == recipe.authorId">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-icon v-on="on" @click="deleteRecipe(recipe,index)" class="ml-1">mdi-delete</v-icon>
                        </template>
                        <span>Delete</span>
                      </v-tooltip>

                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-icon v-on="on" @click="$router.push({name:'edit',params:{id:recipe.id}})" class="ml-1">
                            mdi-circle-edit-outline</v-icon>
                        </template>
                        <span>Edit</span>
                      </v-tooltip>
                    </span>

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
      </v-flex>
    </v-container>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialg" width="450px">
      <v-card>
        <v-card-title class="red lighten-2 white--text">Are you sure to delete this recipe?</v-card-title>

        <v-layout align-center justify-center class="mx-3 my-3">
          <v-flex md4>
            <v-img width="120" height="80"
              :src="deleteItem.picture?imageurl+deleteItem.picture:imageurl+deleteItem.pictures[0]"></v-img>
          </v-flex>
          <v-flex md4>
            <h5 class="panel-title">{{deleteItem.title}}</h5>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red lighten-1 white--text" @click="deleteConfirmed()">Delete</v-btn>
          <v-btn color="green lighten-2 white--text" @click="deleteCanceled()">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
import axios from "axios";
import Auth from "../plugins/auth";
import { error } from 'util';
export default {
  data: () => ({
    deleteDialg: false,
    shareDialg: false,
    shareId: null,
    user: Auth.user,
    deleteItem: {
      pictures: []
    },
    recipes: [],
    allRecipes: [],
    imageurl: "/api/Storages/recipe-image/download/",
    carousel: [
      {
        src: "/assets/sys-images/3.jpg",
        text: "World of delicous recipes."
      },
      {
        src: "/assets/sys-images/bg1.jpg",
        text: "Taste the world throught our site!"
      },
      {
        src: "/assets/sys-images/bg2.jpg",
        text: "Share your gift with the world!"
      },
      {
        src: "/assets/sys-images/bg3.jpg",
        text: "Learn how to make delicous food!"
      },
      {
        src: "/assets/sys-images/bg4.jpg",
        text: "Discover thousands of taste !"
      },
      {
        src: "/assets/sys-images/bg5.jpg",
        text: "Test the world throught our site!"
      }
    ]
  }),

  // start Prograss bar
  beforeCreate() {
    NProgress.start();
  },

  // get data from server
  created() {
    axios.get("http://localhost:3000/api/Recipes?filter[include]=reviews&&filter[include]=author")
      .then(response => {
        this.recipes = response.data.reverse();
        this.allRecipes = this.recipes;

        // end Progress bar
        NProgress.done();
      })
      .catch(error => window.console.error(error))
            
  },  

  methods: {

    // set share buffer and show share  dialog
    shareRecipe(id) {
      this.shareId = id;
      this.shareDialg = true;
    },

    // filter home page recipes using best for attribute
    filterRecipe(key) {
      if (key == "All") {
        this.recipes = this.allRecipes;
      } else {
        var filter = [];

        for (var item in this.allRecipes) {

          if (
            this.allRecipes[item].hasOwnProperty("bestfor") &&
            this.allRecipes[item].bestfor.includes(key)
          ) {
            filter.push(this.allRecipes[item]);
          }
        }
        this.recipes = filter;
      }
    },

    // set delete buffer and show delete dialog
    deleteRecipe(item, index) {
      this.deleteItem = item;
      this.deleteDialg = true;
      this.deleteItem.index = index
    },

    // delete item in delete buffer
    deleteConfirmed() {
      axios.delete("http://localhost:3000/api/Recipes/" + this.deleteItem.id + "?access_token=" + Auth.user.token)
        .then(response => {
          this.recipes.splice(this.deleteItem.index, 1);
          window.$.notify({ message: "Recipe Deleted!" }, { type: "danger" });
        })
        .catch(error => console.error(error))

    },

    deleteCanceled() {
      this.deleteDialg = false
    }
  }
};
</script>
