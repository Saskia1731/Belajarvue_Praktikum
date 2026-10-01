<script setup>
import { events, categories, countIn, rupiah, tanggal } from '@/data/events'

const stats = [
  { num: events.length, label: 'Event mendatang' },
  { num: categories.length, label: 'Kategori' },
  { num: events.filter((e) => e.price === 0).length, label: 'Event gratis' },
]
const upcoming = events.slice(0, 3)

// data peta situs: level menentukan kedalaman (indent)
const siteMap = [
  { label: 'Beranda', to: '/', level: 0 },
  { label: 'Tentang', to: '/about', level: 1 },
  { label: 'Jelajah', to: '/browse', level: 1 },
  { label: 'Daftar Event', to: '/browse/events', level: 2 },
  { label: 'Detail Event (contoh)', to: '/browse/events/1', level: 3 },
  { label: 'Kategori', to: '/browse/category', level: 2 },
  { label: 'Kontak', to: '/contact', level: 1 },
]
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hero-text">
        <span class="kicker">Platform acara komunitas</span>
        <h1>Cari acara seru, <em>temuin</em> teman baru.</h1>
        <p>
          Dari konser kecil sampai meetup teknologi, semua ada di satu tempat dan mudah ditelusuri
          berdasarkan minatmu.
        </p>
        <div class="cta">
          <router-link to="/browse/events" class="btn solid">Mulai jelajah</router-link>
          <router-link to="/browse/category" class="btn ghost">Lihat kategori</router-link>
        </div>
      </div>
      <div class="hero-stats">
        <div v-for="s in stats" :key="s.label" class="stat">
          <b>{{ s.num }}</b>
          <span>{{ s.label }}</span>
        </div>
      </div>
    </section>

    <section class="block">
      <h2>Kategori populer</h2>
      <div class="chips">
        <router-link
          v-for="c in categories"
          :key="c.key"
          :to="{ path: '/browse/events', query: { category: c.key } }"
          class="chip"
        >
          {{ c.icon }} {{ c.label }} <small>{{ countIn(c.key) }}</small>
        </router-link>
      </div>
    </section>

    <section class="block">
      <h2>Segera hadir</h2>
      <div class="cards">
        <router-link v-for="e in upcoming" :key="e.id" :to="`/browse/events/${e.id}`" class="mini">
          <span class="mini-date">{{ tanggal(e.date) }}</span>
          <h3>{{ e.title }}</h3>
          <p>{{ e.location }}</p>
          <b>{{ rupiah(e.price) }}</b>
        </router-link>
      </div>
    </section>

    <section class="block map">
      <h2>Peta situs</h2>
      <p class="hint">Struktur halaman aplikasi ini. Semakin menjorok, semakin dalam levelnya.</p>
      <ul>
        <li v-for="n in siteMap" :key="n.to" :style="{ paddingLeft: n.level * 1.6 + 'rem' }">
          <span class="lvl">L{{ n.level }}</span>
          <router-link :to="n.to">{{ n.label }}</router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.home { display: flex; flex-direction: column; gap: 2.8rem; animation: rise 0.45s ease; }
.hero { display: grid; grid-template-columns: 1.4fr 1fr; gap: 2rem; align-items: center; padding: 3rem; border-radius: 28px; background: linear-gradient(120deg, var(--coral-soft), var(--sand)); border: 1px solid var(--line); }
.kicker { display: inline-block; font-size: 0.8rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--coral-dark); margin-bottom: 0.8rem; }
.hero h1 { font-size: 2.8rem; line-height: 1.12; margin-bottom: 1rem; }
.hero em { font-style: normal; color: var(--coral); }
.hero p { color: var(--muted); max-width: 480px; margin-bottom: 1.6rem; }
.cta { display: flex; gap: 0.8rem; flex-wrap: wrap; }
.btn { padding: 0.75rem 1.5rem; border-radius: 12px; font-weight: 700; text-decoration: none; transition: transform 0.2s, background 0.2s; }
.btn:hover { transform: translateY(-2px); }
.solid { background: var(--coral); color: var(--white); }
.solid:hover { background: var(--coral-dark); }
.ghost { border: 2px solid var(--ink); }
.hero-stats { display: grid; gap: 0.8rem; }
.stat { display: flex; align-items: baseline; gap: 0.8rem; background: var(--white); padding: 1rem 1.3rem; border-radius: 16px; border: 1px solid var(--line); }
.stat b { font-size: 2rem; color: var(--coral); }
.stat span { color: var(--muted); }

.block h2 { font-size: 1.5rem; margin-bottom: 1rem; }
.chips { display: flex; flex-wrap: wrap; gap: 0.7rem; }
.chip { display: inline-flex; gap: 0.5rem; align-items: center; padding: 0.55rem 1rem; background: var(--white); border: 1px solid var(--line); border-radius: 999px; text-decoration: none; font-weight: 600; transition: all 0.2s; }
.chip small { background: var(--sand); border-radius: 999px; padding: 0 0.5rem; }
.chip:hover { border-color: var(--coral); color: var(--coral-dark); }

.cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.2rem; }
.mini { display: flex; flex-direction: column; gap: 0.35rem; padding: 1.4rem; background: var(--white); border: 1px solid var(--line); border-radius: var(--radius); text-decoration: none; transition: all 0.2s; }
.mini:hover { transform: translateY(-4px); box-shadow: 0 12px 26px rgba(31, 41, 55, 0.08); }
.mini-date { font-size: 0.8rem; font-weight: 700; color: var(--coral-dark); }
.mini p { color: var(--muted); font-size: 0.92rem; }

.map { background: var(--white); border: 1px solid var(--line); border-radius: 20px; padding: 2rem; }
.hint { color: var(--muted); margin-bottom: 1rem; }
.map ul { list-style: none; margin: 0; padding: 0; }
.map li { display: flex; align-items: center; gap: 0.7rem; padding-top: 0.45rem; padding-bottom: 0.45rem; }
.lvl { font-size: 0.7rem; font-weight: 700; background: var(--sand); padding: 0.1rem 0.45rem; border-radius: 6px; color: var(--muted); }
.map a { font-weight: 600; text-decoration: none; }
.map a:hover { color: var(--coral); }

@media (max-width: 800px) {
  .hero { grid-template-columns: 1fr; padding: 1.8rem; }
  .hero h1 { font-size: 2.1rem; }
}
</style>