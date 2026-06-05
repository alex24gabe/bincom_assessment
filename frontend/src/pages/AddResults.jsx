import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  IconPlus,
} from "@tabler/icons-react";

import {
  getLgas,
  getWardsByLga,
  createPollingUnit,
} from "../services/electionService";

function AddResults() {
  const [lgas, setLgas] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedLga, setSelectedLga] =
    useState("");

  const [selectedWard, setSelectedWard] =
    useState("");

  const [pollingUnitName,
    setPollingUnitName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [scores, setScores] =
    useState({});

  const parties = [
    "ACN",
    "ANPP",
    "CDC",
    "CPP",
    "DPP",
    "JP",
    "LABO",
    "PDP",
    "PPA",
  ];

  useEffect(() => {
    loadLgas();
  }, []);

  const loadLgas = async () => {
    try {
      const data =
        await getLgas();

      setLgas(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLgaChange =
    async (e) => {
      const lgaId =
        e.target.value;

      setSelectedLga(lgaId);

      setSelectedWard("");

      try {
        const data =
          await getWardsByLga(
            lgaId
          );

        setWards(data);
      } catch (error) {
        console.error(error);
      }
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const results =
          parties.map(
            (party) => ({
              party,
              score:
                Number(
                  scores[party]
                ) || 0,
            })
          );

        await createPollingUnit({
          pollingUnitName,
          wardId:
            selectedWard,
          lgaId:
            selectedLga,
          results,
        });

        setMessage(
          "✅ Polling Unit Created Successfully"
        );

        setSelectedLga("");
        setSelectedWard("");
        setPollingUnitName("");
        setScores({});

      } catch (error) {
        console.error(error);

        setMessage(
          "❌ Failed To Save"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
          bg-white
          rounded-3xl
          shadow-xl
          p-8
        "
        >

          <div
            className="
            mb-8
            rounded-3xl
            bg-gradient-to-r
            from-purple-600
            to-indigo-700
            p-6
            text-white
          "
          >
            <div className="flex items-center gap-3">

              <IconPlus size={40} />

              <div>

                <h1 className="text-3xl font-bold">
                  Create Polling Unit
                </h1>

                <p>
                  Create a new polling
                  unit and enter all
                  party results.
                </p>

              </div>

            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <select
              value={
                selectedLga
              }
              onChange={
                handleLgaChange
              }
              className="
              w-full
              p-3
              border
              rounded-xl
            "
              required
            >
              <option value="">
                Select LGA
              </option>

              {lgas.map(
                (lga) => (
                  <option
                    key={
                      lga.uniqueid
                    }
                    value={
                      lga.uniqueid
                    }
                  >
                    {
                      lga.lga_name
                    }
                  </option>
                )
              )}
            </select>

            <select
              value={
                selectedWard
              }
              onChange={(e) =>
                setSelectedWard(
                  e.target.value
                )
              }
              className="
              w-full
              p-3
              border
              rounded-xl
            "
              required
            >
              <option value="">
                Select Ward
              </option>

              {wards.map(
                (ward) => (
                  <option
                    key={
                      ward.uniqueid
                    }
                    value={
                      ward.uniqueid
                    }
                  >
                    {
                      ward.ward_name
                    }
                  </option>
                )
              )}
            </select>

            <input
              type="text"
              placeholder="Polling Unit Name"
              value={
                pollingUnitName
              }
              onChange={(e) =>
                setPollingUnitName(
                  e.target.value
                )
              }
              className="
              w-full
              p-3
              border
              rounded-xl
            "
              required
            />

            <h2 className="font-bold text-lg">
              Party Results
            </h2>

            {parties.map(
              (party) => (
                <div
                  key={party}
                  className="
                  flex
                  items-center
                  gap-4
                "
                >
                  <div className="w-20 font-semibold">
                    {party}
                  </div>

                  <input
                    type="number"
                    min="0"
                    value={
                      scores[
                        party
                      ] || ""
                    }
                    onChange={(
                      e
                    ) =>
                      setScores({
                        ...scores,
                        [party]:
                          e.target
                            .value,
                      })
                    }
                    className="
                    flex-1
                    p-3
                    border
                    rounded-xl
                  "
                  />
                </div>
              )
            )}

            <button
              type="submit"
              disabled={
                loading
              }
              className="
              w-full
              bg-purple-600
              text-white
              p-4
              rounded-xl
            "
            >
              {loading
                ? "Saving..."
                : "Create Polling Unit"}
            </button>

          </form>

          {message && (
            <div className="mt-4 text-center font-medium">
              {message}
            </div>
          )}

        </motion.div>

      </div>

    </div>
  );
}

export default AddResults;