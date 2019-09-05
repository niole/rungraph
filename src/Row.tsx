import * as React from "react";

const style = {
    display: 'flex',
    width: '100%',
    'justify-content': 'center',
};

type Props = {
    children: any;
};
const Row: React.FC<Props> = ({ children }) => (
    <div style={style}>
        {children}
    </div>
);

export default Row;
