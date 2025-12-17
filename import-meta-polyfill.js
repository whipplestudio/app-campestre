// Polyfill for import.meta to prevent errors in web builds
if (typeof globalThis !== 'undefined' && !globalThis.import) {
  globalThis.import = {};
}

if (typeof globalThis !== 'undefined' && !globalThis.import?.meta) {
  globalThis.import.meta = {
    env: {
      MODE: process.env.NODE_ENV || 'production',
      DEV: process.env.NODE_ENV === 'development',
      PROD: process.env.NODE_ENV === 'production'
    }
  };
}

module.exports = {};
