import styled from 'styled-components';

export const Container = styled.div`
display: flex;
flex-direction: column;

width: 100%;
padding: 48px;
padding-top: 32px;
overflow-x: auto;

& > h2 {
    font-size: 32px;
    margin-bottom: 32px;
}
 
	& > ::-webkit-scrollbar {
		width: .4rem;
		border-radius: .5rem;
		background-color: #0001;
	}

	& > ::-webkit-scrollbar-thumb {
		border-radius: .5rem;
		background-color: #0003;
	}

	& > ::-webkit-scrollbar-thumb:hover {
		background-color: #0005;
	}
`;

export const Photos = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, 150px);
justify-content: space-between;
max-height: 375px;
gap: 8px;

overflow-y: auto;

& > img {
    width: 150px;
    height: 150px;
    object-fit: contain;
}

@media (max-width: 1007px) {
    justify-content: space-around;
}

@media (max-width: 768px) {
    max-height: unset;
    overflow-y: visible;

    justify-content: space-between;

    & > img {
        width: 128px;
        height: 128px;
    }
}

@media (max-width: 561px) {
    justify-content: space-around;
}
`;