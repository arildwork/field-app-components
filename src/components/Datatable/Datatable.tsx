import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React from "react";
import styles from "./Datatable.module.scss";

export interface DatatableRowData<T> {
  [key: string]: T;
}

export interface ColumnModel {
  field: string;
  header: string;
}

export interface FACDatatableProps<T extends DatatableRowData<any>> {
  datatableOptions: T[];
  datatableColumns: ColumnModel[];
  frozenHeader: boolean;
}

const FACDatatable = <T extends DatatableRowData<any>>({
  datatableOptions,
  datatableColumns,
  frozenHeader,
  ...rest
}: FACDatatableProps<T>) => {
  console.log(datatableOptions);

  return (
    <div className={styles.datatable}>
      <DataTable value={datatableOptions} editMode="cell" {...rest}>
        {datatableColumns.map(({ field, header }) => (
          <Column
            key={field}
            field={field}
            header={header}
            style={{ width: "25%" }}
          />
        ))}
      </DataTable>
    </div>
  );
};

export default FACDatatable;
