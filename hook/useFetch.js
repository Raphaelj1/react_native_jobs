import { useState, useEffect } from 'react';
import axios from 'axios';
import { RAPID_API_KEY, RAPID_API_URL } from '@env';

const useFetch = (endpoint, query) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const options = {
		method: 'GET',
		url: `${RAPID_API_URL}/${endpoint}`,
		headers: {
			'x-rapidapi-key': RAPID_API_KEY,
			'x-rapidapi-host': 'jsearch.p.rapidapi.com',
		},
		params: {
			...query,
		},
	};

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await axios.request(options);
			setData((await response).data.data);
			setIsLoading(false);
		} catch (error) {
			setError(error);
			// alert('There is an error');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetchData();
	}, []);

	const refetch = () => {
		setIsLoading(true);
		fetchData();
	};

	return { data, isLoading, error, refetch};
};

export default useFetch;