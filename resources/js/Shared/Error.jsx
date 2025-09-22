export default function Error(props) {
    const { msg } = props;

    return (
        <div className="text-sm text-red-500">{msg}</div>
    );
}
