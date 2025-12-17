// Mock for react-native-reanimated on web platform
const React = require('react');

const NOOP = () => {};

const mockValue = (initial) => ({ value: initial });

const mockAnimatedValue = (initial = 0) => ({
  _value: initial,
  _animation: null,
  _listeners: {},
  setValue(value) {
    this._value = value;
  },
  addListener(callback) {
    const id = String(Math.random());
    this._listeners[id] = callback;
    return id;
  },
  removeListener(id) {
    delete this._listeners[id];
  },
  removeAllListeners() {
    this._listeners = {};
  },
});

module.exports = {
  // Core
  default: {
    createAnimatedComponent: (Component) => Component,
    Value: mockAnimatedValue,
    View: require('react-native').View,
    Text: require('react-native').Text,
    Image: require('react-native').Image,
    ScrollView: require('react-native').ScrollView,
  },

  // Hooks
  useSharedValue: (initial) => mockValue(initial),
  useAnimatedStyle: (cb) => {
    try {
      return cb();
    } catch (e) {
      return {};
    }
  },
  useAnimatedProps: (cb) => {
    try {
      return cb();
    } catch (e) {
      return {};
    }
  },
  useDerivedValue: (cb) => {
    try {
      return mockValue(cb());
    } catch (e) {
      return mockValue(0);
    }
  },
  useAnimatedRef: () => React.useRef(null),
  useAnimatedReaction: NOOP,
  useAnimatedScrollHandler: () => NOOP,
  useAnimatedGestureHandler: () => NOOP,
  useWorkletCallback: (cb) => cb,
  useScrollViewOffset: () => mockValue(0),

  // Animations
  withTiming: (toValue, config, callback) => {
    callback?.(true);
    return toValue;
  },
  withSpring: (toValue, config, callback) => {
    callback?.(true);
    return toValue;
  },
  withDecay: (config, callback) => {
    callback?.(true);
    return 0;
  },
  withRepeat: (animation, numberOfReps, reverse, callback) => {
    callback?.(true);
    return animation;
  },
  withSequence: (...animations) => {
    return animations[animations.length - 1];
  },
  withDelay: (delay, animation) => animation,
  withClamp: (config, animation) => animation,
  cancelAnimation: NOOP,

  // Easing
  Easing: {
    linear: (t) => t,
    ease: (t) => t,
    quad: (t) => t * t,
    cubic: (t) => t * t * t,
    poly: (n) => (t) => Math.pow(t, n),
    sin: (t) => 1 - Math.cos((t * Math.PI) / 2),
    circle: (t) => 1 - Math.sqrt(1 - t * t),
    exp: (t) => Math.pow(2, 10 * (t - 1)),
    elastic: (bounciness = 1) => (t) => t,
    back: (s = 1.70158) => (t) => t,
    bounce: (t) => t,
    bezier: (x1, y1, x2, y2) => (t) => t,
    in: (easing) => easing,
    out: (easing) => (t) => 1 - easing(1 - t),
    inOut: (easing) => (t) => (t < 0.5 ? easing(t * 2) / 2 : (2 - easing((1 - t) * 2)) / 2),
  },

  // Worklet helpers
  runOnJS: (fn) => fn,
  runOnUI: (fn) => fn,
  createWorkletRuntime: () => ({}),
  makeShareable: (value) => value,
  isSharedValue: (value) => value && typeof value === 'object' && 'value' in value,
  
  // Layout animations
  Layout: {},
  FadeIn: {},
  FadeOut: {},
  SlideInLeft: {},
  SlideInRight: {},
  SlideInUp: {},
  SlideInDown: {},
  SlideOutLeft: {},
  SlideOutRight: {},
  SlideOutUp: {},
  SlideOutDown: {},

  // Gesture
  GestureDetector: ({ children }) => children,
  Gesture: {
    Pan: () => ({}),
    Tap: () => ({}),
    LongPress: () => ({}),
    Fling: () => ({}),
    Pinch: () => ({}),
    Rotation: () => ({}),
    Native: () => ({}),
    Race: () => ({}),
    Simultaneous: () => ({}),
    Exclusive: () => ({}),
  },

  // Spring configs
  GentleSpringConfig: {},
  SnappySpringConfig: {},
  WigglySpringConfig: {},

  // Other
  interpolate: (value, inputRange, outputRange, extrapolate) => value,
  interpolateColor: (value, inputRange, outputRange) => outputRange[0],
  measure: () => ({}),
  scrollTo: NOOP,
  setGestureState: NOOP,
  
  // Shared value utilities
  SharedTransition: {},
  
  // Worklets module integration
  createSerializable: (value) => value,
  createSynchronizable: (value) => value,
  
  // Additional utilities
  defineAnimation: (factory, config) => config,
  processColor: (color) => color,
  
  // Create animated component
  createAnimatedComponent: (Component) => Component,
};
