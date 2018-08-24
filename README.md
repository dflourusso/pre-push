# pre-push


<p>
  <a href="https://www.npmjs.com/package/pre-push"><img src="https://img.shields.io/npm/dm/pre-push.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/pre-push"><img src="https://img.shields.io/npm/v/pre-push.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/pre-push"><img src="https://img.shields.io/npm/l/pre-push.svg" alt="License"></a>
</p>

**pre-push** is a pre-push hook installer for `git`. It will ensure that
your `npm test` (or other specified scripts) passes before you can push your
changes. This all conveniently configured in your `package.json`.

But don't worry, you can still force a push by telling `git` to skip the
`pre-push` hooks by simply pushing using `--no-verify`.

### Installation

It's advised to install the **pre-push** module as a `devDependencies` in your
`package.json` as you only need this for development purposes. To install the
module simply run:

```
npm install --save-dev pre-push
```

or 

```
yarn add -D pre-push
```

To install it as `devDependency`. When this module is installed it will override
the existing `pre-push` file in your `.git/hooks` folder. Existing
`pre-push` hooks will be backed up as `pre-push.old` in the same repository.

### Configuration

`pre-push` will try to run your `npm test` command in the root of the git
repository by default unless it's the default value that is set by the `npm
init` script.

But `pre-push` is not limited to just running your `npm test`'s during the
push hook. It's also capable of running every other script that you've
specified in your `package.json` "scripts" field. So before people push you
could ensure that:

- You have 100% coverage
- All styling passes.
- JSHint passes.
- Contribution licenses signed etc.

The only thing you need to do is add a `pre-push` array to your `package.json`
that specifies which scripts you want to have ran and in which order:

```js
{
  "name": "437464d0899504fb6b7b",
  "version": "0.0.0",
  "description": "ERROR: No README.md file found!",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: I SHOULD FAIL LOLOLOLOLOL \" && exit 1",
    "foo": "echo \"fooo\" && exit 0",
    "bar": "echo \"bar\" && exit 0"
  },
  "pre-push": [
    "foo",
    "bar",
    "test"
  ]
}
```

In the example above, it will first run: `npm run foo` then `npm run bar` and
finally `npm run test` which will make the push fail as it returns the error
code `1`.  If you prefer strings over arrays or `prepush` without a middle
dash, that also works:

```js
{
  "prepush": "foo, bar, test"
  "pre-push": "foo, bar, test"
  "pre-push": ["foo", "bar", "test"]
  "prepush": ["foo", "bar", "test"],
  "prepush": {
    "run": "foo, bar, test",
  },
  "pre-push": {
    "run": ["foo", "bar", "test"],
  },
  "prepush": {
    "run": ["foo", "bar", "test"],
  },
  "pre-push": {
    "run": "foo, bar, test",
  }
}
```

The examples above are all the same. In addition to configuring which scripts
should be ran you can also configure the following options:

- **silent** Don't output the prefixed `pre-push:` messages when things fail
  or when we have nothing to run. Should be a boolean.
- **colors** Don't output colors when we write messages. Should be a boolean.
- **template** Path to a file who's content should be used as template for the
  git push body.

These options can either be added in the `pre-push`/`prepush` object as keys
or as `"pre-push.{key}` key properties in the `package.json`:

```js
{
  "prepush.silent": true,
  "pre-push": {
    "silent": true
  }
}
```

It's all the same. Different styles so use what matches your project. To learn
more about the scripts, please read the official `npm` documentation:

https://npmjs.org/doc/scripts.html

And to learn more about git hooks read:

http://githooks.com

### License

MIT
