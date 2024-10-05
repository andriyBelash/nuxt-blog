import { toast } from "vue3-toastify";

export const useToast = () => {
  const { t } = useI18n()
  const errorToast = (message: string) => {
    const array = message.split(',')

    for (const item of array) {
      toast.error(t('error.' + item)) 
    }
  }

  const handleError = (error: any) => {
    errorToast(error.message)
    return Promise.reject(error)
  }

  const successToast = (message: string) => {
    toast.success(t('toast.success.' + message))
  }

  return {
    errorToast,
    handleError,
    successToast
  }
}