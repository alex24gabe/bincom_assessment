import { useEffect, useState } from "react";

import LoadingScreen from "./components/LoadingScreen";
import Navigation from "./components/Navigation";

import PollingUnitResults from "./pages/PollingUnitResults";
import LgaResults from "./pages/LgaResults";
import AddResults from "./pages/AddResults";

function App() {
  const [loading, setLoading] =
    useState(true);

  const [activePage, setActivePage] =
    useState("polling");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <Navigation
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="pb-24 md:pb-0">

        {activePage === "polling" && (
          <PollingUnitResults />
        )}

        {activePage === "lga" && (
          <LgaResults />
        )}

        {activePage === "add" && (
          <AddResults />
        )}

      </div>

    </div>
  );
}

export default App;