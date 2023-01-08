import styled from 'styled-components';
import { Search } from '../../../../styles/Icons';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 24px;

    @media (max-width: 668px) {
        flex-direction: column;
        justify-content: center;
    }
`;

export const Logo = styled.img`
    height: 44px;
    margin-right: 32px;

    @media (max-width: 668px) {
        margin-right: 0;
        margin-bottom: 16px;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 100%;

    gap: 16px;
`;

export const Input = styled.input`
    border: 1px solid var(--stroke);
    border-radius: 8px;

    outline: none;
    height: 44px;
    width: 100%;
    max-width: 512px;
    padding: 0 16px;

    font-size: 18px;

    &::placeholder {
        text-transform: initial;
    }

    &:placeholder-shown {
        text-overflow: ellipsis;
    }
`;

export const SearchButton = styled.button`
    background-color: #BF0A0A;
    padding: 8px;

    min-height: 44px;
    min-width: 44px;

    border-radius: 8px;

    cursor: pointer;
`;

export const SearchIcon = styled(Search)`
    color: #FFFFFF;
    fill: #FFFFFF;

    width: 20px;
    height: 20px;;
`;