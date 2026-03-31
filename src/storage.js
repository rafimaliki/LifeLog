const isElectron = typeof window !== 'undefined' && !!window.electronAPI?.loadData

export async function loadData() {
  if (isElectron) return window.electronAPI.loadData()
  const raw = localStorage.getItem('lifelog-data')
  return raw ? JSON.parse(raw) : {}
}

export async function saveData(data) {
  if (isElectron) return window.electronAPI.saveData(data)
  localStorage.setItem('lifelog-data', JSON.stringify(data))
}
