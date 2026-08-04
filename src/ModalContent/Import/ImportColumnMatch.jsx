import React, {
  useState,
  Fragment,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import {
  useFloating,
  useInteractions,
  useClick,
  useDismiss,
  useRole,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getSpreadsheetHeaders,
  autoMatchColumns,
  categorizeImportData
} from "../../utils/file/fileParser";
import { reconstructFileFromRedux } from "../../utils/file/fileReconstruction";
import { TEACHER_COLUMNS } from "../../utils/teacher/teacherColumns";
import { setColumnMapping } from "../../../Slices/teacher/teacherSlice";
function ImportColumnMatch(){
     return (
        <>
        </>
     )
}
export default ImportColumnMatch;