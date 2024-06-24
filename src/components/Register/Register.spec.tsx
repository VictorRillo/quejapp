import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from './Register';
import useLogIn from '../../hooks/api/useLogIn';
import useRegister from '../../hooks/api/useRegister';

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: jest.fn((str) => str),
  }),
}));

jest.mock('../../hooks/api/useLogIn', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../hooks/api/useRegister', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
    }));

describe('Register component', () => {
    let realLocation: Location;

  beforeEach(() => {
    realLocation = window.location;
    window.location = { ...realLocation, reload: jest.fn() } as any;

    (useLogIn as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue({ data: {} }),
    });
    (useRegister as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue({ data: {} }),
    });
  });

  afterEach(() => {
    window.location = realLocation;
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<Register />);
    expect(screen.getByText('username')).toBeInTheDocument();
    expect(screen.getByText('password')).toBeInTheDocument();
  });

  it('handles login correctly', async () => {
    render(<Register />);
    fireEvent.change(screen.getByLabelText('username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText('password'), {
      target: { value: 'testpass' },
    });
    fireEvent.click(screen.getByText('login_button_text'));
    await waitFor(() => expect(useLogIn).toHaveBeenCalled());
  });

  it('handles register correctly', async () => {
    render(<Register />);
    fireEvent.click(screen.getByText('register_button_text'));
    fireEvent.change(screen.getByLabelText('username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText('email'), {
      target: { value: 'testemail@test.com' },
    });
    fireEvent.change(screen.getByLabelText('password'), {
      target: { value: 'testpass' },
    });
    fireEvent.click(screen.getByText('register_button_text'));
    await waitFor(() => expect(useRegister).toHaveBeenCalled());
  });
});