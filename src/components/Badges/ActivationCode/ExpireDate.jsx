import { format, parseISO } from 'date-fns';

function ExpireDate(props) {
  if (!props.value) return null;

  const formattedDate = format(parseISO(props.value), 'd MMM yyyy h aaa');

  return (
    <>
      <span>{formattedDate}</span>
    </>
  );
}
export default ExpireDate;