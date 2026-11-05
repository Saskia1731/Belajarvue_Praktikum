
<template>
  <AppCard class="event-card-wrapper">
    <div class="event-body">

      <div class="event-meta">
        <div class="meta-left">
          <span class="event-date">{{ event.date }}</span>

          <span v-if="isRegistered" class="badge-registered">
            Registered
          </span>
        </div>

        <span class="event-category">{{ event.cat }}</span>
      </div>

      <h3 class="event-title">{{ event.title }}</h3>

      <p class="event-loc">{{ event.loc }}</p>

      <p class="event-desc">{{ event.desc }}</p>

      <div class="card-footer">
        <button
          class="btn-link"
          @click="$emit('view-detail', event.id)"
        >
          View Event Details &rarr;
        </button>
      </div>

    </div>
  </AppCard>
</template>

<script setup>
import AppCard from '@/components/ui/AppCard.vue'

defineProps({
  event: {
    type: Object,
    required: true
  },
  isRegistered: {
    type: Boolean,
    default: false
  }
})

defineEmits(['view-detail'])
</script>

<style scoped>
.event-card-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;
}

.event-body {
  padding: 28px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* EVENT META */
.event-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 12px;
}

.meta-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.event-date {
  background: rgba(102, 68, 255, 0.1);
  color: var(--primary);
  padding: 6px 10px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
}

.badge-registered {
  background: #dbeafe;
  color: #1d4ed8;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.event-category {
  color: var(--text-muted);
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
}

/* EVENT CONTENT */
.event-title {
  margin: 0 0 12px;
  font-size: 1.4rem;
  line-height: 1.4;
  color: var(--text-main);
}

.event-loc {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin: 0 0 16px;
  line-height: 1.5;
}

.event-desc {
  color: var(--text-muted);
  line-height: 1.7;
  font-size: 0.95rem;
  margin: 0 0 24px;
  flex-grow: 1;
}

/* FOOTER */
.card-footer {
  border-top: 1px solid var(--border-color);
  padding-top: 18px;
  margin-top: auto;
}

.btn-link {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-main);
  font-weight: 600;
  text-decoration: none;
  font-size: 1rem;
  padding: 0;
}

.btn-link:hover {
  color: var(--primary);
}
</style>
