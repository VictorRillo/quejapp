import { HttpUrl } from "enums/HttpUrl";
import { searchAddress } from "./searchAddress";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('searchAddress', () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should return data when request is successful', async () => {
    const data = [{ place: 'place1' }, { place: 'place2' }];
    const querySearch = 'query';
    const limit = 2;

    mock.onGet(`${HttpUrl.OPEN_STREET_MAP}${querySearch}&limit=${limit}`).reply(200, data);

    const result = await searchAddress(querySearch, limit);

    expect(result).toEqual(data);
  });

  it('should throw error when request fails', async () => {
    const querySearch = 'query';
    const limit = 2;

    mock.onGet(`${HttpUrl.OPEN_STREET_MAP}${querySearch}&limit=${limit}`).reply(500);

    await expect(searchAddress(querySearch, limit)).rejects.toThrow();
  });
});