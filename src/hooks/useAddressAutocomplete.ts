// TODO: Implement with Nominatim or another geocoding API for address autocomplete
export function useAddressAutocomplete() {
  return {
    suggestions: [] as string[],
    loading: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    search: (_: string) => {},
    clear: () => {},
  };
}
