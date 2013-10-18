
#!/usr/bin/env node

exports.start = function () {
    var argv = require('optimist')
        .default('environment', 'development')
        .alias('e', 'environment')
        .usage('Start up the www-node server. \nUsage: $0')
        .argv;
    var util = require('util');

    var exec = require('child_process').exec;

    var environments = {
        'dev':         'development',
        'development': 'development',
        'test':        'test',
        'staging':     'staging',
        'prod':        'production',
        'production':  'production'
    };

    var env = environments[argv.environment];

    var action = argv._;

    var currTime = new Date();

    if (env && env.length && action && action.length) {
        var command, child;

        if (action[0] === 'start') {
            command = 'NODE_ENV=' + env + ' /var/www/www-node/node_modules/.bin/forever ' + action +
                          ' -l ' + '/var/www/www-node/logs/applog/forever-' + currTime.toISOString() + '.log' +
                          ' -o ' + '/var/www/www-node/logs/syslog/forever-' + currTime.toISOString() + '.log' +
                          ' -e ' + '/var/www/www-node/logs/errlog/forever-' + currTime.toISOString() + '.log' +
                          ' /var/www/www-node/app.js';
        } else if (action[0] === 'stop') {
            command = '/var/www/www-node/node_modules/.bin/forever ' + action + ' /var/www/www-node/app.js';
        } else {
            console.log('Did not recognize action: ' + action[0]);
            return;
        }

        child = exec(command,
            function (error, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);

                if (error !== null) {
                    console.log('error: ' + error);
                }
        });

        child.on('exit', function (code, signal) {
            console.log('CHILD exited with code: ' + code);
            console.log('Exit signal: ' + signal);
        });
    }
};
