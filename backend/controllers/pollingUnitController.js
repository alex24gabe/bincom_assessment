const pool = require("../db/db");

const getPollingUnits = async (req, res) => {
  try {

    const [rows] = await pool.query(`
      SELECT uniqueid, polling_unit_name
      FROM polling_unit
      ORDER BY polling_unit_name
    `);

    res.json(rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};
const getPollingUnitResults = async (req, res) => {
  try {

    const pollingUnitId = req.params.id;

    const [rows] = await pool.query(
      `
      SELECT
        party_abbreviation,
        party_score
      FROM announced_pu_results
      WHERE polling_unit_uniqueid = ?
      `,
      [pollingUnitId]
    );

    res.json(rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};
const addPollingUnitResult = async (
  req,
  res
) => {
  try {
    const {
      polling_unit_uniqueid,
      party_abbreviation,
      party_score,
    } = req.body;

   await pool.query(
  `
  INSERT INTO announced_pu_results
  (
    polling_unit_uniqueid,
    party_abbreviation,
    party_score,
    entered_by_user,
    date_entered,
    user_ip_address
  )
  VALUES (?, ?, ?, ?, NOW(), ?)
  `,
  [
    polling_unit_uniqueid,
    party_abbreviation,
    party_score,
    "Admin",
    req.ip,
  ]
);
    res.status(201).json({
      message:
        "Result added successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const getWardsByLga = async (req, res) => {
  try {
    const { lgaId } = req.params;

    const [rows] = await pool.query(
      `
      SELECT
        uniqueid,
        ward_name
      FROM ward
      WHERE lga_id = ?
      ORDER BY ward_name
      `,
      [lgaId]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const createPollingUnitAndResults =
  async (req, res) => {
    try {

      const {
        pollingUnitName,
        wardId,
        lgaId,
        results,
      } = req.body;

      const [maxId] =
        await pool.query(`
          SELECT
            MAX(polling_unit_id)
            AS maxId
          FROM polling_unit
        `);

      const nextPollingUnitId =
        (maxId[0].maxId || 0) + 1;

      const [newPollingUnit] =
        await pool.query(
          `
          INSERT INTO polling_unit
          (
            polling_unit_id,
            ward_id,
            lga_id,
            polling_unit_name
          )
          VALUES (?, ?, ?, ?)
          `,
          [
            nextPollingUnitId,
            wardId,
            lgaId,
            pollingUnitName,
          ]
        );

      const pollingUnitUniqueId =
        newPollingUnit.insertId;

      for (const result of results) {

        await pool.query(
          `
          INSERT INTO announced_pu_results
          (
            polling_unit_uniqueid,
            party_abbreviation,
            party_score,
            entered_by_user,
            date_entered,
            user_ip_address
          )
          VALUES
          (
            ?, ?, ?, ?, NOW(), ?
          )
          `,
          [
            pollingUnitUniqueId,
            result.party,
            result.score,
            "Admin",
            req.ip,
          ]
        );

      }

      res.status(201).json({
        message:
          "Polling unit created successfully",
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message: "Server Error",
      });

    }
  };
  
    

module.exports = {
  getPollingUnits,
  getPollingUnitResults,
  addPollingUnitResult,
  getWardsByLga,
  createPollingUnitAndResults,
};
