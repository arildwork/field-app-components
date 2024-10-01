import { OptionsModel } from "@/components/Select/Select";
import { Column, ColumnEditorOptions } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import React, { FC } from "react";
import FACDatatable, { ColumnModel } from "./Datatable";
import styles from "./Datatable.module.scss";

export type FACMaterialDatatableProps = {
  tableData: MaterialDatatableModel[];
  tableColumns: ColumnModel[];
};

export type MaterialDatatableModel = {
  id: string;
  materialCategory: string;
  materialIDSupplier: string;
  materialNameSupplier: string;
  deliveredQuantity: number;
  unitOfMeasure: string;
};

export enum MaterialDatatableModelEnum {
  materialCategory = "materialCategory",
  materialIDSupplier = "materialIDSupplier",
  materialNameSupplier = "materialNameSupplier",
  deliveredQuantity = "deliveredQuantity",
  unitOfMeasure = "unitOfMeasure",
}

const FACMaterialDatatable: FC<FACMaterialDatatableProps> = ({
  tableData,
  tableColumns,
}) => {
  const dropdownValues = [
    { name: "Concrete", code: "conc" },
    { name: "Pump", code: "pump" },
    { name: "Gravel", code: "gravel" },
  ];

  const inputTypeColumnRender = (field: string) => {
    switch (field) {
      case MaterialDatatableModelEnum.materialCategory:
        return selectEditor;
      case MaterialDatatableModelEnum.materialIDSupplier:
        return textEditor;
      case MaterialDatatableModelEnum.materialNameSupplier:
        return textEditor;
      case MaterialDatatableModelEnum.deliveredQuantity:
        return priceEditor;
      // case MaterialDatatableModelEnum.unitOfMeasure:
      //   return textEditor;
      default:
        return undefined;
    }
  };

  const selectEditor = (options: ColumnEditorOptions) => {
    return (
      <Dropdown
        value={options.rowData.materialCategory}
        options={dropdownValues}
        onChange={(e) => options.editorCallback?.(e.value)}
        optionLabel="name"
        optionValue="code"
        placeholder="Select a category"
        onKeyDown={(e) => e.stopPropagation()}
      />
    );
  };

  const textEditor = (options: ColumnEditorOptions) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          options.editorCallback?.(e.target.value)
        }
        onKeyDown={(e) => e.stopPropagation()}
      />
    );
  };

  const priceEditor = (options: ColumnEditorOptions) => {
    return (
      <InputNumber
        value={options.value}
        onValueChange={(e: InputNumberValueChangeEvent) =>
          options.editorCallback?.(e.value)
        }
        onKeyDown={(e) => e.stopPropagation()}
      />
    );
  };

  return (
    <div>
      {/*<FACDatatable<MaterialDatatableModel>*/}
      {/*  datatableOptions={tableData}*/}
      {/*  datatableColumns={tableColumns}*/}
      {/*  frozenHeader={true}*/}
      {/*>*/}
      {/*  {tableColumns.map(({ field, header }) => (*/}
      {/*    <Column*/}
      {/*      key={field}*/}
      {/*      field={field}*/}
      {/*      header={header}*/}
      {/*      editor={inputTypeColumnRender(field)}*/}
      {/*    />*/}
      {/*  ))}*/}
      {/*</FACDatatable>*/}
    </div>
  );
};

export default FACMaterialDatatable;
