
<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="dashboard-layout">

    <!-- SIDEBAR -->
    <aside class="dashboard-rail">

      <div class="rail-brand">
        <RouterLink to="/">
          <span class="brand-icon">G</span>
          <span>Gatherly</span>
        </RouterLink>
        <p>Organizer Panel</p>
      </div>

      <div class="rail-section">
        <span class="rail-heading">MENU UTAMA</span>

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
            <span class="rail-icon">📅</span>
            <span class="rail-label">Event Management</span>
          </RouterLink>
        </nav>
      </div>

      <div class="rail-footer">
        <RouterLink to="/" class="back-link">
          <span>←</span>
          Back to Public
        </RouterLink>
      </div>

    </aside>

    <!-- MAIN CONTENT -->
    <main class="dashboard-pane">

      <header class="pane-header">
        <div class="header-left">
          <span class="header-subtitle">GATHERLY ORGANIZER</span>
          <h1>Dashboard</h1>
        </div>

        <div class="user-profile">
          <div class="user-avatar">A</div>
          <div class="user-info">
            <strong>Admin</strong>
            <span>Organizer</span>
          </div>
        </div>
      </header>

      <section class="pane-content">
        <RouterView />
      </section>

      <footer class="dashboard-footer">
        © 2026 Gatherly. All rights reserved.
      </footer>

    </main>

  </div>
</template>

<style scoped>
/* MAIN LAYOUT */
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background: #f8f9fc;
}

/* SIDEBAR */
.dashboard-rail {
  width: 250px;
  min-width: 250px;
  min-height: 100vh;
  background: #1c1948;
  color: white;
  display: flex;
  flex-direction: column;
}

/* BRAND */
.rail-brand {
  padding: 28px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.rail-brand a {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 700;
}

.brand-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  background: var(--primary);
  border-radius: 10px;
  color: white;
}

.rail-brand p {
  margin: 10px 0 0 48px;
  color: #aaa8c2;
  font-size: 0.8rem;
}

/* NAVIGATION */
.rail-section {
  padding: 30px 14px;
  flex: 1;
}

.rail-heading {
  display: block;
  padding: 0 12px;
  margin-bottom: 16px;
  color: #9290ac;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.rail-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rail-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 14px;
  color: #b9b7ce;
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 500;
  border-radius: 9px;
  border-left: 3px solid transparent;
  transition: 0.2s ease;
}

.rail-link:hover {
  background: rgba(255, 255, 255, 0.07);
  color: white;
}

.rail-link.active {
  background: rgba(255, 255, 255, 0.12);
  color: white;
  border-left-color: var(--primary);
}

.rail-icon {
  font-size: 1.1rem;
}

/* SIDEBAR FOOTER */
.rail-footer {
  padding: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.back-link {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #b9b7ce;
  text-decoration: none;
  font-size: 0.88rem;
}

.back-link:hover {
  color: white;
}

/* MAIN PANE */
.dashboard-pane {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

/* HEADER */
.pane-header {
  min-height: 88px;
  background: white;
  padding: 16px 36px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9eaf0;
}

.header-subtitle {
  display: block;
  color: #9294a5;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 5px;
}

.pane-header h1 {
  color: #252442;
  font-size: 1.45rem;
  margin: 0;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eeeaff;
  color: var(--primary);
  border-radius: 50%;
  font-weight: 700;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.user-info strong {
  font-size: 0.9rem;
  color: #252442;
}

.user-info span {
  font-size: 0.75rem;
  color: #9294a5;
}

/* CONTENT */
.pane-content {
  flex: 1;
  padding: 32px 36px;
  width: 100%;
}

/* FOOTER */
.dashboard-footer {
  padding: 18px 36px;
  border-top: 1px solid #e9eaf0;
  color: #9294a5;
  font-size: 0.8rem;
  background: white;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .dashboard-rail {
    width: 190px;
    min-width: 190px;
  }

  .pane-header {
    padding: 16px 20px;
  }

  .pane-content {
    padding: 24px 20px;
  }

  .dashboard-footer {
    padding: 16px 20px;
  }
}

@media (max-width: 520px) {
  .dashboard-layout {
    flex-direction: column;
  }

  .dashboard-rail {
    width: 100%;
    min-width: 100%;
    min-height: auto;
  }

  .rail-brand {
    padding: 16px 20px;
  }

  .rail-brand p,
  .rail-heading,
  .rail-footer {
    display: none;
  }

  .rail-section {
    padding: 8px 12px;
  }

  .rail-nav {
    flex-direction: row;
  }

  .rail-link {
    flex: 1;
    justify-content: center;
    padding: 12px 8px;
    font-size: 0.78rem;
    gap: 6px;
  }

  .pane-header {
    min-height: 72px;
  }

  .pane-content {
    padding: 20px 14px;
  }
}
</style>
