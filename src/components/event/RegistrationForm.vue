<script setup>
import { ref, reactive, computed } from 'vue'
import { useEvents } from '@/composables/useEvents'
import AppCard from '@/components/ui/AppCard.vue'
import AppModal from '@/components/ui/AppModal.vue'

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['success', 'cancel'])
const { registerAttendee } = useEvents()

// FORM STATE
const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  reason: ''
})

// INDIVIDUAL FIELD ERROR STATE
const errors = reactive({
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  reason: ''
})

const errorMessage = ref('')
const isDiscardModalOpen = ref(false)

// MEMERIKSA APAKAH FORM SUDAH PERNAH DIKETIK
const isFormDirty = computed(() => {
  return Boolean(
    form.fullName.trim() ||
    form.email.trim() ||
    form.phone.trim() ||
    form.dob ||
    form.reason.trim()
  )
})

// VALIDASI PER KOLOM
const validateField = (field) => {
  switch (field) {
    case 'fullName':
      if (!form.fullName.trim()) {
        errors.fullName = 'Full name is required.'
      } else if (form.fullName.trim().length < 2) {
        errors.fullName = 'Full name must be at least 2 characters.'
      } else {
        errors.fullName = ''
      }
      break

    case 'email':
      if (!form.email.trim()) {
        errors.email = 'Email is required.'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        errors.email = 'Please enter a valid email address.'
      } else {
        errors.email = ''
      }
      break

    case 'phone':
      if (!form.phone.trim()) {
        errors.phone = 'Phone number is required.'
      } else if (!/^[0-9+\-\s()]{8,20}$/.test(form.phone.trim())) {
        errors.phone = 'Please enter a valid phone number.'
      } else {
        errors.phone = ''
      }
      break

    case 'dob':
      if (!form.dob) {
        errors.dob = 'Date of birth is required.'
      } else if (form.dob > new Date().toISOString().slice(0, 10)) {
        errors.dob = 'Date of birth cannot be in the future.'
      } else {
        errors.dob = ''
      }
      break

    case 'reason':
      if (!form.reason.trim()) {
        errors.reason = 'Reason for attending is required.'
      } else if (form.reason.trim().length < 10) {
        errors.reason = 'Please provide at least 10 characters.'
      } else {
        errors.reason = ''
      }
      break
  }

  return !errors[field]
}

// VALIDASI SELURUH FORM
const validateForm = () => {
  const fields = ['fullName', 'email', 'phone', 'dob', 'reason']
  let isValid = true

  fields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false
    }
  })

  return isValid
}

// SUBMIT FORM PENDAFTARAN
const handleSubmit = () => {
  errorMessage.value = ''

  if (!validateForm()) {
    errorMessage.value = 'Please check the highlighted fields.'
    return
  }

  const registration = registerAttendee(props.event.id, { ...form })

  if (!registration) {
    errorMessage.value =
      'Registration could not be completed. The event may be full or unavailable.'
    return
  }

  emit('success', registration)
}

// MEMBATALKAN PENGISIAN FORM
const handleCancel = () => {
  if (isFormDirty.value) {
    isDiscardModalOpen.value = true
  } else {
    emit('cancel')
  }
}

const confirmDiscard = () => {
  isDiscardModalOpen.value = false
  emit('cancel')
}
</script>

<template>
  <AppCard class="registration-form-card">
    <div class="form-heading">
      <h2>Attendee Information</h2>
      <p>Please complete the form to register for this event.</p>
    </div>

    <div v-if="errorMessage" class="form-error">
      {{ errorMessage }}
    </div>

    <form @submit.prevent="handleSubmit" novalidate>
      <div class="form-group">
        <label for="fullName">Full Name</label>
        <input
          id="fullName"
          v-model="form.fullName"
          type="text"
          placeholder="Enter your full name"
          :class="{ invalid: errors.fullName }"
          @blur="validateField('fullName')"
        />
        <small v-if="errors.fullName" class="field-error">
          {{ errors.fullName }}
        </small>
      </div>

      <div class="form-group">
        <label for="email">Email Address</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="name@example.com"
          :class="{ invalid: errors.email }"
          @blur="validateField('email')"
        />
        <small v-if="errors.email" class="field-error">
          {{ errors.email }}
        </small>
      </div>

      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          placeholder="Enter your phone number"
          :class="{ invalid: errors.phone }"
          @blur="validateField('phone')"
        />
        <small v-if="errors.phone" class="field-error">
          {{ errors.phone }}
        </small>
      </div>

      <div class="form-group">
        <label for="dob">Date of Birth</label>
        <input
          id="dob"
          v-model="form.dob"
          type="date"
          :max="new Date().toISOString().slice(0, 10)"
          :class="{ invalid: errors.dob }"
          @blur="validateField('dob')"
        />
        <small v-if="errors.dob" class="field-error">
          {{ errors.dob }}
        </small>
      </div>

      <div class="form-group">
        <label for="reason">Reason for Attending</label>
        <textarea
          id="reason"
          v-model="form.reason"
          rows="4"
          placeholder="Tell us why you want to attend this event"
          :class="{ invalid: errors.reason }"
          @blur="validateField('reason')"
        />
        <small v-if="errors.reason" class="field-error">
          {{ errors.reason }}
        </small>
      </div>

      <div class="form-actions">
        <button
          type="button"
          class="btn-cancel"
          @click="handleCancel"
        >
          Cancel
        </button>

        <button type="submit" class="btn-submit">
          Confirm Registration
        </button>
      </div>
    </form>

    <AppModal
      :is-open="isDiscardModalOpen"
      title="Discard Registration?"
      message="Your entered information will not be saved if you leave this page."
      confirm-text="Yes, Leave"
      cancel-text="Continue Editing"
      variant="danger"
      @confirm="confirmDiscard"
      @close="isDiscardModalOpen = false"
    />
  </AppCard>
</template>

<style scoped>
.registration-form-card {
  padding: var(--space-6);
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: var(--space-4);
}

.form-heading {
  margin-bottom: var(--space-6);
}

.form-heading h2 {
  margin: 0 0 var(--space-2);
  font-size: 1.4rem;
  color: var(--text-main);
}

.form-heading p {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.form-group label {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-main);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font: inherit;
  font-size: 0.95rem;
  color: var(--text-main);
  background: #fff;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: 2px solid rgba(102, 68, 255, 0.2);
  border-color: var(--primary);
}

.form-group textarea {
  resize: vertical;
}

.form-group .invalid {
  border-color: #dc2626;
}

.field-error {
  color: #dc2626;
  font-size: 0.8rem;
}

.form-error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: var(--space-4);
  font-size: 0.9rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  flex-wrap: wrap;
  margin-top: var(--space-6);
}

.btn-cancel,
.btn-submit {
  padding: 12px 18px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
}

.btn-cancel {
  background: #fff;
  color: var(--text-muted);
  border: 1px solid var(--border-color);
}

.btn-submit {
  background: var(--primary);
  color: #fff;
  border: 1px solid var(--primary);
}

.btn-submit:hover {
  background: var(--primary-hover);
}
</style>