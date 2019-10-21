<template>
  <div>
    <form ref="form">
      <v-layout justify-space-between justify-space-around>
        <v-flex xs8 md8>
          <div class="my-10 ml-4">
            <v-layout align-space-between justify-space-around column>
               <div >
                <v-layout>
                <v-card-title>Recipe Detail</v-card-title>
                  <v-spacer></v-spacer>
                  <span v-if="user.authenticated && user.id==recipe.authorId">
                       
                      <v-btn color="green lighten-2  white--text mr-1" @click="editRecipe">
                        <v-icon>mdi-pencil</v-icon>
                        Edit
                      </v-btn>
                    
                  <v-btn  @click="deleteDialg=true" color="warning"><v-icon>mdi-delete</v-icon> Delete </v-btn>
                  </span>
                </v-layout>
              </div>
            <v-card>
              <div>              

                <v-layout>
                  <v-flex v-if="!showVideo" class="mr-1" md12 xs12>
                     <v-card  flat class="pa-3">
                     <v-carousel height="350" v-if="recipe.pictures && recipe.pictures.length">
                        <v-carousel-item
                          v-for="(img,i) in recipe.pictures"
                          :key="i"
                          :src="imageurl+img"
                          :lazy-src="'/assets/sys-images/logo.png'" 
                        >
                                                
                        </v-carousel-item>
                    </v-carousel>
                    <v-card v-else>
                      <v-img :src="imageurl+recipe.picture" class="white--text" height="350px"
                        gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,0)">
                           <template v-slot:placeholder>
                              <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                              >
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                              </v-row>
                            </template>
                      </v-img>
                    </v-card>
                     </v-card>
                  </v-flex>

                  <v-flex v-if="showVideo" md12 xs12>
                    <v-card  height="400px" flat>
                      <video
                          style="width:95%; height:97%; margin:10px auto"
                          class="video-js"
                          controls
                          preload="auto"
                          :poster="imageurl+recipe.pictures[0]"
                          data-setup='{}'>
                        <source v-if="recipe.video" :src="imageurl+recipe.video" type="video/mp4"></source>
                        <p class="vjs-no-js">
                          To view this video please enable JavaScript, and consider upgrading to a
                          web browser that
                          <a href="http://videojs.com/html5-video-support/" target="_blank">
                            supports HTML5 video
                          </a>
                        </p>
                      </video>
                       
                    </v-card>
                  </v-flex>
                  
                </v-layout>
                <v-layout>
                  <v-layout justify-start>
                     <div class="mx-1 title">
                        Share on
                      </div>
                    <social-sharing :url="'http://localhost:3000/view/'+this.recipe.id" inline-template>
                      <div>
                        <network network="facebook" class="btn btn-primary float-left mr-1" style="background:"  >
                          <i class="mdi mdi-facebook"></i> Facebook
                        </network>
                        <network network="googleplus"  class="btn btn-danger float-left mr-1" style="background:#cc3333" >
                          <i class="mdi mdi-google-plus"></i> Google +
                        </network>
                        <network network="twitter"  class="btn btn-success " style="background:#00acee" >
                          <i class="mdi mdi-twitter"></i> Twitter
                        </network>
                      </div>
                    </social-sharing>
                     
                      
                  </v-layout>
                  <v-layout v-if="recipe.video" justify-end>
                    <v-btn v-if="!showVideo"  small color="red lighten-2" class="mx-2 white--text" @click="showVideo=true" >Show Video</v-btn>
                    <v-btn v-if="showVideo" small color="blue lighten-1" @click="showVideo=false" class="mx-2 white--text">Show Picture</v-btn>
                  </v-layout>
                </v-layout>
                </div>
                <v-divider class="my-5"></v-divider>
                <div>
                <v-layout>
                  <v-flex class="ml-10" md10>
                  <v-card flat>
                    <v-card-title style="color:#b0120a" ><h3> {{recipe.title}}</h3></v-card-title>
                    <v-layout>
                      <v-flex md8>
                        <v-card-text>
                        <p><h4>Country : {{recipe.country}} </h4></p>
                        <div>
                        <p><h4>{{recipe.decription}}</h4> </p>
                        </div>
                        </v-card-text>
                      </v-flex>
                      <v-flex md4>
                        <v-card-title class="title ml-5" >Details</v-card-title>
                      <v-card-text class="pa-2 ml-5">
                        <p>Best For : {{recipe.bestfor}}</p>
                        <p>Catagory : {{recipe.catagory}}</p>
                        <p>Prep Time : {{recipe.prepTime}} min </p>
                        <p>Serving Size: {{recipe.serving}} </p>
                      </v-card-text>

                      </v-flex>

                    </v-layout>
                        <v-card-actions>
                          <span>
                          <v-icon color="black">mdi-account-circle</v-icon>
                          By {{recipe.author.username}}
                          </span>

                          <v-spacer></v-spacer>
                          <v-rating 
                          :value="recipe.rateScore?recipe.rateScore:0"
                          dense
                          color="orange"
                          background-color="grey lighten-1"
                          empty-icon="mdi-hand-okay"
                          full-icon="mdi-hand-okay"
                          class="mr-2 float-right"
                          readonly
                        > </v-rating>
                        {{recipe.reviews?recipe.reviews.length:0}} reviews

                        </v-card-actions>

                  </v-card>
                 </v-flex>
                
                </v-layout>
                </div>
                <v-divider></v-divider>

                <div>
                  <v-layout>

                 <v-flex  md4 xs4>
                    <v-card flat min-height="400">
                    <div class="text-center title">Ingredients</div>



                   <v-layout  column class="pa-5">
                     <ul>
                      <v-flex v-for="(item,i) in recipe.ingredient" :key="i">

                          <li> {{item.amount+" "+item.unit+" of "+item.ingredient}}</li>
                        
                      </v-flex>
                     </ul>
                    </v-layout>
                    </v-card>

                 </v-flex>

                  <v-flex md7 xs6 class="mr-4" >
                    <div class="text-center title">How to cook</div>
                    <v-timeline dense>
                      <v-timeline-item
                      v-for="(item, i) in recipe.steps"
                      :key="i"
                      >
                        <v-card
                          color="red lighten-2"
                          dark
                        >
                          <v-card-title class="title">Step {{i+1}}</v-card-title>
                          <v-card-text class="white text--primary">
                            <p>{{item.detail}}</p>
                          </v-card-text>
                        </v-card>
                      </v-timeline-item>
                    </v-timeline>
                
                </v-flex>

                  
                
                </v-layout>
              </div>
            </v-card>
            <v-card color="grey lighten-3">

              
              <v-layout justify-center>
                <v-flex class="my-10" md10>
                  <v-card elevation="3" class="mb-3">
                      <div v-if="!rated && user.authenticated" class="title mr-8 ml-5">
                          Leave your review
                          <span class="float-right">
                            <v-rating 
                            :value="0"
                            dense
                            v-model="review.score"
                            color="orange"
                            background-color="grey lighten-1"
                            empty-icon="mdi-hand-okay"
                            full-icon="mdi-hand-okay"
                            hover
                          > </v-rating></span>
                      </div>
                      <div v-if="!user.authenticated" class="title mr-8 ml-5">
                        Login to Leave A Review.
                      </div>
                      <div v-if="rated" class="title  text-center py-8 ">
                        Thank You For Rating This Recipe!
                      </div>

                        <v-card-text v-if="!rated && user.authenticated"><v-textarea v-model="review.msg" outlined > </v-textarea>
                        <v-layout justify-end>
                         <v-btn @click="sendReview()" color="orange darken-2" class="white--text"> Submit </v-btn>
                        </v-layout>
                        </v-card-text>
                  </v-card>
                  <div v-if="recipe.rateScore">
                    <div class="text-center title"> <h3>Reviews</h3></div>
                  <div v-for="(item,i) in recipe.reviews" :key="i">
                  <v-card elevation="3" class="mb-3">
                    <div class="title mr-8 ml-5">
                      <v-icon color="black">mdi-account-circle</v-icon> {{item.user.username}} 
                      <span class="float-right">
                        <v-rating 
                          :value="item.score"
                          dense
                          color="orange"
                          background-color="grey lighten-1"
                          empty-icon="mdi-hand-okay"
                          full-icon="mdi-hand-okay"
                          hover
                          readonly
                        > </v-rating></span>
                    </div>
                        <v-card-text> {{item.msg}} </v-card-text>
                  </v-card>
                  </div>
                  </div>
                  <div v-else class="text-center title"> <h3>No Reviews yet. Be The First!</h3></div>
                   
                </v-flex>
              </v-layout>
            </v-card>
              <div>
                <v-layout>
                  <v-card>
                  </v-card>
                </v-layout>
              </div>
              <v-layout>
                <br>
                <hr>
              </v-layout>
            </v-layout>
          </div>
        </v-flex>
      
        <v-flex md3 class="my-12 mx-5">
          <v-card 
                   
          class="my-12">
            <v-card-title  class="red lighten-2 title white--text">
              Related Recipes
            </v-card-title>
            <v-card
            color="grey lighten-5" min-height="500px" class="pa-5">
              <v-row>
              <v-layout column>
              <v-col
                  v-for="(item, i) in related"
                  :key="i"
                >
                <v-card
                >
            <v-list-item three-line  @click="openRelated(item.id)">
              <v-list-item-content class="align-self-center">
                <v-list-item-title
                  class="headline mb-2 black--text"
                  v-text="item.title"
                ></v-list-item-title>

                <v-list-item-subtitle v-text="item.decription"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                size="60"
                tile
              >
                <v-img :src="imageurl+item.pictures[0]"></v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>
              </v-layout>
      </v-row>

            </v-card>

          </v-card>
        </v-flex>
     
     
      </v-layout>
    </form>

    <v-dialog v-model="deleteDialg" width="450px">
     <v-card>
       <v-card-title class="red lighten-2 white--text">
         Delete Recipe?
       </v-card-title>
       <v-card-text>
         <div class="title text-center">
         Are you sure to delete this recipe?
         </div>
       </v-card-text>
    
      <v-divider></v-divider>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn color="red lighten-1 white--text"  @click="deleteRecipe()">Delete</v-btn>
         <v-btn color="green lighten-2 white--text"   @click="deleteDialg=false">Cancel</v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>

  </div>
</template>

<script>
  import axios from 'axios'
  import Auth from '../plugins/auth'

  import 'video.js/dist/video-js.css'
  import 'video.js/dist/video.js'
  import { videoPlayer } from 'vue-video-player'
  export default {
    components: {
        videoPlayer
      },
    data() {
      return {
        rated:false,
        related:[],
        review:{
          recipeId:null,
          score:0,
          msg:null,
          userId:null

        },
        deleteDialg:false,
        showVideo:false,
        e1: 1,
        imageurl:"/api/Storages/recipe-image/download/",
        recipe: {

          id:null,
          title: "",
          bestfor: [],
          ingredient: [],
          picture: "",
          steps: [{
            detail: ""
          }]
        },


      };
    },

    watch: {
      steps(val) {
        if (this.e1 > val) {
          this.e1 = val;
        }
      }
    },
    computed: {
      user: function () {
        Auth.checkAuth()
        return Auth.user
      }
    },
    // start Prograss bar
    beforeCreate() {
      NProgress.start();
    },
    
    mounted() {
      var id = this.$route.params.id
      window.console.log(Auth.user)
      axios.get('http://localhost:3000/api/Recipes/' + id +'?filter={"include": [{"relation":"reviews", "scope": {"include" :  {"relation":"user"}}},{"relation":"author"}]}')
      .then(response => {

        this.recipe = response.data
        this.recipe.reviews=this.recipe.reviews.reverse()

        // check if user has already rated this recipe
        var obj = window.$.grep(this.recipe.reviews, function (obj) { return obj.userId === Auth.user.id; });
        if(obj.length>0)
            this.rated = true
        
        
               
        // query to fetch related recipes based on Country, Bestfor, Catagory
        var related = 'http://localhost:3000/api/Recipes?filter={"where":{"and":[{"id":{"neq":"'+this.recipe.id+'"}},{"or":[{"country":"'+this.recipe.country+'"},{"bestfor":"'+this.recipe.bestfor+'"},{"catagory":"'+this.recipe.catagory+'"}]}]}}' 
        
        axios.get(related)
        .then(response => {
        this.related = response.data.reverse()

        
        NProgress.done() 
        })
        .catch(error => window.console.error(error))
      })
      
     
    },

    methods: {

      // handles rating and review
      sendReview(){
        this.review.recipeId=this.recipe.id
        this.review.userId=Auth.user.id
       
        if(this.review.score!=0){

          if(this.recipe.rateScore){

            //  if rate score is already set then recalculate the total rate score for the recipe
            var sum= this.recipe.rateScore*this.recipe.reviews.length
            this.recipe.rateScore = (sum+ this.review.score)*1.0/(this.recipe.reviews.length+1)

          }else{
            // if this is the first rating then set it equal to the total score
            this.recipe.rateScore =  this.review.score
          }
            axios.post('http://localhost:3000/api/Reviews?access_token='+Auth.user.token, this.review)
            .then(response => {

                axios.patch('http://localhost:3000/api/Recipes/' + this.recipe.id+'?access_token='+Auth.user.token, {"rateScore":this.recipe.rateScore}).then(response => {
                 window.$.notify({ message:"Thank you for Rating!" }, { type: 'success' });

                 }).catch(error => window.console.error(error))
                var res= response.data
                res.user= Auth.user
                this.recipe.reviews=this.recipe.reviews.reverse()
                this.recipe.reviews.push(res)
                this.recipe.reviews=this.recipe.reviews.reverse()
                this.rated=true
            })
            .catch(error => window.console.error(error))


        }else{
          window.$.notify({ message:"Rating score must be filled!" }, { type: 'danger' });

        }
      },

      //  opens a related recipe when clicked
      openRelated(id) {
        NProgress.start()
        axios.get('http://localhost:3000/api/Recipes/' + id +'?filter={"include": [{"relation":"reviews", "scope": {"include" :  {"relation":"user"}}},{"relation":"author"}]}')
        .then(response => {      
          this.recipe = response.data
          this.showVideo=false
          NProgress.done()
          var request = 'http://localhost:3000/api/Recipes?filter={"where":{"and":[{"id":{"neq":"' + this.recipe.id + '"}},{"or":[{"country":"' + this.recipe.country + '"},{"bestfor":"' + this.recipe.bestfor + '"},{"catagory":"' + this.recipe.catagory + '"}]}]}}'
          axios.get(request).then(response => {
            this.related = response.data.reverse()
            window.console.log("related :", this.related)
          })
        })
        .catch(error => window.console.error(error))
      },

      deleteRecipe() {
        axios.delete('http://localhost:3000/api/Recipes/' + this.recipe.id+'?access_token='+Auth.user.token)
        .then(response => {
          window.$.notify({ message:"Recipe Deleted!" }, { type: 'danger' });
          this.$router.push({
            name: 'home'
          })
        })
        .catch(error => window.console.error(error))
      },

      editRecipe(){
        window.console.log("id:",this.recipe.id)
        this.$router.push({name:'edit',params:{id:this.recipe.id}})
      }
    }
  };

</script>
