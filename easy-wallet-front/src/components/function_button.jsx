import React from 'react';

function ButtonF({ icon: Icon }) {
  return (
  <button className="
	bg-[#1C1C21]
	w-[60px] h-[60px]
	rounded-full
	backdrop-blur-[51px]
	border
	border-[rgba(15,18,18,0.05)]
	flex items-center justify-center">
	{Icon && <Icon className="w-5 h-5" />}
  </button>
  );
}

export default ButtonF;