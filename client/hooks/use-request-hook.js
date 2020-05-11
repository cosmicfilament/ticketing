import axios from 'axios';
import { useState } from 'react';

const useRequestHook = ({
	url,
	method,
	body,
	onSuccess
}) => {
	const [ errorMessages, setErrorMessages ] = useState({});

	const doRequest = async () => {
		try {
			setErrorMessages({});
			const response = await axios[method](url, body);
			if (onSuccess) {
				onSuccess(response.data);
			}
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
