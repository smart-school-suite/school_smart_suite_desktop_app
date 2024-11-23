import { OverlayTrigger, Tooltip } from 'react-bootstrap';
function CustomTooltip({ children, tooltipText, placement = 'top', delay = { show: 100, hide: 400 } }){
    const renderTooltip = (props) => (
        <Tooltip id="tooltip" {...props} className='font-size-sm'>
            {tooltipText}
        </Tooltip>
    );
    return(
        <>
         <OverlayTrigger
            placement={placement}
            delay={delay}
            overlay={renderTooltip}
        >
            {children}
        </OverlayTrigger>
        </>
    )
}
export default CustomTooltip;