import s from "./CustomCheckbox.module.css";

export default function CustomCheckbox({ name, active, setActive }) {
  return (
    <div className={s.checkbox_wrapper}>
      <div
        onClick={() => setActive(!active)}
        className={`${s.checkbox} ${active ? s.active : null}`}
      >
        {active ? (
          <svg width="14" height="12" xmlns="http://www.w3.org/2000/svg">
            <path
              stroke="#18171F"
              strokeWidth="3"
              fill="none"
              d="M1 5.607 4.393 9l8-8"
            />
          </svg>
        ) : null}
      </div>
      <span>{name}</span>
    </div>
  );
}
