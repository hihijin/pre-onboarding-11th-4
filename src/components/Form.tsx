import '../Global.css';

import React, { useEffect, useState } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';
import styled from 'styled-components';

import useDebounce from '../hooks/useDebounce';
import useDeleteCache from '../hooks/useDeleteCache';
import useFetch from '../hooks/useFetch';
import cacheDataType from '../type/cacheDataType';
import SearchContainer from './SearchContainer';

const FormContainer = styled.form`
	border-radius: 30px;
	width: 80%;
	margin: 0 20px;
	margin-top: 50px;
	padding: 20px;
	display: flex;
	justify-content: baseline;
	align-items: center;
	position: relative;
	background: white;
	input {
		background: none;
		width: 100%;
		border: none;
		margin-left: 10px;
		outline: none;
		&::placeholder {
			color: rgba(0, 0, 0, 0.3);
			font-size: 13px;
		}
	}
	> button {
		position: absolute;
		right: 0px;
		font-weight: bold;
		font-size: 15px;
		color: white;
		background: #357ae1;
		width: 80px;
		height: 100%;
		border-top-right-radius: 30px;
		border-bottom-right-radius: 30px;
		@media (max-width: 768px) {
			font-size: 12px;
			width: 50px;
		}
		@media (max-width: 480px) {
			font-size: 11px;
		}
		@media (max-width: 380px) {
			display: none;
		}
	}
`;
export default function Form() {
	const [searchResult, setSearchResult] = useState<string[]>([]);
	const [value, setValue] = useState<string>('');
	const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
	const [cachesData, setCachesData] = useState<cacheDataType[]>([]);

	const deleteCacheResponse = useDeleteCache(cachesData);
	useEffect(() => {
		if (deleteCacheResponse !== null) {
			setCachesData(deleteCacheResponse);
		}
	}, [deleteCacheResponse]);

	const { debounceValue } = useDebounce(value);

	const fetchResponse = useFetch(debounceValue, cachesData);
	useEffect(() => {
		if (fetchResponse !== null) {
			setSearchResult(fetchResponse.searchedResult);
			setCachesData(fetchResponse.cachedData);
		}
	}, [fetchResponse]);

	const searchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
		if (e.target.value === '') setSearchResult([]);
	};

	const searchInputFocus = () => {
		setSearchResult([]);
		setIsInputFocused(true);
	};

	const searchInputBlur = () => {
		setTimeout(() => {
			setIsInputFocused(false);
			setSearchResult([]);
			setValue('');
		}, 100);
	};

	const searchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const el = e.target as HTMLFormElement;
		if (el.search.value) {
			window.location.assign(
				`https://clinicaltrialskorea.com/studies?conditions=${el.search.value}`,
			);
		}
	};

	return (
		<FormContainer onSubmit={searchSubmit}>
			<AiOutlineSearch size="20px" color="rgba(0, 0, 0, 0.8)" />
			<input
				name="search"
				type="text"
				placeholder="질환명을 입력해주세요"
				onChange={searchInputChange}
				autoComplete="off"
				value={value}
				onFocus={searchInputFocus}
				onBlur={searchInputBlur}
			/>
			<button type="submit">검색</button>
			{isInputFocused && (
				<SearchContainer
					searchResult={searchResult}
					setSearchResult={setSearchResult}
					setValue={setValue}
				/>
			)}
		</FormContainer>
	);
}
