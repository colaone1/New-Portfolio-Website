import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/dom';

describe('Navigation', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav class="main-nav" role="navigation" aria-label="Main navigation">
        <button class="nav-toggle" aria-expanded="false" aria-controls="nav-menu">
          <span class="sr-only">Toggle navigation</span>
          <span class="hamburger"></span>
        </button>
        <ul id="nav-menu" class="nav-menu">
          <li><a href="#home" class="nav-link">Home</a></li>
          <li><a href="#about" class="nav-link">About</a></li>
          <li><a href="#projects" class="nav-link">Projects</a></li>
          <li><a href="#contact" class="nav-link">Contact</a></li>
        </ul>
      </nav>
    `;
  });

  it('should render navigation with proper ARIA attributes', () => {
    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    expect(nav).toBeInTheDocument();
  });

  it('should have navigation toggle button', () => {
    const toggle = screen.getByRole('button', { name: /toggle navigation/i });
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAttribute('aria-controls', 'nav-menu');
  });

  it('should have navigation menu with proper structure', () => {
    const menu = document.getElementById('nav-menu');
    expect(menu).toBeInTheDocument();

    const links = menu.querySelectorAll('.nav-link');
    expect(links).toHaveLength(4);

    const expectedLinks = ['Home', 'About', 'Projects', 'Contact'];
    links.forEach((link, index) => {
      expect(link.textContent).toBe(expectedLinks[index]);
    });
  });

  it('should have proper link destinations', () => {
    const links = document.querySelectorAll('.nav-link');
    const expectedHrefs = ['#home', '#about', '#projects', '#contact'];

    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', expectedHrefs[index]);
    });
  });
});
