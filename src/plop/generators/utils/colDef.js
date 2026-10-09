import fs from 'node:fs';
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
    {
      type: 'input',
      name: 'folder',
      message: () => {
        let hint = 'Subfolder inside colDefs:';
        if (fs.existsSync(COL_DEFS_ROOT)) {
          const subs = fs
            .readdirSync(COL_DEFS_ROOT, { withFileTypes: true })
            .filter((e) => e.isDirectory())
            .map((e) => e.name);
          if (subs.length) hint += `\n  Existing: ${subs.join(', ')}`;
        }
        return hint;
      },
      validate: (input) =>
        input ? true : 'Folder name is required (e.g. jointCourse)',
    },
  ],
  actions: [
    {
      type: 'add',
      path: `${COL_DEFS_ROOT}/{{folder}}/{{camelCase name}}ColDefs.js`,
      templateFile: `${TEMPLATES_ROOT}/utils/colDef.js.hbs`,
    },
  ],
};