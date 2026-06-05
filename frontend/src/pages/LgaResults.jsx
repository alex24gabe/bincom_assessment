import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  IconMap2,
  IconChartBar,
  IconTrophy,
} from "@tabler/icons-react";

import {
  getLgas,
  getLgaResults,
} from "../services/electionService";

function LgaResults() {
  const [lgas, setLgas] = useState([]);

  const [selectedLga, setSelectedLga] =
    useState("");

  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(false);
    const [searchTerm, setSearchTerm] =
  useState("");

const [showSuggestions, setShowSuggestions] =
  useState(false);

  useEffect(() => {
    loadLgas();
  }, []);

  const loadLgas = async () => {
    try {
      const data = await getLgas();

      setLgas(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = async (e) => {
    const id = e.target.value;

    setSelectedLga(id);

    if (!id) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      const data =
        await getLgaResults(id);

      setResults(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const selectedLgaData =
    lgas.find(
      (lga) =>
        String(lga.uniqueid) ===
        String(selectedLga)
    );

    const filteredLgas =
  lgas.filter((lga) =>
    lga.lga_name
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
  );

  const winningParty =
  results.length > 0
    ? results.reduce((winner, current) =>
        Number(current.total_score) >
        Number(winner.total_score)
          ? current
          : winner
      )
    : null;

  const totalVotes = results.reduce(
    (total, result) =>
      total +
      Number(result.total_score),
    0
  );

  const highestVote =
    results.length > 0
      ? Math.max(
          ...results.map((r) =>
            Number(r.total_score)
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
            from-emerald-600
            to-green-700
            p-6
            md:p-8
            text-white
          "
          >
            <div className="flex items-center gap-3">

              <IconMap2 size={40} />

              <div>

                <h1
                  className="
                  text-2xl
                  md:text-4xl
                  font-bold
                  "
                >
                  LGA Election Results
                </h1>

                <p className="mt-2 text-green-100">
                  View summed election
                  results by Local
                  Government Area.
                </p>

              </div>

            </div>

          </div>
          <div className="relative mb-4">

            {/* search filter */}

  <input
    type="text"
    placeholder="Search LGA..."
    value={searchTerm}
    onChange={(e) => {
      setSearchTerm(e.target.value);
      setShowSuggestions(true);
    }}
    className="
      w-full
      p-3
      border
      border-slate-300
      rounded-xl
      focus:outline-none
      focus:ring-2
      focus:ring-green-500
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

        {filteredLgas
          .slice(0, 10)
          .map((lga) => (

            <button
              key={lga.uniqueid}
              type="button"
              onClick={() => {

                setSelectedLga(
                  String(lga.uniqueid)
                );

                setSearchTerm(
                  lga.lga_name
                );

                setShowSuggestions(
                  false
                );

                handleChange({
                  target: {
                    value:
                      lga.uniqueid,
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
              {lga.lga_name}
            </button>

        ))}

      </div>

  )}

</div>

          {/* Dropdown */}

          

          <select
            value={selectedLga}
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
              focus:ring-green-500
            "
          >
            <option value="">
              Select LGA
            </option>

            {lgas.map((lga) => (
              <option
                key={lga.uniqueid}
                value={lga.uniqueid}
              >
                {lga.lga_name}
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
                border-green-600
                border-t-transparent
                rounded-full
                animate-spin
                "
              />
            </div>
          )}

          {/* Stats */}

          {!loading &&
            results.length > 0 && (
              <div className="grid md:grid-cols-3 gap-4 mb-8">

                <div className="bg-slate-50 border rounded-2xl p-5">

                  <div className="flex items-center gap-2 mb-2">
                    <IconMap2 size={20} />

                    <span className="text-slate-500 text-sm">
                      Selected LGA
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg">
                    {
                      selectedLgaData?.lga_name
                    }
                  </h3>

                </div>

                <div className="bg-slate-50 border rounded-2xl p-5">

                  <div className="flex items-center gap-2 mb-2">
                    <IconChartBar size={20} />

                    <span className="text-slate-500 text-sm">
                      Total Votes
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg">
                    {totalVotes}
                  </h3>

                </div>

                <div className="bg-slate-50 border rounded-2xl p-5">

                    <div className="flex items-center gap-2 mb-2">
                      <IconTrophy size={20} />

                      <span className="text-slate-500 text-sm">
                        Winning Party
                      </span>
                    </div>

                    <h3 className="font-semibold text-lg">
                      {winningParty
                        ?.party_abbreviation || "-"}
                    </h3>

                  </div>

              </div>
            )}

          {/* Empty State */}

          {!loading &&
            selectedLga === "" && (
              <div className="text-center py-20">

                <IconMap2
                  size={50}
                  className="mx-auto mb-4 text-slate-400"
                />

                <h2 className="text-xl font-semibold">
                  Select an LGA
                </h2>

                <p className="text-slate-500 mt-2">
                  Summed election
                  results will appear
                  here.
                </p>

              </div>
            )}

          {/* Results Table */}

          {!loading &&
            results.length > 0 && (
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
                      Total Votes
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {results.map((result) => (

                    <tr
                      key={
                        result.party_abbreviation
                      }
                      className="
                      border-b
                      hover:bg-slate-50
                    "
                    >

                      <td className="p-4 font-medium">
                        {
                          result.party_abbreviation
                        }
                      </td>

                      <td className="p-4">

                        <div className="flex items-center gap-3">

                          <div className="w-full bg-slate-200 rounded-full h-3">

                            <div
                              className="
                              bg-green-600
                              h-3
                              rounded-full
                              "
                              style={{
                                width: `${
                                  highestVote
                                    ? (Number(
                                        result.total_score
                                      ) /
                                        highestVote) *
                                      100
                                    : 0
                                }%`,
                              }}
                            />

                          </div>

                          <span>
                            {
                              result.total_score
                            }
                          </span>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>
            )}

        </motion.div>

      </div>

    </div>
  );
}

export default LgaResults;