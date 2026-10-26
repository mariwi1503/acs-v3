"use client";

import type { ReactNode } from "react";
import { requestInquiry } from "@/lib/inquiry";

/** Link ke formulir kontak yang sekaligus memilihkan layanan terkait. */
export function InquiryLink({ service, children }: { service: string; children: ReactNode }) {
  return (
    <a className="text-link" href="#kontak" onClick={() => requestInquiry(service)}>
      {children}
    </a>
  );
}
