import moment from "moment";
import React from "react";

export default function OneOnOneDynamicTable({ data, styles }) {
  return (
    <table className={"table text-center table-bordered"}>
      {data?.length ? (
        data.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <thead>
                <tr>
                  <th className={styles}>{item.title}</th>
                  <td>{item.title === "Joining Date" ? moment(item.value).format("LL") : item.value}</td>
                </tr>
              </thead>
            </React.Fragment>
          );
        })
      ) : (
        <span>No record found.</span>
      )}
    </table>
  );
}
