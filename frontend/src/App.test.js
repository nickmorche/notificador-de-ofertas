import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('renderiza título da aplicação', () => {
  render(<App />);
  const heading = screen.getByText(/Ofertas Cadastradas/i);
  expect(heading).toBeInTheDocument();
});
