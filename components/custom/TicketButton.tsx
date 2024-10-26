import React, { useState } from 'react';
import { Button } from '../ui/button'; // Adjust import path to where your shadcn Button component is located

interface NumberPickerProps {
  initialCount?: number;
  min?: number;
  max?: number;
  onChange?: (count: number) => void;
}

const NumberPicker: React.FC<NumberPickerProps> = ({
  initialCount = 1,
  min = 1,
  max = 10,
  onChange,
}) => {
  const [count, setCount] = useState<number>(initialCount);

  const increment = () => {
    if (count < max) {
      const newCount = count + 1;
      setCount(newCount);
      onChange && onChange(newCount);
    }
  };

  const decrement = () => {
    if (count > min) {
      const newCount = count - 1;
      setCount(newCount);
      onChange && onChange(newCount);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" onClick={decrement} disabled={count === min}>
        -
      </Button>
      <span className="text-center w-8">{count}</span>
      <Button variant="outline" onClick={increment} disabled={count === max}>
        +
      </Button>
    </div>
  );
};

export default NumberPicker;
