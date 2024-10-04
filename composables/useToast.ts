import { toast } from "vue3-toastify";

export const useToast = () => {
  const { t } = useI18n()
  const errorToast = (message: string) => {
    const array = message.split(',')

    for (const item of array) {
      toast.error(t('error.' + item)) 
    }
  }

  return {
    errorToast
  }
}