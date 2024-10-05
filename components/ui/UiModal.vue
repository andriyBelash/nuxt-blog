<script lang="ts" setup>
  import { onClickOutside } from '@vueuse/core'

  interface Props {
    title?: string
    maxWidth?: string
    show: boolean
  }

  const refModal = ref(null)
  
  const emit = defineEmits(['close'])

  withDefaults(defineProps<Props>(), {
    maxWidth: '500px'
  })

  onClickOutside(refModal, event => emit('close'))

</script>

<template>
  <div v-if="show" class="overlay">
    <div ref="refModal" class="modal" :style="{ maxWidth }">
      <div class="modal--header">
        <h3 class="modal--title" v-if="title">{{ title }}</h3>
        <button @click="emit('close')" class="close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/>
          </svg>
        </button>
      </div>
      <div class="modal--body">
        <slot />
      </div>

      <slot name="action" />
    </div>
  </div>
</template>

<style>
  .overlay{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 24px;
  }

  .modal{
    background: var(--v-background);
    border-radius: 16px;
    padding: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }

  .close-btn{
    position: absolute;
    top: 24px;
    right: 16px;
    transition: all 0.3s ease;
  }
  .close-btn:hover{
    transform: rotate(90deg);
  }

  .close-btn:active{
    transform: scale(0.8) rotate(90deg);
  }

  .modal--title{
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    color: var(--v-primary-text);
  }

  .modal--body{
    margin-top: 24px;
  }

  @media screen and (max-width: 767.98px) {
    .modal{
      width: 90%;
    }
  }
</style>