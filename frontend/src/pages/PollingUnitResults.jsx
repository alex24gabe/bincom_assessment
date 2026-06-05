import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  IconBuildingCommunity,
  IconTrophy,
  IconChartBar,
} from "@tabler/icons-react";

import {
  getPollingUnits,
  getPollingUnitResults,  
} from "../services/electionService";

function PollingUnitResults() {
  const [pollingUnits, setPollingUnits] =
    useState([]);

  const [selectedUnit, setSelectedUnit] =
    useState("");

  const [results, setResults] = useState([]);

  const [loading, setLoading] =
    useState(false);
    const [searchTerm, setSearchTerm] =
  useState("");
  const [showSuggestions, setShowSuggestions] =
  useState(false);

  useEffect(() => {
    loadPollingUnits();
  }, []);

  const loadPollingUnits = async () => {
    try {
      const data =
        await getPollingUnits();

      setPollingUnits(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async (e) => {
    const id = e.target.value;

    setSelectedUnit(id);

    if (!id) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      const data =
        await getPollingUnitResults(id);

      setResults(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const selectedPollingUnit =
    pollingUnits.find(
      (unit) =>
        String(unit.uniqueid) ===
        String(selectedUnit)
    );
    const filteredPollingUnits = pollingUnits
  .filter((unit) =>
    (
      unit.polling_unit_name ||
      `Polling Unit ${unit.uniqueid}`
    )
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    const aName =
      (
        a.polling_unit_name ||
        `Polling Unit ${a.uniqueid}`
      ).toLowerCase();

    const bName =
      (
        b.polling_unit_name ||
        `Polling Unit ${b.uniqueid}`
      ).toLowerCase();

    const search =
      searchTerm.toLowerCase();

    const aStarts =
      aName.startsWith(search);

    const bStarts =
      bName.startsWith(search);

    if (aStarts && !bStarts)
      return -1;

    if (!aStarts && bStarts)
      return 1;

    return 0;
  });
  const totalVotes = results.reduce(
    (total, result) =>
      total + Number(result.party_score),
    0
  );
  const highestVote =
  results.length > 0
    ? Math.max(
        ...results.map((r) =>
          Number(r.party_score)
        )
      )
    : 0;

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">

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
          {/* Header */}

         <div
  className="
  mb-8
  rounded-3xl
  bg-gradient-to-r
  from-blue-600
  to-indigo-700
  p-6
  md:p-8
  text-white
"
>
  <div className="flex items-center gap-3">

    <IconBuildingCommunity size={40} />

    <div>

      <h1
        className="
        text-2xl
        md:text-4xl
        font-bold
        "
      >
        Bincom Election Results Portal
      </h1>

      <p className="mt-2 text-blue-100">
        View announced polling unit
        election results.
      </p>

    </div>

  </div>
</div>

          {/* Dropdown */}
<div className="relative">

  <input
    type="text"
    placeholder="Search polling unit..."
    value={searchTerm}
    onChange={(e) => {
      setSearchTerm(e.target.value);
      setShowSuggestions(true);
    }}
    className="
      w-full
      mb-2
      p-3
      border
      border-slate-300
      rounded-xl
      focus:outline-none
      focus:ring-2
      focus:ring-blue-500
    "
  />

  {showSuggestions &&
    searchTerm.trim() !== "" && (

      <div
        className="
        absolute
        z-50
        w-full
        bg-white
        border
        rounded-xl
        shadow-lg
        max-h-60
        overflow-y-auto
        "
      >

        {filteredPollingUnits
          .slice(0, 10)
          .map((unit) => (

            <button
              key={unit.uniqueid}
              type="button"
              onClick={() => {

                setSelectedUnit(
                  String(unit.uniqueid)
                );

                setSearchTerm(
                  unit.polling_unit_name ||
                  `Polling Unit ${unit.uniqueid}`
                );

                setShowSuggestions(false);

                handleChange({
                  target: {
                    value: unit.uniqueid,
                  },
                });

              }}
              className="
              w-full
              text-left
              p-3
              hover:bg-slate-100
              border-b
              "
            >
              {unit.polling_unit_name ||
                `Polling Unit ${unit.uniqueid}`}
            </button>

        ))}

      </div>

  )}

</div>
          <select
            value={selectedUnit}
            onChange={handleChange}
            className="
              w-full
              p-4
              border
              border-slate-300
              rounded-xl
              mb-6
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          >
            <option value="">
              Select Polling Unit
            </option>

            {filteredPollingUnits.map((unit) => (
              <option
                key={unit.uniqueid}
                value={unit.uniqueid}
              >
                {unit.polling_unit_name ||
                  `Polling Unit ${unit.uniqueid}`}
              </option>
            ))}
          </select>

          {/* Loading */}

                  {loading && (
          <div className="flex justify-center py-10">
            <div
              className="
              w-10
              h-10
              border-4
              border-blue-600
              border-t-transparent
              rounded-full
              animate-spin
              "
            />
          </div>
        )}

          {/* Stats Cards */}

          {!loading &&
            results.length > 0 && (
              <div className="grid md:grid-cols-3 gap-4 mb-8">

                <div
                  className="
                  bg-slate-50
                  border
                  rounded-2xl
                  p-5
                "
                >
                  <div className="flex items-center gap-2 mb-2">
                    <IconBuildingCommunity
                      size={20}
                    />
                    <span className="text-slate-500 text-sm">
                      Polling Unit
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg">
                    {selectedPollingUnit
                      ?.polling_unit_name ||
                      `Polling Unit ${selectedUnit}`}
                  </h3>
                </div>

                <div
                  className="
                  bg-slate-50
                  border
                  rounded-2xl
                  p-5
                "
                >
                  <div className="flex items-center gap-2 mb-2">
                    <IconChartBar
                      size={20}
                    />
                    <span className="text-slate-500 text-sm">
                      Total Votes
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg">
                    {totalVotes}
                  </h3>
                </div>
                <div
                  className="
                  bg-slate-50
                  border
                  rounded-2xl
                  p-5
                "
                >
                  <div className="flex items-center gap-2 mb-2">

                    <IconTrophy size={20} />

                    <span className="text-slate-500 text-sm">
                      Parties
                    </span>

                  </div>

                  <h3 className="font-semibold text-lg">
                    {results.length}
                  </h3>
                </div>

              </div>
              
            )}

          {/* Empty State */}

          {!loading &&
            selectedUnit === "" && (
              <div
                className="
                text-center
                py-20
              "
              >
                <IconTrophy
                  size={50}
                  className="mx-auto mb-4 text-slate-400"
                />

                <h2 className="text-xl font-semibold">
                  Select a Polling Unit
                </h2>

                <p className="text-slate-500 mt-2">
                  Election results will
                  appear here.
                </p>
              </div>
            )}

          {/* Results Table */}

          {!loading &&
            results.length > 0 && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
              >
                <table
                  className="
                    w-full
                    overflow-hidden
                    rounded-xl
                  "
                >
                  <thead>

                    <tr className="bg-slate-800 text-white">

                      <th className="p-4 text-left">
                        Party
                      </th>

                      <th className="p-4 text-left">
                        Votes
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {results.map(
                      (result) => (
                        <motion.tr
                          key={
                            result.party_abbreviation
                          }
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          className="
                            border-b
                            hover:bg-slate-50
                            transition
                          "
                        >
                          <td className="p-4 font-semibold">
                            <span className="px-3 py-1 rounded-full bg-slate-100">
                              {result.party_abbreviation}
                            </span>
                          </td>

                          <td className="p-4">

                        <div className="flex items-center gap-3">

                          <div className="w-full bg-slate-200 rounded-full h-3">

                            <div
                              className="
                              bg-blue-600
                              h-3
                              rounded-full
                              "
                              style={{
                                width: `${
                                highestVote
                                  ? (Number(result.party_score) /
                                      highestVote) *
                                    100
                                  : 0
                              }%`,
                              }}
                            />

                          </div>

                          <span>
                            {result.party_score}
                          </span>

                        </div>

                      </td>

                        </motion.tr>
                      )
                    )}

                  </tbody>

                </table>

              </motion.div>
            )}
            <div
            className="
            text-center
            mt-8
            text-sm
            text-slate-500
          "
          >
            copy right 
          </div>

        </motion.div>
        

      </div>
    </div>
    
  );
}

export default PollingUnitResults;