'use strict';

var fs = require('fs')
  , path = require('path')
  , exists = fs.existsSync || path.existsSync
  , root = path.resolve(__dirname, '..', '..')
  , git = path.resolve(root, '.git');

//
// Resolve git directory for submodules
//
if (exists(git) && fs.lstatSync(git).isFile()) {
  var gitinfo = fs.readFileSync(git).toString()
    , gitdirmatch = /gitdir: (.+)/.exec(gitinfo)
    , gitdir = gitdirmatch.length == 2 ? gitdirmatch[1] : null;

  if (gitdir !== null) {
    git = path.resolve(root, gitdir);
  }
}

//
// Location of pre-push hook, if it exists
//
var prepush = path.resolve(git, 'hooks', 'pre-push');

//
// Bail out if we don't have pre-push file, it might be removed manually.
//
if (!exists(prepush)) return;

//
// If we don't have an old file, we should just remove the pre-push hook. But
// if we do have an old prepush file we want to restore that.
//
if (!exists(prepush +'.old')) {
  fs.unlinkSync(prepush);
} else {
  fs.writeFileSync(prepush, fs.readFileSync(prepush +'.old'));
  fs.chmodSync(prepush, '755');
  fs.unlinkSync(prepush +'.old');
}
