<template>
  <div class="q-pa-md">
   
    <q-btn label="Agregar Evento" color="primary" @click="fixed = true" />

    <q-dialog v-model="fixed">
      <q-card>
       <q-form
      @submit.prevent="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        type="text"
        v-model="evento.title"
        label="Event title"
        
      />
      <q-input
        filled
        v-model="evento.description"
        label="Event Description *"
       
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
     
     <q-input filled v-model="evento.date">
      <template v-slot:prepend>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="evento.date" mask="YYYY-MM-DD HH:mm" />
          </q-popup-proxy>
        </q-icon>
      </template>

      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time v-model="evento.date" mask="YYYY-MM-DD HH:mm" format24h />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>


       <q-card-actions align="right">
          <q-btn  label="Submit" color="primary" type="submit" v-close-popup />
          <q-btn flat label="Reset" color="primary" type="reset" class="q-ml-sm" v-close-popup />
        </q-card-actions>
    </q-form>

       
      </q-card>
    </q-dialog>
 

     
     <q-timeline color="secondary">
       <q-timeline-entry heading>
        Eventos por venir
      </q-timeline-entry>
      <q-timeline-entry
        v-for="(item, i) in events"
        :key="i"
      > 
       <template v-slot:title>
          {{item.title}}
        </template>
        <template v-slot:subtitle>
          {{item.date}}
        </template>
        <div>
          {{item.description}}
        </div>
        <q-btn @click="delEvent(i, item.id)" >Elminar evento</q-btn>
      </q-timeline-entry>

      
    </q-timeline>
  </div>
</template>

<script >
import Calendary from 'components/Calendario.vue';
import { db } from "boot/firebase.js";
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

export default {
  components: { Calendary },
   data () {
    return {
      todays: '',
      splitterModel: 50,
      date: '',
      events: [],
      eventTitle: '',
      eventDescription: '',
      basic: false,
      fixed: false,
      evento: {
        title: '',
        description: '',
        date: ''
      }
    }
  },
  created() {
    this.getDay(),
    //this.listEvents()
    this.sendEvent()
  },
  methods: {
    async onSubmit () {
      try {
        await this.$axios({
        method: 'post',
        url: '/notes/new-note',
        data: this.evento,
        contentType: 'application/json'
      }).then(res=>{
        console.log(res.data._id)
            const tareas = {
              id: res.data._id, 
              date: res.data.date,
              title: res.data.title, 
              description: res.data.description
            }
            this.events.push(tareas)
          })
      .catch (e => {
        console.log (e)
      })
      } catch (error) {
        console.log(error)
      }
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Evento Guardado'
        })
        this.evento = {
          title: '',
          description: '',
          date: ''
        }
    },

     delEvent (index, id) {
      this.$q.dialog({
        title: 'confirmar',
        message: 'Realmente quieres eliminar este evento?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
         try {
           await this.$axios({
             method: 'delete',
             url: `/notes/delete/${id}`,
           }).then(res => {
             console.log(res.data)
             this.$q.notify({
              color: 'green-8',
              textColor: 'white',
              icon: 'cloud_done',
              message: `${res.data}`
        })
           })
           .catch(e => {
             console.log(e)
           })
        this.events.splice(index, 1)
      } catch (error) {
        console.log(error)
      }
      })
    },

    onReset () {
      this.eventTitle = null
      this.eventDescription = null
      this.date = null
    },

    getDay(){
      this.date = new Date().toISOString().substr(0, 15);
      console.log(this.date)
    },
     async listEvents(){
      try {
        const resDB = await db.collection('Eventos').orderBy('date', "asc").get()
        resDB.forEach(res => {
          const tareas = {
              id: res.id, 
              titulo: res.data().titulo, 
              descripcion: res.data().descripcion,
              date: res.data().date
            }
          this.events.push(tareas)
          
        })
      }
      catch(e) {
        console.log(e)
      }
    },

    sendEvent () {
      this.$axios
        .get('/notes')
        .then(res => {
          const resJson = JSON.stringify(res.data)
          const resString = JSON.parse(resJson)
          resString.forEach(res => {
          const tareas = {
            id: res._id, 
            date: res.date,
            title: res.title, 
            description: res.description
          }
            this.events.push(tareas)
        })
      })
      .catch( e => {
        console.log(e.response)
      })
    }
   
  },
  
  
}
</script>
