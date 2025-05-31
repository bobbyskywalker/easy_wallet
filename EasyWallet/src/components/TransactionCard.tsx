import React from 'react'
import { ReactComponent as X } from '../assets/close.svg'
import PrimaryButton from './PrimaryButton'

interface TransactionCardProps {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  status: string
  description: string
  onClose: () => void
  onDone: () => void
}

export function TransactionCard({ icon: Icon, status, description, onClose, onDone }: TransactionCardProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="w-[320px] bg-[#0F1212] rounded-2xl p-6 text-white relative inset-shadow-icon">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-center mb-6">
          Transaction {status}
        </h2>

       <div className="flex justify-center items-center mb-4 overflow-visible">
		{Icon && (
			<div className="w-24 h-24 flex items-center justify-center">
			<Icon className="w-full h-full" />
			</div>
		)}
		</div>

        {/* Description */}
        <p className="text-center text-sm text-gray-400 mb-6">
          {description}
        </p>

        {/* Done Button */}
        <PrimaryButton label="Done" onClick={onDone} />
      </div>
    </div>
  )
}
