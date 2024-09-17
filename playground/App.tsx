import { PrimeIcons } from "primereact/api";
import React, { ReactNode, useState } from "react";
import FACSelect, { OptionsModel } from "@/components/Select/Select";
import FACSwitchCalendar, {
  CalendarTranslationKeywords,
} from "../src/components/SwitchCalendar/SwitchCalendar";
import FACButton from "../src/components/Button/Button";
import FACInput from "../src/components/Input/Input";
import { CalendarDateTemplateEvent } from "primereact/calendar";
import "./styles/main.scss";

function App() {
  const [newDate, setNewDate] = useState<Date>();
  const [selectedCountry, setSelectedCountry] = useState<OptionsModel | null>(
    null
  );
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

  return (
    <div className="container">
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
      />
    </div>
  );
}

export default App;
