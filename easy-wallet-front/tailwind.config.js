/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				mainGreen: '#97DC22',
				mainBlack: '#101212',
				mainWhite: '#FAFAFA',
				utilsGreen: '#52D377',
				utilsYellow: '#FA9A2A',
				utilsRed: '#EE3232',
				blackBG: '#101212',
				black1: '#1C1D21',
				black2: '#4B4B4B',
			},
			boxShadow: {
				'inner-icon': 'inset 0px 1px 0px 0px rgba(255, 255, 255, 0.15)',
			},
		},
	},
	plugins: [],
}