import React, { ReactNode, useState } from "react";
import { PrimeIcons } from "primereact/api";
import { InputTextProps } from "primereact/inputtext";
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

const calendarTranslationKeywords: CalendarTranslationKeywords = {
  actionsCalendarView: "calendar view",
  actionsWeekView: "week view",
  tooltipPreviousWeek: "prev week",
  tooltipNextWeek: " next week",
  calendarPlaceholder: "placeholder",
  errorFillOutField: "mandatory field",
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

const App = () => {
  const [newDate, setNewDate] = useState<Date>();
  const [selectedCountry, setSelectedCountry] = useState<OptionsModel | null>(
    null
  );
  const [numberValue, setNumberValue] = useState<string | null | undefined>(
    "50"
  );
  const [isModuleShown, setIsModuleShown] = useState(false);
  const [updatedCountries, setUpdatedCountries] =
    useState<OptionsModel[]>(countries);

  const dateTemplate = (date: CalendarDateTemplateEvent): ReactNode => date.day;

  return (
    <div className="container">
      <div className="mb-2"></div>
      <h1 style={{ margin: "0 0 3rem" }}>Field App Components Playground</h1>
      {/*<FACButton label="Click Me" onClick={() => alert("Button Clicked!")} />*/}
      {/*<FACInput label="test input" type="password" />*/}
      <FACSwitchCalendar
        id={"inputFieldTypeProperty"}
        labelText={"Delivery Date"}
        value={newDate}
        isMandatory
        icon={() => <i className={PrimeIcons.CALENDAR} />}
        minDate={new Date()}
        maxDate={new Date(new Date().setDate(new Date().getDate() + 7))}
        touchUI={false}
        onDateClick={(date) => setNewDate(date)}
        showIcon
        dateTemplate={dateTemplate}
        error={""}
        touched={false}
        isLoading={false}
        dataTest={"delivery-date-calendar"}
        isMobileView={false}
        language="en"
        translationKeywords={calendarTranslationKeywords}
      />
      <div className="mb-2"></div>
      <FACSelect
        value={selectedCountry}
        options={countries}
        optionLabel="name"
        setValue={(e) => setSelectedCountry(e.value)}
        filter
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
      />
      <div className="mb-2"></div>
      <FACInputNumber
        inputLabel="test Label"
        inputPlaceholder="Test placeholder"
        inputValue={numberValue}
        inputAction={(e: InputTextProps) => setNumberValue(e.value)}
      />
      <div className="mb-2"></div>
      <FACInputNumber
        inputLabel="test Label"
        inputPlaceholder="Test placeholder"
        inputValue={numberValue}
        inputAction={(e: InputTextProps) => setNumberValue(e.value)}
        inputIcon={<i className={PrimeIcons.PENCIL}></i>}
      />
      <div className="mb-2"></div>
      <FACButtonLight
        buttonAction={() => console.log("button 1")}
        buttonText="Click 1"
      />
      <div className="mb-2"></div>
      <FACButtonLight
        buttonAction={() => console.log("button 2")}
        buttonText="Click 1"
        buttonIcon={<i className={PrimeIcons.BELL}></i>}
      />
      <div className="mb-2"></div>
      <FACButtonDark
        buttonAction={() => console.log("button 1")}
        buttonText="Click 1"
      />
      <div className="mb-2"></div>
      <FACButtonDark
        buttonAction={() => console.log("button 2")}
        buttonText="Click 1"
        buttonIcon={<i className={PrimeIcons.BELL}></i>}
      />
      <div className="mb-2"></div>
      <FACButtonLight
        buttonAction={() => setIsModuleShown(true)}
        buttonText="Click to open module"
      />
      <FACModule
        visible={isModuleShown}
        onHide={() => setIsModuleShown(false)}
        moduleContent={<div>content</div>}
      />
    </div>
  );
};

export default App;
