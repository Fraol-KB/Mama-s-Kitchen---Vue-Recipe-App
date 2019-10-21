
import  axios from 'axios'


const API_URL = 'http://localhost:3000/api/'
const LOGIN_URL = API_URL + 'Users/login'
const SIGNUP_URL = API_URL + 'Users/'

export default {

  user: {
    authenticated: false,
    id:null,
    token:null,
    username:null
  },

  login(context, creds) {

    axios.post(LOGIN_URL, creds).then(response => {                      
        localStorage.setItem('id_token', response.data.userId)
        localStorage.setItem('access_token', response.data.id)
        this.user.authenticated = true
        
        context.$emit('updateStatus')
        context.$router.push({name:'home'})

    }).catch(error =>{
        var result=""

        if (error.response) {            
            
            if(error.response.status == 401){
                result = "Wrong user name or Password"
              window.console.log("Wrong user name or Password");
            }else if(error.response.status == 400){
                result = error.response.data.error.message
              window.console.log(error.response.data.error.message);              
            }
          }
          context.result=result

    })
  },

  signup(context, creds) {
      axios.post(SIGNUP_URL, creds).then(response => {
        this.login(context,creds)

      }).catch(error => {
        var response = ""
        if (error.response) {
          if (error.response.data.error.details.messages.email) {
            response = response + error.response.data.error.details.messages.email
            if (response == "is invalid")
              response = "Email " + response
            response = response + "!\n"
          }
          if (error.response.data.error.details.messages.username)
            response = response + error.response.data.error.details.messages.username + "!"

        }
        context.result = response


      })
      
  },

  logout(context) {

    axios.post('http://localhost:3000/api/Users/logout?access_token=' + this.user.token).then(response => {
        this.deleteTokens() 
      context.$router.push({
        name: 'login'
      })
    })

  },

  deleteTokens(){
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    this.user.authenticated = false
    this.user.id = null
    this.user.token = null
    this.user.username = null

  },
  

  checkAuth(context) {
    var id = localStorage.getItem('id_token')
    var token = localStorage.getItem('access_token')

    if(token) {
      this.user.authenticated = true
      this.user.id=id
      this.user.token=token
      
    }else{
      this.user.authenticated = false
      this.user.id= null
      this.user.token= null
    }

    return this.user.authenticated

  },
  getUser(){
    return axios.get(SIGNUP_URL+this.user.id+'?access_token=' + this.user.token)
  },
  getusername(context){
    axios.get(SIGNUP_URL+this.user.id+'?access_token=' + this.user.token).then(response => {
        if(response.data.username){
            this.user.username = response.data.username
            console.log(this.user)
        }
    }).catch(error => {
        if(error.response.status == 401){
            this.deleteTokens()
        }

    })
  },

}