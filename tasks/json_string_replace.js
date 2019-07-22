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
            global: true,
            type: "json"
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
                        json: options.type === "json"?grunt.file.readJSON(filepath):null,
                        props: options.type === "props"?grunt.file.read(filepath):null,
                        path: filepath
                    };
                })
                .map(function(file) {
                    if(file.json !== null){
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
                    }else if(file.props !== null){
                        var newprops = "";
                        file.props.toString().split('\n').forEach(function (line) {
                            var index = line.indexOf("=");
                            if(index > 0) {
                                var key = line.substr(0,index);
                                var value = line.substr(index+1);
                                var newval = value;
                                Object.keys(options.replacements).forEach(function (repKey) {
                                    var regex = new RegExp(repKey, options.global ? 'g' : '');
                                    newval = newval.replace(regex, options.replacements[repKey]);
                                });
                                if (value !== newval) {
                                    grunt.log.writeln("-" + value);
                                    grunt.log.writeln("+" + newval);
                                }
                                newprops = newprops + key + "=" + newval + "\n";
                            }
                        });
                        file.props = newprops;
                    }
                    return file;
                })
                .map(function(file) {
                    grunt.file.write(file.path, file.json !== null?JSON.stringify(file.json, null, options.indent):file.props);
                    grunt.log.success('File ' + file.path + ' updated.');
                });
        });
    });

};
