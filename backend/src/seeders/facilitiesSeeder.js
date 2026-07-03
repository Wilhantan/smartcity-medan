const Facility = require('../models/Facility');

const facilitiesData = [
  // === RUMAH SAKIT ===
  {
    nama: 'RSUD Dr. Pirngadi Medan',
    jenis: 'Rumah Sakit',
    alamat: 'Jl. Prof. H.M. Yamin SH No.47',
    kecamatan: 'Medan Timur',
    telepon: '061-4512800',
    jam_buka: '24 Jam',
    lat: 3.5913,
    lng: 98.6989,
    deskripsi: 'Rumah sakit umum milik pemerintah kota Medan'
  },
  {
    nama: 'RS Columbia Asia Medan',
    jenis: 'Rumah Sakit',
    alamat: 'Jl. Listrik No.2A',
    kecamatan: 'Medan Petisah',
    telepon: '061-4566368',
    jam_buka: '24 Jam',
    lat: 3.5812,
    lng: 98.6658,
    deskripsi: 'Rumah sakit swasta internasional'
  },
  {
    nama: 'RS Haji Medan',
    jenis: 'Rumah Sakit',
    alamat: 'Jl. RS Haji',
    kecamatan: 'Medan Johor',
    telepon: '061-7864741',
    jam_buka: '24 Jam',
    lat: 3.5389,
    lng: 98.6912,
    deskripsi: 'Rumah sakit daerah Provinsi Sumatera Utara'
  },
  {
    nama: 'RSUP H. Adam Malik',
    jenis: 'Rumah Sakit',
    alamat: 'Jl. Bunga Lau No.17',
    kecamatan: 'Medan Tuntungan',
    telepon: '061-8360143',
    jam_buka: '24 Jam',
    lat: 3.5186,
    lng: 98.6183,
    deskripsi: 'Rumah Sakit Umum Pusat rujukan nasional wilayah barat'
  },
  {
    nama: 'RS Siloam Dhirga Surya',
    jenis: 'Rumah Sakit',
    alamat: 'Jl. Imam Bonjol No.6',
    kecamatan: 'Medan Petisah',
    telepon: '061-88881900',
    jam_buka: '24 Jam',
    lat: 3.5855,
    lng: 98.6756,
    deskripsi: 'Rumah sakit swasta modern di pusat kota'
  },
  {
    nama: 'RS Stella Maris',
    jenis: 'Rumah Sakit',
    alamat: 'Jl. S. Parman No.179',
    kecamatan: 'Medan Baru',
    telepon: '061-4158383',
    jam_buka: '24 Jam',
    lat: 3.5824,
    lng: 98.6601,
    deskripsi: 'Rumah sakit spesialis ibu dan anak terkemuka'
  },
  {
    nama: 'RS Bhayangkara Medan',
    jenis: 'Rumah Sakit',
    alamat: 'Jl. K.H. Wahid Hasyim No.1',
    kecamatan: 'Medan Baru',
    telepon: '061-8210355',
    jam_buka: '24 Jam',
    lat: 3.5788,
    lng: 98.6575,
    deskripsi: 'Rumah sakit kepolisian Sumatera Utara'
  },

  // === SEKOLAH / UNIVERSITAS ===
  {
    nama: 'SMA Negeri 1 Medan',
    jenis: 'Sekolah',
    alamat: 'Jl. Teuku Cik Ditiro No.1',
    kecamatan: 'Medan Baru',
    telepon: '061-4572748',
    jam_buka: '07:00 - 15:00',
    lat: 3.5793,
    lng: 98.6691,
    deskripsi: 'SMA Negeri favorit dan tertua di kota Medan'
  },
  {
    nama: 'SMA Negeri 4 Medan',
    jenis: 'Sekolah',
    alamat: 'Jl. Budi Kemasyarakatan No.3',
    kecamatan: 'Medan Sunggal',
    telepon: '061-8441490',
    jam_buka: '07:00 - 15:00',
    lat: 3.5950,
    lng: 98.6421,
    deskripsi: 'Sekolah menengah atas negeri favorit'
  },
  {
    nama: 'SMA Negeri 3 Medan',
    jenis: 'Sekolah',
    alamat: 'Jl. Budi Kemasyarakatan No.8',
    kecamatan: 'Medan Barat',
    telepon: '061-4523298',
    jam_buka: '07:00 - 15:00',
    lat: 3.6015,
    lng: 98.6705,
    deskripsi: 'SMA Negeri berprestasi di wilayah Medan Barat'
  },
  {
    nama: 'SMA Negeri 2 Medan',
    jenis: 'Sekolah',
    alamat: 'Jl. Laksamana Cheng Ho No.1',
    kecamatan: 'Medan Polonia',
    telepon: '061-7863588',
    jam_buka: '07:00 - 15:00',
    lat: 3.5518,
    lng: 98.6795,
    deskripsi: 'Sekolah menengah atas negeri terkemuka di Medan Polonia'
  },
  {
    nama: 'SMP Negeri 1 Medan',
    jenis: 'Sekolah',
    alamat: 'Jl. Asahan No.6',
    kecamatan: 'Medan Kota',
    telepon: '061-4521400',
    jam_buka: '07:00 - 14:00',
    lat: 3.5862,
    lng: 98.6908,
    deskripsi: 'SMP Negeri tertua dan unggulan di Kota Medan'
  },
  {
    nama: 'Universitas Sumatera Utara',
    jenis: 'Sekolah',
    alamat: 'Jl. Universitas No.9',
    kecamatan: 'Medan Baru',
    telepon: '061-8211633',
    jam_buka: '07:00 - 17:00',
    lat: 3.5700,
    lng: 98.6500,
    deskripsi: 'Universitas negeri terkemuka di Sumatera'
  },
  {
    nama: 'Universitas Negeri Medan',
    jenis: 'Sekolah',
    alamat: 'Jl. Willem Iskandar Pasar V',
    kecamatan: 'Medan Tembung',
    telepon: '061-6613365',
    jam_buka: '07:30 - 16:30',
    lat: 3.6192,
    lng: 98.7188,
    deskripsi: 'Universitas negeri penghasil tenaga pendidik di Sumatera Utara'
  },

  // === PASAR ===
  {
    nama: 'Pasar Petisah',
    jenis: 'Pasar',
    alamat: 'Jl. Kota Baru',
    kecamatan: 'Medan Petisah',
    telepon: null,
    jam_buka: '06:00 - 18:00',
    lat: 3.59112,
    lng: 98.66658,
    deskripsi: 'Pasar tradisional terbesar dan terbersih di Medan'
  },
  {
    nama: 'Pusat Pasar Medan',
    jenis: 'Pasar',
    alamat: 'Pusat Pasar, Jl. MT Haryono',
    kecamatan: 'Medan Kota',
    telepon: null,
    jam_buka: '08:00 - 17:00',
    lat: 3.5908,
    lng: 98.6885,
    deskripsi: 'Pusat grosir dan pasar tradisional tertua di Medan'
  },
  {
    nama: 'Pasar Sambas',
    jenis: 'Pasar',
    alamat: 'Jl. Sambas',
    kecamatan: 'Medan Kota',
    telepon: null,
    jam_buka: '05:00 - 14:00',
    lat: 3.5818,
    lng: 98.6922,
    deskripsi: 'Pasar tradisional khusus bahan makanan segar'
  },
  {
    nama: 'Pasar Rame',
    jenis: 'Pasar',
    alamat: 'Jl. Thamrin',
    kecamatan: 'Medan Area',
    telepon: null,
    jam_buka: '07:00 - 18:00',
    lat: 3.5888,
    lng: 98.6955,
    deskripsi: 'Pasar tradisional yang padat di sebelah Thamrin Plaza'
  },
  {
    nama: 'Pasar Helvetia',
    jenis: 'Pasar',
    alamat: 'Jl. Matahari Raya',
    kecamatan: 'Medan Helvetia',
    telepon: null,
    jam_buka: '06:00 - 17:00',
    lat: 3.6112,
    lng: 98.6482,
    deskripsi: 'Pasar tradisional melayani kawasan perumnas Helvetia'
  },
  {
    nama: 'Pasar Simpang Limun',
    jenis: 'Pasar',
    alamat: 'Jl. Sisingamangaraja',
    kecamatan: 'Medan Kota',
    telepon: null,
    jam_buka: '06:00 - 18:00',
    lat: 3.5595,
    lng: 98.6998,
    deskripsi: 'Pasar tradisional utama bagi warga Medan Selatan'
  },

  // === KANTOR PEMERINTAH ===
  {
    nama: 'Balai Kota Medan',
    jenis: 'Kantor Pemerintah',
    alamat: 'Jl. Kapten Maulana Lubis No.2',
    kecamatan: 'Medan Petisah',
    telepon: '061-4512412',
    jam_buka: 'Sen-Jum 08:00-16:00',
    lat: 3.5908,
    lng: 98.6693,
    deskripsi: 'Kantor Walikota Medan dan Sekretariat Daerah'
  },
  {
    nama: 'Kantor Gubernur Sumatera Utara',
    jenis: 'Kantor Pemerintah',
    alamat: 'Jl. Diponegoro No.30',
    kecamatan: 'Medan Polonia',
    telepon: '061-4156000',
    jam_buka: 'Sen-Jum 08:00-16:00',
    lat: 3.5775,
    lng: 98.6720,
    deskripsi: 'Gedung pemerintah provinsi Sumatera Utara'
  },
  {
    nama: 'DPRD Provinsi Sumatera Utara',
    jenis: 'Kantor Pemerintah',
    alamat: 'Jl. Imam Bonjol No.5',
    kecamatan: 'Medan Petisah',
    telepon: '061-4518781',
    jam_buka: 'Sen-Jum 08:00-16:00',
    lat: 3.5845,
    lng: 98.6762,
    deskripsi: 'Kantor Dewan Perwakilan Rakyat Daerah Provinsi Sumut'
  },
  {
    nama: 'Kantor Polrestabes Medan',
    jenis: 'Kantor Pemerintah',
    alamat: 'Jl. H.M. Said No.1',
    kecamatan: 'Medan Timur',
    telepon: '061-4520794',
    jam_buka: '24 Jam',
    lat: 3.6022,
    lng: 98.6943,
    deskripsi: 'Markas kepolisian resor kota besar Medan'
  },
  {
    nama: 'Kantor Pos Medan',
    jenis: 'Kantor Pemerintah',
    alamat: 'Jl. Pos No.1',
    kecamatan: 'Medan Barat',
    telepon: '061-4526565',
    jam_buka: 'Sen-Sab 08:00-20:00',
    lat: 3.5918,
    lng: 98.6775,
    deskripsi: 'Kantor pos pusat Kota Medan, bangunan cagar budaya'
  },
  {
    nama: 'Dinas Perhubungan Kota Medan',
    jenis: 'Kantor Pemerintah',
    alamat: 'Jl. Stasiun No.1',
    kecamatan: 'Medan Barat',
    telepon: '061-4560515',
    jam_buka: 'Sen-Jum 08:00-16:00',
    lat: 3.5925,
    lng: 98.6789,
    deskripsi: 'Kantor operasional Dinas Perhubungan Kota Medan'
  },

  // === TAMAN & MASJID (EXISTING) ===
  {
    nama: 'Taman Sri Deli',
    jenis: 'Taman',
    alamat: 'Jl. Brigadir Jenderal Katamso',
    kecamatan: 'Medan Kota',
    telepon: null,
    jam_buka: '06:00 - 22:00',
    lat: 3.5912,
    lng: 98.6812,
    deskripsi: 'Taman kota bersejarah di pusat Medan'
  },
  {
    nama: 'Taman Cadika Pramuka',
    jenis: 'Taman',
    alamat: 'Jl. Karya Wisata',
    kecamatan: 'Medan Johor',
    telepon: null,
    jam_buka: '06:00 - 21:00',
    lat: 3.5501,
    lng: 98.7005,
    deskripsi: 'Taman rekreasi dan area pramuka'
  },
  {
    nama: 'Taman Ahmad Yani',
    jenis: 'Taman',
    alamat: 'Jl. Diponegoro',
    kecamatan: 'Medan Polonia',
    telepon: null,
    jam_buka: '05:00 - 23:00',
    lat: 3.5740,
    lng: 98.6750,
    deskripsi: 'Taman hijau di pusat kota'
  },
  {
    nama: 'Masjid Raya Al-Mashun',
    jenis: 'Masjid',
    alamat: 'Jl. Sisingamangaraja',
    kecamatan: 'Medan Kota',
    telepon: null,
    jam_buka: '05:00 - 22:00',
    lat: 3.5883,
    lng: 98.6876,
    deskripsi: 'Masjid bersejarah warisan kesultanan Deli'
  }
];

const autoSeedFacilities = async () => {
  try {
    const count = await Facility.count();
    // If the database has 15 or fewer facilities, let's update it with the full comprehensive list!
    if (count <= 15) {
      console.log(`[SEEDER] Detected ${count} facilities. Seeding full public facilities list...`);
      
      // Let's clear the table first to avoid duplicate seeds
      await Facility.destroy({ where: {}, truncate: true });
      
      await Facility.bulkCreate(facilitiesData);
      console.log(`[SEEDER] Seeding complete! Inserted ${facilitiesData.length} facilities successfully.`);
    } else {
      console.log(`[SEEDER] Database already contains ${count} facilities. Skipping auto-seeding.`);
    }
  } catch (error) {
    console.error('[SEEDER] Failed to auto-seed public facilities:', error);
  }
};

module.exports = { autoSeedFacilities, facilitiesData };
