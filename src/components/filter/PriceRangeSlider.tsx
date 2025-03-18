import { useState, ChangeEvent } from "react";
import clsx from "clsx";
import styles from "../../styles/components/filters/PriceRangeSlider.module.scss";
import { pd } from "../../utils";

type ThumbKey = "min" | "max";
type Range = Record<ThumbKey, number>;
type PriceRangeSliderProps = {
  min: number;
  max: number;
  initialMin?: number;
  initialMax?: number;
  onChange?: (values: Range) => void;
  onChangeComplete?: (values: Range) => void;
};

const PriceRangeSlider = ({
  min,
  max,
  initialMin,
  initialMax,
  onChange,
  onChangeComplete,
}: PriceRangeSliderProps) => {
  // State for slider values (constrained)
  const [range, setRange] = useState<Range>({
    min: initialMin ?? min,
    max: initialMax ?? max,
  });
  // State for input values (unconstrained, allows temporary invalid values)
  const [inputValues, setInputValues] = useState<Range>(range);

  const getPercent = (key: ThumbKey) =>
    Math.round(((range[key] - min) / (max - min)) * 100);

  // Determine if the thumb is on the top or bottom so that we don't get stuck when they overlap at the edges
  const isTopThumb = (thumb: ThumbKey) =>
    ({ min: getPercent("min") > 50, max: getPercent("max") < 50 })[thumb];

  const applyConstraints = ({ min: newMin, max: newMax }: Range): Range => {
    const sanitizedMin = Math.max(min, Math.min(newMin, newMax - 1));
    const sanitizedMax = Math.min(max, Math.max(newMax, sanitizedMin + 1));
    const sanitizedRange = { min: sanitizedMin, max: sanitizedMax };

    setRange(sanitizedRange);
    setInputValues(sanitizedRange);

    return sanitizedRange;
  };

  const handleSliderChange = (
    e: ChangeEvent<HTMLInputElement>,
    thumb: ThumbKey,
  ) => {
    const newRange = { ...range, [thumb]: +e.target.value };

    const constrainedRange = applyConstraints(newRange);
    onChange?.(constrainedRange);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    thumb: ThumbKey,
  ) => {
    const newInputValues = { ...inputValues, [thumb]: +e.target.value };

    setInputValues(newInputValues);
    onChange?.(newInputValues);
  };

  const completeChange = () =>
    onChangeComplete?.(applyConstraints(inputValues));

  return (
    <div className={styles.priceRangeContainer}>
      {/* Number inputs */}
      <div className={styles.inputGroup}>
        <div className={styles.inputWrapper}>
          <span className={styles.currencySymbol}>$</span>
          <input
            className={styles.priceInput}
            type="number"
            name="priceMin"
            value={inputValues.min}
            onChange={(e) => handleInputChange(e, "min")}
            onBlur={completeChange}
            onKeyDown={(e) => e.key === "Enter" && pd(completeChange)(e)}
          />
        </div>
        <span>-</span>
        <div className={styles.inputWrapper}>
          <span className={styles.currencySymbol}>$</span>
          <input
            className={styles.priceInput}
            type="number"
            name="priceMax"
            value={inputValues.max}
            onChange={(e) => handleInputChange(e, "max")}
            onBlur={completeChange}
            onKeyDown={(e) => e.key === "Enter" && pd(completeChange)(e)}
          />
        </div>
      </div>

      {/* Slider */}
      <div className={styles.sliderContainer}>
        <div className={styles.rangeSlider}>
          <div
            className={styles.progress}
            style={{
              left: `${getPercent("min")}%`,
              width: `${getPercent("max") - getPercent("min")}%`,
            }}
          ></div>
        </div>

        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={range.min}
          onChange={(e) => handleSliderChange(e, "min")}
          onMouseUp={completeChange}
          onTouchEnd={completeChange}
          className={clsx(styles.range, styles.minRange, {
            [styles.topThumb]: isTopThumb("min"),
          })}
        />

        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={range.max}
          onChange={(e) => handleSliderChange(e, "max")}
          onMouseUp={completeChange}
          onTouchEnd={completeChange}
          className={clsx(styles.range, styles.maxRange, {
            [styles.topThumb]: isTopThumb("max"),
          })}
        />
      </div>

      {/* Range labels */}
      <div className={styles.rangeValues}>
        <span>${min}</span>
        <span>${max}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
