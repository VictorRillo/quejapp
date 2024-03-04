import React from 'react';
import { render, screen } from '@testing-library/react';
import DataTable from './DataTable';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
  }));
  
describe('DataTable', () => {
  const headers = [
    { key: 'name', title: 'Name' },
    { key: 'age', title: 'Age' },
  ];
  const data = [
    { name: 'John Doe', age: 30 },
    { name: 'Jane Doe', age: 25 },
  ];

  it('should render without crashing', () => {
    render(<DataTable headers={headers} data={data} />);
    expect(screen.getByText('Name')).toBeTruthy();
  });

  it('should render correct headers', () => {
    render(<DataTable headers={headers} data={data} />);

    headers.forEach((header) => {
      expect(screen.getByText(header.title)).toBeTruthy();
    });
  });

  it('should render correct data', () => {
    render(<DataTable headers={headers} data={data} />);

    data.forEach((item) => {
      Object.values(item).forEach((value) => {
        expect(screen.getByText(value.toString())).toBeTruthy();
      });
    });
  });

  it('should match snapshot', () => {
    render(<DataTable headers={headers} data={data} />);
    
    expect(screen).toMatchSnapshot();
  });

});