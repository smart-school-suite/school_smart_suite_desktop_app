function UpdateCaScores({ handleClose, rowData }){
  const { id:candidateId } = rowData
  console.table(rowData);
    return(
        <>
        <span>{candidateId}</span>
        </>
    )
}
export default UpdateCaScores;