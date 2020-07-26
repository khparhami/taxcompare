import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

class TaxTable extends React.Component {
  state = {
    selected: [0],
    taxes: [],
    columns: [
      {
        dataField: "id",
        text: "",
        hidden: true,
      },
      {
        dataField: "income",
        text: "Income",
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
      },
      {
        dataField: "low_mid_income_tax_offset",
        text: "Low Mid Income Tax Offset",
        sort: true,
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

  refreshTaxes = (taxes) => this.setState({ taxes: taxes });

  handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      if (this.state.selected.length <= 2) {
        this.setState(() => ({
          selected: [...this.state.selected, row.id],
        }));
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
      <div>
        <BootstrapTable
          keyField="id"
          data={this.state.taxes}
          columns={this.state.columns}
          selectRow={selectRow}
        />
      </div>
    );
  }
}

export default TaxTable;
