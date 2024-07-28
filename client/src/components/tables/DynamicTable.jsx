import React from "react";
import moment from "moment";
import TableLayout from "./TableLayout";

export default function DynamicTable({
  styles,
  headers,
  data,
  dataAttributes,
}) {
  return (
    <TableLayout>
    <table className={"table table-sm " + styles}>
      <thead className="bg-light text-secondary">
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
                      {attribute === "createdAt" || attribute === "date"
                        ? moment(item[attribute]).format("LL")
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
    </TableLayout>
  );
}
