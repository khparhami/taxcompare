import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

class TaxTable extends React.Component {
  state = {
    selected: [0],
    taxes: [],
    formattedTaxes: [],
    selected_taxes: [{}],
    diff: [],
    columns: [
      {
        dataField: "id",
        text: "",
        hidden: true,
        headerClasses: "header",
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
    ],
  };

  format = (taxdetail) => {
    return {
      income: `$${taxdetail.income}`,
      tax: `$${taxdetail.tax}`,
      medicare_levy: `$${taxdetail.medicare_levy}`,
      low_income_tax_offset: `$${taxdetail.low_income_tax_offset}`,
      low_mid_income_tax_offset: `$${taxdetail.low_mid_income_tax_offset}`,
      monthly_pay: `$${taxdetail.monthly_pay}`,
      weekly_pay: `$${taxdetail.weekly_pay}`,
    };
  };

  formatTaxes = (taxes) => {
    let forrmattedTaxes = taxes.map((t) => this.format(t));
    return forrmattedTaxes;
  };

  refreshTaxes = (taxes) =>
    this.setState({ formattedTaxes: this.formatTaxes(taxes) });

  compare = (current_row) => {
    const selected_tax_1 = current_row;
    const selected_tax_2 = this.state.selected_taxes[1];
    const difference = {
      id: 1,
      income: selected_tax_1.income - selected_tax_2.income,
      financial_year: "",
      tax: Math.round(selected_tax_1.tax - selected_tax_2.tax),
      medicare_levy: Math.round(
        selected_tax_1.medicare_levy - selected_tax_2.medicare_levy
      ),
      low_income_tax_offset: Math.round(
        selected_tax_1.low_income_tax_offset -
          selected_tax_2.low_income_tax_offset
      ),
      low_mid_income_tax_offset: Math.round(
        selected_tax_1.low_mid_income_tax_offset -
          selected_tax_2.low_mid_income_tax_offset
      ),
      monthly_pay: selected_tax_1.monthly_pay - selected_tax_2.monthly_pay,
      weekly_pay: selected_tax_1.weekly_pay - selected_tax_2.weekly_pay,
    };

    this.setState({ diff: difference });
  };

  handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      if (this.state.selected.length <= 2) {
        this.setState(() => ({
          selected: [...this.state.selected, row.id],
          selected_taxes: [...this.state.selected_taxes, row],
        }));
        // if (this.state.selected.length === 2) {
        //   this.compare(row);
        // }
      } else {
        this.setState(() => ({
          selected: this.state.selected,
        }));
      }
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
      <div style={{ width: "80%", display: "block", margin: "auto" }}>
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
