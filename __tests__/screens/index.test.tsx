import MenuScreen from '@/app/(tabs)';
import { renderWithProviders, waitFor } from '@/utils/test-utils';

describe('Menu', () => {
  it("Fetching beverages", async () => {
    const { getByTestId } = renderWithProviders(<MenuScreen />);
    
    await waitFor(() => {
      expect(getByTestId("beverages")).toBeTruthy();
    }, { timeout: 3000 });
  });
});