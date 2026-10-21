
<template>
    <Transition name="modal-fade">
      <div
        v-if="show"
        class="modal-overlay"
        @click.self="$emit('close')"
      >
        <div class="modal-box">
          <h2>{{ title }}</h2>
          <p>{{ message }}</p>
  
          <div class="modal-actions">
            <button
              class="btn-cancel"
              @click="$emit('close')"
            >
              Batal
            </button>
  
            <button
              class="btn-confirm"
              @click="$emit('confirm')"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup>
  defineProps({
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Konfirmasi'
    },
    message: {
      type: String,
      default: 'Apakah kamu yakin ingin melanjutkan?'
    },
    confirmText: {
      type: String,
      default: 'Ya, Lanjutkan'
    }
  })
  
  defineEmits(['confirm', 'close'])
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .modal-box {
    width: 90%;
    max-width: 420px;
    background: white;
    padding: 28px;
    border-radius: 16px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  }
  
  .modal-box h2 {
    margin-top: 0;
    color: #1e293b;
  }
  
  .modal-box p {
    color: #64748b;
    line-height: 1.6;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 24px;
  }
  
  .modal-actions button {
    padding: 10px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
  }
  
  .btn-cancel {
    background: #f1f5f9;
    color: #334155;
  }
  
  .btn-confirm {
    background: #2563eb;
    color: white;
  }
  
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity 0.2s ease;
  }
  
  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0;
  }
  </style>
  