import styled from 'styled-components';

const Main = styled.div`
	h1 {
		font-weight: bold;
		text-align: center;
	}
`;
export default function Title() {
	return (
		<Main>
			<h1>
				국내 모든 임상시험 검색하고 <br />
				온라인으로 참여하기
			</h1>
		</Main>
	);
}
