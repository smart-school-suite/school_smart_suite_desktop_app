export const AvatarRenderer = (props) => {
  return (
    <>
      {props.value ? (
        <div
          style={{ width: "2rem", height: "2rem" }}
          className="rounded-circle"
        >
          <img
            src={`http://127.0.0.1:8000/storage/TeacherAvatars/${props?.data?.author_avatar}`}
            alt=""
            className="object-fit-cover w-100 h-100"
            style={{ borderRadius: "2.8rem" }}
          />
        </div>
      ) : (
        <div className="d-flex flex-row align-items-center w-100 h-100 gap-3 font-size-sm">
          {/* Your marvelous Grid Image Wrapper */}
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
            <span>
              {getInitials(
                props?.data?.first_name,
                props?.data?.last_name,
              )}
            </span>
          </div>
          <span
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            @{props?.data?.username}
          </span>
        </div>
      )}
    </>
  );
};

function getInitials(firstName, lastName) {
  if (!firstName || !lastName) {
    return "";
  }

  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();

  return firstInitial + lastInitial;
}
