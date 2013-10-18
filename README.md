## Requirements

    the `www-node` project should be in `/var/www/www-node`

## Installation

    git clone git@github.com:paulwithap/ltsweb.git
    cd ltsweb
    sudo npm install . -g

## Usage

    ltsweb --environment [development|test|production] [start|stop]

## Editing

If you need to make changes to the script, you'll have to uninstall with `sudo npm uninstall -g ltsweb` pull the changes, then reinstall. Yeah, I know, it's stupid.
