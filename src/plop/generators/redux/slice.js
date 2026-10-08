import fs from 'node:fs';
import { SLICES_ROOT, TEMPLATES_ROOT } from '../../config.js';

export default {
  description: 'Create a new Redux Toolkit slice',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Slice name (e.g. jointCourseTimetable, userAuth):',
      validate: (input) => {
        if (!input) return 'Slice name is required';
        if (/slice$/i.test(input)) {
          return 'Do not include "Slice" at the end — it is added automatically';
        }
        return true;
      },
    },
    {
      type: 'list',
      name: 'folder',
      message: 'Where should this slice live?',
      choices: () => {
        if (!fs.existsSync(SLICES_ROOT)) return [SLICES_ROOT];

        const subfolders = fs
          .readdirSync(SLICES_ROOT, { withFileTypes: true })
          .filter((e) => e.isDirectory())
          .map((e) => `${SLICES_ROOT}/${e.name}`);

        return [SLICES_ROOT, ...subfolders];
      },
    },
  ],
  actions: [
    {
      type: 'add',
      path: '{{folder}}/{{camelCase name}}Slice.js',
      templateFile: `${TEMPLATES_ROOT}/redux/slice.js.hbs`,
    },
  ],
};