import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Services from './Processes';

describe('<Services />', () => {
  test('it should mount', () => {
    render(<Services />);
    
    const services = screen.getByTestId('Services');

    expect(services).toBeInTheDocument();
  });
});
