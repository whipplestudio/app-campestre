// Mock for react-native-worklets on web platform
module.exports = {
  createWorklet: () => () => {},
  runOnJS: (fn) => fn,
  runOnUI: (fn) => fn,
  makeShareable: (value) => value,
  makeShareableClone: (value) => value,
  createContext: () => ({}),
  useSharedValue: (initial) => ({ value: initial }),
  useDerivedValue: (fn) => ({ value: fn() }),
  useWorkletCallback: (fn) => fn,
  WorkletsError: class WorkletsError extends Error {},
  createSerializable: (value) => value,
  createSynchronizable: (value) => value,
  getWorkletDependencies: () => [],
  isWorklet: () => false,
  isWorkletFunction: () => false,
};
