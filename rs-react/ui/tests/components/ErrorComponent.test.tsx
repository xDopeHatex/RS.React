import { render } from '@testing-library/react';
import ErrorComponent from '../../components/ErrorComponent.tsx';
import { describe, it, expect } from 'vitest';

describe('ErrorComponent', () => {
  it('should throw an error when rendered', () => {
    expect(() => render(<ErrorComponent />)).toThrow('Intentional Error');
  });
});
