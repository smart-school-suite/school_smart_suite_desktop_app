import { COL_DEFS_ROOT, TEMPLATES_ROOT } from '../../config.js';

export default {
  description: 'Create an AG Grid column definition file',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'ColDef name (e.g. jointCourseTimetable, userList):',
      validate: (input) => {
        if (!input) return 'ColDef name is required';
        if (/coldefs?$/i.test(input)) {
          return 'Do not include "ColDefs" at the end — it is added automatically';
        }
        return true;
      },
    },
  ],
  actions: [
    {
      type: 'add',
      path: `${COL_DEFS_ROOT}/{{camelCase name}}ColDefs.js`,
      templateFile: `${TEMPLATES_ROOT}/colDef/colDef.js.hbs`,
    },
  ],
};