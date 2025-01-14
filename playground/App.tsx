import moment from "moment";
import React, { ChangeEvent, ReactNode, useState } from "react";
import { PrimeIcons } from "primereact/api";
import { CalendarDateTemplateEvent } from "primereact/calendar";
import FACSelect, { OptionsModel } from "@/components/Select/Select";
import FACSelectWithAdd from "@/components/Select/SelectWithAdd";
import FACSwitchCalendar, {
  CalendarTranslationKeywords,
} from "@/components/SwitchCalendar/SwitchCalendar";
import FACInputNumber from "@/components/Input/InputNumber";
import FACButtonLight from "@/components/Button/ButtonLight";
import FACButtonDark from "@/components/Button/ButtonDark";
import FACModule from "@/components/Module/Module";
import "./styles/main.scss";
import FACInputText from "@/components/Input/InputText";
import FACInputUpload from "@/components/Input/InputUpload";
import { InputNumberChangeEvent } from "primereact/inputnumber";
import FACInputSwitch from "@/components/Input/InputSwitch";
import { ColumnModel } from "@/components/Datatable/Datatable";
import { MaterialDatatableModel } from "@/components/Datatable/MaterialDatatable";
import FACDatatable from "@/components/Datatable/Datatable";
import FACAccordion from "@/components/Accordion/Accordion";
import FACTime from "@/components/Time/Time";
import FACCalendar from "@/components/Calendar/Calendar";
import { FACButtonIcon } from "../src";

const calendarTranslationKeywords: CalendarTranslationKeywords = {
  actionsCalendarView: "calendar view",
  actionsWeekView: "week view",
  tooltipPreviousWeek: "prev week",
  tooltipNextWeek: " next week",
  calendarPlaceholder: "placeholder",
};

const countries: OptionsModel[] = [
  { name: "Australia", code: "AU" },
  { name: "Brazil", code: "BR" },
  { name: "China", code: "CN" },
  { name: "Egypt", code: "EG" },
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "India", code: "IN" },
  { name: "Japan", code: "JP" },
  { name: "Spain", code: "ES" },
  { name: "United States", code: "US" },
];

const inputSwitchOptions: OptionsModel[] = [
  { name: "Delivery", code: "delivery" },
  { name: "Takeaway", code: "takeaway" },
];

const dataTableItems: MaterialDatatableModel[] = [
  {
    id: "1000",
    materialCategory: "Concrete",
    materialIDSupplier: "A555",
    materialNameSupplier: "C12/15",
    deliveredQuantity: 10,
    unitOfMeasure: "m3/h",
  },
];

const columns: ColumnModel[] = [
  { field: "materialCategory", header: "Material Category" },
  { field: "materialIDSupplier", header: "Material ID Supplier" },
  { field: "materialNameSupplier", header: "Material Name Supplier" },
  { field: "deliveredQuantity", header: "Delivered Quantity" },
  { field: "unitOfMeasure", header: "UoM" },
];

const App = () => {
  const [newDate, setNewDate] = useState<string>("");
  const [newDateTwo, setNewDateTwo] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<OptionsModel | null>(
    null,
  );
  const [numberValue, setNumberValue] = useState<number>();
  const [textValue, setTextValue] = useState<string>("");
  const [isModuleShown, setIsModuleShown] = useState(false);
  const [updatedCountries, setUpdatedCountries] =
    useState<OptionsModel[]>(countries);
  const [fileUploaded, setFileUploaded] = useState<File | null | undefined>(
    null,
  );
  const [inputSwitch, setInputSwitch] = useState<OptionsModel>(
    inputSwitchOptions[0],
  );

  const dateTemplate = (date: CalendarDateTemplateEvent): ReactNode => date.day;
  const minimumDate = moment().subtract(360, "days");
  // const maximumDate = moment().add(360, "days");
  const currentDate = moment();

  return (
    <div className="container pt-2 pb-2">
      <h1 style={{ margin: "0 0 3rem" }}>Field App Components Playground</h1>
      <FACSwitchCalendar
        labelText={"Delivery Date"}
        value={newDate}
        isMandatory
        minDate={minimumDate.toISOString()}
        maxDate={currentDate.toISOString()}
        // minDate={currentDate.toISOString()}
        // maxDate={maximumDate.toISOString()}
        onDateClick={(date) => setNewDate(date)}
        dateTemplate={dateTemplate}
        language="en"
        translationKeywords={calendarTranslationKeywords}
        direction="backward"
      />
      <div className="mt-2"></div>
      <FACCalendar
        value={newDate}
        labelText="Calendar"
        onDateClick={(date) => setNewDate(date)}
        minDate={minimumDate.toDate()}
        maxDate={currentDate.toDate()}
        language="en"
        required
        // error={"test"}
        // touched={true}
      />
      <div className="mt-2"></div>
      <FACTime
        key="testOne"
        value={newDateTwo}
        labelText="Time"
        onDateClick={(date) => setNewDateTwo(date)}
        date={newDate}
        // required
        // error={"test"}
        // touched={true}
      />
      <div className="mb-2"></div>
      <FACSelect
        value={selectedCountry}
        options={countries}
        optionLabel="name"
        setValue={(e) => setSelectedCountry(e.value)}
        icon={<i className={PrimeIcons.CLOCK}></i>}
        selectLabel="test"
      />
      <div className="mb-2"></div>
      <FACSelect
        value={selectedCountry}
        options={countries}
        optionLabel="name"
        setValue={(e) => setSelectedCountry(e.value)}
        filter
        selectLabel="test 2"
      />
      <div className="mb-2"></div>
      <FACSelect
        value={selectedCountry}
        options={countries}
        optionLabel="name"
        setValue={(e) => setSelectedCountry(e.value)}
        itemTemplate={(option: OptionsModel) => (
          <div>{option?.name} - Edited item</div>
        )}
        valueTemplate={(option: OptionsModel, props) =>
          option ? <div>{option?.name} - Edited item</div> : props.placeholder
        }
      />
      <div className="mb-2"></div>
      <FACSelectWithAdd
        value={selectedCountry}
        options={updatedCountries}
        updatedOptions={(country: OptionsModel) =>
          setUpdatedCountries([country, ...updatedCountries])
        }
        optionLabel="name"
        setValue={(e) => setSelectedCountry(e.value)}
        modalHeader={"Header 1"}
        filter
        selectWithAddLabel="test two"
      />
      <div className="mb-2"></div>
      <FACInputNumber
        inputLabel="test Label"
        inputPlaceholder="Test placeholder"
        value={numberValue}
        onChange={(e: InputNumberChangeEvent) => setNumberValue(e.value ?? 0)}
        useGrouping={false}
        showButtons
      />
      <div className="mb-2"></div>
      <FACInputNumber
        inputLabel="test Label"
        inputPlaceholder="Test placeholder"
        value={numberValue}
        onChange={(e: InputNumberChangeEvent) => setNumberValue(e.value ?? 0)}
        inputIcon={<i className={PrimeIcons.PENCIL}></i>}
        allowClear
      />
      <div className="mb-2"></div>
      <FACInputText
        inputLabel="test Label"
        inputPlaceholder="Test placeholder"
        value={textValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTextValue(e.target.value ?? "")
        }
        allowClear
        // error={"test"}
        // touched={true}
      />
      <div className="mb-2"></div>
      <FACInputText
        inputLabel="test Label"
        inputPlaceholder="Test placeholder"
        value={textValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTextValue(e.target.value ?? "")
        }
        inputIcon={<i className={PrimeIcons.PENCIL}></i>}
      />
      <div className="mb-2"></div>
      <FACInputUpload onFileSelect={setFileUploaded} inputLabel="Upload" />
      <div className="mb-2"></div>
      <FACInputSwitch
        inputOptions={inputSwitchOptions}
        onChange={(e) => setInputSwitch(e.value)}
        inputValue={inputSwitch}
      />
      <div className="mb-2"></div>
      <FACDatatable<MaterialDatatableModel>
        datatableOptions={dataTableItems}
        datatableColumns={columns}
        frozenHeader={true}
      />
      <div className="mb-2"></div>
      <FACButtonLight
        onClick={() => console.log("button 1")}
        buttonLabel="Click 1"
      />
      <div className="mb-2"></div>
      <FACButtonLight
        onClick={() => console.log("button 2")}
        buttonLabel="Click 1"
        icon={<i className={PrimeIcons.BELL}></i>}
      />
      <div className="mb-2"></div>
      <FACButtonDark
        onClick={() => console.log("button 1")}
        buttonLabel="Click 1"
      />
      <div className="mb-2"></div>
      <FACButtonDark
        onClick={() => console.log("button 2")}
        buttonLabel="Click 1"
        icon={<i className={PrimeIcons.BELL}></i>}
      />
      <div className="mb-2"></div>
      <FACButtonLight
        onClick={() => setIsModuleShown(true)}
        buttonLabel="Click to open module"
      />
      <div className="mb-2"></div>
      <FACButtonIcon icon={<i className={PrimeIcons.SEARCH_PLUS}></i>} />
      <FACButtonIcon
        icon={<i className={PrimeIcons.SEARCH_PLUS}></i>}
        color="red"
      />
      <FACButtonIcon
        icon={<i className={PrimeIcons.SEARCH_PLUS}></i>}
        color="blue"
      />
      <div className="mb-2"></div>
      <FACModule
        visible={isModuleShown}
        onHide={() => setIsModuleShown(false)}
        moduleContent={<div>content</div>}
      />
      <div className="mt-2"></div>
      <FACAccordion
        header="Header"
        required
        error="Error Validation"
        touched={true}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </FACAccordion>
      <div className="mt-2"></div>
      <FACAccordion header="Header 2">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </FACAccordion>
    </div>
  );
};

export default App;
