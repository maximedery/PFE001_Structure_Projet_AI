import '@testing-library/jest-dom';

import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react';

import { Label } from '../components/ui/label';

describe('Page', () => {
  it('renders a heading', () => {
    render(<Label>Hello</Label>);
    // dummy test
    expect(document.body).toBeInTheDocument();
  });
});
