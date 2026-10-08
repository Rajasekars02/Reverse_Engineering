import React from 'react';

export interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  width?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  emptyMessage?: string;
}

export function Table<T extends { id?: string | number }>({
  columns,
  data,
  emptyMessage = 'No data found.',
}: TableProps<T>) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '13px',
          tableLayout: 'fixed',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            {columns.map((col, i) => (
              <th
                key={i}
                style={{
                  padding: '8px 10px',
                  textAlign: 'left',
                  fontWeight: 700,
                  borderBottom: '2px solid #ddd',
                  color: '#333',
                  whiteSpace: 'nowrap',
                  width: col.width,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{ textAlign: 'center', padding: '20px', color: '#888' }}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, ri) => (
              <tr
                key={row.id ?? ri}
                style={{ borderBottom: '1px solid #eee', backgroundColor: ri % 2 === 0 ? '#fff' : '#fafafa' }}
              >
                {columns.map((col, ci) => (
                  <td
                    key={ci}
                    style={{
                      padding: '8px 10px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {typeof col.accessor === 'function'
                      ? col.accessor(row)
                      : (row[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
