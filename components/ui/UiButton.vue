<script lang="ts" setup>
  withDefaults(
    defineProps<{ variant?: 'outlined' | 'filled', label?: string }>(),
    { variant: 'filled' }
  )

  const emit = defineEmits(['click'])
</script>

<template>
  <button @click="emit('click')" :class="variant" class="ui-button">
    {{ label }}
  </button>
</template>

<style scoped>
  .ui-button{
    border: none;
    font-size: 18px;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
  }

  .ui-button.outlined{
    background-color: var(--v-background);
    color: var(--v-primary-text);
    border: 1px solid var(--v-blue);
  }

  .ui-button.outlined:hover{
    background-color: var(--v-blue);
    color: var(--white);
  }

  .ui-button.outlined:active{
    background-color: var(--v-tertiary-background);
  }

  .ui-button.filled{
    background-color: var(--v-blue);
    color: var(--white);
  }

  .ui-button.filled:hover{
    background-color: var(--v-background);
    color: var(--v-primary-text);
    outline: 1px solid var(--v-blue);
  }

  .ui-button.filled:active{
    background-color: var(--v-blue);
    color: var(--white);
  }
</style>