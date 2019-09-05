import * as React from "react";
import styled from 'styled-components';
import Person from './Person';

const Container = styled.div`
    font-family: Arial;
    color: white;
    background: coral;
    text-align: center;
    padding: 10% 10% 0% 10%;
`;

const handleDrink = (name: string) => {
    fetch('/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'name': name,
            'date': new Date().toString(),
        }),
    });
};

const msPerDay = 24 * 60 *60 * 1000;
const daysSinceDate = (date: Date): number => {
    const today = Date.now();
    return Math.floor((today - new Date(date.toString()).getTime()) / msPerDay);
};

const accumulatedPoints = (daysSinceLastDrink: number): number => {
    let daysSince = daysSinceLastDrink;
    let points = 0;
    while (daysSince > 0) {
        points += daysSince;
        daysSince --;
    }
    return points;
};

type Participant = {
    name: string;
    points: number;
};

type Props = {
    people: Participant[];
    onDrink: (name: string) => void;
};
const View: React.FC<Props> = ({
    people,
    onDrink,
}) => (
<Container>
    {people.map(p => <Person {...p} onDrink={onDrink} />)}
</Container>
);

const ViewWithState = () => {
    const [people, setPeople] = React.useState([]);
    React.useEffect(() => {
        /**
         * need to know how many days since person last drank
         */
        fetch('/data').then(x => x.json()).then(data => {
            setPeople(
                data.map((x: any) => ({
                    name: x.name,
                    points: x.pointsBeforeLastDrink + accumulatedPoints(daysSinceDate(x.dateLastDrink))
                }))
            );
        });
    }, []);

    return (
        <View onDrink={handleDrink} people={people} />
    );
};

export default ViewWithState;
