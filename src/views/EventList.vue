
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useEvents } from '@/composables/useEvents'

import EventCard from '@/components/event/EventCard.vue'
import SearchBar from '@/components/event/SearchBar.vue'
import CategoryFilter from '@/components/event/CategoryFilter.vue'

const router = useRouter()

// Mengambil data dari API
const {
  events,
  loading,
  error,
  fetchEvents
} = useEvents()

// Mengambil data saat halaman dibuka
onMounted(() => {
  fetchEvents()
})

const searchQuery = ref('')
const selectedCategory = ref('All')

const categories = [
  'All',
  'Workshop',
  'Meetup',
  'Competition',
  'Seminar',
  'Conference'
]

// Filter event aktif
const filteredEvents = computed(() => {
  return events.value.filter((event) => {
    const matchSearch =
      (event.title || '').toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (event.loc || '').toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchCategory =
      selectedCategory.value === 'All' ||
      event.cat === selectedCategory.value

    return matchSearch && matchCategory && !event.done
  })
})

// Membuka detail event
const handleViewDetail = (id) => {
  router.push(`/browse/events/${id}`)
}

// Mengulang pengambilan data
const handleRetry = () => {
  fetchEvents()
}
</script>

<template>
  <div class="event-list-page">

    <!-- HEADER -->
    <div class="header-section">
      <h2 class="section-title">Upcoming Events</h2>

      <p class="section-desc">
        Discover workshops, seminars, tech meetups, and competitions near you.
      </p>
    </div>

    <!-- SEARCH DAN FILTER -->
    <div class="filters-section">
      <SearchBar v-model="searchQuery" />

      <CategoryFilter
        :categories="categories"
        v-model="selectedCategory"
      />
    </div>

    <!-- LOADING STATE -->
    <div
      v-if="loading"
      class="loading-container"
    >
      <div
        v-for="n in 3"
        :key="n"
        class="skeleton skeleton-card"
      ></div>
    </div>

    <!-- ERROR STATE -->
    <div
      v-else-if="error"
      class="error-card"
    >
      <h3>NETWORK ERROR</h3>

      <p>{{ error }}</p>

      <button
        class="retry-button"
        @click="handleRetry"
      >
        Coba Lagi
      </button>
    </div>

    <!-- GRID EVENT -->
    <div
      v-else-if="filteredEvents.length > 0"
      class="event-grid"
    >
      <EventCard
        v-for="event in filteredEvents"
        :key="event.id"
        :event="event"
        @view-detail="handleViewDetail"
      />
    </div>

    <!-- EMPTY STATE -->
    <div
      v-else
      class="empty-state"
    >
      <div class="empty-badge">CATALOG EMPTY</div>

      <h3>No Events Available Yet</h3>

      <p>
        There are currently no active events scheduled. Are you an organizer?
        Publish and manage your first event today through the Dashboard!
      </p>

      <div class="empty-action">
        <button
          class="btn-dashboard"
          @click="router.push('/dashboard')"
        >
          Go to Organizer Dashboard &rarr;
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.event-list-page {
  width: 100%;
  padding: 16px;
}

/* HEADER */
.header-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 2.2rem;
  margin-bottom: 12px;
  line-height: 1.3;
}

.section-desc {
  color: var(--text-muted);
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
}

/* SEARCH DAN FILTER */
.filters-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 32px;
}

/* GRID EVENT */
.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 28px;
  align-items: stretch;
}

/* LOADING */
.loading-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 28px;
}

/* ERROR */
.error-card {
  padding: 30px;
  border-radius: 12px;
  background: #fff1f1;
  border: 1px solid #fecaca;
  text-align: center;
  color: #b91c1c;
  margin: 24px 0;
}

.error-card h3 {
  margin-bottom: 12px;
}

/* EMPTY STATE */
.empty-state {
  text-align: center;
  padding: 48px 32px;
  color: var(--text-muted);
  background: white;
  border-radius: var(--space-4);
  border: 1px dashed var(--border-color);
  max-width: 600px;
  margin: 40px auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
}

.empty-badge {
  display: inline-block;
  background: var(--bg-light);
  color: var(--text-muted);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 6px 14px;
  border-radius: 50px;
  border: 1px solid var(--border-color);
  margin-bottom: 20px;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: var(--text-main);
  margin-bottom: 12px;
}

.empty-state p {
  line-height: 1.7;
  margin-bottom: 24px;
  font-size: 1rem;
}

.empty-action {
  display: flex;
  justify-content: center;
}

.btn-dashboard {
  background: var(--primary);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.btn-dashboard:hover {
  opacity: 0.9;
}

/* RESPONSIVE */
@media (max-width: 600px) {
  .event-list-page {
    padding: 12px;
  }

  .event-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .section-title {
    font-size: 1.8rem;
  }
}
</style>
