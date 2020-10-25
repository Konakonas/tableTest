import React from 'react'

type Props = {
    currentPage: number;
    availablePages: number;
    onChange(pageNumber: number): void;
}

export const Pagination: React.FC<Props> = (props) => {
    return (
        <div className="pagination">
            {Array.from({length: props.availablePages}, (_, i) =>
                <span className="pagination" onClick={() => props.onChange(i)} >
                 {i + 1}
                </span>
            )}
        </div>
    )
}
