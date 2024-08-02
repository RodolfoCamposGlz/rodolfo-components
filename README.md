# React Select Component

The React Select Component provides a customizable and accessible way to include dropdowns in your forms, allowing users to select from different options.

## Instalation:

```
npm i rodolfo-components
```

## Basic Usage:

```
<Select
  options={[{ label: 'Apple', value: 'apple' }]}
  label="Fruits"
/>
```

## Example:

```
import React from 'react';
import Select from 'rodolfo-components';

const App = () => {
  return (
    <div>
      <h1>Fruit Selector</h1>
      <Select
        options={[{ label: 'Apple', value: 'apple' }, { label: 'Banana', value: 'banana' }]}
        label="Fruits"
      />
      <Select
        error="This field is required"
        options={[{ label: 'Apple', value: 'apple' }, { label: 'Banana', value: 'banana' }]}
        label="Fruits"
      />
    </div>
  );
};

export default App;
```

## Props:

```
  id?: (string) An optional id for the select component.
  label: (string) A string to label the select component.
  options: (DropdownItem[]) An array of option objects. Each object should have a label and a value.
  placeholder?: (string) An optional placeholder string for the select component.
  isSorted?: (boolean) An optional boolean to indicate if the options should be sorted.
  onSelect?: (function) An optional function that is called when an option is selected. The function receives the selected value.
  hasImage?: (boolean) An optional boolean to indicate if the options include images.
  defaultValue?: (string) An optional default value for the select component.
  isDisabled?: (boolean) An optional boolean to disable the select component.
  error?: (string) An optional string to display an error message below the select component.
```

This project is licensed under the MIT License.
