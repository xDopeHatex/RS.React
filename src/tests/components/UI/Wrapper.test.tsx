import { render, screen } from '@testing-library/react';
import Wrapper from '../../../components/UI/Wrapper.tsx';
import { describe, it, expect } from 'vitest';

describe('Wrapper Component', () => {
  it('renders children correctly', () => {
    render(
      <Wrapper>
        <p>Test Content</p>
      </Wrapper>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies correct styles', () => {
    render(
      <Wrapper>
        <p>Test Content</p>
      </Wrapper>
    );
    const wrapperElement = screen.getByText('Test Content').parentElement;
    expect(wrapperElement).toHaveClass(
      'mx-auto max-w-[1280px] py-[10px] px-[60px]'
    );
  });
});
