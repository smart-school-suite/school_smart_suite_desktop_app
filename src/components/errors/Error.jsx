import { useNavigate } from "react-router-dom"
export function Error({ title, description, path, children }){
  const navigate = useNavigate();
    return(
      <>
      <div
            className="d-flex flex-column align-items-center justify-content-center align-items-center w-100"
            style={{ height: "75dvh" }}
          >
            <div>
              <img
                src="./sss-maskot/error.png"
                style={{
                  maxWidth: "25rem",
                  maxHeight: "25rem",
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="gainsboro-color text-center">
              <h5>{title}</h5>
              <p className="font-size-sm">
                {description}
              </p>
              {children}
            </div>
          </div>
      </>
    )
}


export function NotFoundError({ title, description, children }){
    return(
      <>
      <div
            className="d-flex flex-column align-items-center justify-content-center w-100"
            style={{ height: "75dvh" }}
          >
            <div>
              <img
                src="./sss-maskot/404.png"
                style={{
                  maxWidth: "25rem",
                  maxHeight: "25rem",
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="gainsboro-color text-center">
              <h5>{title}</h5>
              <p className="font-size-sm">
                {description}
              </p>
              {children}
            </div>
          </div>
      </>
    )
}
