import React from 'react';

class ResultTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="table-responsive pt-2">
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">INFIX NOTATION</th>
                            <th scope="col">RPN NOTATION</th>
                            <th scope="col">RESULT</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.newContent.map(item => (
                        <tr key={item.id}>
                        <td>{item.infixNotation}</td>
                        <td>{item.transformedNotation}</td>
                        <td>{item.result}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ResultTable;