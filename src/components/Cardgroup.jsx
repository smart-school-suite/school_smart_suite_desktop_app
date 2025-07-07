
function CardGroup({ cardOne, cardTwo, cardThree}){
    return(
        <>
       <div className="d-flex flex-row w-100 justify-content-between gap-5 align-items-center me-4">
          <div className="image-container">
            {cardOne}
          </div>
          <div className="image-container">
            {cardTwo}
          </div>
          <div className="image-container ">
            {cardThree}
          </div>
        </div>
        </>
    )
}
export default CardGroup