import { useState } from 'react';
import useRequestHook from '../../hooks/use-request-hook';
import Router from 'next/router';

export default () => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const { doRequest, errorMessages } = useRequestHook({
		url: '/api/users/signin',
		method: 'post',
		body: { email, password },
		onSuccess: () => Router.push('/')
	});

	const handleOnSubmit = async event => {
		event.preventDefault();
		await doRequest();
	};

	return (
		<form className='container' onSubmit={handleOnSubmit}>
			<h1>Sign In</h1>
			<div className='form-group'>
				<label>Email Address</label>
				<input
					className='form-control'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				{errorMessages.email}
			</div>
			<div className='form-group'>
				<label>Password</label>
				<input
					type='password'
					className='form-control'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				{errorMessages.password}
			</div>
			<button className='btn btn-primary'>Sign In</button>
			{errorMessages._default}
		</form>
	);
};
