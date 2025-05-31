import React from 'react';

interface TokenCardProps {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  abbrev: string;
  name: string;
  owns: string;
  change: number;
  onPress?: () => void;
}

function TokenCard({ icon: Icon, abbrev, name, owns, change, onPress }: TokenCardProps) {
  return (
    <div
      onClick={onPress}
      className="
        w-[163px] h-[132px] p-4
        bg-black1 rounded-[12px]
        backdrop-blur-[17.5px]
        inset-shadow-icon
        flex flex-col justify-between
        text-white
        cursor-pointer
      "
    >
      <div className="flex items-center gap-3">
        <div className="w-[48px] h-[48px] rounded-full bg-[#FFD166] flex items-center justify-center">
          {Icon && <Icon className="w-5 h-5 text-black" />}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{abbrev}</span>
          <span className="text-xs text-gray-400">{name}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-[20px] font-semibold">{owns}</span>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          change >= 0 ? 'text-green-500 bg-[#1F2B1F]' : 'text-red-500 bg-[#2B1F1F]'
        }`}>
          {change > 0 ? `+${change}%` : `${change}%`}
        </span>
      </div>
    </div>
  );
}

export default TokenCard;
