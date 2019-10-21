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
                <v-toolbar-title>Join us , Become a Member</v-toolbar-title>
                
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    v-model="signup.email"
                    prepend-icon="mdi-email"
                    type="email"
                    label="Email" required>
                    </v-text-field>
                  <v-text-field
                    v-model="signup.username"
                    label="Username"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model="signup.password"
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
                <span class="mx-3" @click="$router.push({name:'login'})">Login</span>
                <v-spacer></v-spacer>
                <v-btn @click="signupUser" color="Success">Sign Up</v-btn>
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
      signup : {
          email : null,
          username : null,
          password : null
        }
    }),
    mounted(){
        NProgress.done()
    },
    destroyed() {
      NProgress.start()    
    },
    methods: {
      signupUser() {
        this.result=""
      if (this.signup.username != null && this.signup.password != null ) {
        
         Auth.signup(this,this.signup)
      }
    }
    }
  }
</script>