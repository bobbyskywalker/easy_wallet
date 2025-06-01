interface TokenBarProps {
	logoUrl: string // URL for logo image
	symbol: string
	name: string
	price?: number | string // price in USD, optional
}

export function TokenBar({ logoUrl, symbol, name, price }: TokenBarProps) {
	return (
		<div className='flex items-center gap-4 w-full max-w-xl rounded-[24px] bg-gradient-to-br from-[#1B1E1E] to-[#121515] p-4 shadow-md text-white'>
			{/* Logo */}
			<div className='w-14 h-14 rounded-full bg-gradient-to-br from-[#FFD279] to-[#FFAE35] flex items-center justify-center shadow-inner overflow-hidden'>
				<img
					src={logoUrl}
					alt={`${name} logo`}
					className='max-w-full max-h-full'
				/>
			</div>

			{/* Symbol and Name */}
			<div className='flex flex-col flex-grow'>
				<span className='text-lg font-semibold'>{symbol}</span>
				<span className='text-sm text-gray-400'>{name}</span>
			</div>

			{/* Price */}
			{price !== undefined && (
				<div className='text-right'>
					<span className='text-lg font-semibold'>
						${Number(price).toFixed(4)}
					</span>
				</div>
			)}
		</div>
	)
}
