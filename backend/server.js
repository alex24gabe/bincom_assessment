const express = require("express");
const cors = require("cors");

const app = express();
const pollingUnitRoutes = require("./routes/tempRoutes");
const lgaRoutes = require("./routes/lgaRoutes");

app.use(cors());
app.use(express.json());
app.use("/api/polling-units", pollingUnitRoutes);
app.use("/api/lgas", lgaRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Bincom Assessment API Running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});