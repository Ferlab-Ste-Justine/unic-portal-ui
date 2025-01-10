import '@testing-library/jest-dom';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// remove console.error warning
const originalConsole = global.console;
global.console = {
  ...global.console,
  error: (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Support for defaultProps will be removed') ||
        args[0].includes('act(...)') ||
        args[0].includes(
          'Warning: findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node',
        ) ||
        args[0].includes(
          'Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.',
        ))
    ) {
      return true;
    }
    // Show the original error for everything else
    originalConsole.error(...args);
  },
};
