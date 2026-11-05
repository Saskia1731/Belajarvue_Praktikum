<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary'
  }
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="['app-button', `btn-${variant}`]"
  >
    <span v-if="loading" class="btn-spinner"></span>

    <slot>
      {{ loading ? 'Memproses...' : 'Simpan' }}
    </slot>
  </button>
</template>

<style scoped>
.app-button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  background: #2563eb;
  color: white;
}

.app-button:disabled {
  opacity: .6;
  cursor: not-allowed;
}

.btn-secondary {
  background: #64748b;
}

.btn-danger {
  background: #dc2626;
}
</style>