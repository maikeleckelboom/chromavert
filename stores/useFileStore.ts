import { useObjectUrl } from '@vueuse/core'

const useFileStore = defineStore('files', () => {
  const files = ref<File[]>([])
  const { selectedFile, clearSelection, selectFile, isSelected } = useFileSelection(files)
  const fileObjectUrl = useObjectUrl(selectedFile)

  function reset() {
    files.value = []
    clearSelection()
  }

  return {
    files,
    reset,
    selectedFile,
    clearSelection,
    selectFile,
    isSelected,
    fileObjectUrl: computed(() => fileObjectUrl.value)
  }
})

export { useFileStore }
