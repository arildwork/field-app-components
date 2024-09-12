import React from "react";
import ScrollableCalendar from "../src/components/ScrollableCalendar/ScrollableCalendar";
import FACButton from "../src/components/Button/Button";

function App() {
  return (
    <div>
      <h1>Field App Components Playground</h1>
      <FACButton label="Click Me" onClick={() => alert("Button Clicked!")} />
      <ScrollableCalendar
        id={"inputFieldTypeProperty"}
        labelText={tForms(
          `common.deliveryDateTimeSelection.${deliveryType}Date`
        )}
        value={Date()}
        isMandatory
        icon={() => <span>icon</span>}
        minDate={Date()}
        maxDate={maxCalendarDate}
        touchUI={isMobileView()}
        onChange={field.onChange}
        onBlur={field.onBlur}
        showIcon
        dateTemplate={dateTemplate}
        error={meta.error}
        touched={meta.touched}
        isLoading={props.isLoading}
        dataTest={`${props.dataTest}-delivery-date-calendar`}
      />
    </div>
  );
}

export default App;
