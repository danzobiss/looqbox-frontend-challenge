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
`;

export const Photos = styled.div`
display: flex;
flex-flow: row wrap;
justify-content: space-between;
max-height: 375px;
gap: 8px;

overflow-y: scroll;

& > img {
    width: 150px;
    height: 150px;
    object-fit: contain;
}

@media (max-width: 768px) {
    max-height: unset;
    overflow-y: visible;

    & > img {
        width: 128px;
    }
}
`;