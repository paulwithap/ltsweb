#!/usr/bin/env node

exports.start = function () {
    var argv = require('optimist')
        .default('environment', 'development')
        .alias('e', 'environment')
        .argv;

    var exec = require('child_process').exec;

    var environments = {
        'dev':         'development',
        'development': 'development',
        'test':        'test',
        'prod':        'production',
        'production':  'production'
    };

    var env = environments[argv.environment];

    var action = argv._;

    var child;

    if (env && env.length && action && action.length) {
        var command = 'NODE_ENV=' + environments[argv.environment] + ' /var/www/www-node/node_modules/.bin/forever ' + action + ' /var/www/www-node/app.js';
        if (environments[argv.environment]) {
            child = exec(command,
                function (error, stdout, stderr) {
                    console.log(stdout);
                    console.log(stderr);

                    if (error !== null) {
                        console.log('error: ' + error);
                    }
            });
        }
    }
};
