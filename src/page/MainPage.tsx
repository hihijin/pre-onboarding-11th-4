import '../Global.css';

import React from 'react';

import styled from 'styled-components';

import Form from '../components/Form';
import Title from '../components/Title';

const Main = styled.div`
	display: flex;
	justify-content: center;
	align-items: baseline;
	width: 100%;
`;
const Content = styled.div`
	z-index: 300;
	background-color: #d0e8fd;
	width: 800px;
	margin-top: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 10px 40px;
`;

function MainPage() {
	return (
		<Main>
			<Content>
				<Title />
				<Form />
			</Content>
		</Main>
	);
}

export default MainPage;
