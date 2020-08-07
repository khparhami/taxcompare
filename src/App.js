import React from "react";
import "bootstrap-css-only";
import calculate from "./tax";
import "./App.css";
import TaxTable from "./TaxTable";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.incomeInputRef = React.createRef();
    this.taxTableRef = React.createRef();
    this.financialYearRef = React.createRef();
    this.taxes = [];
  }

  state = {
    errorMessage: "",
  };

  onChangeIncomeValidator = (e) => {
    let income = e.target.value;

    if (!Number(income)) {
      return;
    }
  };

  handleValidation = () => {
    const income_value = this.incomeInputRef.current.value;
    const selected_financial_year = this.financialYearRef.current.value;

    if (income_value === "") {
      this.setState({ errorMessage: "Please enter your income" });
      return false;
    }

    if (!Number(income_value) || income_value <= 0) {
      this.setState({ errorMessage: "Income must be a positive number" });
      return false;
    }
    const row_already_added = this.taxes.filter(
      (tax) =>
        tax.income.toString() === income_value &&
        tax.financial_year.toString() === selected_financial_year
    );

    if (row_already_added.length > 0) {
      this.setState({ errorMessage: "Income already added" });
      return false;
    }

    if (this.taxes.length > 10) {
      this.setState({
        errorMessage: "Opps sorry, you reached the maximum number of rows!s",
      });
      return false;
    }

    this.setState({ errorMessage: "" });
    return true;
  };

  handleClick = () => {
    if (!this.handleValidation()) {
      return;
    }
    let taxLine = calculate(this.incomeInputRef.current.value);
    taxLine.id = this.taxes.length + 1;
    taxLine.financial_year = this.financialYearRef.current.value;
    this.taxes.push(taxLine);
    this.taxTableRef.current.refreshTaxes(this.taxes);
  };

  render() {
    return (
      <div className="App">
        <div
          style={{
            width: "50%",
            display: "block",
            margin: "auto",
            textAlign: "center",
          }}
        >
          <div>
            <label htmlFor="income">Income</label>
            <input
              ref={this.incomeInputRef}
              autoComplete="off"
              className={"form-control"}
              name="income"
            />
          </div>

          <div
            style={{
              paddingTop: "10px",
            }}
          >
            <label htmlFor="financial_year">Financial year</label>
            <select
              name="financial_year"
              className={"form-control"}
              ref={this.financialYearRef}
            >
              <option>2019-2020</option>
            </select>
          </div>
          <div
            className={
              this.state.errorMessage !== ""
                ? "alert alert-danger"
                : "alert alert-light"
            }
          >
            {this.state.errorMessage}
          </div>
          <div className="col-lg-12  padd-top">
            <button className="btn btn-success" onClick={this.handleClick}>
              Add to compare
            </button>
          </div>
        </div>
        <div>
          <TaxTable ref={this.taxTableRef} taxes={this.taxes} />
        </div>
      </div>
    );
  }
}

export default App;
