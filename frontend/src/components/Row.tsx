import React from 'react'
import { Location } from './Interfaces'

type Props = {
    location: Location;
}

export const Row: React.FC<Props> = (props) => {
    if (props.location !== undefined) {
    return (
        <tr>
            <td>{props.location["0"]}</td>
            <td>{props.location["1"]}</td>
            <td>{props.location["2"]}</td>
            <td>{props.location["3"]}</td>
        </tr>
    )
    }
    return <div></div>
}
