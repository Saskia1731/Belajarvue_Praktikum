<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEvents } from '@/composables/useEvents'

import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'

const route = useRoute()
const router = useRouter()

const {
  fetchEventById,
  loading,
  error
} = useEvents()

const event = ref(null)

// GET DETAIL EVENT DARI API
const loadEvent = async () => {
  event.value = null
  event.value = await fetchEventById(route.params.id)
}

onMounted(loadEvent)

// KEMBALI KE DAFTAR EVENT
const backToEvents = () => {
  router.push('/browse/events')
}
</script>

<template>
  <div class="event-detail-page">
    <button class="btn-back" @click="backToEvents">
      &larr; Back to Events
    </button>

    <!-- LOADING STATE -->
    <div v-if="loading" class="not-found-card">
      <p>Memuat detail acara...</p>
    </div>

    <!-- ERROR STATE -->
    <div v-else-if="error && !event" class="not-found-card">
      <h2>NETWORK ERROR</h2>

      <p>{{ error }}</p>

      <AppButton
        variant="primary"
        @click="loadEvent"
      >
        Coba Lagi
      </AppButton>
    </div>

    <!-- EVENT DITEMUKAN -->
    <div v-else-if="event">
      <div class="detail-header">
        <div class="header-tags">
          <span class="event-tag">
            {{ event.cat }}
          </span>

          <span
            v-if="event.done"
            class="status-tag status-ended"
          >
            Event Finished
          </span>

          <span
            v-else
            class="status-tag status-live"
          >
            Open Registration
          </span>
        </div>

        <h1>{{ event.title }}</h1>

        <div class="meta-info">
          <span class="meta-item">
            <strong>Date:</strong> {{ event.date }}
          </span>

          <span class="meta-item">
            <strong>Location:</strong> {{ event.loc }}
          </span>

          <span class="meta-item">
            <strong>Remaining Quota:</strong>
            {{ event.quota }} Attendees
          </span>
        </div>
      </div>

      <div class="detail-content-grid grid-asymmetric">
        <div class="main-desc">
          <h2>About This Event</h2>

          <p class="description-text">
            {{ event.desc }}
          </p>
        </div>

        <div class="sidebar">
          <AppCard class="ticket-card sticky-pane">
            <h3>Event Information</h3>

            <p
              v-if="event.done"
              class="ticket-desc"
            >
              This event has concluded.
            </p>

            <p
              v-else-if="event.quota <= 0"
              class="ticket-desc text-warning"
            >
              All seats for this event are currently full.
            </p>

            <p
              v-else
              class="ticket-desc"
            >
              This event is currently open for registration.
            </p>

            <div class="action-buttons">
              <AppButton
                variant="secondary"
                class="btn-register"
                disabled
                v-if="event.done"
              >
                Event Finished
              </AppButton>

              <AppButton
                variant="secondary"
                class="btn-register"
                disabled
                v-else-if="event.quota <= 0"
              >
                Sold Out
              </AppButton>

              <AppButton
                variant="primary"
                class="btn-register"
                disabled
                v-else
              >
                Registration Information
              </AppButton>
            </div>

            <p
              v-if="!event.done && event.quota > 0"
              class="spots"
            >
              {{ event.quota }} seats available
            </p>
          </AppCard>
        </div>
      </div>
    </div>

    <!-- EVENT TIDAK DITEMUKAN -->
    <div v-else class="not-found-card">
      <h2>404 - Event Not Found</h2>

      <p>
        The event you are looking for is unavailable or has been removed
        by the organizer.
      </p>

      <AppButton
        variant="primary"
        @click="backToEvents"
      >
        Back to Event Catalog
      </AppButton>
    </div>
  </div>
</template>

<style scoped>
.event-detail-page {
  width: 100%;
}

.btn-back {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: var(--space-6);
  color: var(--text-muted);
  font-weight: 500;
}

.btn-back:hover {
  color: var(--primary);
}

.detail-header {
  background: var(--bg-light);
  border-radius: var(--space-4);
  border: 1px solid var(--border-color);
  padding: var(--space-12) var(--space-8);
  margin-bottom: var(--space-8);
}

.header-tags {
  display: flex;
  gap: var(--space-3);
  align-items: center;
  margin-bottom: var(--space-4);
  flex-wrap: wrap;
}

.event-tag {
  background: rgba(102, 68, 255, 0.1);
  color: var(--primary);
  padding: var(--space-1) var(--space-4);
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
}

.status-tag {
  padding: var(--space-1) var(--space-3);
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-live {
  background: rgba(46, 204, 113, 0.15);
  color: #27ae60;
}

.status-ended {
  background: rgba(108, 117, 125, 0.15);
  color: #6c757d;
}

.status-soldout {
  background: #fee2e2;
  color: #b91c1c;
}

.detail-header h1 {
  font-size: 2.8rem;
  margin-top: var(--space-4);
  margin-bottom: var(--space-4);
  line-height: 1.2;
  color: var(--text-main);
}

.meta-info {
  display: flex;
  gap: var(--space-6);
  flex-wrap: wrap;
}

.meta-item {
  color: var(--text-muted);
  font-weight: 500;
  font-size: 1.05rem;
}

.meta-item strong {
  color: var(--text-main);
}

.grid-asymmetric {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
  gap: var(--space-12);
}

.main-desc h2 {
  margin-bottom: var(--space-4);
  font-size: 1.8rem;
  border-left: 4px solid var(--primary);
  padding-left: var(--space-2);
}

.description-text {
  color: var(--text-muted);
  line-height: 1.8;
  margin-bottom: var(--space-6);
  font-size: 1.1rem;
}

.ticket-card {
  padding: var(--space-8);
  text-align: center;
}

.sticky-pane {
  position: sticky;
  top: 100px;
}

.ticket-card h3 {
  font-size: 1.4rem;
  margin-bottom: var(--space-3);
  color: var(--text-main);
}

.ticket-desc {
  color: var(--text-muted);
  margin-bottom: var(--space-6);
  line-height: 1.5;
  font-size: 0.95rem;
}

.ticket-desc.text-warning {
  color: #b91c1c;
  font-weight: 500;
}

.action-buttons {
  width: 100%;
}

.btn-register {
  width: 100%;
}

.spots {
  margin-top: var(--space-4);
  color: #27ae60;
  font-weight: 600;
  font-size: 0.95rem;
}

.not-found-card {
  text-align: center;
  padding: var(--space-12);
  background: white;
  border-radius: var(--space-4);
  border: 1px solid var(--border-color);
}

.not-found-card h2 {
  margin-bottom: var(--space-2);
}

.not-found-card p {
  color: var(--text-muted);
  margin-bottom: var(--space-6);
}

@media (max-width: 900px) {
  .grid-asymmetric {
    grid-template-columns: 1fr;
  }

  .detail-header {
    padding: var(--space-8) var(--space-6);
  }

  .detail-header h1 {
    font-size: 2rem;
  }
}
</style>