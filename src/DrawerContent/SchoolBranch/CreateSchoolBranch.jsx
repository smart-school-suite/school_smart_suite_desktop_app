import { Building2, Check, CreditCard, Link2, Sparkles, UserRound } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import * as Yup from "yup";
import {
  emailValidationSchema,
  nameSchema,
  passwordSchema,
  phoneValidationSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { FlowFooter, FlowNote, FlowSkeleton, FlowStep, FlowTip, shortDate } from "../../components/CreationFlow/CreationFlow";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import QueryErrorState from "../../components/errors/QueryErrorState";
import { PhoneNumberInput, TextInput } from "../../components/FormComponents/InputComponents";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useFormError } from "../../hooks/form/useFormError";
import {
  useCreateSchoolBranch,
  useGetCountryPaymentMethods,
  useGetCountryPlans,
  useGetSchoolBranchCreationOptions,
} from "../../hooks/schoolBranch/useSchoolBranchCreation";
import { formatNumber } from "../../utils/functions";

const STEPS = ["Branch", "Admin", "Subscription"];
const ignore = () => {};

const schemas = {
  name: Yup.string().trim().required("Branch name required").min(2, "At least 2 characters").max(100, "At most 100 characters"),
  abbreviation: Yup.string().trim().required("Short name required").max(10, "At most 10 characters"),
  city: Yup.string().trim().max(50, "At most 50 characters"),
  address: Yup.string().trim().max(100, "At most 100 characters"),
  branchEmail: emailValidationSchema({ required: false }),
  firstName: nameSchema({ min: 2, max: 150 }),
  lastName: nameSchema({ min: 2, max: 150 }),
  adminEmail: emailValidationSchema({ required: true }),
  password: passwordSchema({ min: 8 }),
  payPhone: phoneValidationSchema({ optional: false, prefixes: ["6", "2"] }),
};

const valid = (schema, value) => {
  try {
    return schema.isValidSync(value ?? "");
  } catch {
    return false;
  }
};

function Field({ label, optional, children }) {
  return (
    <div className="d-flex flex-column">
      <label className="font-size-sm">
        {label} {optional && <span className="text-iron-400">(optional)</span>}
      </label>
      {children}
    </div>
  );
}

function ChoiceCard({ icon: Icon, title, detail, selected, disabled, onSelect, children }) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      onClick={onSelect}
      className={`semester-choice d-flex flex-column align-items-start gap-2 text-start rounded-3 border p-3 w-100 ${
        selected ? "semester-choice--selected" : ""
      } ${disabled ? "semester-choice--taken" : ""}`}
    >
      <span className="d-flex align-items-center justify-content-between gap-2 w-100">
        <span className="d-flex align-items-center gap-2 fw-semibold">
          <Icon size={16} strokeWidth={1.75} className={disabled ? "text-iron-400" : "text-primary-500"} />
          {title}
        </span>
        {selected && <Check size={15} strokeWidth={2} className="text-primary-600 flex-shrink-0" />}
      </span>
      {detail && <span className="font-size-xs text-iron-500">{detail}</span>}
      {children}
    </button>
  );
}

function PlanChoice({ plan, selected, onSelect }) {
  const features = plan.plan_feature ?? [];
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(plan.id)}
      className={`semester-choice d-flex flex-column align-items-start gap-1 text-start rounded-3 border p-2 ${
        selected ? "semester-choice--selected" : ""
      }`}
    >
      <span className="d-flex align-items-center justify-content-between gap-2 w-100">
        <span className="fw-medium text-truncate">{plan.name}</span>
        {selected && <Check size={14} strokeWidth={2} className="text-primary-600 flex-shrink-0" />}
      </span>
      <span className="fw-semibold">
        {plan.country?.currency} {formatNumber(parseFloat(plan.price || 0))}
        <span className="font-size-xs text-iron-400 fw-normal"> /year</span>
      </span>
      {features.length > 0 && (
        <span className="font-size-xs text-iron-500 text-truncate w-100" title={features.map((item) => item?.feature?.name).join(", ")}>
          {features.length} {features.length === 1 ? "feature" : "features"}
        </span>
      )}
    </button>
  );
}

function CreateSchoolBranch({ handleClose }) {
  const { data, isLoading, error, refetch } = useGetSchoolBranchCreationOptions();
  const { mutate: createBranch, isPending } = useCreateSchoolBranch(handleClose);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Couldn't create the branch");

  const options = data?.data;
  const shared = options?.shared;
  const countryId = options?.school?.country_id;

  const [step, setStep] = useState(1);
  const [branch, setBranch] = useState({ name: "", abbreviation: "", city: "", address: "", email: "" });
  const [admin, setAdmin] = useState({ first: "", last: "", email: "", password: "" });
  const [modeChoice, setMode] = useState(null);
  const [planId, setPlanId] = useState(null);
  const [methodId, setMethodId] = useState(null);
  const [payPhone, setPayPhone] = useState("");
  const refs = { branch: useRef([]), admin: useRef([]), pay: useRef() };

  const mode = modeChoice ?? (shared?.available ? "shared" : "new");
  const plansQuery = useGetCountryPlans(countryId, mode === "new");
  const methodsQuery = useGetCountryPaymentMethods(countryId, mode === "new");
  const plans = plansQuery.data?.data ?? [];
  const methods = useMemo(() => (methodsQuery.data?.data ?? []).flatMap((group) => group.methods ?? []), [methodsQuery.data]);
  const plan = plans.find((item) => item.id === planId) ?? null;
  const method = methods.find((item) => item.id === methodId) ?? null;

  const nameTaken = (options?.branch_names ?? []).some(
    (name) => name.trim().toLowerCase() === branch.name.trim().toLowerCase(),
  );

  const branchOk =
    valid(schemas.name, branch.name) &&
    !nameTaken &&
    valid(schemas.abbreviation, branch.abbreviation) &&
    valid(schemas.city, branch.city) &&
    valid(schemas.address, branch.address) &&
    valid(schemas.branchEmail, branch.email);
  const adminOk =
    valid(schemas.firstName, admin.first) &&
    valid(schemas.lastName, admin.last) &&
    valid(schemas.adminEmail, admin.email) &&
    valid(schemas.password, admin.password);
  const subscriptionOk = mode === "shared" ? Boolean(shared?.available) : Boolean(plan && method && valid(schemas.payPhone, payPhone));
  const canContinue = (step === 1 ? branchOk : step === 2 ? adminOk : subscriptionOk) && !isPending;

  const updateBranch = (field) => (value) => {
    clearFormError();
    setBranch((current) => ({ ...current, [field]: value }));
  };
  const updateAdmin = (field) => (value) => {
    clearFormError();
    setAdmin((current) => ({ ...current, [field]: value }));
  };

  const touchStep = async () => {
    const list = step === 1 ? refs.branch.current : step === 2 ? refs.admin.current : [refs.pay.current];
    await Promise.all(list.filter(Boolean).map((ref) => ref.triggerValidation?.()));
  };

  const submit = () => {
    clearFormError();
    createBranch(
      {
        name: branch.name.trim(),
        abbreviation: branch.abbreviation.trim(),
        city: branch.city.trim() || null,
        address: branch.address.trim() || null,
        email: branch.email.trim() || null,
        admin_first_name: admin.first.trim(),
        admin_last_name: admin.last.trim(),
        admin_email: admin.email.trim().toLowerCase(),
        admin_password: admin.password,
        subscription: mode,
        ...(mode === "new" ? { plan_id: plan.id, payment_method_id: method.id, phone_number: payPhone } : {}),
      },
      { onError: handleServerError },
    );
  };

  const goNext = async () => {
    if (!canContinue) {
      await touchStep();
      if (step === 1 && nameTaken) setClientError("Name in use", "This school already has a branch with this name.");
      return;
    }
    clearFormError();
    if (step < STEPS.length) setStep(step + 1);
    else submit();
  };

  const goBack = () => {
    clearFormError();
    if (step === 1) handleClose?.();
    else setStep(step - 1);
  };

  if (isLoading) return <FlowSkeleton />;
  if (error) {
    return (
      <div className="p-3">
        <QueryErrorState error={error} fallbackTitle="Couldn't load branch options" onRetry={refetch} />
      </div>
    );
  }

  const schoolName = options?.school?.name;

  return (
    <>
      <div className="drawer-content scrollbar-xs ps-2 pt-3 pb-2 d-flex flex-column gap-4 font-size-sm">
        <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} />

        {step === 1 && (
          <FlowStep number={1} total={STEPS.length} title="Branch" context={schoolName} tip={`It joins ${schoolName}.`}>
            <div key="branch" className="d-flex flex-column gap-3">
              <Field label="Branch name">
                <TextInput
                  ref={(el) => (refs.branch.current[0] = el)}
                  placeholder="e.g. Town Campus"
                  value={branch.name}
                  onChange={updateBranch("name")}
                  onValidationChange={ignore}
                  validationSchema={schemas.name}
                />
                {nameTaken && <FlowNote>This school already has a branch with this name.</FlowNote>}
              </Field>
              <div className="d-flex gap-2">
                <div className="w-50">
                  <Field label="Short name">
                    <TextInput
                      ref={(el) => (refs.branch.current[1] = el)}
                      placeholder="e.g. TC"
                      value={branch.abbreviation}
                      onChange={updateBranch("abbreviation")}
                      onValidationChange={ignore}
                      validationSchema={schemas.abbreviation}
                    />
                  </Field>
                </div>
                <div className="w-50">
                  <Field label="City" optional>
                    <TextInput
                      ref={(el) => (refs.branch.current[2] = el)}
                      placeholder="e.g. Buea"
                      value={branch.city}
                      onChange={updateBranch("city")}
                      onValidationChange={ignore}
                      validationSchema={schemas.city}
                    />
                  </Field>
                </div>
              </div>
              <Field label="Address" optional>
                <TextInput
                  ref={(el) => (refs.branch.current[3] = el)}
                  placeholder="Street, area"
                  value={branch.address}
                  onChange={updateBranch("address")}
                  onValidationChange={ignore}
                  validationSchema={schemas.address}
                />
              </Field>
              <Field label="Branch email" optional>
                <TextInput
                  ref={(el) => (refs.branch.current[4] = el)}
                  placeholder="campus@school.cm"
                  value={branch.email}
                  onChange={updateBranch("email")}
                  onValidationChange={ignore}
                  validationSchema={schemas.branchEmail}
                />
              </Field>
            </div>
          </FlowStep>
        )}

        {step === 2 && (
          <FlowStep number={2} total={STEPS.length} title="Admin" context={branch.name} tip="They'll run the new branch.">
            <div key="admin" className="d-flex flex-column gap-3">
              <div className="d-flex gap-2">
                <div className="w-50">
                  <Field label="First name">
                    <TextInput
                      ref={(el) => (refs.admin.current[0] = el)}
                      placeholder="e.g. Ada"
                      value={admin.first}
                      onChange={updateAdmin("first")}
                      onValidationChange={ignore}
                      validationSchema={schemas.firstName}
                    />
                  </Field>
                </div>
                <div className="w-50">
                  <Field label="Last name">
                    <TextInput
                      ref={(el) => (refs.admin.current[1] = el)}
                      placeholder="e.g. Ndip"
                      value={admin.last}
                      onChange={updateAdmin("last")}
                      onValidationChange={ignore}
                      validationSchema={schemas.lastName}
                    />
                  </Field>
                </div>
              </div>
              <Field label="Email">
                <TextInput
                  ref={(el) => (refs.admin.current[2] = el)}
                  placeholder="admin@school.cm"
                  value={admin.email}
                  onChange={updateAdmin("email")}
                  onValidationChange={ignore}
                  validationSchema={schemas.adminEmail}
                />
              </Field>
              <Field label="Password">
                <TextInput
                  ref={(el) => (refs.admin.current[3] = el)}
                  type="password"
                  placeholder="At least 8 characters"
                  value={admin.password}
                  onChange={updateAdmin("password")}
                  onValidationChange={ignore}
                  validationSchema={schemas.password}
                />
              </Field>
              <FlowNote>They sign in with this email and password.</FlowNote>
            </div>
          </FlowStep>
        )}

        {step === 3 && (
          <FlowStep number={3} total={STEPS.length} title="Subscription" context={branch.name}>
            <div className="d-flex flex-column gap-3">
              <ChoiceCard
                icon={Link2}
                title="Share current subscription"
                selected={mode === "shared"}
                disabled={!shared?.available}
                onSelect={() => setMode("shared")}
                detail={
                  shared?.available
                    ? `${shared.plan?.name} · until ${shortDate(shared.end_date)} · ${shared.days_left} days left`
                    : shared?.reason
                }
              >
                {shared?.available && (
                  <span className="font-size-xs text-iron-500">
                    Used by {shared.branches.join(", ")}. No payment needed.
                  </span>
                )}
              </ChoiceCard>
              <ChoiceCard
                icon={CreditCard}
                title="Its own plan"
                detail="Pay for a separate plan for this branch."
                selected={mode === "new"}
                onSelect={() => setMode("new")}
              />

              {mode === "new" && (
                <div className="d-flex flex-column gap-3">
                  <FlowTip>Pick a plan, then how to pay.</FlowTip>
                  {plansQuery.isLoading ? (
                    <RectangleSkeleton width="100%" height="5rem" />
                  ) : plansQuery.error ? (
                    <QueryErrorState error={plansQuery.error} fallbackTitle="Couldn't load plans" onRetry={plansQuery.refetch} />
                  ) : (
                    <div className="semester-choices d-grid gap-2">
                      {plans.map((item) => (
                        <PlanChoice key={item.id} plan={item} selected={item.id === planId} onSelect={setPlanId} />
                      ))}
                    </div>
                  )}
                  {plan && (
                    <div className="d-flex flex-column gap-2">
                      <span className="fw-medium">Pay with</span>
                      <div className="d-flex flex-wrap gap-2">
                        {methods.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            aria-pressed={item.id === methodId}
                            onClick={() => setMethodId(item.id)}
                            className={`semester-choice d-inline-flex align-items-center gap-2 rounded-pill border px-3 py-1-5 ${
                              item.id === methodId ? "semester-choice--selected text-primary-600" : ""
                            }`}
                          >
                            {item.id === methodId && <Check size={13} strokeWidth={2} />}
                            {item.name}
                          </button>
                        ))}
                      </div>
                      {method && (
                        <Field label={`${method.name} number`}>
                          <PhoneNumberInput
                            ref={(el) => (refs.pay.current = el)}
                            value={payPhone}
                            onChange={setPayPhone}
                            onValidationChange={ignore}
                            validationSchema={schemas.payPhone}
                          />
                        </Field>
                      )}
                    </div>
                  )}
                </div>
              )}

              {subscriptionOk && (
                <div className="semester-summary d-flex gap-3 rounded-3 p-3 bg-primary-50" aria-live="polite">
                  <Building2 size={18} strokeWidth={1.75} className="text-primary-500 flex-shrink-0 mt-1" />
                  <div className="d-flex flex-column gap-1 overflow-hidden">
                    <span className="fw-semibold">{branch.name}</span>
                    <span className="d-flex align-items-center gap-1 text-iron-600 text-truncate">
                      <UserRound size={13} strokeWidth={1.75} />
                      {admin.first} {admin.last} · {admin.email}
                    </span>
                    <span className="d-flex align-items-center gap-1 text-iron-600">
                      <Sparkles size={13} strokeWidth={1.75} />
                      {mode === "shared"
                        ? `Shares ${shared.plan?.name} until ${shortDate(shared.end_date)}`
                        : `${plan.name} · ${plan.country?.currency} ${formatNumber(parseFloat(plan.price || 0))} via ${method.name}`}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </FlowStep>
        )}
      </div>

      <FlowFooter
        backLabel={step === 1 ? "School" : STEPS[step - 2]}
        onBack={goBack}
        primaryLabel={step < STEPS.length ? "Next" : mode === "new" && plan ? `Pay & create branch` : "Create branch"}
        onPrimary={goNext}
        canContinue={canContinue}
        isPending={isPending}
      />
    </>
  );
}

export default CreateSchoolBranch;
