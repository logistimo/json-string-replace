/*
 * json-string-replace
 * 
 *
 * Copyright (c) 2015 Charan Malemarpuram
 * Licensed under the MIT license.
 */

'use strict';
var _ = require('lodash');

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('json_string_replace', 'Replace strings in json values', function () {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            replacements: {},
            global: true
        });

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
            f.src
                .filter(function(filepath) {
                    // Warn on and remove invalid source files (if nonull was set).
                    if (!grunt.file.exists(filepath)) {
                        grunt.log.warn('Source file "' + filepath + '" not found.');
                        return false;
                    } else {
                        return true;
                    }
                })
                .map(function(filepath) {
                    return {
                        json: grunt.file.readJSON(filepath),
                        path: filepath
                    };
                })
                .map(function(file) {
                    Object.keys(file.json).forEach(function(key) {
                        if (typeof file.json[key] === "string") {
                            var newval = file.json[key];
                            Object.keys(options.replacements).forEach(function (repKey) {
                                var regex = new RegExp(repKey, options.global?'g':'');
                                newval = newval.replace(regex,options.replacements[repKey]);

                            });
                            if(newval !== file.json[key]){
                                grunt.log.writeln("-"+file.json[key]);
                                file.json[key] = newval;
                                grunt.log.writeln("+"+file.json[key]);
                            }
                        }

                    });

                    return file;
                })
                .map(function(file) {
                    grunt.file.write(file.path, JSON.stringify(file.json, null, options.indent));
                    grunt.log.success('File ' + file.path + ' updated.');
                });
        });
    });

};
