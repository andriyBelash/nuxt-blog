<script setup lang="ts">
  import { Cropper } from 'vue-advanced-cropper';
  import 'vue-advanced-cropper/dist/style.css';
  import { blobToFile, generateRandomFilename } from '~/lib/utils/functions';

  import UiModal from '../ui/UiModal.vue';

  interface Props { show: boolean, file: string | null }

  const emit = defineEmits<{ close: [], change: [ file: File ] }>()
  const props = defineProps<Props>()

  const { t } = useI18n()
  const cropper = ref()

  const save = () => {
    if (cropper.value as any) {
      const { canvas } = cropper.value.getResult();
      canvas.toBlob((blob: Blob) => {
        const file = blobToFile(blob, generateRandomFilename())
        emit('change', file)
        emit('close')
      }, 'image/png');
    }
  }
</script>

<template>
  <UiModal :show="props.show" @close="emit('close')" :title="t('settings.upload.cropper')">
    <Cropper ref="cropper" :src="props.file" />
    <template #action>
      <div class="mt-4 flex justify-end gap-4">
        <UiButton variant="outlined" @click="emit('close')">{{ t('action.cancel') }}</UiButton>
        <UiButton @click="save">{{ t('action.save') }}</UiButton>
      </div>
    </template>
  </UiModal>
</template>