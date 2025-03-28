import { useState, ChangeEvent, useEffect, useCallback } from "react";
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

const enforceMinRange = (min: number, max: number) => {
  if (max - min < 100) {
    const mid = (min + max) / 2;
    min = Math.max(min, mid - 50);
    max = min + 100;
  }
  return [min, max];
};

const PriceRangeSlider = ({
  min: _min,
  max: _max,
  initialMin: _initialMin,
  initialMax: _initialMax,
  onChange,
  onChangeComplete,
}: PriceRangeSliderProps) => {
  const [min, max] = enforceMinRange(_min, _max);
  const [initialMin, initialMax] = enforceMinRange(
    _initialMin ?? min,
    _initialMax ?? max,
  );

  const getInitialValues = useCallback(
    () => ({ min: initialMin, max: initialMax }),
    [initialMin, initialMax],
  );

  // State for slider values (constrained)
  const [range, setRange] = useState<Range>(getInitialValues());
  // State for input values (unconstrained, allows temporary invalid values)
  const [inputValues, setInputValues] = useState<Range>(getInitialValues());

  useEffect(() => {
    setRange(getInitialValues());
    setInputValues(getInitialValues());
  }, [getInitialValues]);

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

  const [minInput, maxInput] = (["min", "max"] as const).map((key) => (
    <div key={`input-${key}`} className={styles.inputWrapper}>
      <span className={styles.currencySymbol}>$</span>
      <input
        className={styles.priceInput}
        type="number"
        value={inputValues[key]}
        onChange={(e) => handleInputChange(e, key)}
        onBlur={completeChange}
        onKeyDown={(e) => e.key === "Enter" && pd(completeChange)(e)}
      />
    </div>
  ));

  const [minThumb, maxThumb] = (["min", "max"] as const).map((key) => (
    <input
      key={`thumb-${key}`}
      type="range"
      min={min}
      max={max}
      value={range[key]}
      onChange={(e) => handleSliderChange(e, key)}
      onMouseUp={completeChange}
      onTouchEnd={completeChange}
      className={clsx(styles.range, styles[`${key}Range`], {
        [styles.topThumb]: isTopThumb(key),
      })}
    />
  ));

  return (
    <div className={styles.priceRangeContainer}>
      {/* Number inputs */}
      <div className={styles.inputGroup}>
        {minInput}
        <span>-</span>
        {maxInput}
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

        {minThumb}
        {maxThumb}
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
