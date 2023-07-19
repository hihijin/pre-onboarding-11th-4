import '../Global.css';

import React, { useEffect } from 'react';

import { AiOutlineSearch } from 'react-icons/ai';
import styled from 'styled-components';

import useKeyDown from '../hooks/useKeyDown';

const Ul = styled.ul`
	z-index: 300;
	width: 100%;
	div {
		color: rgba(0, 0, 0, 0.5);
		margin-left: 15px;
		font-size: 12px;
	}
`;

const Li = styled.li`
	width: inherit;
	padding: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 300;

	> button {
		width: 100%;
		display: flex;
		&:hover {
			color: #0db4f3;
		}

		> p {
			height: 18px;
			font-size: 13px;
			margin-left: 15px;
			display: flex;
		}
	}
`;

const Container = styled.div`
	background: white;
	border-radius: 20px;
	position: absolute;
	top: 70px;
	padding: 15px 10px;
	z-index: 300;
	width: 100%;
	left: 0px;
	overflow: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`;

type Iprops = {
	searchResult: string[];
	setSearchResult: React.Dispatch<React.SetStateAction<string[]>>;
	setValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function SearchContainer({
	searchResult,
	setSearchResult,
	setValue,
}: Iprops) {
	const keywordSelected = (selectedOption: string) => {
		setValue(selectedOption);
		setSearchResult([]);
		window.location.assign(
			`https://clinicaltrialskorea.com/studies?conditions=${selectedOption}`,
		);
	};

	const { searchIndex, changeValue } = useKeyDown(searchResult);
	useEffect(() => {
		if (changeValue !== null) {
			setValue(changeValue);
		}
	}, [changeValue, setValue]);

	return (
		<Container>
			<Ul>
				<div>추천 검색어</div>
				{searchResult.length > 0 ? (
					searchResult.map((result: string, idx: number) => (
						<Li
							key={result}
							style={{
								borderRadius: '10px',
								background: searchIndex === idx ? '#d0e8fd' : '',
							}}
						>
							<AiOutlineSearch size="20px" color="rgba(0, 0, 0, 0.8)" />
							<button onClick={() => keywordSelected(result)}>
								<p>{result}</p>
							</button>
						</Li>
					))
				) : (
					<Li>검색어 없음</Li>
				)}
			</Ul>
		</Container>
	);
}
