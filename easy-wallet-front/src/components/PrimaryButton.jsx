import React from 'react';

function PrimaryButton({label, onClick}) {
  return (
  <button class="px-4 py-2 bg-gradient-to-br from-[#B5FF38] to-[#7CC20C] text-black rounded-full text-center" 
  onClick={onClick}>
	{label}
  </button>
  
  );
}

export default PrimaryButton;