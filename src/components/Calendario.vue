
<template>
    <div>
      <q-btn label="Prompt" color="primary" @click="prompt = !prompt" />
    <q-banner class="bg-primary text-white">
      <template v-slot:action>
            
            <q-separator></q-separator>
            <q-btn flat label="Prev" @click="calendarPrev"></q-btn>
            <q-separator vertical></q-separator>
            <q-btn  flat label="Next" @click="calendarNext"></q-btn>
      </template>
    </q-banner>
        
          <q-page class="calendarioContainer">
            <q-calendar
              @click="dialog"
              :weekdays="[1, 2, 3, 4, 5, 6, 0]"
              ref="calendar"
              v-model="date"
              color="#FF0000"
              :events ="events"
            >
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Your address</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="address" autofocus @keyup.enter="prompt = false" />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add address" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
            </q-calendar>
          </q-page>
        
      
    </div>
</template>

<style src="@quasar/quasar-ui-qcalendar/dist/index.css"></style>


<script>
import { QCalendar } from '@quasar/quasar-ui-qcalendar'
import { db } from "boot/firebase.js"

export default {
    name: 'Calendary',
  components: {
    QCalendar
  },
  data () {
    return {
      date: '',
      version: QCalendar.version,
      prompt: true,
      address: '',
       events: [
        {
          title: '1st of the Month',
          details: 'Everything is funny as long as it is happening to someone else',
          
          bgcolor: 'orange'
        },
        {
          title: 'Sisters Birthday',
          details: 'Buy a nice present',
          
          bgcolor: 'green',
          icon: 'fas fa-birthday-cake'
        },
        {
          title: 'Meeting',
          details: 'Time to pitch my idea to the company',
         
          time: '10:00',
          duration: 120,
          bgcolor: 'red',
          icon: 'fas fa-handshake'
        },
        {
          title: 'Lunch',
          details: 'Company is paying!',
          
          time: '11:30',
          duration: 90,
          bgcolor: 'teal',
          icon: 'fas fa-hamburger'
        },
        {
          title: 'Visit mom',
          details: 'Always a nice chat with mom',
          
          time: '17:00',
          duration: 90,
          bgcolor: 'blue-grey',
          icon: 'fas fa-car'
        },
        {
          title: 'Conference',
          details: 'Teaching Javascript 101',
          
          time: '08:00',
          duration: 540,
          bgcolor: 'blue',
          icon: 'fas fa-chalkboard-teacher'
        },
        {
          title: 'Girlfriend',
          details: 'Meet GF for dinner at Swanky Restaurant',
          
          time: '19:00',
          duration: 180,
          bgcolor: 'teal',
          icon: 'fas fa-utensils'
        },
        {
          title: 'Rowing',
          details: 'Time for some weekend R&R',
          
          bgcolor: 'purple',
          icon: 'rowing',
          days: 2
        },
        {
          title: 'Vacation',
          details: 'Trails and hikes, going camping! Don\'t forget to bring bear spray!',
          
          bgcolor: 'purple',
          icon: 'fas fa-plane',
          days: 7
        }
      ]
    }
  },
  computed: {
     todaysDate(){
      let timeStamp = Date.now();
      return date.formatDate(timeStamp, 'dddd D MMM')
      console.log(timeStamp)
    }
  },
  methods: {
    calendarNext () {
      this.$refs.calendar.next()
    },

    calendarPrev () {
      this.$refs.calendar.prev()
    },

    dialog (){
      this.$q.dialog({
          dark: true,
          title: 'Confirmar',
          message: 'Realmente quiere elminar esta tarea?',
          cancel: true,
          persistent: true
      }).onOk( () => {
        
      })
    }
    
  }

 
}
  
</script>


<style>

.q-calendar-daily__day-interval:hover{
    background-color: rgba(0,0,255,.1)
}
  
.q-calendar-weekly__workweek:hover{
    background-color: rgba(0,0,255,.1)
}
  
.q-calendar-weekly__day:hover{
    background-color: rgba(0,0,255,.1)
}
  
.q-calendar-weekly__head-weekday:hover{
    background-color: rgba(0,0,255,.1)
}
  
.calendarioContainer{
    padding-top: 1px;
}

</style>
