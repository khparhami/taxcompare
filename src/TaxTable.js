import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

class TaxTable extends React.Component {
  state = {
    selected: [0],
    formattedTaxes: [],
    columns: [
      {
        dataField: "id",
        text: "",
        hidden: false,
      },
      {
        dataField: "income",
        text: "Income",
        sort: true,
        headerStyle: { height: "20px" },
      },
      {
        dataField: "financial_year",
        text: "Financial year",
        sort: true,
      },
      {
        dataField: "tax",
        text: "Tax",
        sort: true,
      },
      {
        dataField: "medicare_levy",
        text: "Medicare levy",
        sort: true,
      },
      {
        dataField: "low_income_tax_offset",
        text: "Low Income Tax Offset",
        sort: true,
        headerStyle: { fontSize: "9px" },
      },
      {
        dataField: "low_mid_income_tax_offset",
        text: "Low Mid Income Tax Offset",
        sort: true,
        headerStyle: { fontSize: "9px" },
      },
      {
        dataField: "monthly_pay",
        text: "Monthly pay",
        sort: true,
      },
      {
        dataField: "weekly_pay",
        text: "Weekly",
        sort: true,
      },
      {
        dataField: "total_tax_percentage",
        text: "%",
        sort: true,
      },
    ],
  };

  numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  format = (taxdetail) => {
    return {
      id: taxdetail.id,
      financial_year: taxdetail.financial_year,
      income: `$${this.numberWithCommas(taxdetail.income)}`,
      tax: `$${this.numberWithCommas(taxdetail.tax)}`,
      medicare_levy: `$${this.numberWithCommas(taxdetail.medicare_levy)}`,
      low_income_tax_offset: `$${this.numberWithCommas(
        taxdetail.low_income_tax_offset
      )}`,
      low_mid_income_tax_offset: `$${this.numberWithCommas(
        taxdetail.low_mid_income_tax_offset
      )}`,
      monthly_pay: `$${this.numberWithCommas(taxdetail.monthly_pay)}`,
      weekly_pay: `$${this.numberWithCommas(taxdetail.weekly_pay)}`,
      total_tax_percentage: `$${this.numberWithCommas(
        taxdetail.total_tax_percentage
      )}`,
    };
  };

  resetLineIds = (lines) => {
    var counter = 1;
    lines.forEach((line) => {
      line.id = counter++;
    });
    return lines;
  };
  formatTaxes = (taxes) => {
    let forrmattedTaxes = taxes.map((t) => this.format(t));
    return forrmattedTaxes;
  };

  refreshTaxes = (taxes) =>
    this.setState({ formattedTaxes: this.formatTaxes(taxes) });

  removeSelected = (taxes) => {
    var formettedTaxes = this.state.formattedTaxes.filter(
      (t) => !this.state.selected.includes(t.id)
    );
    var filteredTaxes = taxes.filter(
      (t) => !this.state.selected.includes(t.id)
    );
    this.setState({
      formattedTaxes: this.resetLineIds(formettedTaxes),
      selected: [0],
    });
    return this.resetLineIds(filteredTaxes);
  };

  handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      this.setState(() => ({
        selected: [...this.state.selected, row.id],
      }));
    } else {
      this.setState(() => ({
        selected: this.state.selected.filter((x) => x !== row.id),
      }));
    }
  };

  render() {
    const selectRow = {
      mode: "checkbox",
      clickToSelect: true,
      selected: this.state.selected,
      onSelect: this.handleOnSelect,
      hideSelectAll: true,
    };
    return (
      <div
        style={{
          width: "80%",
          display: "block",
          margin: "auto",
          paddingTop: "10px",
        }}
      >
        <BootstrapTable
          keyField="id"
          data={this.state.formattedTaxes}
          columns={this.state.columns}
          selectRow={selectRow}
        />
        {/* <BootstrapTable
          keyField="id"
          data={this.state.diff}
          columns={this.state.columns}
        /> */}
      </div>
    );
  }
}

export default TaxTable;
