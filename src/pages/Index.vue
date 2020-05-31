<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md q-gutter-sm">
    <q-editor
      v-if ="!modoEdicion"
      v-model="nota.description"
      :definitions="{
        save: {
          tip: 'Guardar Task',
          icon: 'save',
          label: 'Guardar',
          handler: saveWork
        }
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    />

    <q-editor
      v-else
      v-model="nota.description"
      :definitions="{
        save: {
          tip: 'Actualizar Task',
          icon: 'save',
          label: 'Actualizar',
          handler: upWork
        }
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    />

    <q-list 
      class="bg-white"
      separator
      bordered>
 
      <q-item 
        v-for="(item, i) in tasks"
        :key="i"
        v-ripple
        clickable
        @click="item.estado = !item.estado"
        :class="{'done bg-blue-1' : item.estado}">
        <q-item-section avatar>
          <q-checkbox 
            v-model="item.estado" 
             color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label v-html="item.texto">{{item.texto}}</q-item-label>
        </q-item-section>
        <q-item-section
          v-if="item.estado"
          side 
          >
          <q-btn
            @click.stop="deletetask(i, item.id)"
            flat
            round 
            dense 
            color="danger" 
            icon="delete"></q-btn>
            <q-btn
            @click.stop="editask(i, item.id)"
            flat
            round 
            dense 
            color="primary" 
            icon="edit"></q-btn>
        </q-item-section>
      </q-item>

    </q-list>
    <div
      v-if="!tasks.length"
     class="no-tasks absolute-center">
      <q-icon
        size="100px"
        color="primary"
        name="check"></q-icon>
      <div class="text-h5 text-primary text-center">
        No Tasks
      </div>
    </div>
  </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import { db } from "boot/firebase.js"
import Home from 'pages/Home'
axios.defaults.baseURL = 'http://localhost:3000';

export default {
  data () {
    return {
      editor: '',
      tasks: [],
      index: null,
      modoEdicion: false,
      id: null,
      nota:{
        state: false,
        description: ''
      }
    }
  },
  props: ['name'],
  created(){
    //this.listTasks()
    this.listarNotas()
  },

  mounted () {
    
  },
  methods: {
    async saveWork () {
     await axios({
        method: 'post',
        url: '/tasks/add',
        data: this.nota,
        contentType: 'application/json'
      }).then( res => {
        console.log(res)
         this.tasks.push({
         texto : res.data.description,
         estado: res.data.state,
         id: res.data._id
       })
       this.nota.description = ''
       this.$q.notify({
         message: 'Tarea guardada',
         color: 'green-4',
         textColor: 'white',
         icon: 'cloud_done'
       })
      })
      .catch(e => {
        console.log (e)
      })  
       
    },

    deletetask(index, id) {
        this.$q.dialog({
          dark: true,
          title: 'Confirmar',
          message: 'Realmente quiere elminar esta tarea?',
          cancel: true,
          persistent: true
      }).onOk( async () => {
        try {
          await this.$axios({
            method: 'delete',
            url: `/tasks/delete/${id}`
          })
          .then(res => {
            this.$q.notify({
             message: res.data,
              color: 'primary-4',
            textColor: 'white',
            icon: 'cloud_done'
            })
          })
          this.tasks.splice(index, 1)
        } catch (error) {
          console.log(error)
        }
      })
    },

    editask(i,id){
      this.modoEdicion = true
      this.index = i
      this.id = id
      this.nota.description = this.tasks[i].texto
    },
    async upWork () {
      const id = this.tasks[this.index].id
      try {
        await this.$axios({
          method: 'put',
          url: `/tasks/edit/${id}`,
          data: this.nota
        })
        .then(res => {
        this.tasks[this.index].texto = this.nota.description
        this.modoEdicion = false
        this.nota.description = ''
        this.$q.notify({
          message: 'Tarea Actualizada',
          color: 'primary-4',
          textColor: 'white',
          icon: 'cloud_done'
        })
      })

      } catch (error) {
        console.log(error)
      } finally {
        this.modoEdicion = false
        this.index = null
        this.id = null
        this.editor = ''
      }
      
    },

    listarNotas(){
      this.$axios
        .get('/tasks')
        .then(res => {
          const resJson = JSON.stringify(res.data)
          const resString = JSON.parse(resJson)
          resString.forEach(res => {
          const tareas = {
            id: res._id, 
            estado: res.state, 
            texto: res.description
          }
          this.tasks.push(tareas)
        })
         })
        .catch( e => {
          console.log(e)
         })
    },
  }
}
</script>

<style>
  .tachar{
    text-decoration: line-through;
  }
</style>