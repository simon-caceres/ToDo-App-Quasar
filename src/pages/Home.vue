<template>
  <div class="fixed-center text-center">
    <q-form @submit.prevent="enterChat" 
     
      >
      <h4 for="name">Ingresa a tu Cuenta:</h4>

      <q-input
        ref="name"
        
        filled
        type="email"
        v-model = "userEnter.email"
        label="Your email *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
      
        filled
        type="password"
        v-model = "userEnter.password"
        label="Your password"
        
      />
      <br>

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
  
      <p v-if="feedback" class="green-text">{{ feedback }}</p>
     
    </q-form>
    <br>
    <p>¿no tienes cuenta?   <q-item 
              @click="fixed = true"
              clickable 
              v-ripple
              >
             
              <q-item-section>
                Abre una para que puedas empezar:
              </q-item-section>
               <q-item-section avatar>
               <q-img  src="/statics/icons/add.svg"
               id="keysvg">
               </q-img>
              </q-item-section>
            </q-item>
    </p>

        <q-dialog v-model="fixed" transition-show="rotate" transition-hide="rotate">
      <q-card>
        <q-card-section>
          <div class="text-h6">Cuenta Nueva</div>
        </q-card-section>
<!-- nueva cuenta -->
        <q-card-section class="q-pt-none">
      <q-form
      method="POST"
      action="/singup"
      @reset="onReset"
      @submit.prevent="onSubmit()"
      class="q-gutter-md"
    >
      <q-input
        filled
        type="text"
        v-model = "user.name"
        label="Nombre"
        name="name"
      />
      <q-input
        type="email"
        filled
        v-model = "user.email"
        label="Correo"
        name="email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
     
      <q-input
        type="password"
        filled
        v-model = "user.password"
        label="password"
        name="password"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        type="password"
        filled
        v-model = "user.confirm_password"
        label="confirm password"
        name="confirm_password"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
       <q-card-actions align="right">
         <button type="submit" @click.prevent="onSubmit" class="btn"> submit</button>
        </q-card-actions>
    </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn flat label="Accept" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>


      
  </div>
</template>

<script >
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000';

export default {
  name: 'Home',
  data (){
   return {
     user:{
        name: '' ,
        email: '', 
        password: '', 
        confirm_password: ''
        },
      feedback: '',
      name: '',
      fixed: false,
      userEnter:{
        email: '',
        password: ''
      },
      check:[]
    }
  },
  props: [''],
  components: {
   
  },

   mounted () {
    
  },

  methods: {
    alerta() {
      console.log('funciona')
    },

    async enterChat(){
      
        await this.$axios({
              method: 'post',
              url: '/singin',
              data: this.userEnter,
              contentType: 'application/json',
              }).then(response => {
                if (response.data.status === 200){
                  console.log(this.$router)
                  this.$router.push({name: 'MainLayout' , params: {name: response.data.name} })
                } else {
                  this.feedback = response.data.mensaje
                }
              })
              .catch(e => {
                console.log(e)
              })
    },

    onSubmit () {
            this.$axios({
              method: 'post',
              url: '/singup',
              data: this.user,
              contentType: 'application/json',
              }).then(function(response){
                console.log(response)
              })
              .catch((e) => {
                console.log(e)
            })
    },

    onReset () {
      this.password = ''
    },

    subsUsers () {
      this$axios({
        method: 'get',
        url: ''
      })
    }
  }
}
</script>


<style >

  #addsvg {
    width: 1px;
    height: 1px;
  }

  .q-card{
    width: 600px;
  }
</style>  