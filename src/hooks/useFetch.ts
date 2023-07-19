import { useEffect, useState } from 'react';

import cacheDataType from '../type/cacheDataType';
import API from '../utills/customAPI';

const useFetch = (searchValue: string, cachesData: cacheDataType[]) => {
	const [searchedResult, setSearchedResult] = useState<string[]>([]);
	const [cachedData, setCachedData] = useState<cacheDataType[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			if (searchValue === '') setSearchedResult([]);
			if (searchValue && cachesData) {
				try {
					const getCache = await caches.open('search');
					const request = `${process.env.REACT_APP_SERVER_API}?q=${searchValue}`;
					const cachedResponse = await getCache.match(request);

					if (cachedResponse) {
						const data = await cachedResponse.json();
						setSearchedResult(data.data);
					} else {
						const response = await API.get(`?q=${searchValue}`);
						const filteredData = response.data.map(
							(v: { sickNm: string }) => v.sickNm,
						);
						setSearchedResult(filteredData);

						const empireTime = new Date().getTime();
						const cacheStorage = {
							keyword: searchValue,
							data: filteredData,
							timeStamp: empireTime,
						};

						setCachedData([...cachesData, cacheStorage]);

						const cacheData = {
							data: filteredData,
							timestamp: empireTime,
						};

						const postCache = await caches.open('search');
						const res = new Response(JSON.stringify(cacheData));
						await postCache.put(request, res);

						console.info('calling api');
					}
				} catch (error) {
					console.error(error);
				}
			}
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	return { searchedResult, cachedData };
};

export default useFetch;
