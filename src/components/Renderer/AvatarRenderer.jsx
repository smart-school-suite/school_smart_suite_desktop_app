
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

function getInitials(data, firstNameField, lastNameField) {
  const firstName = getFirstName(data, firstNameField);
  const lastName = getLastName(data, lastNameField);

  if (!firstName && !lastName) return "";

  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";

  return firstInitial + lastInitial;
}

export const AvatarRenderer = (props) => {
  const data = props.data;
  const { firstNameField, lastNameField, usernameField, avatarField } = props;

  const username = getUsername(data, usernameField);
  const initials = getInitials(data, firstNameField, lastNameField);
  const avatarFileName = avatarField && data?.[avatarField] ? data[avatarField] : data?.author_avatar;

  return (
    <>
      {props.value ? (
        <div
          style={{ width: "2rem", height: "2rem" }}
          className="rounded-circle"
        >
          <img
            src={`http://127.0.0.1:8000/storage/TeacherAvatars/${avatarFileName}`}
            alt=""
            className="object-fit-cover w-100 h-100"
            style={{ borderRadius: "2.8rem" }}
          />
        </div>
      ) : (
        <div className="d-flex flex-row align-items-center w-100 h-100 gap-3 font-size-sm">
          <div
            style={{
              width: "2rem",
              height: "2rem",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
            className="rounded-circle primary-background-100 color-primary 
                       d-flex align-items-center justify-content-center fw-semibold
                       overflow-hidden"
          >
            <span>{initials}</span>
          </div>
          {username && (
            <span
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
            >
              @{username}
            </span>
          )}
        </div>
      )}
    </>
  );
};