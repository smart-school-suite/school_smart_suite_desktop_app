function TextComponent(props){
    return(
        <>
        <span className="text-overflow-elipse overflow-hidden my-0 text-start font-size-sm text-capitalize">{props.value}</span>
        </>
    )
}
export default TextComponent;