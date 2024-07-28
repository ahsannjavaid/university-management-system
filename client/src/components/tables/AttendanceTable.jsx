import React from 'react';
import SelectField from '../inputs/SelectField';
import TableLayout from './TableLayout';

export default function AttendanceTable({
  styles,
  headers,
  data,
  setData,
  dataAttributes,
}) {
  return (
    <TableLayout>
      <table className={'table table-sm ' + styles}>
        <thead className='bg-light text-secondary'>
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
                        {attribute === 'status' ? (
                          <SelectField
                            options={[
                              { title: 'A', value: 'A' },
                              { title: 'P', value: 'P' },
                              { title: 'L', value: 'L' },
                              { title: 'N/A', value: 'N/A' },
                            ]}
                            value={item[attribute]}
                            onChange={(event) => {
                              setData((prevData) => {
                                const updatedData = prevData.map((x) => {
                                  if (x.studentId === item.studentId) {
                                    return { ...x, status: event.target.value };
                                  }
                                  return x;
                                });
                                return updatedData;
                              });
                            }}
                            required={true}
                          />
                        ) : (
                          item[attribute]
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td className='text-center' colSpan={headers?.length}>
                No record found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </TableLayout>
  );
}
