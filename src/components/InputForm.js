import React from 'react';
import {Form, FormGroup, Label, Input, FormText, Button} from 'reactstrap';

class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ""
        };

        this.onChangeInput = this.onChangeInput.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onChangeInput = (e) => {
        this.setState(
            {inputValue: e.target.value}
        );
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        let val = encodeURIComponent(this.state.inputValue.replace(/\s/g, ""));
        console.log("ENCODED AS: " + val);
        fetch("http://localhost:8080/api?infixNotation=" + val)
        .then(res => res.json())
        .then(
            (result) => {
                console.log("PASSING TO PARENT: " + result);
                this.props.passResult(result);
                this.props.parentToggler(true);
                console.log("SUCCESS: " + result.infixNotation);
                console.log("SUCCESS: " + result.transformedNotation);
                console.log("SUCCESS: " + result.result);
            },
            (error) => {
                this.props.parentToggler(false);
                console.log("ERROR: " + error.message );
            }
        )
    }

    render() {
        return (
            <Form onSubmit={this.onSubmitForm}>
                <FormGroup>
                    <Label for="inputValue">INFIX NOTATION</Label>
                    <Input className="text-center" type="text" name="inputInfix" id="inputValue" onChange={this.onChangeInput} placeholder="(5 + 5) / 2" />
                </FormGroup>
                <Button className="col-12 btn-success">SUBMIT</Button>
            </Form>
        );
    }
}

export default InputForm;