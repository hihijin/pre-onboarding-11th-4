import { useEffect, useState } from 'react';

const useKeyDown = (searchResult: string[]) => {
	const [searchIndex, setSearchIndex] = useState<number>(-1);
	const [changeValue, setChangeValue] = useState<string>('');

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowUp') {
				setSearchIndex((prev) => Math.max(prev - 1, -1));
			} else if (e.key === 'ArrowDown') {
				setSearchIndex((prev) => Math.min(prev + 1, searchResult.length - 1));
			} else if (e.key === 'Enter') {
				setChangeValue(searchResult[searchIndex]);
				e.preventDefault();
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [searchIndex, searchResult]);

	return { searchIndex, changeValue };
};

export default useKeyDown;
