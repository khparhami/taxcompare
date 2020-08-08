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
        errorMessage: "Opps sorry, you reached the maximum number of rows!",
      });
      return false;
    }

    this.setState({ errorMessage: "" });
    return true;
  };
  handleRemoveClick = () => {
    this.taxes = this.taxTableRef.current.removeSelected(this.taxes);
  };

  handleAddClick = () => {
    if (!this.handleValidation()) {
      return;
    }
    let taxLine = calculate(
      this.incomeInputRef.current.value,
      this.financialYearRef.current.value
    );
    taxLine.id = this.taxes.length + 1;
    taxLine.financial_year = this.financialYearRef.current.value;
    this.taxes.push(taxLine);
    this.taxTableRef.current.refreshTaxes(this.taxes);
  };

  render() {
    return (
      <div className="App">
        <div>
          <h1>Australian Tax Compare</h1>
        </div>
        <div
          id="container_top"
          style={{
            width: "20%",
            display: "block",
            margin: "auto",
            textAlign: "center",
          }}
        >
          <div></div>
          <div>
            <label htmlFor="income">Please enter your income</label>
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
            <label htmlFor="financial_year">Select a financial year</label>
            <select
              name="financial_year"
              className={"form-control"}
              ref={this.financialYearRef}
            >
              <option value="2019-2020">2019-2020</option>
              <option value="2018-2019">2018-2019</option>
              <option value="2017-2018">2017-2018</option>
              <option value="2016-2017">2016-2017</option>
              <option value="2015-2016">2015-2016</option>
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
          <button
            className="btn btn-success"
            style={{ float: "left" }}
            onClick={this.handleAddClick}
          >
            Add to compare
          </button>
          <button
            className="btn btn-success"
            style={{ float: "right" }}
            onClick={this.handleRemoveClick}
          >
            Remove
          </button>
        </div>
        <div
          id="container_table"
          style={{
            width: "80%",
            display: "block",
            margin: "auto",
            paddingTop: "60px",
          }}
        >
          <TaxTable ref={this.taxTableRef} taxes={this.taxes} />
        </div>
      </div>
    );
  }
}

export default App;
