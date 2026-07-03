const swaggerJsdoc = require('swagger-jsdoc');

const PORT = process.env.PORT || 5050;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smart City Medan API",
      version: "1.0.0",
      description:
        "Dokumentasi API untuk platform Smart City Medan — mencakup autentikasi, profil pengguna, dashboard kota, kualitas udara, lalu lintas, transportasi umum, fasilitas kota, layanan kota (energi, sampah, banjir, air bersih, kebijakan, laporan warga, pengumuman), layanan publik (rumah sakit, CCTV, pendidikan, UMKM, lowongan kerja), dan panel admin.",
      contact: {
        name: "Smart City Medan Team",
      },
    },
    servers: [
      {
        url: `https://smartcityasing-production.up.railway.app/api`,
        description: "Server production (Railway)",
      },
      {
        url: `http://localhost:${PORT}/api`,
        description: "Server lokal (development)",
      },
    ],
    tags: [
      {
        name: "Auth",
        description: "Registrasi, login, dan manajemen sesi pengguna",
      },
      {
        name: "Users",
        description: "Profil dan statistik pengguna yang login",
      },
      { name: "Dashboard", description: "Ringkasan dan statistik kota" },
      { name: "Air Quality", description: "Data kualitas udara per kecamatan" },
      { name: "Traffic", description: "Data dan ringkasan lalu lintas kota" },
      { name: "Transport", description: "Rute dan jadwal transportasi umum" },
      { name: "Facilities", description: "Data fasilitas umum kota" },
      {
        name: "City Services",
        description:
          "Energi, sampah, banjir, air bersih, kebijakan, laporan, dan pengumuman",
      },
      {
        name: "Public Services",
        description:
          "Rumah sakit, CCTV, pendidikan, UMKM, lowongan kerja, dan voucher kota",
      },
      {
        name: "Admin",
        description: "Endpoint khusus admin untuk pengelolaan data kota",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Masukkan token JWT dengan format: Bearer <token>",
        },
      },
      schemas: {
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: { type: "object" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Terjadi kesalahan." },
          },
        },
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            nama: { type: "string", example: "Budi Santoso" },
            email: { type: "string", example: "budi@example.com" },
            kota: { type: "string", example: "Medan" },
            role: {
              type: "string",
              enum: ["warga", "admin"],
              example: "warga",
            },
            foto_profil: {
              type: "string",
              nullable: true,
              example: "/uploads/167123-foto.jpg",
            },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
