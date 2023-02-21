import React from 'react';
import Form from './components/Form';
import Header from './components/Header';

const App = () => {
	return (
		<div className='max-w-screen-sm p-4 mx-auto my-4 bg-gray-100 rounded-lg shadow-lg sm:p-8 lg:p-12'>
			<Header />
			<Form />
		</div>
	);
};

export default App;

//todo: add a reset button to clear the form
//todo: add a button to copy the monthly payment to the clipboard
//todo: add required to the inputs
//todo: validate the inputs to make sure they are +ve numbers
//todo: add logic so results are only shown when all inputs are valid and NaN is not shown
