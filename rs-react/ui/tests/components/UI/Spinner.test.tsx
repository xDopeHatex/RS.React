import { render, screen } from '@testing-library/react';
import Spinner from '../../../components/UI/Spinner.tsx';
import { describe, it, expect } from 'vitest';

describe('Spinner Component', () => {
  it('renders correctly', () => {
    render(<Spinner />);
    const svgElement = screen.getByRole('img', { hidden: true });
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute('viewBox', '0 0 100 100');
    expect(svgElement).toHaveAttribute('width', '100');
  });

  it('contains a spinning circle', () => {
    render(<Spinner />);
    const circleElement = screen
      .getByRole('img', { hidden: true })
      .querySelector('circle');
    expect(circleElement).toBeInTheDocument();
    expect(circleElement).toHaveAttribute('cx', '50');
    expect(circleElement).toHaveAttribute('cy', '50');
    expect(circleElement).toHaveAttribute('r', '45');
    expect(circleElement).toHaveClass(
      'stroke-gray-500 stroke-[4] fill-blue-300'
    );
  });

  it('contains a pulsating rectangle', () => {
    render(<Spinner />);
    const rectElement = screen
      .getByRole('img', { hidden: true })
      .querySelector('rect');
    expect(rectElement).toBeInTheDocument();
    expect(rectElement).toHaveAttribute('x', '25');
    expect(rectElement).toHaveAttribute('y', '25');
    expect(rectElement).toHaveAttribute('width', '50');
    expect(rectElement).toHaveAttribute('height', '50');
    expect(rectElement).toHaveClass('fill-white fill-opacity-50 animate-pulse');
  });

  it('contains a spinning polygon', () => {
    render(<Spinner />);
    const polygonElement = screen
      .getByRole('img', { hidden: true })
      .querySelector('polygon');
    expect(polygonElement).toBeInTheDocument();
    expect(polygonElement).toHaveAttribute(
      'points',
      '63,57.5 50,65 37,57 37,42.5 50,35 63,42.5'
    );
    expect(polygonElement).toHaveClass('fill-green-300 animate-spin');
  });
});
