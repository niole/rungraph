import * as React from "react";
import styled from 'styled-components';

const Container = styled.div`
    border-radius: 50px;
    border: 3px solid white;
    background: coral;
    padding: 50px;
    margin: 50px;
    text-align: center;
    min-width: 300px;
    display: inline-block;
`;

const Name = styled.div`
    font-size: 50px;
`;

const Points = styled.div`
    padding: 25px;
    font-size: 100px;
    font-weight: bold;
`;

const Drink = styled.button`
    cursor: pointer;
    background: coral;
    border: 1px solid white;
    color: white;
    font-size: 25px;
    max-width: 200px;
    padding: 10px 50px;
    margin: auto;
    border-radius: 5px;
    outline: 0;

    &:hover {
        box-shadow: rgba(0, 0, 0, .1) 0px 0px 1px 5px;
        background: white;
        color: coral;
        transition: .3s;
    }
`;

type Props = {
    name: string;
    points: number;
    onDrink: (name: string) => void;
};
const Person: React.FC<Props> = ({
    name,
    points,
    onDrink,
}) => (
    <Container>
        <Name>
            {name}
        </Name>
        <Points>
            {points}
        </Points>
        <Drink onClick={() => onDrink(name)}>
            Drink
        </Drink>
    </Container>
);

export default Person;
