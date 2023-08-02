import { Select } from "@navikt/ds-react";

const Units = () => {
  return (
    <Select label="Choose units">
      <option value="Green">Green roof Solar</option>
      <option value="Flat">Flat roof solar</option>
    </Select>
  );
};

export default Units;
