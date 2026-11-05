
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useEvents } from '@/composables/useEvents'

import AppModal from '@/components/ui/AppModal.vue'
import AppButton from '@/components/ui/AppButton.vue'
import OrganizerEventCard from '@/components/event/OrganizerEventCard.vue'
import EventCreateForm from '@/components/event/EventCreateForm.vue'

const router = useRouter()

const {
  events,
  loading,
  error,
  fetchEvents,
  createEvent,
  deleteEvent
} = useEvents()

// KONDISI TAB AKTIF
const currentTab = ref('active')

// LOADING AWAL
const isInitialLoading = ref(true)

// MODAL STATE
const isModalOpen = ref(false)
const selectedEvent = ref(null)
const isProcessingAction = ref(false)

// MENGAMBIL DATA EVENT DARI API
const loadEvents = async () => {
  isInitialLoading.value = true

  try {
    await fetchEvents()
  } finally {
    isInitialLoading.value = false
  }
}

onMounted(() => {
  loadEvents()
})

// MEMISAHKAN EVENT AKTIF DAN COMPLETED
const activeEvents = computed(() => {
  return events.value.filter(event => !event.done)
})

const completedEvents = computed(() => {
  return events.value.filter(event => event.done)
})

// MEMBUKA MODAL DELETE
const handleOpenDeleteModal = (event) => {
  selectedEvent.value = event
  isModalOpen.value = true
}

// KONFIRMASI DELETE
const handleConfirmModal = async () => {
  if (!selectedEvent.value) return

  isProcessingAction.value = true

  try {
    await deleteEvent(selectedEvent.value.id)

    isModalOpen.value = false
    selectedEvent.value = null
  } catch (err) {
    console.error('Gagal menghapus acara:', err)
  } finally {
    isProcessingAction.value = false
  }
}

// MEMBATALKAN MODAL
const handleCancelModal = () => {
  if (isProcessingAction.value) return

  isModalOpen.value = false
  selectedEvent.value = null
}

// MEMBUAT EVENT BARU
const handleCreateEvent = async (eventData) => {
  try {
    await createEvent({
      ...eventData,
      done: false
    })

    currentTab.value = 'active'
  } catch (err) {
    console.error('Gagal membuat acara:', err)
  }
}

// MEMBUKA DETAIL EVENT
const handleViewDetail = (id) => {
  router.push(`/browse/events/${id}`)
}

// MENGAMBIL DATA SAAT DIMINTA ULANG
const handleRetry = async () => {
  await loadEvents()
}
</script>

<template>
  <div class="event-management-page">

    <!-- PAGE HEADER -->
    <div class="page-header">
      <div class="header-info">
        <h2>Event Management Control</h2>

        <p class="subtitle">
          Manage event lifecycle, publish new events, and archive completed ones.
        </p>
      </div>

      <AppButton
        variant="primary"
        @click="currentTab = 'create'"
      >
        ＋ Create New Event
      </AppButton>
    </div>

    <!-- TAB NAVIGATION -->
    <div class="tabs-container">

      <button
        :class="['tab-btn', { active: currentTab === 'active' }]"
        @click="currentTab = 'active'"
      >
        ⚡ Active Events ({{ activeEvents.length }})
      </button>

      <button
        :class="['tab-btn', { active: currentTab === 'create' }]"
        @click="currentTab = 'create'"
      >
        ＋ Create Event
      </button>

      <button
        :class="['tab-btn', { active: currentTab === 'completed' }]"
        @click="currentTab = 'completed'"
      >
        ☑️ Completed Events ({{ completedEvents.length }})
      </button>

    </div>

    <!-- ERROR STATE -->
    <div
      v-if="error && events.length === 0 && !isInitialLoading"
      class="error-card"
    >
      <h3>Something went wrong!</h3>

      <p>{{ error }}</p>

      <button
        class="retry-button"
        @click="handleRetry"
      >
        Try Again
      </button>
    </div>

    <!-- INITIAL LOADING -->
    <section
      v-else-if="isInitialLoading"
      class="loading-container"
    >
      <div
        v-for="n in 3"
        :key="n"
        class="skeleton skeleton-card"
      ></div>
    </section>

    <!-- TAB 1: ACTIVE EVENTS -->
    <section
      v-else-if="currentTab === 'active'"
      class="tab-pane"
    >

      <div class="tab-heading">
        <div>
          <h3>Active Events</h3>
          <p>Manage your currently available events.</p>
        </div>
      </div>

      <div
        v-if="activeEvents.length > 0"
        class="events-grid"
      >
        <OrganizerEventCard
          v-for="item in activeEvents"
          :key="item.id"
          :event="item"
          @view-detail="handleViewDetail"
          @delete="handleOpenDeleteModal"
        />
      </div>

      <div
        v-else
        class="empty-state"
      >
        <div class="empty-icon">📭</div>

        <h3>No Active Events</h3>

        <p>
          All events have ended or none have been created yet.
          Please create a new event.
        </p>

        <AppButton
          variant="primary"
          @click="currentTab = 'create'"
        >
          Create Event Now
        </AppButton>
      </div>

    </section>

    <!-- TAB 2: CREATE EVENT -->
    <section
      v-else-if="currentTab === 'create'"
      class="tab-pane"
    >

      <div class="tab-heading">
        <div>
          <h3>Create New Event</h3>
          <p>Fill in the information below to publish a new event.</p>
        </div>
      </div>

      <EventCreateForm
        :loading="loading"
        @submit="handleCreateEvent"
        @cancel="currentTab = 'active'"
      />

    </section>

    <!-- TAB 3: COMPLETED EVENTS -->
    <section
      v-else-if="currentTab === 'completed'"
      class="tab-pane"
    >

      <div class="tab-heading">
        <div>
          <h3>Completed Events</h3>
          <p>View and manage your archived events.</p>
        </div>
      </div>

      <div
        v-if="completedEvents.length > 0"
        class="events-grid"
      >
        <OrganizerEventCard
          v-for="item in completedEvents"
          :key="item.id"
          :event="item"
          :is-completed="true"
          @delete="handleOpenDeleteModal"
        />
      </div>

      <div
        v-else
        class="empty-state"
      >
        <div class="empty-icon">📁</div>

        <h3>No Completed Events</h3>

        <p>
          Events marked as completed will be archived here permanently.
        </p>
      </div>

    </section>

    <!-- MODAL DELETE -->
    <AppModal
      :is-open="isModalOpen"
      title="Delete Event Permanently?"
      :message="`Are you sure you want to permanently delete '${selectedEvent?.title}'? This action cannot be undone.`"
      confirm-text="Yes, Delete Permanently"
      cancel-text="Cancel"
      @confirm="handleConfirmModal"
      @close="handleCancelModal"
    />

  </div>
</template>

<style scoped>
/* MAIN PAGE */
.event-management-page {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* PAGE HEADER */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-bottom: 36px;
  flex-wrap: wrap;
}

.header-info {
  flex: 1;
  min-width: 250px;
}

.page-header h2 {
  font-size: 2rem;
  line-height: 1.3;
  color: var(--text-main);
  margin: 0 0 10px;
}

.subtitle {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

/* TAB NAVIGATION */
.tabs-container {
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 2px solid var(--border-color);
  margin-bottom: 32px;
  padding-bottom: 12px;
  flex-wrap: wrap;
}

.tab-btn {
  background: none;
  border: none;
  padding: 12px 20px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tab-btn:hover {
  background-color: rgba(102, 68, 255, 0.05);
  color: var(--primary);
}

.tab-btn.active {
  background-color: var(--primary);
  color: white;
}

/* TAB HEADING */
.tab-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.tab-heading h3 {
  color: var(--text-main);
  font-size: 1.3rem;
  margin: 0 0 8px;
}

.tab-heading p {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;
}

/* EVENT GRID */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 28px;
  align-items: stretch;
  margin-bottom: 40px;
}

/* EMPTY STATE */
.empty-state {
  text-align: center;
  padding: 48px 32px;
  background: white;
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  margin: 32px 0;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 18px;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: var(--text-main);
  margin: 0 0 12px;
}

.empty-state p {
  color: var(--text-muted);
  line-height: 1.7;
  max-width: 500px;
  margin: 0 auto 24px;
}

/* LOADING */
.loading-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

/* ERROR */
.error-card {
  padding: 32px;
  border-radius: 12px;
  background: #fff1f1;
  border: 1px solid #fecaca;
  text-align: center;
  color: #b91c1c;
  margin: 24px 0;
}

.error-card h3 {
  margin: 0 0 12px;
}

.retry-button {
  background: #dc2626;
  color: white;
  border: none;
  padding: 10px 22px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 16px;
  font-weight: 600;
}

.retry-button:hover {
  background: #b91c1c;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .tabs-container {
    gap: 8px;
  }

  .tab-btn {
    padding: 10px 14px;
    font-size: 0.85rem;
  }

  .events-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .page-header h2 {
    font-size: 1.6rem;
  }

  .tabs-container {
    flex-direction: column;
    align-items: stretch;
  }

  .tab-btn {
    text-align: left;
  }

  .empty-state {
    padding: 32px 20px;
  }
}
</style>
