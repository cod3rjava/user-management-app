import { fetchUserDetails, fetchUsers } from './api';
import axios, { AxiosStatic } from 'axios';

// Mock axios with proper typing
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

describe('API calls', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch users with pagination', async () => {
    const mockUsers = [
      { id: 1, name: 'User One', username: 'userone' },
      { id: 2, name: 'User Two', username: 'usertwo' },
    ];

    // Mock the response with correct structure
    mockedAxios.get.mockResolvedValueOnce({ 
      data: mockUsers,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {}
    });

    const page = 1;
    const limit = 2;
    const users = await fetchUsers(page, limit);
    expect(users).toEqual(mockUsers);
  });

  it('should fetch user details', async () => {
    const mockUserDetails = [
      { id: 1, name: 'User One', username: 'userone' },
      { id: 2, name: 'User Two', username: 'usertwo' },
    ];

    // Mock the response with correct structure
    mockedAxios.get.mockResolvedValueOnce({ 
      data: mockUserDetails,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {}
    });

    const userId = 1;
    const userDetails = await fetchUserDetails(userId);
    expect(userDetails).toEqual(mockUserDetails);
  });

  it('should handle fetchUsers error', async () => {
    const errorResponse = {
      response: {
        status: 500,
        data: 'Error',
        statusText: 'Internal Server Error',
        headers: {},
        config: {}
      }
    };

    mockedAxios.get.mockRejectedValueOnce(errorResponse);
    
    const page = 1;
    const limit = 2;
    
    try {
      await fetchUsers(page, limit);
    } catch (error: any) {
      expect(error.response.status).toBe(500);
    }
  });

  it('should handle fetchUserDetails error', async () => {
    const errorResponse = {
      response: {
        status: 500,
        data: 'Error',
        statusText: 'Internal Server Error',
        headers: {},
        config: {}
      }
    };

    mockedAxios.get.mockRejectedValueOnce(errorResponse);
    
    const userId = 1;
    
    try {
      await fetchUserDetails(userId);
    } catch (error: any) {
      expect(error.response.status).toBe(500);
    }
  });
});