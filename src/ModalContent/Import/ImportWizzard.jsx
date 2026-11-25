import { useState } from "react";
import { IMPORT_STEP_FLOW } from "../../utils/steps/import/importStepFlow";
import { IMPORT_CONFIG_MAP } from "../../utils/maps/import/importConfigMap";
function ImportWizzard({ rowData, handleClose }) {
  const {
    moduleState,
    setImportStatus,
    setImportReset,
    setImportSelectedFile,
    moduleColumns,
    addRepeatableGroup,
    setColumnMapping,
    removeRepeatableGroup,
    setStandardGroupValue,
    setRepeatableGroupValue,
    moduleInstanceMap,
    module,
    importModuleColDefs,
  } = rowData;
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = IMPORT_STEP_FLOW[stepIndex];

  const CurrentComponent = currentStep.component;
  const nextStep = () => {
    setStepIndex((prev) => prev + 1);
  };

  const previousStep = () => {
    setStepIndex((prev) => prev - 1);
  };
  return (
    <>
      <CurrentComponent
        nextStep={nextStep}
        previousStep={previousStep}
        handleClose={handleClose}
        currentStep={stepIndex + 1}
        fullStep={IMPORT_STEP_FLOW.length}
        moduleState={moduleState}
        setImportStatus={setImportStatus}
        setImportReset={setImportReset}
        setImportSelectedFile={setImportSelectedFile}
        moduleColumns={moduleColumns}
        addRepeatableGroup={addRepeatableGroup}
        setColumnMapping={setColumnMapping}
        removeRepeatableGroup={removeRepeatableGroup}
        setStandardGroupValue={setStandardGroupValue}
        setRepeatableGroupValue={setRepeatableGroupValue}
        module={{
          ...module,
          // The module's CSV template, unless the trigger passed its own.
          template: module?.template ?? IMPORT_CONFIG_MAP[moduleState]?.template,
        }}
        moduleInstanceMap={moduleInstanceMap}
        importModuleColDefs={importModuleColDefs}
      />
    </>
  );
}
export default ImportWizzard;
