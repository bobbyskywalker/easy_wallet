import React from 'react';

interface TokenBarProps {
  logo: React.ReactNode; // pass in an <img> or <svg>
  symbol: string;
  name: string;
  value: string;
  usdValue: string;
  change: string;
  changePositive?: boolean;
  chart?: React.ReactNode; // e.g. a mini sparkline chart
}

export function TokenBar({
  logo,
  symbol,
  name,
  value,
  usdValue,
  change,
  changePositive = true,
  chart,
}: TokenBarProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-xl rounded-[24px] bg-gradient-to-br from-[#1B1E1E] to-[#121515] p-4 shadow-md text-white">
      {/* Left: Logo and Name */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFD279] to-[#FFAE35] flex items-center justify-center shadow-inner">
          {logo}
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{symbol}</span>
          <span className="text-sm text-gray-400">{name}</span>
        </div>
      </div>

      {/* Center: Chart */}
      <div className="flex-1 flex justify-center px-6">
        {chart}
      </div>

      {/* Right: Value & Change */}
      <div className="flex flex-col items-end">
        <span className="text-lg font-semibold">{value} <span className="text-gray-400 text-sm">(${usdValue})</span></span>
        <span className={`text-sm ${changePositive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}
