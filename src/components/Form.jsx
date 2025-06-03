import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import React, { useState, useEffect } from 'react';

const Form = () => {
	const [homeValue, setHomeValue] = useState('');
	const [deposit, setDeposit] = useState('');
	const [loanAmount, setLoanAmount] = useState('');
	const [interestRate, setInterestRate] = useState('');
	const [loanDuration, setLoanDuration] = useState('');
       const [monthlyPayment, setMonthlyPayment] = useState(0);
       const [isHomeValueValid, setIsHomeValueValid] = useState(true);

       useEffect(() => {
               const hv = parseFloat(homeValue);
               const dp = parseFloat(deposit);
               if (!isNaN(hv) && !isNaN(dp)) {
                       setLoanAmount(hv - dp);
               } else {
                       setLoanAmount('');
               }
       }, [homeValue, deposit]);


	const handleHomeValueChange = (event) => {
		setHomeValue(event.target.value);
		setIsHomeValueValid(event.target.value !== '');
	};

	function calculateMonthlyPayment() {
		// Percentage conversion
		function percentageToDecimal(percent) {
			return percent / 12 / 100;
		}

		// years to month conversion
		function yearsToMonths(year) {
			return year * 12;
		}

		setMonthlyPayment(
			(percentageToDecimal(interestRate) * loanAmount) /
				(1 -
					Math.pow(
						1 + percentageToDecimal(interestRate),
						-yearsToMonths(loanDuration)
					))
		);

		return monthlyPayment;
	}

	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<Box
				display='flex'
				flexDirection='column'
				justifyContent='center'
				alignItems='center'
				sx={{
					'& > :not(style)': { m: 1 },
					mt: 1,
					mb: 10,
				}}
				noValidate
				autoComplete='off'
			>
				<FormControl
					sx={{ width: '100%', maxWidth: '400px', minWidth: '200px' }}
				>
					<InputLabel htmlFor='home-value' required>
						House Value
					</InputLabel>
					<OutlinedInput
						value={homeValue}
						type='number'
						label='House Value *'
						startAdornment={<InputAdornment position='start'>£</InputAdornment>}
                                               onChange={handleHomeValueChange}
                                               error={!isHomeValueValid}
					/>
					{!isHomeValueValid && (
						<FormHelperText error>This field is required.</FormHelperText>
					)}
					<FormHelperText>The approx value of the house</FormHelperText>
				</FormControl>
				<FormControl
					sx={{ width: '100%', maxWidth: '400px', minWidth: '200px' }}
				>
					<InputLabel>Deposit</InputLabel>
					<OutlinedInput
						value={deposit}
						type='number'
						label='Deposit'
						startAdornment={<InputAdornment position='start'>£</InputAdornment>}
                                               onChange={(e) => setDeposit(e.target.value)}
					/>
					<FormHelperText>The amount of deposit you have</FormHelperText>
				</FormControl>
				<FormControl
					variant='filled'
					sx={{ width: '100%', maxWidth: '400px', minWidth: '200px' }}
				>
					<InputLabel>Loan Amount</InputLabel>
					<FilledInput
						defaultValue='0'
						value={loanAmount}
						startAdornment={<InputAdornment position='start'>£</InputAdornment>}
						sx={{ color: blue[500], backgroundColor: blue[50] }}
					/>
					<FormHelperText>The Amount of Loan you Need</FormHelperText>
				</FormControl>
				<Grid container spacing={1}>
					<Grid
						item
						xs={6}
						sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
					>
						<FormControl sx={{ maxWidth: '200px', minWidth: '100px' }}>
							<InputLabel>Interest Rate (%)</InputLabel>
							<OutlinedInput
								value={interestRate}
								type='number'
								label='Interest Rate (%)'
								endAdornment={<InputAdornment position='end'>%</InputAdornment>}
								onInput={(e) => setInterestRate(e.target.value)}
								inputProps={{
									step: 0.1,
									onBlur: () =>
										setInterestRate(parseFloat(interestRate).toFixed(1)),
								}}
							/>
							<FormHelperText>The interest rate for the loan</FormHelperText>
						</FormControl>
					</Grid>
					<Grid
						item
						xs={6}
						sx={{
							display: 'flex',
							justifyContent: 'flex-start',
							width: '100%',
						}}
					>
						<FormControl sx={{ maxWidth: '200px', minWidth: '100px' }}>
							<InputLabel>Term</InputLabel>
							<OutlinedInput
								value={loanDuration}
								type='number'
								label='Term'
								endAdornment={
									<InputAdornment position='end'>Years</InputAdornment>
								}
								onInput={(e) => setLoanDuration(e.target.value)}
							/>
							<FormHelperText>The loan duration in years</FormHelperText>
						</FormControl>
					</Grid>
				</Grid>
				<h3 className='text-2xl md:text-3xl'>Your monthly payment is - </h3>
				<h4 className='w-full max-w-md py-5 mx-auto text-3xl text-center bg-green-200'>
					£{parseFloat(monthlyPayment.toFixed(2))} <br />
				</h4>
				<Button
					onClick={calculateMonthlyPayment}
					variant='contained'
					size='medium'
					sx={{ minWidth: '200px', maxWidth: '400px', my: 2 }}
				>
					Calculate
				</Button>
			</Box>
		</form>
	);
};

export default Form;
