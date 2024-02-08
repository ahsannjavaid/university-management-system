import React from "react";
import moment from "moment";

export default function OfferCourseTable({
  styles,
  headers,
  data,
  dataAttributes,
  notOffered,
  handleAction
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
                      {attribute === "createdAt"
                        ? moment(item[attribute]).format("LL")
                        : item[attribute]}
                    </td>
                  );
                })}
                  <td>
                {notOffered?.find((course) => course._id === item._id) ? (
                    <button
                      onClick={() => handleAction(item)}
                      className="btn btn-sm btn-secondary"
                    >
                      Offer
                    </button>
                    ) : null}
                  </td>
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
