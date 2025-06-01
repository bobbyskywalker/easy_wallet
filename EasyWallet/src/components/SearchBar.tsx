import { ReactComponent as Search } from '../assets/search.svg' // your actual path

interface SearchBarProps {
	value: string
	onValueChange: (value: string) => void
}

export default function SearchBar({ value, onValueChange }: SearchBarProps) {
	return (
		<div className='w-full bg-[#1E1E1E] rounded-xl flex items-center px-4 py-3'>
			<input
				type='text'
				placeholder='Search Token'
				className='flex-1 bg-transparent outline-none text-sm text-white placeholder:text-gray-400'
				value={value}
				onChange={(e) => onValueChange(e.target.value)}
			/>
			<Search className='w-5 h-5 text-gray-400' />
		</div>
	)
}
