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
| `department_import_template.csv` | Departments | Description is optional. Existing names are reported, not overwritten. |
| `specialty_import_template.csv` | Specialties | Department and level by name. Empty fees take the level's fees. With "Automatically Create Specialties Across All Levels" on, one row creates the specialty at every level. |
| `hall_import_template.csv` | Halls | At least one hall type: Lecture Hall, Exam Hall or Practical Hall. One cell may hold several separated by `\|`. |
| `specialty_hall_import_template.csv` | Specialty halls | Hall and specialty by name. Level is needed only when several specialties share a name. |
| `student_batch_import_template.csv` | Student batches | Both columns required. Existing names are reported. |
| `guardian_import_template.csv` | Guardians | Phone identifies a guardian. Contact method: phone call or text message (default phone call). Language: English, French or Pigin (default English). |
| `student_import_template.csv` | Students | Import guardians and batches first. Guardian by name or phone; relationship, source and gender by name. Level only when several specialties share a name. Payment format: one time or installmental. |
| `course_import_template.csv` | Courses | Semester by name (First Semester) or number. Course types: Practical, Theoritical; several per cell with `\|`. |
| `joint_course_import_template.csv` | Joint courses | Same as courses, with at least two specialties (`specialty_1`/`level_1`, `specialty_2`/`level_2`, ...). |
| `grade_scale_import_template.csv` | Grade scales | One row per grade. `grade_title` is the scale (Level One Exam); all its rows use the same `grade_max_score`; ranges must not overlap. Result: passed/failed. Resit result: no resit, resit, high/low resit potential. |
