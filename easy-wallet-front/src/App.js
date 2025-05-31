<<<<<<< HEAD
import React from 'react';
import Button from './components/primary_button.jsx'; // adjust path if different
import ButtonF from './components/function_button.jsx'; // adjust path if different
import { ReactComponent as ReciveIcon } from './assets/recive.svg';

function App() {
	return (
		<div className='bg-blackBG min-h-screen flex justify-center items-center'>
			<CircularIconContainer />
			<Button label="Connect Wallet" />
			<ButtonF icon={ReciveIcon}/>

		</div>
	)
}

export default App
