# FieldApp Components

FieldApp Components is a collection of reusable, customizable React components designed to simplify the creation of form-based user interfaces. These components are ideal for quickly building robust forms and other interactive UI elements.

### Key Components:
- Buttons: Customizable button components for a variety of actions.
- Inputs: Flexible input fields with support for different types of user data.
- Select: Dropdowns for selecting from predefined options.
- Calendar: Easy-to-use date pickers and calendar UI components.
- And more...

## Installation
You can easily install the package via npm:

```shell
npm install field-app-components
```

## Using the Components
To use the components, simply import them into your project and start building:

```javascript
import { FACButton, FACInput } from 'field-app-components';
```

## Applying Styles
To ensure that the components render with the appropriate styles, you need to include the provided CSS.

### Option 1: Import in your main CSS/SCSS file
Add the following line to your main .css or .scss file, such as App.css:
```scss
@import "field-app-components/dist/style.css";
```

### Option 2: Import in your main JavaScript/TypeScript file
Alternatively, you can directly import the styles in your App.tsx or App.js file:
```javascript
import "field-app-components/dist/style.css"
```
