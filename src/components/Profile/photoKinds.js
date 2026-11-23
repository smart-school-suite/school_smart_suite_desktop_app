import { useRemoveSchoolLogo } from "../../hooks/school/useRemoveSchoolLogo";
import { useUploadSchoolLogo } from "../../hooks/school/useUploadSchoolLogo";
import { useRemoveSchoolAdminAvatar } from "../../hooks/schoolAdmin/useRemoveSchoolAdminAvatar";
import { useUploadSchoolAdminAvatar } from "../../hooks/schoolAdmin/useUploadSchoolAdminAvatar";

export const PHOTO_KIND = Object.freeze({
  profilePhoto: {
    noun: "photo",
    shape: "circle",
    fit: "cover",
    output: { type: "image/webp", fileName: "profile-photo" },
    useUpload: useUploadSchoolAdminAvatar,
    useRemove: useRemoveSchoolAdminAvatar,
    cropTitle: "Adjust profile photo",
    cropHint: "Drag to reposition the photo, then zoom until it fits the circle.",
    savedAs: "Saved as a 512 × 512 px square",
    removeTitle: "Remove profile photo",
    removeDescription: "Your initials will show instead of your photo. You can add a new photo at any time.",
    viewTitle: (name) => (name ? `${name}'s profile photo` : "Profile photo"),
  },
  schoolLogo: {
    noun: "logo",
    shape: "rounded",
    fit: "contain",
    output: { type: "image/png", fileName: "school-logo" },
    useUpload: useUploadSchoolLogo,
    useRemove: useRemoveSchoolLogo,
    cropTitle: "Adjust school logo",
    cropHint: "Drag to reposition the logo, then zoom until it fits the frame. Transparent backgrounds are kept.",
    savedAs: "Saved as a 512 × 512 px PNG",
    removeTitle: "Remove school logo",
    removeDescription: "The school's initials will show instead of the logo. You can upload a new logo at any time.",
    viewTitle: (name) => (name ? `${name} logo` : "School logo"),
  },
});
