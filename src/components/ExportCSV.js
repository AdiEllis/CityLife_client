import React from "react";

const ExportCSV = (props) => {
    const handleClick = () => {
        props.onExport();
    };
    return (
        <div>
            <button className="btn btn-success" onClick={ handleClick }>Click me to export CSV</button>
        </div>
    );
};

export default ExportCSV