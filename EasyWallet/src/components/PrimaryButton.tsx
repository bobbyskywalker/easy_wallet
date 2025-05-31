import React from 'react'

type ButtonProps = {
	label: string
	onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function PrimaryButton({ label, onClick }: ButtonProps) {
	return (
		<button
			className='w-full px-4 py-3 bg-gradient-to-br from-[#B5FF38] to-[#7CC20C] text-black rounded-full text-center'
			onClick={onClick}
		>
			{label}
		</button>
	)
}

export default PrimaryButton
