import { Stepper } from "@navikt/ds-react";
import { useState, useEffect } from "react";

const StepperInd = () => {
  const [activeStep, setActiveStep] = useState(
    localStorage.getItem("activeStep") || 1
  );

  const handleStepChange = (x) => {
    setActiveStep(x);
    localStorage.setItem("activeStep", x);
  };

  useEffect(() => {
    return () => {
      localStorage.removeItem("activeStep");
    };
  }, []);

  return (
    <>
      <Stepper
        aria-labelledby="stepper-heading"
        activeStep={activeStep}
        onStepChange={handleStepChange}
        orientation="horizontal"
      >
        <Stepper.Step href="/projectinfo"></Stepper.Step>
        <Stepper.Step href="/Photoimport"></Stepper.Step>
        <Stepper.Step href="#"></Stepper.Step>
      </Stepper>
    </>
  );
};

export default StepperInd;
