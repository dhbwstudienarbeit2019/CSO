const requireContext = require('require-context');
const tests = requireContext('../../src', true, /\.spec\.ts$/);
// And load the modules.
tests.keys().map(tests);