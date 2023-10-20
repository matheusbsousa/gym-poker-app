<script setup lang="ts">

import {useRouter} from "vue-router";

const router = useRouter()

interface Props{
  path?: string
}

const props = defineProps<Props>();

function backTo(){
  if(props.path){
    router.push(props.path);
  }else{
    router.back();
  }
}

</script>

<template>
    <v-sheet @click="backTo" elevation="1" width="50" height="50"
             class=" back bg-secondary d-flex justify-center align-center rounded-circle">
      <font-awesome-icon class="text-h4 text-white"
                         icon="arrow-left"/>
    </v-sheet>
</template>

<style scoped>

.back{
  cursor: pointer
}

</style>