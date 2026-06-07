export function Error({ title, description, children, maxHeight="250px", maxWidth="250px" }){
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
                  maxWidth: maxWidth,
                  maxHeight: maxHeight,
                  objectFit: "contain",
                }}
              />
            </div>
            <div className="gainsboro-color text-center">
              <span className="font-size-sm fw-semibold">{title}</span>
              <p className="font-size-sm">
                {description}
              </p>
              {children}
            </div>
          </div>
      </>
    )
}


export function NotFoundError({ title, description, children, maxHeight="250px", maxWidth="250px" }){
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
                  maxWidth: maxWidth,
                  maxHeight: maxHeight,
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
