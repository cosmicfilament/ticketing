import { useState } from 'react';
import useRequestHook from '../../hooks/use-request-hook';

export default () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const { doRequest, errorMessages } = useRequestHook({
		url: '/api/users/signup',
		method: 'post',
		body: { email, password }
	});

	const handleOnSubmit = async event => {
		event.preventDefault();
		doRequest();
	};

	return (
		<form className='container' onSubmit={handleOnSubmit}>
			<h1>Sign Up</h1>
			<div className='form-group'>
				<label>Email Address</label>
				<input
					className='form-control'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				{errorMessages.hasOwnProperty('email') &&
					errorMessages.email}
			</div>
			<div className='form-group'>
				<label>Password</label>
				<input
					type='password'
					className='form-control'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				{errorMessages.hasOwnProperty('password') &&
					errorMessages.password}
			</div>
			<button className='btn btn-primary'>Sign Up</button>
			{errorMessages.hasOwnProperty('_default') &&
				errorMessages._default}
		</form>
	);
};
