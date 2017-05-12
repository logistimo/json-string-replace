# json-string-replace

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Replaces text in value strings of key value jsons

## Motivation

JSON based resource bundles which are typically key value pairs are heavily used with js frameworks like angularjs. We required customisations in the resource bundles such that display text can be changed by deployment. All available string replace tasks in Grunt replace the text anywhere in the file, but in this case the text should be replaced only in the values.

We would like to thank contributors of other string replace tasks in grunt, from whose work we could easily build on and develop this in quick time.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install json-string-replace --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('json-string-replace');
```

## The "json_string_replace" task

### Overview
In your project's Gruntfile, add a section named `json_string_replace` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  json_string_replace: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.replacements
Type: `Object`
Default value: `{ }`

A key-value pair object of properties to replace in JSON file(s). Replacements are case sensitive.

#### options.global
Type: `Boolean`
Default value: `true`

If true, properties of fields will be changed globally in the values.

### Usage Examples

#### Default Options
In this example, `testing.json` is Key value json object file has the value `apples` , It will be replaced with `oranges`

```js
grunt.initConfig({
  json_string_replace: {
    options: {
        replacements : {
            replacements: {"est":"ast","(\\d+)(\\d{3})":"$1,$2"},
            global: true
        }
    },
    files: {
      'dest/default_options': ['src/testing.json'],
    },
  },
})
```

####testing.json ( Before replace )
```js
{
    "key":"Testing",
    "key2":"11222333"
}
```

####testing.json ( After replace )
```js
{
    "key":"Tasting",
    "key2":"11222,333"
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_0.0.2_

## License
Copyright (c) 2015 Logistimo India Pvt Ltd. Licensed under the MIT license.
