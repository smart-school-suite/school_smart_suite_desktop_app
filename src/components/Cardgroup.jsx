import { Icon } from "@iconify/react"
function CardGroup(){
    return(
        <>
       <div className="d-flex flex-row w-100 justify-content-between gap-5 align-items-center me-4">
          <div className="image-container">
            <div className="rounded-box d-flex flex-row align-items-center justify-content-center light-skyblue-bg">
            <Icon icon="stash:arrow-up-duotone" className="card-icon fs-5"/>
            </div>
            <img
              src="./images/card-one.png"
              alt=""
              className="background-image z-0"
            />
            <div className="overlay-content z-3 ps-2">
              <div class="z-3 position-absolute d-flex flex-column h-100 pb-2 pt-1">
                <div className="d-flex flex-row align-items-center gap-3 mt-1">
                  <button
                    className="border-none rounded-circle"
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "2rem",
                      backgroundColor:"#C6E3F1"
                    }}
                  >
                    <Icon icon="game-icons:receive-money" className="dark-slate-gray-color"/>
                  </button>
                  <span>Total Revenue</span>
                </div>
                <div className="mt-auto">
                  <div>
                    <h4 className="fw-semibold ms-1 dark-slate-gray-color">$2,500,00</h4>
                  </div>
                  <div className="d-flex flex-row align-items-center gap-2">
                    <button className="rounded-pill px-2 py-1 d-flex gap-2 border-none font-size-sm"style={{ backgroundColor:"#C6E3F1" }} >
                      <span>
                        <Icon icon="stash:arrow-up-duotone" className="card-icon fs-6"/>
                      </span>
                      <span>20%</span>
                    </button>
                    <span className="font-size-sm">Than Last Year</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="image-container">
            <div className="rounded-box d-flex flex-row align-items-center justify-content-center light-peach-bg">
            <Icon icon="stash:arrow-up-duotone" className="card-icon fs-5"/>
            </div>
            <img
              src="./images/card-two.png"
              alt=""
              className="background-image z-0"
            />
            <div className="overlay-content z-3 ps-2">
              <div class="z-3 position-absolute d-flex flex-column h-100 pb-2 pt-1">
                <div className="d-flex flex-row align-items-center gap-3 mt-1">
                  <button
                    className="border-none rounded-circle"
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "2rem",
                      backgroundColor:"#FFE4D5"
                    }}
                  >
                    <Icon icon="game-icons:receive-money" className="dark-slate-gray-color"/>
                  </button>
                  <span>Total Revenue</span>
                </div>
                <div className="mt-auto">
                  <div>
                    <h4 className="fw-semibold ms-1 dark-slate-gray-color">$2,500,00</h4>
                  </div>
                  <div className="d-flex flex-row align-items-center gap-2">
                    <button className="rounded-pill px-2 py-1 d-flex gap-2 border-none font-size-sm"style={{ backgroundColor:"#FFE4D5" }} >
                      <span>
                        <Icon icon="stash:arrow-up-duotone" className="card-icon fs-6"/>
                      </span>
                      <span>20%</span>
                    </button>
                    <span className="font-size-sm">Than Last Year</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="image-container ">
            <div className="rounded-box d-flex flex-row align-items-center justify-content-center cornflower-blue-bg">
            <Icon icon="stash:arrow-up-duotone" className="card-icon fs-5"/>
            </div>
            <img
              src="./images/card-three.png"
              alt=""
              className="background-image z-0"
            />
            <div className="overlay-content z-3 ps-2">
              <div class="z-3 position-absolute d-flex flex-column h-100 pb-2 pt-1">
                <div className="d-flex flex-row align-items-center gap-3 mt-1">
                  <button
                    className="border-none rounded-circle"
                    style={{
                      width: "2rem",
                      height: "2rem",
                      borderRadius: "2rem",
                      backgroundColor:"#9DBFDC"
                    }}
                  >
                    <Icon icon="game-icons:receive-money" className="dark-slate-gray-color"/>
                  </button>
                  <span>Total Revenue</span>
                </div>
                <div className="mt-auto">
                  <div>
                    <h4 className="fw-semibold ms-1 dark-slate-gray-color">$2,500,00</h4>
                  </div>
                  <div className="d-flex flex-row align-items-center gap-2">
                    <button className="rounded-pill px-2 py-1 d-flex gap-2 border-none font-size-sm"style={{ backgroundColor:"#9DBFDC" }} >
                      <span>
                        <Icon icon="stash:arrow-up-duotone" className="card-icon fs-6"/>
                      </span>
                      <span>20%</span>
                    </button>
                    <span className="font-size-sm">Than Last Year</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}
export default CardGroup