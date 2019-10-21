<template>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md6
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="orange ligthen-2"
                dark
                flat
              >
                <v-toolbar-title> Welcome back , Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="login.username"
                    label="Username"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model="login.password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
                <span class="mx-8" style="color:red">{{this.result}}</span>
              </v-card-text>
              <v-card-actions>
                  <span class="mx-3" @click="$router.push({name:'signup'})">Register</span>
                <v-spacer></v-spacer>
                <v-btn @click="loginUser" color="Success">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>

<script>
import  axios from 'axios'
import Auth from '../plugins/auth'

  export default {
    props: {
      source: String,
    },
    data: () => ({
        drawer: null,
        result:"",
        login : {
          username : null,
          password : null
        },
    }),
    created(){
      if(Auth.checkAuth()){
        this.$router.push({name:'home'})

      }
    },
    mounted(){
      
        NProgress.done()
    },
    methods: {
      // login user 
    loginUser() {
        this.result=""
      if (this.login.username != null && this.login.password != null) {
         Auth.login(this,this.login)
      }
    },
    }
  }
</script>