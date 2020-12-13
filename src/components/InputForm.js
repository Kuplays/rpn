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

    isInputValid = () => {
        let currentInputCheck = this.state.inputValue;
        let isValid = true;
        let validRegexp = /^[0-9\+\-\*\/\(\)]+$/;

        if (currentInputCheck === "") {
            isValid = false;
        } else if (!currentInputCheck.match(validRegexp)) {
            isValid = false;
        }

        return isValid;
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        let val = encodeURIComponent(this.state.inputValue.replace(/\s/g, ""));
        console.log("ENCODED AS: " + val);
        if (this.isInputValid())
            fetch("https://kuplays-rpn.herokuapp.com/api?infixNotation=" + val)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("PASSING TO PARENT: " + result);
                    this.props.passResult(result);
                    this.props.parentToggler(true);
                },
                (error) => {
                    this.props.parentToggler(false);
                    console.log("ERROR: " + error.message );
                }
            )
        else {
            alert("Input contains errors");
        }
    }

    render() {
        return (
            <Form onSubmit={this.onSubmitForm}>
                <FormGroup>
                    <Label for="inputValue">INFIX NOTATION</Label>
                    <Input className="text-center" type="text" name="inputInfix" id="inputValue" onChange={this.onChangeInput} placeholder="6 / 2 * (2 + 1)" />
                </FormGroup>
                <Button className="col-12 btn-success">SUBMIT</Button>
            </Form>
        );
    }
}

export default InputForm;