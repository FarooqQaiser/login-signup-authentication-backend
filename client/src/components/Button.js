export default function Button({
  name,
  bgColor,
  txtColor,
  border,
  borderValue,
  borderColor,
  hoverBgColor,
  hoverTextColor,
  hoverBorderColor,
  buttonFunction,
}) {
  return (
    <>
      <button
        className={`px-7 py-1.5 ${bgColor ? bgColor : ""} ${
          txtColor ? txtColor : ""
        } ${border ? border : ""} ${borderValue ? borderValue : ""} ${
          borderColor ? borderColor : ""
        } transition delay-150 duration-300 ease-in-out ${
          hoverBgColor ? hoverBgColor : ""
        }
        ${hoverTextColor ? hoverTextColor : ""}
        ${hoverBorderColor ? hoverBorderColor : ""} rounded-md`}
        onClick={buttonFunction}
      >
        {name ? name : "Button"}
      </button>
    </>
  );
}
