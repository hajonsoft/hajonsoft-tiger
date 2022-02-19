import {
    Link, Typography
} from '@material-ui/core';
import styled from 'styled-components';
const S = {};

S.Head = styled.div`
    display: flex;
    justify-contents: space-between;
    padding: 2rem 2rem 0rem;
    width: 100%;
`
S.Title = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 75%;
    align-items: flex-end;

`;

S.ReservationType = styled(Typography)`
    padding-right: 8px;
    color: #b30000;
`;

S.NotReady = styled(Typography)`
    padding-right: 8px;
    color: navy;
    font-style: italic;
`;

S.SwitchText = styled.div``;
S.SwitchControl = styled(Link)`
    text-transform: none;
    pointer: grab;
`;

S.CaravanName = styled(Typography)`
    width: 100%;
    display: block;
    color: $006b6b;

`;

S.Language = styled.div`
    display: flex;
    justify-content: flex-end;
    flex:1;
    padding-right: 4rem;
`;

S.ReservationForm = styled.div`
    padding: 1rem 4rem 12rem 2rem;
    background-color: #00ffff;
    border-radius: 32px;
    margin: 1rem 2rem;
    color: #006b6b;
`;


export default S;