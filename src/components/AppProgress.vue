<template>
  <div>
    <v-progress-linear v-model="valueDeterminate" height="50" color="red darken-1"></v-progress-linear>
    <span class="display-3">{{ valueDeterminate }}</span>
  </div>
</template>

<script>
    export default {
      sockets:{
            tickTimer: function(s){
              this.valueDeterminate=s
              //console.log()
            }
      },
      data () {
        let valueDeterminate
        return {
          valueDeterminate
        }
      }
    }
  </script>