import { Stepper } from "@navikt/ds-react";
import { useState, useEffect } from "react";

const StepperInd = ({ currentStep }) => {
  const storedStep = localStorage.getItem("activeStep") || 1;
  const [activeStep, setActiveStep] = useState(currentStep || storedStep);

  useEffect(() => {
    if (currentStep) {
      setActiveStep(currentStep);
    }
  }, [currentStep]);

  useEffect(() => () => localStorage.removeItem("activeStep"), []);

  return (
    <div style={styles.container}>
      <Stepper
        style={styles.stepper}
        aria-labelledby="stepper-heading"
        activeStep={activeStep}
        onStepChange={(x) => {
          setActiveStep(x);
          localStorage.setItem("activeStep", x);
        }}
        orientation="horizontal"
      >
        {["/projectinfo", "/photoimport", "/results"].map((href) => (
          <Stepper.Step key={href} href={href}></Stepper.Step>
        ))}
      </Stepper>
    </div>
  );
};

const styles = {
  container: {
    position: "absolute",
    bottom: 30,
    left: "50%",
    transform: "translateX(-50%)",
    width: "50%",
  },
  stepper: {
    width: "100%",
  },
};

export default StepperInd;
