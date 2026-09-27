import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Todo from './Todo';

describe('<Todo />', () => {
  test('renders not done todo correctly', () => {
    const todo = {
      text: 'Learn Docker and testing',
      done: false,
    };

    render(<Todo todo={todo} deleteTodo={() => {}} completeTodo={() => {}} />);

    expect(screen.getByText('Learn Docker and testing')).toBeInTheDocument();
    expect(screen.getByText('This todo is not done')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /set as done/i }),
    ).toBeInTheDocument();
  });

  test('renders done todo correctly', () => {
    const todo = {
      text: 'Learn React Testing',
      done: true,
    };

    render(<Todo todo={todo} deleteTodo={() => {}} completeTodo={() => {}} />);

    expect(screen.getByText('This todo is done')).toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /set as done/i }),
    ).not.toBeInTheDocument();
  });

  test('calls deleteTodo and completeTodo handlers when clicked', async () => {
    const todo = {
      text: 'Interactive test',
      done: false,
    };

    const mockDelete = vi.fn();
    const mockComplete = vi.fn();
    const user = userEvent.setup();

    render(
      <Todo todo={todo} deleteTodo={mockDelete} completeTodo={mockComplete} />,
    );

    const completeButton = screen.getByRole('button', { name: /set as done/i });
    await user.click(completeButton);

    expect(mockComplete).toHaveBeenCalledTimes(1);
    expect(mockComplete).toHaveBeenCalledWith(todo);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    expect(mockDelete).toHaveBeenCalledTimes(1);
    expect(mockDelete).toHaveBeenCalledWith(todo);
  });
});
