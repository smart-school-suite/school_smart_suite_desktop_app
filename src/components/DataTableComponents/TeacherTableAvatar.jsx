export const TeacherAvatarComponent = (props) => {
    return (
      <>
        {
             props.value  ? (
                <div
                style={{ width: "2.8rem", height: "2.8rem" }}
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
                style={{ width: "2.8rem", height: "2.8rem" }}
                className="rounded-circle"
              >
                <img
                  src="./images/user.png"
                  alt=""
                  className="object-fit-cover w-100 h-100"
                  style={{ borderRadius: "2.8rem" }}
                />
              </div>
             )
        }
      </>
    );
  };