import { electionSettingMap } from "./category/electionSettingMap"
import { examSettingMap } from "./category/examSettingMap"
import { gradeSettingMap } from "./category/gradeSettingMap"
import { graduationSettingMap } from "./category/graduationSettingMap"
import { levelSettingMap } from "./category/levelSettingMap"
import { promotionSettingMap } from "./category/promotionSettingMap"
import { resitSettingMap } from "./category/resitSettingMap"
import { timetableSettingMap } from "./category/timetableSettingMap"
export const settingMap = {
     ...electionSettingMap,
     ...examSettingMap,
     ...gradeSettingMap,
     ...graduationSettingMap,
     ...levelSettingMap,
     ...promotionSettingMap,
     ...resitSettingMap,
     ...timetableSettingMap
 }