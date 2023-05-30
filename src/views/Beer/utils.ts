import { getBeer } from '../../api';
import { Beer, BeerKeys } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Beer) => void, id?: string) => {
  if (!id) return;

  (async () => {
    try {
      const response = await getBeer(id);
      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};

const fieldLabelPairs: { key: BeerKeys, label: string, isLink?: boolean }[] = [
  { key: "brewery_type", label: "Brewery type" },
  { key: "street", label: "Street" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "postal_code", label: "Postal code" },
  { key: "country", label: "Country" },
  { key: "state_province", label: "State province" },
  { key: "longitude", label: "Longitude" },
  { key: "latitude", label: "Latitude" },
  { key: "address_1", label: "Address 1" },
  { key: "address_2", label: "Address 2" },
  { key: "address_3", label: "Address 3" },
  { key: "website_url", label: "Website URL", isLink: true },
  { key: "phone", label: "Phone" },
];

export { fetchData, fieldLabelPairs };
