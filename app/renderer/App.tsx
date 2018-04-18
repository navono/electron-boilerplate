import * as React from 'react';
import { hot } from 'react-hot-loader';
import Counter from './testComponent/Counter';
import Dnd from './testComponent/Dnd';
import Canvas from './testComponent/Canvas';

declare var module: { hot: any };

const App = (App: any) => (
  <div>
    <Counter />
    <Dnd />
    <Canvas />
  </div>
);

export default hot(module)(App);
