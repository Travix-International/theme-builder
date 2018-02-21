
## DEPRECATED - Please refer to https://github.com/Travix-International/ui/tree/master/packages/theme-builder

# Theme builder
[![npm](https://img.shields.io/npm/v/theme-builder.svg)](https://www.npmjs.com/package/theme-builder) [![Build Status](https://img.shields.io/travis/Travix-International/theme-builder/master.svg)](http://travis-ci.org/Travix-International/theme-builder) [![Coverage](https://img.shields.io/coveralls/Travix-International/theme-builder.svg)](https://coveralls.io/github/Travix-International/theme-builder) [![NSP Status](https://nodesecurity.io/orgs/travix-international-bv/projects/bb6645f3-32d3-4e4f-84b0-2b558b3e109b/badge)](https://nodesecurity.io/orgs/travix-international-bv/projects/bb6645f3-32d3-4e4f-84b0-2b558b3e109b)

Build theme's variables form YAML to consumable format (like JS or SCSS)

## Installing
`npm install theme-builder`

## How to use

```js
const themeBuilder = require('theme-builder');

const builder = themeBuilder({
  format: 'scss',
  prefix: 'tx',
});

builder.build(pathToYamlFile)
  .then(themeScss => console.log(themeScss));
```

## Current formats
- `js` - just a plain javascript object
- `scss` - SCSS variables

## How it works (example)
You have `index.yaml` and you want to convert it to SCSS:

```yaml
generic:
  color:
    accent: &accent '#1fcff6'
button:
  color:
    bg: *accent
```

So, you can call `themeBuilder` function like this:

```js
themeBuilder({ format: 'scss' })
  .build('index.yaml')
  .then(themeScss => console.log(themeScss));
```

and as result you will get string with 2 variables:

```scss
$ui-generic-color-accent: #1fcff6;
$ui-button-color-bg: #1fcff6;
```

You can save the output to `.scss` file and use while writing your styles.

## How to override default theme
You can provide array of yaml files, and themeBuilder will merge it one by one:

#### How it works (example)
You have `default.yaml` and `custom.yaml`, you want to merge it and convert it to SCSS:

`./default.yaml`
```yaml
generic:
  color:
    accent: &accent '#1fcff6'
button:
  color:
    bg: *accent
```

`./custom.yaml`
```yaml
generic:
  color:
    accent: &accent '#283A8E'
```

```js
themeBuilder()
  .build(['default.yaml', 'custom.yaml'])
  .then(themeScss => console.log(themeScss));
```
and as result you will get string with 2 variables:
```scss
$ui-generic-color-accent: #283A8E;
$ui-button-color-bg: #283A8E;
```

#### How to watch changes
```js
themeBuilder()
  .watch(['default.yaml', 'custom.yaml'], updatedTemeScss => console.log(updatedTemeScss));
```

## API (Types)

```jsx
function themeBuilder(
  // Path to main theme YAML file
  themeYaml: string,

  // Output format
  format: string,

  // Optional config
  config?: Config
): any

type Config = {
  // Processors for additional formats
  processors?: {[name: string]: Processor},

  // Output unit prefixes, eg. SCSS variables names prefixes
  prefix?: string,
}

type Processor = {
  compile(obj: object): any
}
```
