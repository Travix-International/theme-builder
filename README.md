# Theme builder
Build theme's variables form YAML to consumable format (like JS or SCSS)

## Installing
`npm install theme-builder`

## How to use
```
  const themeBuilder = require('theme-builder');
  const themeYaml = fs.readFileSync(pathToYamlFile);
  const themeScss = themeBuilder(themeYaml, 'scss');  
```

## Current formats
- `js` - just a plain javascript object
- `scss` - SCSS variables

## How it works (example)
You have `index.yaml` and you want to convert it to SCSS:
```
generic:
  color:
    accent: &accent '#1fcff6'
button:
  color:
    bg: *accent
```
So, you can call `themeBuilder` function like this:
```
const themeYaml = fs.readFileSync('index.yaml');
themeBuilder(themeYaml, 'scss', {prefix: 'ui'});
```
and as result you will get string with 2 variables:
```
$ui-generic-color-accent: #1fcff6;
$ui-button-color-bg: #1fcff6;
```

You can save the output to `.scss` file and use while writing your styles.
