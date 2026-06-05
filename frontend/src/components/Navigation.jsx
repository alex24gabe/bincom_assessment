import {
  IconBuildingCommunity,
  IconChartBar,
  IconPlus,
} from "@tabler/icons-react";

function Navigation({
  activePage,
  setActivePage,
}) {
  const navItems = [
    {
      id: "polling",
      label: "Polling Units",
      icon: IconBuildingCommunity,
    },
    {
      id: "lga",
      label: "LGA Results",
      icon: IconChartBar,
    },
    {
      id: "add",
      label: "Add Results",
      icon: IconPlus,
    },
  ];

  return (
    <>
      {/* Desktop Top Navigation */}

      <div
        className="
        hidden
        md:flex
        justify-between
        items-center
        px-8
        py-4
        bg-white
        shadow-md
        sticky
        top-0
        z-50
      "
      >
        <h1
          className="
          text-xl
          font-bold
          text-slate-800
        "
        >
          Bincom Election Portal
        </h1>

        <div className="flex gap-2">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() =>
                  setActivePage(item.id)
                }
                className={`
                  flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-xl
                  transition

                  ${
                    activePage === item.id
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-100"
                  }
                `}
              >
                <Icon size={18} />

                {item.label}
              </button>
            );
          })}

        </div>
      </div>

      {/* Mobile Bottom Navigation */}

      <div
        className="
        md:hidden
        fixed
        bottom-0
        left-0
        right-0
        bg-white
        border-t
        shadow-lg
        z-50
      "
      >
        <div className="flex justify-around">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() =>
                  setActivePage(item.id)
                }
                className={`
                  flex
                  flex-col
                  items-center
                  py-3
                  px-4
                  transition

                  ${
                    activePage === item.id
                      ? "text-blue-600"
                      : "text-slate-500"
                  }
                `}
              >
                <Icon size={22} />

                <span className="text-xs mt-1">
                  {item.label}
                </span>
              </button>
            );
          })}

        </div>
      </div>
    </>
  );
}

export default Navigation;