function TextComponent(props){
    return(
        <>
        <span className="text-overflow-elipse overflow-hidden my-0 text-start">{props.value}</span>
        </>
    )
}
export default TextComponent;