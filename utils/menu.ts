type ContextMenuPosition = { x: number; y: number; left: number; top: number }

const [provideContextMenu, useContextMenu] =
  useSingleton<(style: { style: ContextMenuPosition }) => void>()

export { useContextMenu, provideContextMenu }
export type { ContextMenuPosition }
