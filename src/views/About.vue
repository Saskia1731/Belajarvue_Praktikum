<script setup>
const values = [
  { no: '01', title: 'Mudah', text: 'Cari, pilih, dan daftar acara tanpa ribet.' },
  { no: '02', title: 'Terbuka', text: 'Siapa pun boleh membuat dan mengikuti acara.' },
  { no: '03', title: 'Bermakna', text: 'Setiap pertemuan harus meninggalkan cerita.' },
]
const team = [
  { name: 'Anisa R.', role: 'Product' },
  { name: 'Bagas P.', role: 'Engineering' },
  { name: 'Citra L.', role: 'Community' },
]
</script>

<template>
  <div class="about">
    <header class="intro">
      <h1>Kami percaya pertemuan bisa mengubah banyak hal.</h1>
      <p>
        Temuin lahir dari kebiasaan sederhana: sering ketinggalan info acara bagus di sekitar kita.
        Kami merapikannya di satu tempat.
      </p>
    </header>

    <section class="duo">
      <article>
        <h2>Misi</h2>
        <p>Mempermudah siapa pun menemukan acara yang cocok dengan minat dan jadwalnya.</p>
      </article>
      <article>
        <h2>Visi</h2>
        <p>Menjadi rumah bagi komunitas lokal untuk saling bertemu dan bertumbuh.</p>
      </article>
    </section>

    <section>
      <h2 class="title">Nilai kami</h2>
      <div class="values">
        <div v-for="v in values" :key="v.no" class="value">
          <span>{{ v.no }}</span>
          <h3>{{ v.title }}</h3>
          <p>{{ v.text }}</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="title">Tim</h2>
      <div class="team">
        <div v-for="t in team" :key="t.name" class="member">
          <div class="avatar">{{ t.name[0] }}</div>
          <div>
            <b>{{ t.name }}</b>
            <p>{{ t.role }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about { display: flex; flex-direction: column; gap: 2.5rem; max-width: 900px; margin: 0 auto; animation: rise 0.45s ease; }
.intro h1 { font-size: 2.3rem; line-height: 1.2; margin-bottom: 1rem; }
.intro p { color: var(--muted); font-size: 1.08rem; max-width: 640px; }
.duo { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
.duo article { padding: 1.8rem; border-radius: 18px; background: var(--coral-soft); border: 1px solid var(--line); }
.duo article:last-child { background: var(--sand); }
.duo h2 { margin-bottom: 0.5rem; }
.duo p { color: var(--muted); }
.title { font-size: 1.5rem; margin-bottom: 1rem; }
.values { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; }
.value { padding: 1.5rem; background: var(--white); border: 1px solid var(--line); border-radius: var(--radius); }
.value span { font-weight: 800; color: var(--coral); font-size: 0.85rem; }
.value h3 { margin: 0.3rem 0; }
.value p { color: var(--muted); font-size: 0.95rem; }
.team { display: flex; gap: 1rem; flex-wrap: wrap; }
.member { display: flex; align-items: center; gap: 0.9rem; padding: 0.9rem 1.3rem; background: var(--white); border: 1px solid var(--line); border-radius: 999px; }
.avatar { width: 42px; height: 42px; display: grid; place-items: center; border-radius: 50%; background: var(--coral); color: var(--white); font-weight: 800; }
.member p { color: var(--muted); font-size: 0.85rem; }
@media (max-width: 640px) { .duo { grid-template-columns: 1fr; } .intro h1 { font-size: 1.8rem; } }
</style>