import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserTableUi from './UserTableUi';

// Create a mock setLocation function
const mockSetLocation = jest.fn();

// Mock wouter's useLocation hook
jest.mock('wouter', () => ({
  useLocation: () => ['/current-path', mockSetLocation]
}));

const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    website: "www.johndoe.com",
    address: {
      street: "123 Main St",
      city: "Cityville",
      zipcode: "12345"
    },
    company: {
      name: "Doe Enterprises",
      catchPhrase: "Innovating the future"
    }
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    email: "jane.smith@example.com",
    phone: "987-654-3210",
    website: "www.janesmith.com",
    address: {
      street: "456 Elm St",
      city: "Townsville",
      zipcode: "67890"
    },
    company: {
      name: "Smith Industries",
      catchPhrase: "Leading the way"
    }
  }
];

describe('UserTableUi', () => {
  beforeEach(() => {
    // Clear mock function calls before each test
    mockSetLocation.mockClear();
  });

  it('renders without crashing', () => {
    render(<UserTableUi users={mockUsers} />);
  });

  it('renders correct number of rows', () => {
    render(<UserTableUi users={mockUsers} />);
    const userIdCells = screen.getAllByText(/^#\d+$/);
    expect(userIdCells).toHaveLength(mockUsers.length);
  });

  it('renders data correctly for each user', () => {
    render(<UserTableUi users={mockUsers} />);
    mockUsers.forEach((user) => {
      expect(screen.getByText(`#${user.id}`)).toBeInTheDocument();
      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByText(`@${user.username}`)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });
  });

  it('handles row clicks correctly', () => {
    render(<UserTableUi users={mockUsers} />);
    
    const userCell = screen.getByText(`#${mockUsers[0].id}`);
    const row:any = userCell.closest('tr');
    fireEvent.click(row);
    
    expect(mockSetLocation).toHaveBeenCalledWith(`/users/${mockUsers[0].id}`);
  });

  it('renders icons correctly', () => {
    render(<UserTableUi users={mockUsers} />);

    expect(screen.getByTestId('Mail')).toBeInTheDocument();
    expect(screen.getByTestId('Phone')).toBeInTheDocument();
    expect(screen.getByTestId('MapPin')).toBeInTheDocument();
    expect(screen.getByTestId('Building2')).toBeInTheDocument();
    expect(screen.getByTestId('Globe')).toBeInTheDocument();
  });

  it('website link opens in a new tab', () => {
    render(<UserTableUi users={mockUsers} />);
    const link = screen.getByText(mockUsers[0].website);
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('stops propagation of click event on website link', () => {
    const { container } = render(<UserTableUi users={mockUsers} />);
    
    const websiteLink = screen.getByText(mockUsers[0].website);
    
    const mockEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    
    const stopPropagation = jest.spyOn(mockEvent, 'stopPropagation');
    
    websiteLink.dispatchEvent(mockEvent);
    
    expect(stopPropagation).toHaveBeenCalled();
  });
});