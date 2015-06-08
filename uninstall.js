'use strict';

var fs = require('fs')
  , path = require('path')
  , exists = fs.existsSync || path.existsSync
  , prepush = path.resolve(__dirname, '../..', '.git', 'hooks', 'pre-push');

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
