<template>
  <div>
    <form ref="form">
      <v-layout justify-center justify-space-around>
        <v-flex xs10 md11>
          
          <div class="my-11">
            <v-layout align-space-between justify-space-around column>
              <div >
                <v-layout>
                <v-card-title focus>Edit Recipe</v-card-title>
                  <v-spacer></v-spacer>
                  <v-btn color="success" v-if="!saved" class="mr-2" type="submit" @click="submit()">Save</v-btn>
                  <v-btn v-else @click="submit()" type="submit" color="success">
                            Saved
                            <v-icon>mdi-check</v-icon>
                  </v-btn>
                  <v-btn color="warning" @click="$router.push({name:'view',params:{id:recipe.id}})">Back</v-btn>
                </v-layout>
              </div>
              
              <div>
                <v-layout>
                   <v-flex class="mr-4" md6 xs6>
                     <v-tabs>
                      <v-tab href="#photo">Photos</v-tab>
                      <v-tab href="#video">Video</v-tab>
                    <v-tab-item value="photo">
                     <v-card height="400px" class="pa-5">
                     <v-carousel height="350" v-if="recipe.pictures && recipe.pictures.length">
                        <v-carousel-item
                          v-for="(img,i) in recipe.pictures"
                          :key="i"
                          :src="imageurl+img"
                        >
                        <v-icon @click="deleteImage(i)" size="40" class="float-right">mdi-close</v-icon>
                                                
                        </v-carousel-item>
                    </v-carousel>
                    <v-card v-else>
                      <v-img :src="imageView" class="white--text" height="350px"
                        gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,0)"></v-img>
                    </v-card>
                     </v-card>
                     </v-tab-item>

                    <v-tab-item value="video">
                     <v-card height="400px" class="pa-5">
                       <template id="video-template">
                      <video
                            :src="video.src"
                            style="width:95%; height:97%; margin:10px auto"
                            class="video-js"
                            controls
                            preload="auto"
                            data-setup='{}'>
                       
                        </video>
                        </template>
                     </v-card>
                     </v-tab-item>
                     </v-tabs>

                  </v-flex>


                  <v-flex md6 xs6>
                    <v-card height="400px" class="pa-5">
                    <v-layout justify-start column>
                      
                        <v-text-field v-model="recipe.title" :rules="[() => !!recipe.title || 'This field is required']" label="Title" required ></v-text-field>
                        <v-autocomplete v-model="recipe.country" :items="countries" placeholder="Select Country" ></v-autocomplete>

                        <v-textarea v-model="recipe.decription" label="Description" placeholder="Tell us a bit about ur Recipe" rows="8" no-resize>
                        </v-textarea>
                        <v-layout>
                        <span @click="pickFile">
                          <v-btn color="primary">
                            <v-icon>mdi-plus</v-icon>
                            add image
                          </v-btn>
                        </span>
                        <span @click="pickVideo">
                          <v-btn color="red lighten-1" class="ml-2 white--text">
                            <v-icon>mdi-plus</v-icon>
                            add Video
                          </v-btn>
                        </span>
                        </v-layout>
                        <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked">
                        <input type="file" style="display: none" ref="video" accept="video/mp4" @change="onVideoPicked">

                        
                    </v-layout>
                    </v-card>
                  </v-flex>


                </v-layout>
              </div>
              <v-divider></v-divider>
              <div>
                <v-layout>
                 <v-flex class="mr-4" md3 xs4>
                   <v-card min-height="400" class="pa-5">
                     <v-card-title>Details</v-card-title>

                      <v-select v-model="recipe.bestfor" :items="items" label="Suitable for" ></v-select>
                      <v-select v-model="recipe.catagory" :items="catagories" label="Catagory" ></v-select>
                      <v-text-field v-model="recipe.prepTime" type="number" suffix="mins" label="Prep Time"></v-text-field>
                      <v-text-field v-model="recipe.serving"  type="number" suffix="people" label="Serving"></v-text-field>



                   </v-card>
                 </v-flex>
                 <v-flex class="mr-4" md5 xs4>
                   <v-card min-height="400" class="pa-5">
                     <v-card-title>Ingredients</v-card-title>
                     <v-layout wrap>
                      
                      <v-flex class="mx-1" md2>
                        <v-text-field
                          v-model="newIng.amount"
                          label="Amount"
                          type="number"
                        ></v-text-field>
                      </v-flex>
                      <v-flex class="mx-1" md3>
                          <v-select v-model="newIng.unit"  :items="units" label="Unit" ></v-select>

                      </v-flex>

                      <v-flex md5>
                        <v-text-field
                          v-model="newIng.ingredient"
                          label="Ingredients"
                        ></v-text-field>
                        
                      </v-flex>
                       

                      <v-flex md1>
                        <v-chip @click="addIngredient()" text-color="black" color="white" class="mt-4" label outlined>
                        <v-icon>mdi-plus</v-icon>
                        </v-chip>
                      </v-flex>

                    </v-layout>
                    <v-layout column>
                      <v-flex v-for="(item,index) in recipe.ingredient" :key="item">

                        <v-chip close @click:close="remove(index)" label class="mb-1" outlined>
                          {{item.amount+" "+item.unit+" of "+item.ingredient}}
                        </v-chip>
                      </v-flex>
                    </v-layout>

                   </v-card>
                 </v-flex>
                  <v-flex md6 xs6>
                      
                       <v-timeline dense>
                      <v-timeline-item
                      v-for="(item, i) in recipe.steps"
                      :key="i"
                      >
                        <v-card
                         
                        >
                          <v-card-title class="red lighten-2 title">Step {{i+1}}</v-card-title>
                          <v-card-text class="white text--primary">

                            <v-textarea  outlined v-model="item.detail"></v-textarea>
                            <template v-if="recipe.steps.length !== 1">
                              <v-layout align-end justify-end row>

                                <v-chip class="mr-3 mb-1" @click="deleteStep(index)" outlined>
                                  <v-icon left>mdi-close</v-icon>
                                  Delete Step
                                </v-chip>

                              </v-layout>
                            </template>
                          </v-card-text>
                          
                        </v-card>
                        <v-btn class="my-2" @click="addStep" v-if="recipe.steps.length == i+1" >Add</v-btn>
                      </v-timeline-item>
                    </v-timeline>
                      
                  </v-flex>
                </v-layout>


              </div>
              <v-layout>
                <br>
                <hr>
              </v-layout>
              
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
    </form>
   
   
  </div>
</template>

<script>
import axios from 'axios'
import Auth from '../plugins/auth'
import Static from '../static'


export default {
    data() {
      return {

        e1: 1,
        picture:null,
        video:{src:null},
        items: ["Breakfast", "Lunch", "Dinner", "Snacks"],
        imgList:[],
        recipes: [],
        imageurl:"http://localhost:3000/api/Storages/recipe-image/download/",
        imageView:"http://localhost:3000/api/Storages/recipe-image/download/no-image.jpg",
        newIng:{
          ingredient:"",
          unit:"",
          amount:0
        },
        recipe: {
          title: "",
          country: "",
          decription: "",
          bestfor: [],
          catagory:"",
          prepTime: 0,
          serving: 0,
          ingredient: [],
          picture:"",
          pictures: [],
          video:"",
          steps: [{
          detail: " "
        }],
        authorId:Auth.user.id
        },
        picUpload:false,
        dataUpload:false,
        saved:false,
        catagories:Static.catagories,
        units: Static.units,
        countries: Static.countries
      };
    },
    mounted() {

      var id = this.$route.params.id
      axios.get('http://localhost:3000/api/Recipes/' + id)
      .then(response => {
        if(!Auth.user.authenticated){
          this.$router.push({name:'login'})
        }
        this.recipe = response.data
        this.video.src=this.imageurl+this.recipe.video
        NProgress.done()
      })
      .catch(error => window.console.error(error))

    },
    destroyed() {
      NProgress.start()    
    },
    methods: {
      submit() {
        this.$refs.form.addEventListener('submit', event => {
          event.preventDefault()
        })

        if(this.recipe.title == ""){
          window.$.notify({ message:"Recipe Title is Required!" }, { type: 'warning' });
          
        }else{

          NProgress.start()
        
          // if new video is selected delete the old one and upload the new video
         if(this.video.name){
           axios.delete('http://localhost:3000/api/Storages/recipe-image/files/'+ this.recipe.video)
          var fd = new FormData();
          fd.append("file",this.video,this.video.name)
          this.recipe.video=this.video.name

          axios.post('http://localhost:3000/api/Storages/recipe-image/upload', fd)
            .then(response => {
              axios.patch('http://localhost:3000/api/Recipes/' + this.recipe.id+'?access_token='+Auth.user.token, this.recipe)
                .then(response => {
                  NProgress.done()       
                  this.saved = true
                  window.$.notify({ message:"Edit Recipe Saved!" }, { type: 'success' });
                  this.$router.push({name:'view',params:{id:this.recipe.id}})

                })
                .catch(error=>{
                  window.$.notify({ message:"Unable to save data. Refresh and try again!" }, { type: 'warning' });

                })
            })
            .catch(error => console.error(error))


        }else{
          axios.patch('http://localhost:3000/api/Recipes/' + this.recipe.id+'?access_token='+Auth.user.token, this.recipe).then(response => {          
            window.console.log(response);           
            this.saved = true
            window.$.notify({ message:"Edit Recipe Saved!" }, { type: 'success' });
            NProgress.done()
          }).catch(error=>{
            window.$.notify({ message:"Unable to save data. An Error occured!" }, { type: 'warning' });

          })
        }
        }
      },
      
      // initiate events when add video and add image buttens are clicked
      pickFile () {
            this.$refs.image.click ()
      },
      pickVideo () {
        this.$refs.video.click()
      },

      // on file picked events for both  image and video
      onFilePicked (e) {

       const files = e.target.files
        window.console.log(files)
      	if(files[0] !== undefined) {
          this.picture = files[0]
          var name= this.recipe.title.replace(/\s/g, '') + "_" + Date.now() + "." + this.picture.name.split('.').pop(); 

          var fd = new FormData();
          fd.append("file", files[0], name);
          window.console.log("files ",fd)
            axios.post('http://localhost:3000/api/Storages/recipe-image/upload', fd).then(response => {
              
              this.recipe.pictures.push(name)
            })
        }
      },
      onVideoPicked (e) {
        this.video=null
        const files = e.target.files
        window.console.log(files)
        if(files[0] !== undefined) {
          var name= this.recipe.title.replace(/\s/g, '') + "_video_" + Date.now() + "." + files[0].name.split('.').pop(); 
          Object.defineProperty(files[0], 'name', {
            writable: true,
            value: name
          });
          this.video=files[0]
          var src = URL.createObjectURL(files[0])
          this.video.src=src
        }
		  },

      addIngredient(){
        if(this.recipe.ingredient){
          this.recipe.ingredient.push(this.newIng)
        }else{
          this.recipe.ingredient=[this.newIng]
        }
        this.newIng={
          ingredient:"",
          unit:"",
          amount:0
        }
      },
      remove (item) {
        this.recipe.ingredient.splice(item, 1)
      },
      deleteImage(index){
           axios.delete('http://localhost:3000/api/Storages/recipe-image/files/'+ this.recipe.pictures[index]).then(response => {
            // this.picUpload = true
            this.recipe.pictures.splice(index,1)

          })
          
        
      },
      
       addStep() {
        if (this.recipe.steps.length < 10) this.recipe.steps.push({
          detail: ""
        });
      },
      deleteStep(n) {
        if (this.recipe.steps.length > 1) {
          this.recipe.steps.splice(n, 1)
          this.stepBack(n)
        }
      },
    
    
    }

    
}
</script>
