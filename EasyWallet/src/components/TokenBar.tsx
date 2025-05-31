import React from 'react';
import CircularIconContainer from './CircularIconContainer'; // adjust path if needed

interface TokenBarProps {
  imageUrl:string; // pass in an <img> or <svg>
  symbol: string;
  name: string;
  value: string;
  usdValue: string;
  change: string;
  changePositive?: boolean;
  chart?: React.ReactNode;
}

export function TokenBar({
  imageUrl,
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
        <CircularIconContainer icon={
						imageUrl
						? <img src={imageUrl} alt={symbol} className="w-6 h-6 rounded-full object-contain" />
						: undefined
					} />
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
        <span className="text-lg font-semibold">
          {value} <span className="text-gray-400 text-sm">(${usdValue})</span>
        </span>
        <span className={`text-sm ${changePositive ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}
