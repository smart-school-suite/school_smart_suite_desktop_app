import ProfileAvatar from "../Profile/ProfileAvatar";
import { assetUrl } from "../../utils/assets";

const getFieldValue = (data, field, aliases) => {
  if (!data) return "";
  if (field && data[field]) return data[field];
  for (const key of aliases) {
    if (data[key]) return data[key];
  }
  return "";
};

const getFirstName = (data, field) =>
  getFieldValue(data, field, ["first_name", "s_first_name", "t_first_name", "a_first_name"]);

const getLastName = (data, field) =>
  getFieldValue(data, field, ["last_name", "s_last_name", "t_last_name", "a_last_name"]);

const getUsername = (data, field) =>
  getFieldValue(data, field, ["username", "s_username", "t_username", "a_username"]);

const getInitials = (data, firstNameField, lastNameField) =>
  [getFirstName(data, firstNameField), getLastName(data, lastNameField)]
    .filter(Boolean)
    .map((name) => name.charAt(0).toUpperCase())
    .join("");

const getAvatarSources = (props) => {
  const { data, value, avatarField, colDef } = props;
  const field = avatarField || colDef?.field;
  const key = (avatarField && data?.[avatarField]) || value;
  return [assetUrl(key), field ? data?.[`${field}_url`] : null].filter(
    (source, index, sources) => Boolean(source) && sources.indexOf(source) === index,
  );
};

export const AvatarRenderer = (props) => {
  const { data, firstNameField, lastNameField, usernameField } = props;
  const username = getUsername(data, usernameField);
  const initials = getInitials(data, firstNameField, lastNameField);

  return (
    <div className="d-flex flex-row align-items-center w-100 h-100 gap-3 font-size-sm overflow-hidden">
      <ProfileAvatar
        src={getAvatarSources(props)}
        initials={initials}
        size="2rem"
        alt={username ? `@${username}` : ""}
      />
      {username && <span className="text-truncate">@{username}</span>}
    </div>
  );
};
