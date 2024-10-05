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
    <slot />
  </button>
</template>

<style scoped>
  .ui-button{
    border: none;
    font-size: 18px;
    padding: 6px 14px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid var(--v-blue);
  }

  .ui-button.outlined{
    background-color: var(--v-background);
    color: var(--v-primary-text);
    border: 1px solid var(--v-blue);
  }

  .ui-button.outlined:hover{
    background-color: rgb(from var(--v-blue) r g b / 0.5);
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
    background-color: rgb(from var(--v-blue) r g b / 0.7);
    color: var(--v-primary-text);
  }

  .ui-button.filled:active{
    background-color: var(--v-blue);
    color: var(--white);
  }

  @media screen and (max-width: 767.98px) {
    .ui-button{
      font-size: 14px;
      padding: 4px 8px;
    }

  }
</style>