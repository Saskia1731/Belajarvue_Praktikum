<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <!-- Rail & Pane System -->
  <div class="dashboard-layout">
    <!-- RAIL: Navigasi samping yang posisinya terkunci (Fixed) -->
    <aside class="dashboard-rail">
      <div class="rail-brand">
        <RouterLink to="/">Gatherly Organizer</RouterLink>
      </div>

      <nav class="rail-nav">
        <RouterLink
          to="/dashboard"
          class="rail-link"
          exact-active-class="active"
        >
          <span class="rail-icon">📊</span>
          <span class="rail-label">Dashboard</span>
        </RouterLink>

        <RouterLink
          to="/dashboard/events"
          class="rail-link"
          active-class="active"
        >
          <span class="rail-icon">⚙️</span>
          <span class="rail-label">Event Management</span>
        </RouterLink>
      </nav>

      <div class="rail-footer">
        <RouterLink to="/" class="rail-link">← Back to Public</RouterLink>
      </div>
    </aside>

    <!-- PANE: Area utama dimana tempat konten berubah dan bisa di-scroll secara mandiri -->
    <main class="dashboard-pane">
      <header class="pane-header">
        <h1>Dashboard</h1>
        <div class="user-profile">Admin</div>
      </header>

      <div class="pane-content">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Full-screen app layout (khas dashboard).
   Tinggi dibatasi 100vh agar bagian rail tidak terguyur ke atas saat pane di-scroll. */
.dashboard-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: var(--bg-gray);
}

/* RAIL STYLES */
.dashboard-rail {
  width: 260px;
  background: #1c1948;
  color: white;
  display: flex;
  flex-direction: column;
}

.rail-brand {
  padding: var(--space-6);
  font-size: 1.2rem;
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.rail-brand a {
  color: white;
  text-decoration: none;
}

.rail-nav {
  flex: 1;
  padding: var(--space-6) 0;
  display: flex;
  flex-direction: column;
}

.rail-link {
  padding: var(--space-3) var(--space-6);
  color: #a8a8bb;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
}

.rail-link:hover,
.rail-link.active {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  border-left: 4px solid var(--primary);
}

.rail-footer {
  padding: var(--space-6);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* PANE STYLES */
.dashboard-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Scroll khusus untuk area ini saja */
}

.pane-header {
  background: white;
  padding: var(--space-4) var(--space-8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.pane-header h1 {
  font-size: 1.5rem;
  margin: 0;
}

.pane-content {
  padding: var(--space-8);
}
</style>