import React from "react";
import { Form, Col, Row } from "react-bootstrap";

const RetirementForm = ({
  setShowNumbers,
  startingBalance,
  yearlyDeposits,
  age,
  retirementAge,
  rateOfReturn,
  taxRate,
  maximizeContributions,
  onStartingBalanceChange,
  onYearlyDepositsChange,
  onAgeChange,
  onRetirementAgeChange,
  onRateOfReturnChange,
  onTaxRateChange,
  onMaximizeContributionsChange,
}) => {
  const renderMaximumContributions = (age) => {
    return age < 50 ? "6500" : "7500";
  };

  const formatCurrency = (value) => {
    return value.startsWith("$") ? value : "$" + value;
  };

  const handleChange = () => {
    setShowNumbers(true);
  };

  return (
    <Col>
      <Row className="mb-3">
        <Form.Label>
          Starting Balance: {formatCurrency(startingBalance)}
        </Form.Label>
        <Form.Control
          type="value"
          value={formatCurrency(startingBalance)}
          min="0"
          max="1000000"
          step="50"
          onChange={(e) => {
            onStartingBalanceChange(e);
            handleChange();
          }}
        />
      </Row>
      <Row className="mb-3">
        <Form.Label>
          Annual Contributions: {formatCurrency(yearlyDeposits)}
        </Form.Label>
        <Form.Control
          type="value"
          value={formatCurrency(yearlyDeposits)}
          min="0"
          max={renderMaximumContributions(age)}
          step="1"
          onChange={(e) => {
            onYearlyDepositsChange(e);
            handleChange();
          }}
          disabled={maximizeContributions}
          className={maximizeContributions ? "disabled-input" : ""}
        />
      </Row>
      <Row className="mb-3">
        <Form.Label>Current Age: {age}</Form.Label>
        <Form.Control
          type="number"
          value={age}
          min="18"
          max="120"
          step="1"
          onChange={(e) => {
            onAgeChange(e);
            handleChange();
          }}
        />
      </Row>
      <Row className="mb-3">
        <Form.Label>Age at Retirement: {retirementAge}</Form.Label>
        <Form.Control
          type="number"
          value={retirementAge}
          min={age}
          max="120"
          step="1"
          onChange={(e) => {
            onRetirementAgeChange(e);
            handleChange();
          }}
        />
      </Row>
      <Row className="mb-3">
        <Form.Label>Expected Rate of Return: {rateOfReturn}%</Form.Label>
        <Form.Control
          type="range"
          value={rateOfReturn}
          min="0"
          max="30"
          step="0.5"
          onChange={(e) => {
            onRateOfReturnChange(e);
            handleChange();
          }}
        />
      </Row>
      <Row className="mb-3">
        <Form.Label>Marginal Tax Rate: {taxRate}%</Form.Label>
        <Form.Control
          type="range"
          value={taxRate}
          min="0"
          max="30"
          step="0.5"
          onChange={(e) => {
            onTaxRateChange(e);
            handleChange();
          }}
        />
      </Row>
      <Row className="mb-3 align-items-center">
        <Form.Check
          type="checkbox"
          id="maximizeContributionsCheckbox"
          label="Maximize Contributions"
          checked={maximizeContributions}
          onChange={(e) => {
            onMaximizeContributionsChange(e);
            handleChange();
          }}
        />
        <div>
          <small>
            <em>
              Checking Maximize Contributions will set every contribution to the
              maximum possible value according to tax law.
              <br />
              The maximum contribution is $6,500 until age 50, $8,500 at age 50,
              and $7,500 thereafter.
            </em>
          </small>
        </div>
      </Row>
    </Col>
  );
};

export default RetirementForm;
