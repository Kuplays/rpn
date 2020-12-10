import React from 'react';

class TestComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            hasLoaded: false,
            content: null
        };
    }

    componentDidMount() {
        let val = encodeURIComponent('((5+1*3)*(2+7/3))/2');
        console.log("ENCODED AS: " + val);
        fetch("http://localhost:8080/api?infixNotation=" + val)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    hasLoaded: true,
                    content: result
                });
            },
            (error) => {
                this.setState({
                    hasLoaded: true,
                    error
                });
            }
        )
    }

    render() {
        const {error, hasLoaded, content} = this.state;
        if (error) {
            return <div>ERROR: {error.message}</div>;
        } else if (!hasLoaded) {
            return <div>LOADING...</div>;
        } else {
            return(
                <div>
                    <h1>INPUT: {content.infixNotation}</h1>
                    <h2>RPN NOTATION: {content.transformedNotation}</h2>
                    <h2>RESULT: {content.result}</h2>
                </div>
            );
        }
    }
}
export default TestComponent;