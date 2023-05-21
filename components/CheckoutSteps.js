import React from "react";
import { Typography, Stepper, Step, StepLabel } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: (
        <p style={{ fontSize: "14px" }} className="poppins">
          Shipping Details
        </p>
      ),
      icon: <LocalShippingIcon style={{ fontSize: "20px" }} />,
    },
    {
      label: (
        <p style={{ fontSize: "14px" }} className="poppins">
          Confirm Order
        </p>
      ),
      icon: <LibraryAddCheckIcon style={{ fontSize: "20px" }} />,
    },
    {
      label: (
        <p style={{ fontSize: "14px" }} className="poppins">
          Payment
        </p>
      ),
      icon: <AccountBalanceIcon style={{ fontSize: "20px" }} />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-size",
  };
  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, i) => (
          <Step
            key={i}
            active={activeStep === i ? true : false}
            completed={activeStep >= i ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= i ? "tomato" : "rgba(0,0,0,.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
