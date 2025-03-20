import { useEffect, useRef, useState } from "react";
import styles from "../../styles/components/common/CustomSelect.module.scss";

export type Option = {
  value: string | number;
  label: string;
};

export type CustomSelectProps = {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
  placeholder?: string;
  name?: string;
  id?: string;
};

const CustomSelect = ({
  options,
  value,
  onChange,
  className = "",
  placeholder = "Select an option",
  name,
  id,
}: CustomSelectProps) => {
  // State for dropdown open/close
  const [isOpen, setIsOpen] = useState(false);
  // State to track if options are expanded to full height
  const [isExpanded, setIsExpanded] = useState(false);

  // Find the index of the current value
  const currentValueIndex = options.findIndex(
    (option) => option.value === value,
  );

  // Track currently highlighted option (for scrolling)
  const [highlightedIndex, setHighlightedIndex] = useState(
    currentValueIndex >= 0 ? currentValueIndex : 0,
  );

  // State to track dropdown positioning readiness
  const [isPositioned, setIsPositioned] = useState(false);

  // Refs for DOM elements
  const containerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        // When closing, select the center option
        selectCenterOption();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [options]);

  // Reset highlighted index when value changes externally
  useEffect(() => {
    if (currentValueIndex >= 0) {
      setHighlightedIndex(currentValueIndex);
    }
  }, [value, currentValueIndex]);

  // Reset positioned state when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setIsPositioned(false);
    }
  }, [isOpen]);

  // Setup scrolling and highlighting when dropdown opens
  useEffect(() => {
    if (!isOpen || !optionsRef.current) return;

    // Center the selected option on open immediately without animation
    scrollToIndex(currentValueIndex >= 0 ? currentValueIndex : 0, false);

    // Mark dropdown as positioned after positioning is complete
    requestAnimationFrame(() => {
      setIsPositioned(true);
    });

    const optionsContainer = optionsRef.current;

    // Handle mousewheel scrolling
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Determine scroll direction
      const direction = e.deltaY > 0 ? 1 : -1;

      // Update highlighted index based on wheel direction
      setHighlightedIndex((prev) => {
        const newIndex = Math.max(
          0,
          Math.min(options.length - 1, prev + direction),
        );
        // Smooth scroll to the new index
        scrollToIndex(newIndex);
        return newIndex;
      });
    };

    // Update highlighted option on scroll
    const handleScroll = () => {
      // Find which option is in the center and highlight it
      const centerIndex = findCenterOption();
      setHighlightedIndex(centerIndex);
    };

    optionsContainer.addEventListener("wheel", handleWheel, { passive: false });
    optionsContainer.addEventListener("scroll", handleScroll);

    return () => {
      optionsContainer.removeEventListener("wheel", handleWheel);
      optionsContainer.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, currentValueIndex, options.length]);

  // Find which option is currently in the center of the viewport
  const findCenterOption = (): number => {
    if (!optionsRef.current) return highlightedIndex;

    const container = optionsRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.top + containerRect.height / 2;

    // Find the option closest to the center
    let closestIndex = highlightedIndex;
    let minDistance = Infinity;

    optionRefs.current.forEach((optionEl, index) => {
      if (!optionEl) return;

      const optionRect = optionEl.getBoundingClientRect();

      // Check if option is visible
      const isVisible =
        optionRect.bottom > containerRect.top &&
        optionRect.top < containerRect.bottom;

      if (isVisible) {
        // Calculate distance from center
        const optionCenter = optionRect.top + optionRect.height / 2;
        const distance = Math.abs(containerCenter - optionCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      }
    });

    return closestIndex;
  };

  // Select the option in the center of the viewport
  const selectCenterOption = () => {
    const centerIndex = findCenterOption();
    if (centerIndex >= 0 && centerIndex < options.length) {
      onChange(options[centerIndex].value);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) {
      if (event.key === "Enter" || event.key === " ") {
        setIsOpen(true);
        event.preventDefault();
      }
      return;
    }

    switch (event.key) {
      case "ArrowUp":
        if (highlightedIndex > 0) {
          setHighlightedIndex(highlightedIndex - 1);
          scrollToIndex(highlightedIndex - 1);
        }
        event.preventDefault();
        break;
      case "ArrowDown":
        if (highlightedIndex < options.length - 1) {
          setHighlightedIndex(highlightedIndex + 1);
          scrollToIndex(highlightedIndex + 1);
        }
        event.preventDefault();
        break;
      case "Enter":
      case " ":
        // Select the highlighted option
        if (highlightedIndex >= 0 && highlightedIndex < options.length) {
          onChange(options[highlightedIndex].value);
        }
        setIsOpen(false);
        event.preventDefault();
        break;
      case "Escape":
        setIsOpen(false);
        event.preventDefault();
        break;
      case "Tab":
        // Select the center option when tabbing away
        selectCenterOption();
        setIsOpen(false);
        break;
    }
  };

  // Scroll to a specific option index
  const scrollToIndex = (index: number, smooth = true) => {
    if (!optionsRef.current || index < 0 || index >= options.length) return;

    const optionsContainer = optionsRef.current;
    const optionEl = optionRefs.current[index];

    if (!optionEl) return;

    // Calculate scroll position to center the option
    const containerHeight = optionsContainer.clientHeight;
    const optionHeight = optionEl.clientHeight;

    // Using offsetTop gives the most accurate position
    const optionTop = optionEl.offsetTop;

    // Center the option in the viewport
    const scrollTop = optionTop - containerHeight / 2 + optionHeight / 2;

    // Scroll to position
    optionsContainer.scrollTo({
      top: Math.max(0, scrollTop),
      behavior: smooth ? "smooth" : "auto",
    });
  };

  // Handle component losing focus
  const handleBlur = (event: React.FocusEvent) => {
    if (!containerRef.current?.contains(event.relatedTarget as Node)) {
      setIsOpen(false);
      selectCenterOption();
    }
  };

  // Handle opening and closing the dropdown
  const handleToggleDropdown = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    if (newIsOpen) {
      // Reset expanded state when opening
      setIsExpanded(false);

      // Use a very short timeout to ensure transition is visible
      requestAnimationFrame(() => {
        setIsExpanded(true);
      });
    }
  };

  // Reset expanded state when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setIsExpanded(false);
    }
  }, [isOpen]);

  // Keep item centered during expansion animation
  useEffect(() => {
    if (isOpen && isPositioned && optionsRef.current) {
      // Re-center the highlighted option when expansion state changes
      scrollToIndex(highlightedIndex, false);
    }
  }, [isExpanded, highlightedIndex, isOpen, isPositioned]);

  return (
    <div
      ref={containerRef}
      className={`${styles.customSelect} ${className}`}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      tabIndex={-1}
      role="presentation"
    >
      {/* Select trigger button */}
      <div
        ref={selectRef}
        className={styles.selectTrigger}
        onClick={handleToggleDropdown}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleToggleDropdown();
            e.preventDefault();
          }
        }}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="custom-select-options"
        id={id}
      >
        <span>{options[currentValueIndex]?.label || placeholder}</span>
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div
          ref={optionsRef}
          className={`
            ${styles.optionsContainer} 
            ${isPositioned ? styles.visible : styles.hidden} 
            ${isExpanded ? styles.expanded : styles.collapsed}
            ${className}Options
          `}
          role="listbox"
          id="custom-select-options"
          aria-activedescendant={`option-${highlightedIndex}`}
          tabIndex={-1}
        >
          <div className={styles.optionsWrapper}>
            {/* Add empty placeholder at the top with the same height as an option */}
            <div className={styles.placeholder}></div>

            {options.map((option, index) => (
              <div
                key={option.value}
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                data-index={index}
                className={`${styles.option} 
                  ${highlightedIndex === index ? styles.highlighted : ""} 
                  ${currentValueIndex === index ? styles.selected : ""} 
                  ${styles.optionText}`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onChange(option.value);
                    setIsOpen(false);
                  }
                }}
                role="option"
                aria-selected={currentValueIndex === index}
                id={`option-${index}`}
                tabIndex={0}
              >
                <span className={styles.labelText}>{option.label}</span>
              </div>
            ))}

            {/* Add empty placeholder at the bottom with the same height as an option */}
            <div className={styles.placeholder}></div>
          </div>
        </div>
      )}

      {/* Hidden native select for form submission */}
      <select
        name={name}
        value={value}
        onChange={() => {}}
        aria-hidden="true"
        className={styles.hiddenSelect}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
