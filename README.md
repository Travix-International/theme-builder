# Theme builder
[![Build Status](https://img.shields.io/travis/Travix-International/theme-builder/master.svg)](http://travis-ci.org/Travix-International/theme-builder) [![npm](https://img.shields.io/npm/v/theme-builder.svg)](https://www.npmjs.com/package/theme-builder) [![Coverage](https://img.shields.io/coveralls/Travix-International/theme-builder.svg)](https://coveralls.io/github/Travix-International/theme-builder)

Build theme's variables form YAML to consumable format (like JS or SCSS)

## Installing
`npm install theme-builder`

## How to use

```js
const themeBuilder = require('theme-builder');
const themeYaml = fs.readFileSync(pathToYamlFile);
const themeScss = themeBuilder(themeYaml, 'scss');
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
const themeYaml = fs.readFileSync('index.yaml');
themeBuilder(themeYaml, 'scss', {prefix: 'ui'});
```

and as result you will get string with 2 variables:

```scss
$ui-generic-color-accent: #1fcff6;
$ui-button-color-bg: #1fcff6;
```

You can save the output to `.scss` file and use while writing your styles.
