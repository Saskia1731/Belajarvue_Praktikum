
import { ref, computed, watch } from 'vue'

// 1. State utama (Module-Level Singleton)
const STORAGE_KEY = 'gatherly_events'
const savedData = localStorage.getItem(STORAGE_KEY)
const events = ref(savedData ? JSON.parse(savedData) : [])

// 2. Watchers: Sinkronisasi State ke Media Penyimpanan Lokal
watch(
  events,
  (newEvents) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newEvents))
  },
  { deep: true }
)

export function useEvents() {
  // 3. Derived State
  const totalEvents = computed(() => events.value.length)
  const activeEvents = computed(() =>
    events.value.filter(e => !e.done)
  )
  const completedEvents = computed(() =>
    events.value.filter(e => e.done)
  )

  // 4. Fungsi mutasi state
  const createEvent = (data) => {
    events.value.unshift({
      id: Date.now(),
      ...data,
      done: false
    })
  }

  const completeEvent = (id) => {
    const item = events.value.find(e => e.id === Number(id))
    if (item) item.done = true
  }

  const deleteEvent = (id) => {
    const idx = events.value.findIndex(e => e.id === Number(id))
    if (idx !== -1) events.value.splice(idx, 1)
  }

  const getEventById = (id) => {
    return events.value.find(e => e.id === Number(id))
  }

  return {
    events,
    totalEvents,
    activeEvents,
    completedEvents,
    createEvent,
    completeEvent,
    deleteEvent,
    getEventById
  }
}
