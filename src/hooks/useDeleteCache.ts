import { useEffect, useState } from 'react';

import cacheDataType from '../type/cacheDataType';

const useDeleteCache = (cachesData: cacheDataType[], second = 60) => {
	const [cachedData, setCachedData] = useState<cacheDataType[]>([]);
	useEffect(() => {
		const deleteExpiredCache = async () => {
			if (cachesData.length === 0) {
				return;
			}
			const currentTime = new Date().getTime();
			await Promise.all(
				cachesData.map(async (data) => {
					const timestamp = currentTime - data.timeStamp;
					const empireTime = Math.floor(timestamp / (1000 * second));
					if (empireTime >= 1) {
						try {
							const cache = await caches.open('search');
							const request = `${process.env.REACT_APP_SERVER_API}?q=${data.keyword}`;
							const isDeleted = await cache.delete(request);
							const filteredData = cachesData.filter((v) => v !== data);
							setCachedData(filteredData);
							if (isDeleted) {
								console.log('empireTime에 따라 캐시가 삭제되었습니다.');
							}
						} catch (error) {
							console.log('캐시 삭제 도중 오류가 발생했습니다.', error);
						}
					}
				}),
			);
		};

		deleteExpiredCache();
	}, [cachesData, second]);
	return cachedData;
};

export default useDeleteCache;
