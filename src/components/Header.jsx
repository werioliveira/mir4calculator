import React from "react";

function Header() {
  return (
    <div className="bg-slate-100  drop-shadow-sm">
      <div className=" max-w-7xl mx-auto h-10 flex flex-row p-10 justify-between items-center">
        <div className="pl-5">
          <p className="font-Rajdhani font-bold text-lg cursor-pointer">
            MIR4CALCULATOR
          </p>
        </div>

        <div className="px-10 flex gap-4 items-center font-Rajdhani font-semibold">
          <a href="#main">EXP</a>
        </div>
      </div>
    </div>
  );
}

export default Header;
