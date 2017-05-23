// Leave index entry point with minimal code to avoid issues with code being hoisted to run
// before 'babel-polyfill'. (See, http://stackoverflow.com/a/36628148/260303)
import 'babel-polyfill';
import './app';
