<script setup>
import { ref, reactive } from 'vue'
import { useEvents } from '@/composables/useEvents'
import AppModal from '@/components/ui/AppModal.vue'

const {
  activeEvents,
  completedEvents,
  createEvent,
  completeEvent,
  deleteEvent
} = useEvents()

const currentTab = ref('active')
const showModal = ref(false)
const modalAction = ref('')
const selectedEvent = ref(null)
const errorMessage = ref('')
const successMessage = ref('')

const form = reactive({
  title: '',
  date: '',
  loc: '',
  cat: 'Workshop',
  desc: ''
})

function resetForm() {
  Object.assign(form, {
    title: '',
    date: '',
    loc: '',
    cat: 'Workshop',
    desc: ''
  })
}

function submitEvent() {
  errorMessage.value = ''
  successMessage.value = ''

  if (
    !form.title.trim() ||
    !form.date ||
    !form.loc.trim() ||
    !form.cat ||
    !form.desc.trim()
  ) {
    errorMessage.value =
      'Semua kolom wajib diisi sebelum acara disimpan.'
    return
  }

  createEvent({
    title: form.title.trim(),
    date: form.date,
    loc: form.loc.trim(),
    cat: form.cat,
    desc: form.desc.trim()
  })

  resetForm()
  currentTab.value = 'active'
  successMessage.value = 'Acara berhasil ditambahkan dan disimpan.'
}

function openConfirmation(action, event) {
  modalAction.value = action
  selectedEvent.value = event
  showModal.value = true
}

function confirmAction() {
  if (!selectedEvent.value) return

  if (modalAction.value === 'complete') {
    completeEvent(selectedEvent.value.id)

    successMessage.value =
      `Acara "${selectedEvent.value.title}" telah ditandai selesai.`

    currentTab.value = 'completed'
  } else if (modalAction.value === 'delete') {
    const title = selectedEvent.value.title

    deleteEvent(selectedEvent.value.id)

    successMessage.value =
      `Acara "${title}" berhasil dihapus.`
  }

  closeModal()
}

function closeModal() {
  showModal.value = false
  selectedEvent.value = null
  modalAction.value = ''
}

function formatDate(value) {
  if (!value) return '-'

  const date = new Date(`${value}T00:00:00`)

  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
}
</script>

<template>
  <div class="management-page">
    <header class="page-header">
      <div>
        <p class="eyebrow">GATHERLY ORGANIZER</p>
        <h1>Event Management</h1>
        <p>
          Kelola acara aktif, buat acara baru, dan tinjau arsip
          acara selesai.
        </p>
      </div>

      <button
        type="button"
        class="btn-create"
        @click="
          currentTab = 'create';
          errorMessage = '';
          successMessage = ''
        "
      >
        + Buat Acara
      </button>
    </header>

    <div v-if="successMessage" class="message success-message">
      <span>✓</span>
      {{ successMessage }}

      <button
        type="button"
        aria-label="Tutup pesan"
        @click="successMessage = ''"
      >
        ×
      </button>
    </div>

    <div class="tabs" role="tablist" aria-label="Pengelolaan acara">
      <button
        type="button"
        role="tab"
        :aria-selected="currentTab === 'active'"
        :class="{ active: currentTab === 'active' }"
        @click="currentTab = 'active'"
      >
        Active Events
        <span>{{ activeEvents.length }}</span>
      </button>

      <button
        type="button"
        role="tab"
        :aria-selected="currentTab === 'create'"
        :class="{ active: currentTab === 'create' }"
        @click="currentTab = 'create'"
      >
        + Create Event
      </button>

      <button
        type="button"
        role="tab"
        :aria-selected="currentTab === 'completed'"
        :class="{ active: currentTab === 'completed' }"
        @click="currentTab = 'completed'"
      >
        Completed Events
        <span>{{ completedEvents.length }}</span>
      </button>
    </div>

    <!-- Tab acara aktif -->
    <section v-if="currentTab === 'active'" class="tab-content">
      <div v-if="activeEvents.length === 0" class="empty-state">
        <div class="empty-symbol">＋</div>
        <h2>Belum Ada Acara Aktif</h2>
        <p>
          Tambahkan acara baru agar dapat ditampilkan pada
          katalog publik.
        </p>

        <button
          type="button"
          class="btn-create"
          @click="currentTab = 'create'"
        >
          Buat Acara Pertama
        </button>
      </div>

      <div v-else class="event-grid">
        <article
          v-for="event in activeEvents"
          :key="event.id"
          class="event-card"
        >
          <div class="event-top">
            <span class="category">{{ event.cat }}</span>
            <span class="status active-status">Active</span>
          </div>

          <h3>{{ event.title }}</h3>
          <p class="event-date">▣ {{ formatDate(event.date) }}</p>
          <p class="event-location">⌖ {{ event.loc }}</p>
          <p class="event-desc">{{ event.desc }}</p>

          <div class="card-actions">
            <button
              type="button"
              class="btn-complete"
              @click="openConfirmation('complete', event)"
            >
              Selesaikan Event
            </button>

            <button
              type="button"
              class="btn-delete"
              @click="openConfirmation('delete', event)"
            >
              Hapus
            </button>
          </div>
        </article>
      </div>
    </section>

    <!-- Tab membuat acara -->
    <section v-else-if="currentTab === 'create'" class="form-section">
      <div class="form-heading">
        <h2>Buat Acara Baru</h2>
        <p>
          Lengkapi seluruh informasi berikut untuk menerbitkan acara.
        </p>
      </div>

      <div v-if="errorMessage" class="message error-message">
        ⚠ {{ errorMessage }}
      </div>

      <form @submit.prevent="submitEvent" novalidate>
        <div class="form-grid">
          <div class="form-group full-width">
            <label for="event-title">
              Nama Acara <span>*</span>
            </label>
            <input
              id="event-title"
              v-model="form.title"
              type="text"
              placeholder="Contoh: Vue.js Workshop"
            />
          </div>

          <div class="form-group">
            <label for="event-date">
              Tanggal Acara <span>*</span>
            </label>
            <input
              id="event-date"
              v-model="form.date"
              type="date"
            />
          </div>

          <div class="form-group">
            <label for="event-location">
              Lokasi Acara <span>*</span>
            </label>
            <input
              id="event-location"
              v-model="form.loc"
              type="text"
              placeholder="Contoh: Aula Kampus"
            />
          </div>

          <div class="form-group full-width">
            <label for="event-category">
              Kategori Acara <span>*</span>
            </label>
            <select id="event-category" v-model="form.cat">
              <option value="Workshop">Workshop</option>
              <option value="Meetup">Meetup</option>
              <option value="Competition">Competition</option>
              <option value="Seminar">Seminar</option>
              <option value="Conference">Conference</option>
            </select>
          </div>

          <div class="form-group full-width">
            <label for="event-description">
              Deskripsi Acara <span>*</span>
            </label>
            <textarea
              id="event-description"
              v-model="form.desc"
              rows="5"
              placeholder="Jelaskan tujuan dan informasi acara..."
            ></textarea>
          </div>
        </div>

        <div class="form-actions">
          <button
            type="button"
            class="btn-cancel"
            @click="
              resetForm();
              errorMessage = '';
              currentTab = 'active'
            "
          >
            Batal
          </button>

          <button type="submit" class="btn-create">
            Simpan Acara
          </button>
        </div>
      </form>
    </section>

    <!-- Tab acara selesai -->
    <section v-else class="tab-content">
      <div v-if="completedEvents.length === 0" class="empty-state">
        <div class="empty-symbol">✓</div>
        <h2>Belum Ada Acara Selesai</h2>
        <p>
          Acara yang sudah diselesaikan akan tersimpan di arsip ini.
        </p>
      </div>

      <div v-else class="event-grid">
        <article
          v-for="event in completedEvents"
          :key="event.id"
          class="event-card completed-card"
        >
          <div class="event-top">
            <span class="category">{{ event.cat }}</span>
            <span class="status completed-status">Completed</span>
          </div>

          <h3>{{ event.title }}</h3>
          <p class="event-date">▣ {{ formatDate(event.date) }}</p>
          <p class="event-location">⌖ {{ event.loc }}</p>
          <p class="event-desc">{{ event.desc }}</p>
          <p class="archive-note">Acara ini telah selesai.</p>

          <div class="card-actions">
            <button
              type="button"
              class="btn-delete"
              @click="openConfirmation('delete', event)"
            >
              Hapus Arsip
            </button>
          </div>
        </article>
      </div>
    </section>

    <!-- Modal konfirmasi bersama -->
    <AppModal
      :show="showModal"
      :title="
        modalAction === 'complete'
          ? 'Selesaikan Acara?'
          : 'Hapus Acara?'
      "
      :message="
        modalAction === 'complete'
          ? `Acara '${selectedEvent?.title || ''}' akan dipindahkan ke Completed Events dan dihapus dari katalog publik.`
          : `Acara '${selectedEvent?.title || ''}' akan dihapus secara permanen.`
      "
      :confirm-text="
        modalAction === 'complete'
          ? 'Ya, Selesaikan'
          : 'Ya, Hapus'
      "
      @confirm="confirmAction"
      @close="closeModal"
    />
  </div>
</template>

<style scoped>
.management-page {
  color: var(--text-main, #1c1948);
  padding-bottom: 32px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 26px;
}

.page-header h1 {
  margin: 0 0 8px;
  font-size: 1.9rem;
}

.page-header p:not(.eyebrow),
.form-heading p {
  margin: 0;
  color: var(--text-muted, #666);
  line-height: 1.6;
}

.eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  font-weight: 800;
  color: var(--primary, #6644ff);
  margin: 0 0 8px;
}

.btn-create {
  padding: 12px 18px;
  border: 0;
  border-radius: 9px;
  background: var(--primary, #6644ff);
  color: #fff;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
}

.btn-create:hover {
  filter: brightness(0.94);
}

.message {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 16px;
  border-radius: 9px;
  margin-bottom: 20px;
  line-height: 1.5;
}

.success-message {
  background: #dcfce7;
  color: #166534;
}

.success-message button {
  margin-left: auto;
  background: none;
  border: 0;
  font-size: 1.3rem;
  cursor: pointer;
  color: inherit;
}

.error-message {
  background: #fee2e2;
  color: #b91c1c;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border-bottom: 1px solid var(--border-color, #e4e4e7);
  margin-bottom: 24px;
}

.tabs button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 0;
  border-bottom: 3px solid transparent;
  padding: 13px 15px;
  cursor: pointer;
  color: var(--text-muted, #666);
  font-weight: 700;
}

.tabs button.active {
  color: var(--primary, #6644ff);
  border-bottom-color: var(--primary, #6644ff);
}

.tabs button span {
  padding: 2px 7px;
  border-radius: 20px;
  background: #f1f5f9;
  font-size: 0.78rem;
}

.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.event-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 22px;
  border: 1px solid var(--border-color, #e4e4e7);
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
}

.event-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.category {
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--primary, #6644ff);
  background: #eee9ff;
  padding: 6px 9px;
  border-radius: 20px;
}

.status {
  font-size: 0.75rem;
  font-weight: 800;
  padding: 5px 8px;
  border-radius: 20px;
}

.active-status {
  background: #dcfce7;
  color: #166534;
}

.completed-status {
  background: #e2e8f0;
  color: #475569;
}

.event-card h3 {
  margin: 0 0 12px;
  font-size: 1.15rem;
  overflow-wrap: anywhere;
}

.event-date,
.event-location {
  color: var(--text-muted, #666);
  font-size: 0.9rem;
  margin: 0 0 8px;
}

.event-desc {
  color: #475569;
  font-size: 0.92rem;
  line-height: 1.6;
  white-space: pre-line;
  flex: 1;
  margin: 8px 0 18px;
}

.card-actions {
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
  margin-top: auto;
}

.card-actions button {
  padding: 9px 12px;
  border: 0;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}

.btn-complete {
  background: #dcfce7;
  color: #166534;
}

.btn-delete {
  background: #fee2e2;
  color: #b91c1c;
}

.completed-card {
  opacity: 0.9;
}

.archive-note {
  color: #64748b;
  font-size: 0.85rem;
  font-weight: 700;
}

.empty-state {
  text-align: center;
  padding: 48px 24px;
  border: 1px dashed var(--border-color, #e4e4e7);
  background: #fff;
  border-radius: 14px;
}

.empty-symbol {
  font-size: 2.4rem;
  color: var(--primary, #6644ff);
}

.empty-state h2 {
  margin: 12px 0 8px;
}

.empty-state p {
  color: var(--text-muted, #666);
  margin: 0 auto 20px;
  max-width: 480px;
  line-height: 1.6;
}

.form-section {
  max-width: 820px;
  background: #fff;
  border: 1px solid var(--border-color, #e4e4e7);
  border-radius: 14px;
  padding: 28px;
}

.form-heading {
  margin-bottom: 22px;
}

.form-heading h2 {
  margin: 0 0 8px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-size: 0.9rem;
  font-weight: 800;
}

.form-group label span {
  color: #dc2626;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 13px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font: inherit;
  color: #1e293b;
  background: #fff;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: 2px solid rgba(102, 68, 255, 0.2);
  border-color: var(--primary, #6644ff);
}

.form-group textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
}

.btn-cancel {
  padding: 12px 18px;
  border: 1px solid #cbd5e1;
  border-radius: 9px;
  background: #fff;
  color: #334155;
  font-weight: 800;
  cursor: pointer;
}

@media (max-width: 650px) {
  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .form-section {
    padding: 18px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: auto;
  }

  .tabs button {
    padding: 11px 8px;
    font-size: 0.86rem;
  }
}
</style>