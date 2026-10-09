import sliceGenerator from './src/plop/generators/redux/slice.js';
import colDefGenerator from './src/plop/generators/utils/colDef.js';
import { registerHelpers } from './src/plop/helpers.js';

export default function (plop) {
  registerHelpers(plop);

  plop.setGenerator('slice', sliceGenerator);
  plop.setGenerator('colDef', colDefGenerator);
}