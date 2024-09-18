import { PrimeIcons } from "primereact/api";
import React, { ReactNode, useState } from "react";
import FACSelect, { OptionsModel } from "@/components/Select/Select";
import FACSwitchCalendar, {
  CalendarTranslationKeywords,
} from "../src/components/SwitchCalendar/SwitchCalendar";
import FACButton from "../src/components/Button/ButtonLight";
import FACInput from "../src/components/Input/InputNumber";
import { CalendarDateTemplateEvent } from "primereact/calendar";
import "./styles/main.scss";
import FACInputNumber from "@/components/Input/InputNumber";
import { InputTextProps } from "primereact/inputtext";
import FACButtonLight from "../src/components/Button/ButtonLight";
import FACButtonDark from "../src/components/Button/ButtonDark";
import FACModule from "../src/components/Module/Module";

function App() {
  const [newDate, setNewDate] = useState<Date>();
  const [selectedCountry, setSelectedCountry] = useState<OptionsModel | null>(
    null,
  );
  const [numberValue, setNumberValue] = useState<string | null | undefined>(
    "50",
  );
  const [isModuleShown, setIsModuleShown] = useState(false);

  const dateTemplate = (date: CalendarDateTemplateEvent): ReactNode => date.day;

  console.log("New date is: ", newDate);
  console.log("New selected field is: ", selectedCountry);

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

  const itemTemplate = (option: OptionsModel) => {
    return <div>{option.name} - Edited item</div>;
  };

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
        itemTemplate={itemTemplate}
        valueTemplate={itemTemplate}
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
        moduleIsVisible={isModuleShown}
        moduleHide={() => setIsModuleShown(false)}
        moduleContent={<div>content</div>}
      />
    </div>
  );
}

export default App;
