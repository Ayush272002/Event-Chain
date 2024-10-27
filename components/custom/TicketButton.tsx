import React from 'react';
import { Button } from '../ui/button';

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
  const [count, setCount] = React.useState(initialCount);

  React.useEffect(() => {
    if (onChange) {
      onChange(count);
    }
  }, [count, onChange]);

  const increment = () => {
    if (count < max) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > min) {
      setCount(count - 1);
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
