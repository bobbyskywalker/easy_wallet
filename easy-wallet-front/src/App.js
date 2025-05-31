import React from 'react';
import Button from './components/primary_button.jsx'; // adjust path if different
import ButtonF from './components/function_button.jsx'; // adjust path if different
import { ReactComponent as ReciveIcon } from './assets/recive.svg';

function App() {
	return (
		<div className='flex justify-center items-center h-screen bg-gray-100'>
			<Button label="Connect Wallet" />
			<ButtonF icon={ReciveIcon}/>
		</div>
	)
}

export default App
