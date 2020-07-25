import React from "react";
import Table from "react-bootstrap/Table";
import CheckBox from "react-bootstrap/FormCheckInput";

class TaxTable extends React.Component {
  state = {
    taxes: [],
  };

  refreshTaxes = (taxes) => this.setState({ taxes: taxes });

  render() {
    const renderTax = (taxline, index) => {
      return (
        <tr key={index} style={{ padding: "1px" }}>
          <td>
            <CheckBox></CheckBox>
          </td>
          <td>{taxline.income}</td>
          <td>{taxline.tax}</td>
          <td>{taxline.medicare_levy}</td>
          <td>{taxline.low_income_tax_oofset}</td>
          <td>{taxline.low_mid_income_tax_offset}</td>
          <td>{taxline.monthly_pay}</td>
          <td>{taxline.weekly_pay}</td>
        </tr>
      );
    };

    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Income</th>
              <th>Tax</th>
              <th>Medicare levy</th>
              <th>Low Income Tax Offset</th>
              <th>Low Mid Income Tax Offset</th>
              <th>Monthly pay</th>
              <th>Weekly pay</th>
            </tr>
          </thead>
          <tbody>{this.state.taxes.map(renderTax)}</tbody>
        </Table>
      </div>
    );
  }
}

export default TaxTable;
