const Facility = require('../models/Facility');
const { facilitiesData } = require('../seeders/facilitiesSeeder');

exports.getAll = async (req, res) => {
  try {
    const where = {};
    if (req.query.jenis) where.jenis = req.query.jenis;
    const data = await Facility.findAll({ where, order: [['nama', 'ASC']] });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.seedForce = async (req, res) => {
  try {
    await Facility.destroy({ where: {} });
    await Facility.bulkCreate(facilitiesData);
    res.json({ success: true, message: `Successfully force-seeded ${facilitiesData.length} facilities!` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
