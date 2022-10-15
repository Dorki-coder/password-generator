import s from "./InputRange.module.css";

export default function InputRange({ setRangeval }) {
  return (
    <div>
      <input
        className={s.slider}
        type="range"
        min="6"
        max="18"
        defaultValue="8"
        onChange={(e) => setRangeval(e.target.value)}
      />
    </div>
  );
}
