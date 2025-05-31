import React from 'react';

function FeatureButton({ icon: Icon }) {
  return (
  <button className="
	w-[60px] h-[60px]
	rounded-full
	backdrop-blur-[51px]
	border
	border-[rgba(15,18,18,0.05)]
	flex items-center justify-center shadow-inner-icon">
	{Icon && <Icon className="w-5 h-5" />}
  </button>
  );
}

export default FeatureButton;