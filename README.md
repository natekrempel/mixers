# Mixers

A set of simple re-usable SASS mixins and functions for any project.

## Global Installation

    $ npm install -g mixers

## Local Installation

    $ npm install mixers --save-dev

  Add script to package.json

  ```json
  "scripts": {
    "mixers": "Mixers install path/to/dir"
  }
  ```


## Usage

`cd` into your project where you would like to place the stylesheets:

    $ Mixers install

#### Options

##### Custom Destination `--dest path/to/dir`
To explicitly set where to place the stylesheets use the `--dest` flag with a relative path to a directory. If the directory does not exist it will be created along with all non-existent directories in the path.

Example:

    $ Mixers install --dest location/relative/to/current/directory

## Development

TODO:
- Add command to update stylesheets


## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/mixers. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

### TODO:
  - Add `update` option
  - Add `install` option
