/**
 * Jembatan kecil antar komponen: tombol di mana pun pada halaman bisa
 * memilihkan layanan di formulir kontak tanpa prop drilling.
 */
const EVENT = "acs:inquiry-service";

type Detail = { service: string; focus: boolean };

export function requestInquiry(service: string, { focus = false } = {}) {
  window.dispatchEvent(new CustomEvent<Detail>(EVENT, { detail: { service, focus } }));
}

export function onInquiryRequest(handler: (detail: Detail) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<Detail>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
