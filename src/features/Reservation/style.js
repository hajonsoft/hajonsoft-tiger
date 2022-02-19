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
    color: eggplant;
`;

S.NotReady = styled(Typography)`
    padding-right: 8px;
    color: navy;
`;

S.SwitchText = styled.div``;
S.SwitchControl = styled(Link)`
    text-transform: none;
    pointer: grab;
`;

S.CaravanName = styled(Typography)`
    width: 100%;
    display: block;

`;

S.Language = styled.div`
    display: flex;
    justify-content: flex-end;
    flex:1;
    padding-right: 4rem;
`;

S.ReservationForm = styled.div`
    padding: 1rem 6rem 12rem;
    background-color: #EBFFFD;
    border-radius: 32px;
    margin: 1rem 2rem;
`;


export default S;