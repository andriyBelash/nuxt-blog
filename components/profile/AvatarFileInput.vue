<script setup lang="ts">
  import CropperModal from './CropperModal.vue';
  import { ref, type Ref } from 'vue';
  import { useProfileStore } from '#imports';

  defineProps<{ logo: string }>()

  const store = useProfileStore()
  const { t } = useI18n()

  const demo: Ref<string> = ref('')
  const showCropper: Ref<boolean> = ref(false)
  const cropperFile: Ref<string | null> = ref(null)

  const changeFile = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (!target.files) return
    cropperFile.value = URL.createObjectURL(target.files[0])
    showCropper.value = true
  }

  const toggleCropper = () => {
    showCropper.value = !showCropper.value
  }

  const cropImage = (blob: File) => {
    demo.value = URL.createObjectURL(blob)
    store.formUser.file = blob
  } 
  
</script>

<template>
  <div class="user-file-input flex gap-4">
    <div class="user-file-input--input">
      <input @change="($event) => changeFile($event)" accept="image/*" id="avatar" type="file"/>
      <label for="avatar">
        <img :src="demo || logo" alt="avatar"/>
      </label>
    </div>
    <div class="flex flex-col items-start user-file-input--info">
      <span>{{ t('settings.upload.image') }}</span>
      <p>
        {{ t('settings.upload.recommended') }}
      </p>
    </div>
  </div>

  <CropperModal
    @close="toggleCropper" 
    :file="cropperFile" 
    :show="showCropper" 
    @change="cropImage"
  />
</template>


<style scoped>
  .user-file-input {
    width: 100%;
    height: 100%;
  }

  .user-file-input--input{
    position: relative;  
    min-width: 100px;
    height: 100px;
    border-radius: 16px;
    overflow: hidden;
    position: relative;
    border: 4px solid var(--v-border);    
  }

  .user-file-input--input input{
    display: none;
  }

  .user-file-input--input label{
    width: 100%;
    height: 100%;
    display: inline-block;
    cursor: pointer;
  }

  .user-file-input--input label img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .user-file-input--info{
    max-width: 400px;
    span{
      color: var(--v-primary-text);
      font-weight: 500;
      font-size: 24px;
    }

    p{
      color: var(--v-secondary-text);
    }
  }

  @media screen and (max-width: 767.98px) {
    .user-file-input--input{
      min-width: 80px;
      height: 80px;
      border-width: 2px;
    }

    .user-file-input--info span{
      font-size: 18px;
    }

    .user-file-input--info p{
      font-size: 14px;
    }
  }
</style>