const pool = require("../db/db");

const getAllLgas = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        uniqueid,
        lga_name
      FROM lga
      ORDER BY lga_name
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getLgaResults = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      `
      SELECT
        apr.party_abbreviation,
        SUM(apr.party_score) AS total_score
      FROM announced_pu_results apr
      JOIN polling_unit pu
      ON apr.polling_unit_uniqueid = pu.uniqueid
      WHERE pu.lga_id = ?
      GROUP BY apr.party_abbreviation
      ORDER BY total_score DESC
      `,
      [id]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getAllLgas,
  getLgaResults,
};