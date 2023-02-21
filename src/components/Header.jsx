import Box from '@mui/material/Box';
import React from 'react';

const Header = () => {
	return (
		<Box
			display='flex-column'
			justifyContent='center'
			alignItems='center'
			mt={5}
		>
			<h1 className='mb-6 text-3xl text-center'>Mortgage Calculator</h1>
			<p className='my-3 text-xl text-center'>
				Calculate your monthly mortgage payment
			</p>
		</Box>
	);
};

export default Header;
