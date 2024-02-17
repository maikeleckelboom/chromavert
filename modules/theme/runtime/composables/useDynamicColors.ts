export function useDynamicColors() {
  const { $dynamicScheme } = useNuxtApp()

  const light = ref({})
  const dark = ref({})
  const system = ref({})

  return {
    light,
    dark,
    system
  }
}
