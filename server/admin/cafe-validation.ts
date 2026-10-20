type CafeInput = {
  name: unknown;
  address: unknown;
  lat: unknown;
  lng: unknown;
};

export function parseCafeInput(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const body = value as CafeInput;
  if (
    typeof body.name !== "string" ||
    typeof body.address !== "string" ||
    typeof body.lat !== "number" ||
    typeof body.lng !== "number"
  ) {
    return null;
  }

  const name = body.name.trim();
  const address = body.address.trim();
  if (
    name.length === 0 ||
    name.length > 160 ||
    address.length === 0 ||
    address.length > 500 ||
    !Number.isFinite(body.lat) ||
    !Number.isFinite(body.lng) ||
    body.lat < -90 ||
    body.lat > 90 ||
    body.lng < -180 ||
    body.lng > 180
  ) {
    return null;
  }

  return { name, address, lat: body.lat, lng: body.lng };
}