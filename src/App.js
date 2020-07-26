import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import TaxTable from "./TaxTable";
import calculate from "./tax";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.incomeInputRef = React.createRef();
    this.taxTableRef = React.createRef();
    this.taxes = [];
  }

  handleClick = () => {
    console.log("clicked");
    let taxLine = calculate(this.incomeInputRef.current.value);
    taxLine.id = this.taxes.length + 1;
    this.taxes.push(taxLine);
    this.taxTableRef.current.refreshTaxes(this.taxes);
  };

  render() {
    const taxes = [];
    console.log("rendered");
    return (
      <div className="App">
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Income $</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl ref={this.incomeInputRef} type="text" />
          <InputGroup.Append>
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>{" "}
        <Button onClick={this.handleClick} variant="secondary">
          Add
        </Button>{" "}
        <TaxTable ref={this.taxTableRef} taxes={taxes} />
      </div>
    );
  }
}

export default App;
