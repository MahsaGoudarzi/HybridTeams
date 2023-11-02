export default function HButton(props: {
  primary?: boolean;
  onClick?: () => {};
  disabled?: boolean;
  children?: any;
  bgCustom?: string;
  textColorCustom?: string;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <button
      type={props.type}
      className={`py-2 px-4 rounded-md text-base cursor-pointer text-white ${
        props.primary && !props?.bgCustom
          ? "bg-pink-400"
          : "bg-transparent border-white border"
      } ${props.bgCustom} ${props.textColorCustom}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
