import { useState, useEffect, useRef, ChangeEvent } from "react";
import clsx from "clsx";
import styles from "../../styles/components/filters/PriceRangeSlider.module.scss";
import { flatMapJoin } from "../../utils";

type PriceRangeSliderProps = {
  min: number;
  max: number;
  initialMin?: number;
  initialMax?: number;
};

// Slider component with dual thumbs for selecting a price range
const PriceRangeSlider = ({
  min,
  max,
  initialMin,
  initialMax,
}: PriceRangeSliderProps) => {
  // State for validated values
  const [minVal, setMinVal] = useState(initialMin ?? min);
  const [maxVal, setMaxVal] = useState(initialMax ?? max);
  const [topThumb, setTopThumb] = useState<"min" | "max">("max");

  // State for input fields (allowing free typing)
  const [inputValues, setInputValues] = useState({
    min: minVal.toString(),
    max: maxVal.toString(),
  });

  // Refs
  const progressRef = useRef<HTMLDivElement>(null);

  // Update validated value with constraints
  const updateValue = (newValue: number, isMin: boolean) => {
    if (isMin) {
      const constrainedValue = Math.max(min, Math.min(newValue, maxVal - 1));
      setMinVal(constrainedValue);
      setInputValues((prev) => ({ ...prev, min: constrainedValue.toString() }));
      setTopThumb("min");
    } else {
      const constrainedValue = Math.min(max, Math.max(newValue, minVal + 1));
      setMaxVal(constrainedValue);
      setInputValues((prev) => ({ ...prev, max: constrainedValue.toString() }));
      setTopThumb("max");
    }
  };

  // Update progress bar and manage thumb display
  useEffect(() => {
    if (!progressRef.current) return;

    // Calculate percentages for progress bar
    const getPercent = (value: number) =>
      Math.round(((value - min) / (max - min)) * 100);

    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxVal);

    // Update progress bar
    progressRef.current.style.left = `${minPercent}%`;
    progressRef.current.style.width = `${maxPercent - minPercent}%`;

    // Set top thumb based on position
    const isMinNearRight = minVal > min + (max - min) * 0.7;

    if (isMinNearRight && topThumb !== "min") {
      setTopThumb("min");
    } else if (!isMinNearRight && topThumb !== "max") {
      setTopThumb("max");
    }
  }, [minVal, maxVal, min, max, topThumb]);

  // Event handlers
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    isMin: boolean,
  ) => {
    const field = isMin ? "min" : "max";
    setInputValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validateInput = (value: string, isMin: boolean) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue)) {
      updateValue(parsedValue, isMin);
    } else {
      // Reset to current valid value if input is invalid
      setInputValues((prev) => ({
        ...prev,
        [isMin ? "min" : "max"]: isMin ? minVal.toString() : maxVal.toString(),
      }));
    }
  };

  // Input configuration for mapping
  const inputConfig = [
    {
      name: "minPrice",
      isMin: true,
      value: inputValues.min,
      minConstraint: min,
      maxConstraint: maxVal - 1,
    },
    {
      name: "maxPrice",
      isMin: false,
      value: inputValues.max,
      minConstraint: minVal + 1,
      maxConstraint: max,
    },
  ];

  // Create input elements
  const inputElements = inputConfig
    .map((config) => (
      <div key={config.isMin ? "min" : "max"} className={styles.inputWrapper}>
        <span className={styles.currencySymbol}>$</span>
        <input
          className={styles.priceInput}
          type="number"
          name={config.name}
          value={config.value}
          onChange={(e) => handleInputChange(e, config.isMin)}
          onBlur={(e) => validateInput(e.target.value, config.isMin)}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            validateInput(e.currentTarget.value, config.isMin)
          }
          min={config.minConstraint}
          max={config.maxConstraint}
        />
      </div>
    ))
    .flatMap(flatMapJoin(<span key="sep">-</span>));

  const sliderThumbs = [true, false].map((isMin) => (
    <input
      key={isMin ? "min" : "max"}
      type="range"
      min={min}
      max={max}
      value={isMin ? minVal : maxVal}
      onChange={(e) => updateValue(+e.target.value, isMin)}
      onMouseDown={() => setTopThumb(isMin ? "min" : "max")}
      className={clsx(styles.range, isMin ? styles.minRange : styles.maxRange, {
        [styles.topThumb]: topThumb === (isMin ? "min" : "max"),
      })}
    />
  ));

  return (
    <div className={styles.priceRangeContainer}>
      {/* Number inputs */}
      <div className={styles.inputGroup}>{inputElements}</div>

      {/* Slider */}
      <div className={styles.sliderContainer}>
        <div className={styles.rangeSlider}>
          <div className={styles.progress} ref={progressRef}></div>
        </div>
        {sliderThumbs}
      </div>

      {/* Range labels */}
      <div className={styles.rangeValues}>
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
