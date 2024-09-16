import React, { ReactNode, useState } from "react";
import FCASwitchCalendar, {
  CalendarTranslationKeywords,
} from "../src/components/SwitchCalendar/SwitchCalendar";
import FACButton from "../src/components/Button/Button";
import FACInput from "../src/components/Input/Input";
import { CalendarDateTemplateEvent } from "primereact/calendar";

function App() {
  const [newDate, setNewDate] = useState<Date>();
  const dateTemplate = (date: CalendarDateTemplateEvent): ReactNode => (
    <div>Date template: {date.day}</div>
  );

  console.log("New date is: ", newDate);

  const calendarTranslationKeywords: CalendarTranslationKeywords = {
    actionsCalendarView: "calendar view",
    actionsWeekView: "week view",
    tooltipPreviousWeek: "prev week",
    tooltipNextWeek: " next week",
    calendarPlaceholder: "placeholder",
    errorFillOutField: "mandatory field",
  };

  return (
    <div>
      <div className="container">
        <h1 style={{ margin: "0 0 3rem" }}>Field App Components Playground</h1>
        {/*<FACButton label="Click Me" onClick={() => alert("Button Clicked!")} />*/}
        {/*<FACInput label="test input" type="password" />*/}
        <FCASwitchCalendar
          id={"inputFieldTypeProperty"}
          labelText={"Delivery Date"}
          value={newDate}
          isMandatory
          icon={() => <span>icon</span>}
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
      </div>
    </div>
  );
}

export default App;
