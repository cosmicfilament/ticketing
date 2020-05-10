import axios from 'axios';
import { useState } from 'react';

const useRequestHook = ({ url, method, body }) => {
	const [ errorMessages, setErrorMessages ] = useState({});

	const doRequest = async () => {
		try {
			setErrorMessages({});
			return await axios[method](url, body);
		} catch (error) {
			const errors = error.response.data.errors;
			let formattedErrors = {};
			errors.map(err => {
				formattedErrors[
					err.field ? err.field : '_default'
				] = (
					<div className='alert alert-danger mt-2 p-1'>
						{err.message}
					</div>
				);
			});
			setErrorMessages(formattedErrors);
		}
	};
	return { doRequest, errorMessages };
};

export default useRequestHook;
