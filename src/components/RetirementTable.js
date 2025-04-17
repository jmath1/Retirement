import React, { useEffect, useRef } from "react";
import { Table } from "react-bootstrap";

function RetirementTable({ data }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Month</th>
          <th>Total Deposit</th>
          <th>Total Value (Pre-tax)</th>
          <th>Capital Gains Tax</th>
          <th>Total Value (Post-tax)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((dataRow, index) => (
          <tr key={index}>
            <td>{dataRow.month}</td>
            <td>${dataRow.totalDeposit}</td>
            <td>${dataRow.totalValuePreTax}</td>
            <td>${dataRow.capitalGainsTax}</td>
            <td>${dataRow.totalValuePostTax}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default RetirementTable;
