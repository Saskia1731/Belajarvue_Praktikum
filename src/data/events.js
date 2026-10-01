export const categories = [
    { key: 'Music', label: 'Musik & Konser', icon: '🎵', tone: '#e8590c' },
    { key: 'Technology', label: 'Teknologi', icon: '💻', tone: '#2563eb' },
    { key: 'Design', label: 'Seni & Desain', icon: '🎨', tone: '#c026d3' },
    { key: 'Business', label: 'Bisnis', icon: '💼', tone: '#0f766e' },
    { key: 'Health', label: 'Kesehatan', icon: '🧘', tone: '#16a34a' },
    { key: 'Food', label: 'Kuliner', icon: '🍜', tone: '#ca8a04' },
  ]
  
  export const events = [
    {
      id: 1, title: 'Jakarta Indie Night', category: 'Music', date: '2026-10-10', time: '19.00',
      location: 'Balai Sarbini, Jakarta', price: 75000, spots: 45,
      desc: 'Malam apresiasi musik indie lokal dengan lima penampil terbaik tahun ini.',
      agenda: [['18.00', 'Pintu dibuka'], ['19.00', 'Penampil pembuka'], ['20.30', 'Headliner'], ['22.00', 'Penutup']],
    },
    {
      id: 2, title: 'Vue Meetup Depok', category: 'Technology', date: '2026-10-14', time: '13.00',
      location: 'Gedung Serbaguna, Depok', price: 0, spots: 30,
      desc: 'Diskusi santai seputar Vue 3, Vue Router, dan Pinia bersama praktisi.',
      agenda: [['13.00', 'Registrasi'], ['13.30', 'Talk: Routing di dunia nyata'], ['15.00', 'Live coding'], ['16.00', 'Networking']],
    },
    {
      id: 3, title: 'Pameran Poster Kampus', category: 'Design', date: '2026-10-18', time: '10.00',
      location: 'Galeri Kampus, Jakarta', price: 0, spots: 120,
      desc: 'Pameran karya poster mahasiswa desain dengan sesi kurasi terbuka.',
      agenda: [['10.00', 'Pembukaan pameran'], ['11.00', 'Tur kurasi'], ['14.00', 'Diskusi seniman'], ['16.00', 'Penutupan']],
    },
    {
      id: 4, title: 'Startup Pitch Day', category: 'Business', date: '2026-10-22', time: '09.00',
      location: 'Co-working Space, Bandung', price: 50000, spots: 20,
      desc: 'Sepuluh tim startup mempresentasikan ide di depan investor.',
      agenda: [['09.00', 'Check-in'], ['09.30', 'Sesi pitch 1'], ['12.00', 'Istirahat'], ['13.00', 'Sesi pitch 2 & penjurian']],
    },
    {
      id: 5, title: 'Yoga di Taman Kota', category: 'Health', date: '2026-10-25', time: '06.30',
      location: 'Taman Kota, Bogor', price: 25000, spots: 60,
      desc: 'Sesi yoga pagi untuk pemula, bawa matras sendiri.',
      agenda: [['06.30', 'Pemanasan'], ['07.00', 'Sesi inti'], ['08.00', 'Meditasi'], ['08.30', 'Sarapan bersama']],
    },
    {
      id: 6, title: 'Festival Jajan Nusantara', category: 'Food', date: '2026-10-30', time: '11.00',
      location: 'Lapangan Utama, Jakarta', price: 0, spots: 300,
      desc: 'Puluhan stan kuliner nusantara dalam satu tempat.',
      agenda: [['11.00', 'Stan dibuka'], ['13.00', 'Demo masak'], ['16.00', 'Lomba makan kerupuk'], ['20.00', 'Penutupan']],
    },
  ]
  
  export const getEvent = (id) => events.find((e) => e.id === Number(id))
  export const getCategory = (key) => categories.find((c) => c.key === key)
  export const countIn = (key) => events.filter((e) => e.category === key).length
  export const rupiah = (n) => (n === 0 ? 'Gratis' : 'Rp ' + n.toLocaleString('id-ID'))
  export const tanggal = (iso) =>
    new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })