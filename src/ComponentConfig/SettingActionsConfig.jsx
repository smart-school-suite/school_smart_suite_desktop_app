import UpdateAllowedGrades from "../ModalContent/SchoolBranchSetting/GradeSetting/UpdateAllowedGrades";
import UpdateMaxAttainableGpa from "../ModalContent/SchoolBranchSetting/GradeSetting/UpdateMaxAttainableGpa";
import UpdatePassingGpa from "../ModalContent/SchoolBranchSetting/GradeSetting/UpdatePassingGPA";
import UpdateMaxAdditionalFeeDebt from "../ModalContent/SchoolBranchSetting/PromotionSetting/UpdateMaxAdditionalFeeDebt";
import UpdateMaxCarryOvers from "../ModalContent/SchoolBranchSetting/PromotionSetting/UpdateMaxCarryOvers";
import UpdateMaxTuitionFeeDebt from "../ModalContent/SchoolBranchSetting/PromotionSetting/UpdateMaxTuitionFeeDebt";
import UpdatePromotionGpa from "../ModalContent/SchoolBranchSetting/PromotionSetting/UpdatePromotionGpa";
import UpdateGeneralResitFee from "../ModalContent/SchoolBranchSetting/ResitSetting/UpdateGeneralResitFee";
import UpdateLevelResitFee from "../ModalContent/SchoolBranchSetting/ResitSetting/UpdateLevelResitFee";

export const settinActionsConfig = [
   {
     key:"resitFee.generalBillingFee",
     modal:UpdateGeneralResitFee,
     modalSize:"md"
   },
   {
    key:"resitFee.levelBillingFee",
     modal:UpdateLevelResitFee,
     modalSize:"lg"
   },
   {
    key:"promotion.min_gpa",
    modal:UpdatePromotionGpa,
    modalSize:"md"
   },
   {
     key:"promotion.max_carry_overs",
     modal:UpdateMaxCarryOvers,
     modalSize:"md"
   },
   {
    
     key:"promotion.max_tuition_fee_debt",
     modal:UpdateMaxTuitionFeeDebt,
     modalSize:"md"
   },
   {
     key:"promotion.max_additional_fee_debt",
     modal:UpdateMaxAdditionalFeeDebt,
     modalSize:"md"
   },
   {
     key:"grade.allowed_letter_grades",
     modal:UpdateAllowedGrades,
     modalSize:"md"
   },
   {
     key:"grade.passing_gpa",
     modal:UpdatePassingGpa,
     modalSize:"md"
   },
   {
     key:"grade.max_gpa",
     modal:UpdateMaxAttainableGpa,
     modalSize:"md"
   }
   
];