# Import templates

Offered by the "Download template" button of each import. Headers use the
column names the import matches automatically; repeatable groups are numbered
(`qualification_1`, `qualification_2`, ...).

| File | Import | Notes |
|---|---|---|
| `school_admin_import_template.csv` | School admins | `full_names` is optional (defaults to first + last name). Gender: Male or Female. Existing emails are reported, not overwritten. |
| `teacher_import_template.csv` | Teachers | Gender is required. Qualification: an abbreviation such as BSc, MSc, PhD, HND. Level: a level name of your school's level system; one cell may hold several separated by `\|`. |
| `teacher_specialty_import_template.csv` | Teacher specialties | Teacher: full name or email. Level is needed only when several specialties share a name. The teacher must be allowed to teach the specialty's level. |
| `teacher_course_import_template.csv` | Teacher courses | Course: code or title. Specialty and level only tell apart courses sharing a title. The course must belong to one of the teacher's specialties, and a course has one teacher. |
