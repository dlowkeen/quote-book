import React from 'react';
import { hot } from 'react-hot-loader';

import { Routes } from './Routes';

// Import app-wide settings and tools such as tag styles and home made mix-ins (Component-specific CSS is kept adjacent to component code)
// NOTE -- this should appear before other components are imported, to ensure that global styles appear higher up in the document
import '../styles/styles.css';

const App: React.FunctionComponent = () => <Routes />;

export default hot(module)(App);
