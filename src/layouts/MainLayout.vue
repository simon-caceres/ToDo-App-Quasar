<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="header">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <div class ="q-px-lg q-ot-xl q-mb-md">
          <div class="text-h3">To-do App</div>
          <div class ="text-subtitles">{{todaysDate}}</div>
        </div>
      </q-toolbar>
      <q-img src="statics/montanas2.jpeg"
      class="header-image absolute-top"  ></q-img>
    </q-header>

     <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="220"
        :breakpoint="600"
      >
        <q-scroll-area style="height: calc(100% - 140px); margin-top: 140px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item 
              to="/Main/Index"
              clickable 
              v-ripple>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>

              <q-item-section>
                Tareas
              </q-item-section>
            </q-item>

             <q-item 
              to="/Main/Calendary"
              exact
              clickable 
              v-ripple>
              <q-item-section avatar>
                <q-icon name="event" />
              </q-item-section>

              <q-item-section>
                Eventos
              </q-item-section>
            </q-item>

          <q-item 
              to="/Main/help"
              exact
              clickable 
              v-ripple>
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>

              <q-item-section>
                Ayuda
              </q-item-section>
            </q-item>

            <q-item 
              to="/"
              exact
              clickable 
              v-ripple
              >
              <q-item-section avatar>
               <q-img src="/statics/icons/key.svg"
               id="keysvg">
               </q-img>
              </q-item-section>

            

              <q-item-section>
                Log Out
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="statics/montanas2.jpeg" style="height: 138px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold" :v-text="name">{{name}}</div>
            <div>@{{name}}</div>
          </div>
        </q-img>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>


  </q-layout>
</template>

<script>
import { date } from 'quasar'
import EssentialLink from 'components/EssentialLink'
import Home from 'pages/Home'
import Index from 'pages/Index'
import Calendary from 'pages/Calendary'
import Help from 'pages/Help'

export default {
  name: 'MainLayout',
  props: ['name'],
  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'To-do',
          caption: 'Actividades',
          icon: 'school',
          link: '/'
        }
      ],
    }
  },
  computed: {
     todaysDate(){
      let timeStamp = Date.now();
      return date.formatDate(timeStamp, 'dddd D MMM')
    }
  }
}
</script>

<style >
  .header{
    height: 138px;
    
  }
  .header-image{
    height: 100%;
    z-index: -1;
    background-color: #bbb;
    opacity: 0,1;
  }

   .done>.q-item__label{
      text-decoration: line-through;
      color: #bbb
    }
  

  .no-tasks{
    opacity: 0.3;
  }

  #keysvg{
    width: 1.7rem;
  }
</style>