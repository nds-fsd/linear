import { useState } from "react";
import cyclesStyle from "./cycles.module.css";
import PageHeader from "../pageheader/pageheader";

const Cycles = () => {
  const [activeView, setActiveview] = useState("list");

  return (
    <div className={cyclesStyle.cycles}>
      <PageHeader
        activeView={activeView}
        setActiveview={setActiveview}
        title="Cycles"
        btntitle="Cycle"
      />
      cycles
    </div>
  );
};

export default Cycles;
