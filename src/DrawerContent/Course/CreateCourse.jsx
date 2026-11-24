import { motion } from "framer-motion";
import { BookOpen, Check, ChevronDown, CircleCheck, Dot, GraduationCap, Plus, SearchX } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  courseCodeSchema,
  numberSchema,
  textareaSchema,
  titleSchema,
} from "../../ComponentConfig/YupValidationSchema";
import {
  FlowFooter,
  FlowNote,
  FlowSkeleton,
  FlowStep,
  FlowTip,
  matchesQuery,
} from "../../components/CreationFlow/CreationFlow";
import EmptyState, { EmptyStateButton } from "../../components/errors/EmptyState";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import QueryErrorState from "../../components/errors/QueryErrorState";
import { NumberInput, TextInput } from "../../components/FormComponents/InputComponents";
import { RichTextEditor } from "../../components/FormComponents/RichTextEditor/RichTextEditor";
import SearchInput from "../../components/input/search";
import { useCreateCourse } from "../../hooks/course/useCreateCourse";
import { useGetCourseCreationOptions } from "../../hooks/course/useGetCourseCreationOptions";
import { useGetCourseTypes } from "../../hooks/course/useGetCourseTypes";
import { useDebounce } from "../../hooks/common/useDebounce";
import { useFormError } from "../../hooks/form/useFormError";

const STEPS = ["Specialty & semester", "Course"];
const EMPTY_COURSE = { course_title: "", course_code: "", credit: "", description: "", types: [] };

const ignore = () => {};

const coursesLabel = (count) => `${count} ${count === 1 ? "course" : "courses"}`;

const matches = (specialty, query) =>
  matchesQuery([specialty.specialty_name, specialty.level_name, specialty.department_name, specialty.label], query);

function SemesterOption({ semester, stats, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(semester.id)}
      aria-pressed={selected}
      className={`semester-choice d-flex flex-column align-items-start gap-1 text-start rounded-3 border p-2 ${
        selected ? "semester-choice--selected" : ""
      }`}
    >
      <span className="fw-medium text-capitalize text-truncate w-100">{semester.name}</span>
      <span className="font-size-xs text-iron-500">
        {stats?.courses_count ? `${coursesLabel(stats.courses_count)} · ${stats.credits} credits` : "No courses yet"}
      </span>
    </button>
  );
}

function SpecialtyCard({ specialty, semesters, selected, semesterId, onSelect, onSelectSemester }) {
  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      whileHover={selected ? undefined : { scale: 1.01 }}
      whileTap={selected ? undefined : { scale: 0.99 }}
      onClick={() => !selected && onSelect(specialty.id)}
      onKeyDown={(event) => {
        if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onSelect(specialty.id);
        }
      }}
      className={`card p-2 d-flex flex-column gap-2 ${selected ? "shadow-fern-100-lg border-fern-300" : "border-none border shadow-sm pointer-cursor"}`}
      style={{ borderRadius: "0.85rem" }}
    >
      <div className="d-flex align-items-center justify-content-between gap-2">
        <div className="d-flex align-items-center gap-2 overflow-hidden">
          <div
            className="d-grid place-items-center rounded-3 primary-background-50 color-primary flex-shrink-0"
            style={{ height: "2.5rem", width: "2.5rem" }}
          >
            <GraduationCap size={16} />
          </div>
          <div className="d-flex flex-column overflow-hidden">
            <span className="fw-semibold text-truncate">{specialty.specialty_name}</span>
            <div className="d-flex align-items-center text-iron-400 font-size-xs overflow-hidden">
              <span className="text-nowrap">{specialty.level_name ?? "-"}</span>
              {specialty.department_name && (
                <>
                  <Dot size={14} className="flex-shrink-0" />
                  <span className="text-truncate" title={specialty.department_name}>{specialty.department_name}</span>
                </>
              )}
            </div>
          </div>
        </div>
        {selected ? (
          <CircleCheck size={16} className="green-color flex-shrink-0" />
        ) : (
          <span className="font-size-xs text-iron-400 text-nowrap">{coursesLabel(specialty.courses_count)}</span>
        )}
      </div>
      {selected && (
        <div className="d-flex flex-column gap-2 border-top pt-2" onClick={(event) => event.stopPropagation()}>
          <FlowTip>Which semester are the courses for?</FlowTip>
          <div className="semester-choices d-grid gap-2">
            {semesters.map((semester) => (
              <SemesterOption
                key={semester.id}
                semester={semester}
                stats={specialty.semesters.find((item) => item.semester_id === semester.id)}
                selected={semester.id === semesterId}
                onSelect={onSelectSemester}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function CourseList({ title, courses, icon: Icon, open, onToggle }) {
  if (!courses.length) return null;
  return (
    <div className="d-flex flex-column gap-1 rounded-3 bg-iron-50 px-3 py-2 font-size-xs">
      <button
        type="button"
        className="d-flex align-items-center justify-content-between gap-2 border-0 bg-transparent p-0 text-iron-600"
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className="d-flex align-items-center gap-1">
          <Icon size={13} strokeWidth={1.75} className="text-fern-600" />
          {title} <span className="fw-semibold text-iron-700">{coursesLabel(courses.length)}</span>
        </span>
        <ChevronDown size={14} className={open ? "rotate-180" : ""} />
      </button>
      {open && (
        <ul className="m-0 ps-4 text-iron-500 d-flex flex-column gap-1">
          {courses.map((course) => (
            <li key={course.id ?? course.course_code}>
              <span className="fw-medium text-iron-700">{course.course_code}</span> · {course.course_title} · {course.credit} cr
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function TypeChips({ types, selected, onToggle, disabled }) {
  return (
    <div className="d-flex flex-wrap gap-2">
      {types.map((type) => {
        const active = selected.includes(type.id);
        return (
          <button
            key={type.id}
            type="button"
            disabled={disabled}
            aria-pressed={active}
            title={type.description ?? ""}
            onClick={() => onToggle(type.id)}
            className={`semester-choice d-inline-flex align-items-center gap-1 rounded-pill border px-3 py-1 font-size-xs ${
              active ? "semester-choice--selected text-primary-600" : ""
            }`}
          >
            {active && <Check size={12} strokeWidth={2} />}
            {type.name}
          </button>
        );
      })}
    </div>
  );
}

function CreateCourse({ handleClose }) {
  const navigate = useNavigate();
  const titleRef = useRef();
  const codeRef = useRef();
  const creditRef = useRef();
  const descriptionRef = useRef();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 200);

  const { data, isLoading, error, refetch } = useGetCourseCreationOptions();
  const { data: typesData } = useGetCourseTypes();
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Couldn't create the course");

  const [step, setStep] = useState(1);
  const [specialtyId, setSpecialtyId] = useState(null);
  const [semesterId, setSemesterId] = useState(null);
  const [course, setCourse] = useState(EMPTY_COURSE);
  const [formKey, setFormKey] = useState(0);
  const [added, setAdded] = useState([]);
  const [openList, setOpenList] = useState(null);

  const { mutate: createCourse, isPending } = useCreateCourse(null, specialtyId, semesterId);

  const options = data?.data;
  const semesters = useMemo(() => options?.semesters ?? [], [options]);
  const specialties = useMemo(() => options?.specialties ?? [], [options]);
  const types = typesData?.data ?? [];
  const visibleSpecialties = useMemo(
    () => specialties.filter((item) => matches(item, debouncedQuery)),
    [specialties, debouncedQuery],
  );

  const specialty = specialties.find((item) => item.id === specialtyId) ?? null;
  const semester = semesters.find((item) => item.id === semesterId) ?? null;
  const existing = specialty?.semesters.find((item) => item.semester_id === semesterId)?.courses ?? [];
  const addedHere = added.filter((item) => item.specialty_id === specialtyId && item.semester_id === semesterId);
  const earlier = existing.filter((item) => !addedHere.some((mine) => mine.course_code === item.course_code && mine.course_title === item.course_title));

  const schemas = useMemo(
    () => ({
      title: titleSchema({ min: 3, max: 150, required: true, messages: { required: "Title required" } }),
      code: courseCodeSchema({ min: 3, max: 10, required: true, messages: { required: "Code required" } }),
      credit: numberSchema({ min: 1, max: 10, required: true, integerOnly: true, messages: { required: "Credit required", max: "Max 10 credits" } }),
      description: textareaSchema({ min: 10, max: 500, required: false }),
    }),
    [],
  );

  const codeTaken = useMemo(() => {
    const code = course.course_code.trim().toUpperCase();
    return Boolean(code) && (options?.codes ?? []).includes(code);
  }, [course.course_code, options?.codes]);

  const fieldsOk =
    schemas.title.isValidSync(course.course_title) &&
    schemas.code.isValidSync(course.course_code) &&
    schemas.credit.isValidSync(course.credit === "" ? undefined : course.credit) &&
    course.types.length > 0;

  const ready = Boolean(specialty && semester);
  const formEmpty = !course.course_title && !course.course_code && !course.credit && !course.description;
  const canFinish = step === 2 && addedHere.length > 0 && formEmpty;
  const canContinue = step === 1 ? ready : canFinish || (ready && fieldsOk && !isPending);

  const update = (field, value) => {
    clearFormError();
    setCourse((current) => ({ ...current, [field]: value }));
  };

  const toggleType = (id) =>
    update("types", course.types.includes(id) ? course.types.filter((item) => item !== id) : [...course.types, id]);

  const chooseSpecialty = (id) => {
    clearFormError();
    setSpecialtyId(id);
    setSemesterId(semesters[0]?.id ?? null);
  };

  const chooseSemester = (id) => {
    clearFormError();
    setSemesterId(id);
  };

  const goTo = (path) => {
    handleClose?.();
    navigate(path);
  };

  const submit = async (addAnother) => {
    const checks = await Promise.all([
      titleRef.current?.triggerValidation(),
      codeRef.current?.triggerValidation(),
      creditRef.current?.triggerValidation(),
      descriptionRef.current?.triggerValidation(),
    ]);
    if (!ready || checks.some((ok) => ok === false) || !course.types.length) {
      setClientError("Almost there", course.types.length ? "Check the highlighted fields." : "Pick at least one course type.");
      return;
    }
    clearFormError();
    const payload = {
      course_title: course.course_title.trim(),
      course_code: course.course_code.trim().toUpperCase(),
      credit: course.credit,
      description: course.description || null,
      specialty_id: specialty.id,
      semester_id: semester.id,
      typeIds: course.types.map((id) => ({ type_id: id })),
    };
    createCourse(payload, {
      onError: handleServerError,
      onSuccess: (response) => {
        if (!addAnother) {
          handleClose?.();
          return;
        }
        setAdded((list) => [
          ...list,
          { id: response?.data?.id, specialty_id: specialty.id, semester_id: semester.id, course_code: payload.course_code, course_title: payload.course_title, credit: payload.credit },
        ]);
        setCourse((current) => ({ ...EMPTY_COURSE, types: current.types }));
        setFormKey((key) => key + 1);
        setOpenList("added");
      },
    });
  };

  const goBack = () => {
    clearFormError();
    if (step === 1) handleClose?.();
    else setStep(step - 1);
  };

  const goNext = () => {
    if (!canContinue) return;
    clearFormError();
    if (step < STEPS.length) setStep(step + 1);
    else if (canFinish) handleClose?.();
    else submit(false);
  };

  if (isLoading) return <FlowSkeleton />;
  if (error) {
    return (
      <div className="p-3">
        <QueryErrorState error={error} fallbackTitle="Couldn't load course options" onRetry={refetch} />
      </div>
    );
  }

  return (
    <>
      <div className="drawer-content scrollbar-xs ps-2 pt-3 pb-2 d-flex flex-column gap-4 font-size-sm">
        <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} />

        {step === 1 && (
          <FlowStep number={1} total={STEPS.length} title={STEPS[0]} tip="Add several courses to one semester in a row.">
            {specialties.length ? (
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-2">
                  <div className="flex-grow-1">
                    <SearchInput placeholder="Search specialty, level or department..." value={query} onChange={setQuery} />
                  </div>
                  <small className="text-iron-400 text-nowrap">
                    {visibleSpecialties.length} of {specialties.length}
                  </small>
                </div>
                {visibleSpecialties.length ? (
                  visibleSpecialties.map((item) => (
                    <SpecialtyCard
                      key={item.id}
                      specialty={item}
                      semesters={semesters}
                      selected={item.id === specialtyId}
                      semesterId={semesterId}
                      onSelect={chooseSpecialty}
                      onSelectSemester={chooseSemester}
                    />
                  ))
                ) : (
                  <EmptyState
                    mascot="notFound"
                    title="No matching specialties"
                    description={`Nothing matches "${debouncedQuery}".`}
                    height="30dvh"
                    mascotHeight="6rem"
                    actions={<EmptyStateButton variant="secondary" icon={SearchX} onClick={() => setQuery("")}>Clear search</EmptyStateButton>}
                  />
                )}
                <button
                  type="button"
                  className="step-back-btn d-inline-flex align-items-center gap-1 align-self-start border-0 bg-transparent p-0 font-size-xs"
                  onClick={() => goTo("/specialties")}
                >
                  <Plus size={13} strokeWidth={1.75} />
                  Can't find it? Create a specialty
                </button>
              </div>
            ) : (
              <EmptyState
                mascot="empty"
                title="No specialties yet"
                description="Courses belong to a specialty."
                height="40dvh"
                mascotHeight="7rem"
                actions={<EmptyStateButton icon={Plus} onClick={() => goTo("/specialties")}>Create a specialty</EmptyStateButton>}
              />
            )}
          </FlowStep>
        )}

        {step === 2 && ready && (
          <FlowStep number={2} total={STEPS.length} title={STEPS[1]} context={`${semester.name} · ${specialty.label}`}>
            <div className="d-flex flex-column gap-3">
              <CourseList
                title="Added now"
                icon={Check}
                courses={addedHere}
                open={openList === "added"}
                onToggle={() => setOpenList(openList === "added" ? null : "added")}
              />
              <CourseList
                title="Already here"
                icon={BookOpen}
                courses={earlier}
                open={openList === "existing"}
                onToggle={() => setOpenList(openList === "existing" ? null : "existing")}
              />

              <div key={formKey} className="d-flex flex-column gap-3">
                <div>
                  <label className="font-size-sm">Title</label>
                  <TextInput
                    ref={titleRef}
                    placeholder="e.g. Engineering Mathematics"
                    value={course.course_title}
                    onChange={(value) => update("course_title", value)}
                    validationSchema={schemas.title}
                    onValidationChange={ignore}
                  />
                </div>
                <div className="d-flex gap-2">
                  <div className="w-50">
                    <label className="font-size-sm">Code</label>
                    <TextInput
                      ref={codeRef}
                      placeholder="e.g. SWE101"
                      value={course.course_code}
                      onChange={(value) => update("course_code", value)}
                      validationSchema={schemas.code}
                    onValidationChange={ignore}
                    />
                    {codeTaken && <FlowNote>Code already used. Use a new title or code.</FlowNote>}
                  </div>
                  <div className="w-50">
                    <label className="font-size-sm">Credits</label>
                    <NumberInput
                      ref={creditRef}
                      placeholder="1 – 10"
                      value={course.credit}
                      step="1"
                      onChange={(value) => update("credit", value)}
                      validationSchema={schemas.credit}
                    onValidationChange={ignore}
                    />
                  </div>
                </div>
                <div className="d-flex flex-column gap-2">
                  <label className="font-size-sm">Type</label>
                  {types.length ? (
                    <TypeChips types={types} selected={course.types} onToggle={toggleType} disabled={isPending} />
                  ) : (
                    <span className="text-iron-400 font-size-xs">No course types found.</span>
                  )}
                </div>
                <div>
                  <label className="font-size-sm">
                    Description <span className="text-iron-400">(optional)</span>
                  </label>
                  <RichTextEditor
                    ref={descriptionRef}
                    optional
                    value={course.description}
                    onChange={(value) => update("description", value)}
                    validationSchema={schemas.description}
                    onValidationChange={ignore}
                    placeholder="What students will learn"
                  />
                </div>
              </div>
            </div>
          </FlowStep>
        )}
      </div>

      <FlowFooter
        backLabel={step === 1 ? "Courses" : STEPS[0]}
        onBack={goBack}
        secondaryLabel={step === 2 ? "Save & add another" : null}
        onSecondary={() => submit(true)}
        primaryLabel={step === 1 ? "Next" : canFinish ? "Done" : addedHere.length ? "Save & finish" : "Create course"}
        onPrimary={goNext}
        canContinue={canContinue}
        canSecondary={step === 2 && ready && fieldsOk && !isPending}
        isPending={isPending}
      />
    </>
  );
}

export default CreateCourse;
