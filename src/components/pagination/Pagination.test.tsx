import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";
import '@testing-library/jest-dom';

describe("Pagination Component", () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders pagination buttons", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);
  
    // Test if the "Previous" button is rendered and disabled for the first page
    expect(screen.getByRole("button", { name: /chevron left/i })).toBeDisabled();
  
    // Test if the "Next" button is rendered and enabled
    expect(screen.getByRole("button", { name: /chevron right/i })).toBeEnabled();
  
    // Test if the correct page numbers are displayed
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("disables next and previous buttons when on the first and last page", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    // Previous button is disabled on the first page
    fireEvent.click(screen.getByRole("button", { name: /chevron left/i }));
    expect(mockOnPageChange).not.toHaveBeenCalled();

    // Next button is enabled on the first page
    fireEvent.click(screen.getByRole("button", { name: /chevron right/i }));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test("enables previous button and disables next button on the last page", () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={mockOnPageChange} />);
  
    // Test previous button
    const prevButton = screen.getByRole("button", { name: /chevron left/i });
    expect(prevButton).toBeEnabled();
    fireEvent.click(prevButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(4);

    // Clear the mock to test next button separately
    mockOnPageChange.mockClear();
  
    // Test next button
    const nextButton = screen.getByRole("button", { name: /chevron right/i });
    expect(nextButton).toBeDisabled();
    fireEvent.click(nextButton);
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  test("calls onPageChange when a page number is clicked", () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />);

    fireEvent.click(screen.getByText("3"));
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test("handles large number of pages and limits visible page numbers", () => {
    render(<Pagination currentPage={10} totalPages={20} onPageChange={mockOnPageChange} />);

    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("11")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  test("does not show more than 5 page buttons when totalPages > 5", () => {
    render(<Pagination currentPage={1} totalPages={10} onPageChange={mockOnPageChange} />);

    // There should be no more than 5 page buttons displayed
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(7); // 5 page buttons + 2 navigation buttons
  });

  test("displays correct page numbers when currentPage is near the end", () => {
    render(<Pagination currentPage={9} totalPages={10} onPageChange={mockOnPageChange} />);

    // Check if the page numbers are correctly rendered
    expect(screen.getByText("7")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("9")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });
});