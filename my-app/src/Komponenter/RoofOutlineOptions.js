import React, { useState, useRef, useEffect } from "react";
import "../css/SetScale.css";
import { Switch } from "@navikt/ds-react";
import { Button, Table, TextField } from "@navikt/ds-react";
import { WrenchIcon, ArrowRightIcon } from "@navikt/aksel-icons";

const RoofOutlineOptions = ({
  lines,
  toggleAddingPoints,
  addPoints,
  setShowDims,
  showDims,
  undo,
  deleteLine,
  editSection,
}) => {
  return (
    <div classname="Fargeboks">
      <div className="Line">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <br></br>
          <br></br>
          <h4>
            Outline roof/PV module section <br /> Click to add points, drag to
            adjust.
          </h4>
          <div>
            <Button
              variant="primary"
              onClick={toggleAddingPoints}
              style={{
                marginRight: "1rem",
                marginBottom: "1rem",
                marginTop: "1rem",
              }}
            >
              {addPoints ? "Save section" : "New Section"}
            </Button>
          </div>
          <div>
            <Button
              variant="secondary"
              onClick={undo}
              style={{
                marginRight: "1rem",
              }}
            >
              Undo
            </Button>
            <Button variant="secondary" onClick={deleteLine}>
              Delete
            </Button>
          </div>
          <div
            className="dimension-toggle"
            onClick={() => setShowDims((prev) => !prev)}
          >
            <Switch checked={showDims}>Dimensions</Switch>
          </div>
          {lines.length > 0 && (
            <div>
              <br></br>
              <br></br>
              <Table
                style={{
                  margin: "5px",
                }}
              >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell scope="col">Section</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Height</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Edit</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {lines.map((l, i) => (
                    <Table.Row key={i}>
                      <Table.DataCell>
                        <TextField
                          label="Section name"
                          hideLabel
                          defaultValue={`Section ${i + 1}`}
                          size="xsmall"
                          htmlSize={10}
                        />
                      </Table.DataCell>
                      <Table.DataCell>
                        <TextField
                          label="Height"
                          hideLabel
                          defaultValue={` m`}
                          size="xsmall"
                          htmlSize={10}
                        />
                      </Table.DataCell>
                      <Table.DataCell>
                        <Button
                          variant="tertiary"
                          icon={<WrenchIcon aria-hidden />}
                          onClick={() => editSection(i)}
                          size="xsmall"
                        ></Button>
                      </Table.DataCell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          )}
        </div>
        <div
          style={{
            height: "40%",
          }}
        ></div>
      </div>
    </div>
  );
};

export default RoofOutlineOptions;
