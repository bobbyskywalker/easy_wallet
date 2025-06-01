import { ReactComponent as Close } from '../assets/close.svg'
import PrimaryButton from './PrimaryButton'
import { Check, X } from 'lucide-react'

interface ModalProps {
	title: string
	description: string
	onClose: () => void
	onDone: () => void
}

export function Modal({ title, description, onClose, onDone }: ModalProps) {
	const isSuccess = title.toLowerCase().includes('success')
	const isError = title.toLowerCase().includes('error')

	return (
		<div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'>
			<div className='w-[320px] bg-[#0F1212] rounded-2xl p-6 text-white relative inset-shadow-icon'>
				{/* Close Button */}
				<button
					className='absolute top-4 right-4 text-gray-400 hover:text-white'
					onClick={onClose}
					aria-label='Close modal'
				>
					<Close className='w-5 h-5' />
				</button>

				{/* Title */}
				<h2 className='text-lg font-semibold text-center mb-6'>
					{title}
				</h2>

				{/* Icon */}
				{(isSuccess || isError) && (
					<div className='flex justify-center mb-4'>
						{isSuccess && (
							<Check className='w-16 h-16 text-green-500' />
						)}
						{isError && <X className='w-16 h-16 text-red-500' />}
					</div>
				)}

				{/* Description */}
				<p className='text-center text-sm text-gray-400 mb-6'>
					{description}
				</p>

				{/* Done Button */}
				<PrimaryButton label='Done' onClick={onDone} />
			</div>
		</div>
	)
}
