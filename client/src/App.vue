<template>
  <v-app id="inspire">

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="orange ligthen-2"
      dense
      dark
      class="pt-1 pb-1"
        >

      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
        >
        <v-icon large color="red darken-1">mdi-pizza</v-icon>
        <span class="hidden-sm-and-down">Mama's Kitchen</span>
      </v-toolbar-title>
      
      <v-text-field
        v-model="searchKey"
        flat
        solo
        hide-details
        @keydown="search"
        prepend-inner-icon="mdi-magnify"
        placeholder="May I take your order?"
        class="hidden-sm-and-down"
        color="white"
        background-color="orange darken-2"
      ></v-text-field>

      <v-spacer></v-spacer>
      
      <v-btn @click="$router.push({name:'home'})" class="mr-1" outlined>
        <v-icon>mdi-view-dashboard</v-icon>
        Home
      </v-btn>
      
      <span v-if="user.authenticated">
      <v-btn @click="$router.push({name:'add'})" class="mr-1"  outlined>
        <v-icon>mdi-plus</v-icon>
        recipe
      </v-btn>
      
      <v-btn   @click="logout()"  outlined>
        <v-icon>mdi-logout</v-icon>
        {{user.username}}
      </v-btn>
        
      </span>
      <v-btn  @click="loginPage()" outlined large v-else>
          <v-icon left>mdi-account</v-icon>
          account
      </v-btn>
            
    </v-app-bar>
    <v-content class="orange lighten-5">
     <router-view  @updateStatus="loggedIn()">
      </router-view>
    </v-content>

   
   
  </v-app>
</template>

<script>
import axios from 'axios'
import Auth from './plugins/auth'
  export default {
    props: {
      source: String,
    },
    data: () => ({
      user: {
        authenticated: false,
        id:null,
        token:null,
        username:null
      },
      searchKey: "",
      
    }),
    
    mounted(){
      if(Auth.checkAuth()){
      Auth.getUser()
      .then(response => {
        if(response.data.username){
          Auth.user.username = response.data.username
          // context.user.username = response.data.username
          this.user=Auth.user
            }
        })
        .catch(error => {
            if(error.response.status == 401){
                Auth.deleteTokens()
            }
        })
      }

    },
    methods: {
      // emmited event when logged in successfull
      loggedIn() {
        if(Auth.checkAuth()){
        Auth.getUser()
        .then(response => {
          if(response.data.username){
            Auth.user.username = response.data.username
            this.user=Auth.user
          }
        })
        .catch(error => {
          if(error.response.status == 401){
            Auth.deleteTokens()
          }   
        })
        }
      },

      logout() {
        Auth.logout(this)
      },

      // Full text search on enter key clicked
      search (event) {
       if(event.key == "Enter" && this.searchKey.replace(/\s/g, '') != "")
       {
           NProgress.start()
         this.$router.push({
            name: 'search',
            params: { key: this.searchKey}
          })
       }
    },
      loginPage(){
        this.$router.push({
            name: 'login'
          })
      }
    }
  }
</script>