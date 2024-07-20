import React from "react";
import InputField from "../inputs/InputField";

export default function MarksTable({
  styles,
  headers,
  data,
  setData,
  dataAttributes,
  totalMarks
}) {
  return (
    <table className={"table " + styles}>
      <thead>
        <tr>
          {headers?.map((header, index) => {
            return <th key={index}>{header}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data?.length ? (
          data.map((item, index) => {
            return (
              <tr key={index}>
                {dataAttributes.map((attribute, index) => {
                  return (
                    <td key={index}>
                      {attribute === "obtainedMarks"
                        ? <InputField 
                            type={"number"}
                            value={item[attribute]}
                            onChange={(event) => {
                                setData((prevData) => {
                                  const updatedData = prevData.map((x) => {
                                    if (x.studentId === item.studentId) {
                                      return { ...x, obtainedMarks: event.target.value };
                                    }
                                    return x;
                                  });
                                  return updatedData;
                                });
                              }}
                            required={true}
                            max={totalMarks}
                        />
                        : item[attribute]}
                    </td>
                  );
                })}
              </tr>
            );
          })
        ) : (
          <tr>
            <td className="text-center" colSpan={headers?.length}>
              No record found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
