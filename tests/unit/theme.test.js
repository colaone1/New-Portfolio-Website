import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/dom';

// Mock the theme module
vi.mock('../../js/theme.js', () => ({
  default: {
    init: vi.fn(),
    toggle: vi.fn(),
    setTheme: vi.fn(),
    getCurrentTheme: vi.fn(() => 'light'),
  },
}));

describe('Theme System', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="theme-toggle" aria-label="Toggle theme">
        <span class="theme-icon">🌙</span>
      </button>
    `;
  });

  it('should render theme toggle button', () => {
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toHaveAttribute('aria-label', 'Toggle theme');
  });

  it('should display theme icon', () => {
    const icon = document.querySelector('.theme-icon');
    expect(icon).toBeInTheDocument();
    expect(icon.textContent).toBe('🌙');
  });
});
