export const TeacherAvatarComponent = (props) => {
  return (
    <>
      {props.value ? (
        <div
          style={{ width: "2rem", height: "2rem" }}
          className="rounded-circle"
        >
          <img
            src={`http://127.0.0.1:8000/storage/TeacherAvatars/${props.value}`}
            alt=""
            className="object-fit-cover w-100 h-100"
            style={{ borderRadius: "2.8rem" }}
          />
        </div>
      ) : (
        <div
          className="d-flex flex-row align-items-center w-100 h-100 gap-3 font-size-sm"
        >
          {/* Your marvelous Grid Image Wrapper */}
          <div
            style={{
              width: "2rem",
              height: "2rem",
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
            className="rounded-circle"
          >
            <img
              src="./images/user.png"
              alt=""
              className="object-fit-cover w-100 h-100 rounded-circle" 
            />
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
