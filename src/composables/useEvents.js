import { ref } from 'vue'

const API_URL = import.meta.env.VITE_API_URL

export function useEvents() {
  const events = ref([])
  const loading = ref(false)
  const error = ref(null)

  // GET: Mengambil semua data acara
  const fetchEvents = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_URL}/events`)

      if (!response.ok) {
        throw new Error('Gagal mengambil data acara')
      }

      events.value = await response.json()
      return events.value
    } catch (err) {
      error.value = err.message
      console.error(err)
      return []
    } finally {
      loading.value = false
    }
  }

  // GET: Mengambil detail acara berdasarkan ID
  const fetchEventById = async (id) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_URL}/events/${id}`)

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? 'Acara tidak ditemukan'
            : 'Gagal mengambil detail acara'
        )
      }

      return await response.json()
    } catch (err) {
      error.value = err.message
      console.error(err)
      return null
    } finally {
      loading.value = false
    }
  }

  // POST: Membuat acara baru
  const createEvent = async (eventData) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      })

      if (!response.ok) {
        throw new Error('Gagal membuat acara')
      }

      const newEvent = await response.json()

      events.value.push(newEvent)

      return newEvent
    } catch (err) {
      error.value = err.message
      console.error(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // DELETE: Menghapus acara
  const deleteEvent = async (id) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Gagal menghapus acara')
      }

      events.value = events.value.filter(
        event => event.id !== id
      )

      return true
    } catch (err) {
      error.value = err.message
      console.error(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    events,
    loading,
    error,
    fetchEvents,
    fetchEventById,
    createEvent,
    deleteEvent
  }
}