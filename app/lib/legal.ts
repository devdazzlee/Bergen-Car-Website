/**
 * Content model for the shared legal page template. Kept as plain data so the
 * Privacy Policy, Terms of Service, Accessibility Statement and Cookie Policy
 * all render through one accessible, reading-focused component.
 *
 * Rich text: paragraph / list / note / contact text may contain inline links
 * written as [label](/href) or [label](mailto:…). The renderer parses those.
 *
 * This is plain-language site policy content, not legal advice.
 */

export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "sub"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "note"; title: string; text: string }
  | { kind: "contact"; email: string; text: string };

export type LegalSection = {
  id: string;
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  slug: "privacy" | "terms" | "accessibility" | "cookies";
  title: string;
  /** ISO date — shown as "Last updated {formatted}". */
  updated: string;
  /** One or two sentences under the title. */
  summary: string;
  sections: LegalSection[];
};

const ADDRESS = "Bergen Car Company, 412 Route 46, Lodi, NJ 07644";
const PHONE = "(973) 555-0142";

/* ------------------------------------------------------------------ *
 * Privacy Policy
 * ------------------------------------------------------------------ */
const privacy: LegalDoc = {
  slug: "privacy",
  title: "Privacy Policy",
  updated: "2026-06-15",
  summary:
    "How Bergen Car Company collects, uses, protects, and shares your information — including the financial information you provide when you apply for financing.",
  sections: [
    {
      id: "overview",
      heading: "Overview",
      blocks: [
        {
          kind: "p",
          text: "Bergen Car Company, Inc. (“Bergen Car Company,” “we,” “us”) operates the dealership at 412 Route 46 in Lodi, New Jersey and this website. This policy explains what information we collect from you, why we collect it, how we keep it safe, and the choices you have. It applies to information we collect on this site, over the phone, by email, and in person at the dealership.",
        },
        {
          kind: "p",
          text: "We try to keep this readable. If anything here is unclear, [contact us](/contact) and a person will walk you through it.",
        },
      ],
    },
    {
      id: "information-we-collect",
      heading: "Information we collect",
      blocks: [
        {
          kind: "sub",
          text: "Information you give us directly",
        },
        {
          kind: "list",
          items: [
            "Contact details — name, phone number, email address, and mailing or home address.",
            "Vehicle interest — the cars you view, save, or ask about, and details of any test drive you schedule.",
            "Trade-in details — the year, make, model, mileage, condition, and payoff information for a vehicle you ask us to appraise or buy.",
            "Messages — anything you write in a contact form, financing application, or email.",
            "Financial information — when you apply for financing, the information described in the section below.",
          ],
        },
        {
          kind: "sub",
          text: "Information collected automatically",
        },
        {
          kind: "list",
          items: [
            "Device and usage data — IP address, browser type, pages viewed, and the site that referred you.",
            "Cookies and similar technologies — described in our [Cookie Policy](/cookies).",
          ],
        },
        {
          kind: "sub",
          text: "Information from third parties",
        },
        {
          kind: "list",
          items: [
            "Lenders and credit bureaus — approval decisions, offered terms, and credit information returned when you apply for financing.",
            "Vehicle history providers — title, accident, and service records tied to a VIN.",
            "Service providers — analytics and advertising partners that help us understand site traffic.",
          ],
        },
      ],
    },
    {
      id: "financial-information",
      heading: "Financial information and the Gramm-Leach-Bliley Act",
      blocks: [
        {
          kind: "p",
          text: "When you use the [Financing](/financing) page or apply for credit at the dealership, we act as a financial institution under the federal Gramm-Leach-Bliley Act (GLBA). The information you provide for that purpose is “nonpublic personal information” and gets extra protection.",
        },
        {
          kind: "sub",
          text: "What we collect for a credit application",
        },
        {
          kind: "list",
          items: [
            "Social Security number or taxpayer identification number.",
            "Date of birth and government-issued identification details.",
            "Income, employment, and residence history.",
            "Housing cost, banking references, and existing obligations you disclose.",
            "Credit history and scores returned by the bureaus and lenders.",
          ],
        },
        {
          kind: "p",
          text: "We collect this only to prepare and submit a credit application to the lenders you ask us to work with, and to structure a purchase. We do not use it for unrelated marketing.",
        },
        {
          kind: "sub",
          text: "How we safeguard it (GLBA Safeguards Rule)",
        },
        {
          kind: "list",
          items: [
            "Access is limited to the finance staff who process your application.",
            "Applications are transmitted to lenders over encrypted connections and stored in access-controlled systems.",
            "Paper documents are kept in locked storage and shredded on a set retention schedule.",
            "We assess our service providers and require them by contract to protect the information they handle for us.",
            "We maintain a written information-security program and review it periodically.",
          ],
        },
        {
          kind: "sub",
          text: "How we share it (GLBA Privacy Rule)",
        },
        {
          kind: "list",
          items: [
            "With lenders and financing sources you authorize, so they can evaluate your application.",
            "With service providers that help us process, print, or store applications, under contract and only for that purpose.",
            "As required to complete the transaction you requested, or as permitted or required by law.",
          ],
        },
        {
          kind: "p",
          text: "We do not sell your financial information. We do not share it with nonaffiliated third parties for their own marketing. Because our sharing is limited to what the GLBA permits without an opt-out, there is no separate sharing you need to opt out of — but if you want to restrict how we contact you, or ask us not to keep your application on file after a decision, email us at the address below and we will honor it.",
        },
        {
          kind: "note",
          title: "Retention of financial records",
          text: "Completed credit applications and related disclosures are retained for the period required by federal and New Jersey lending and records rules — generally a minimum of 25 months after we notify you of the credit decision, and longer where a loan is originated. After that, records are securely destroyed.",
        },
      ],
    },
    {
      id: "how-we-use",
      heading: "How we use your information",
      blocks: [
        {
          kind: "list",
          items: [
            "To respond to your questions and requests, including test drives, trade appraisals, and financing.",
            "To prepare quotes, purchase paperwork, and required disclosures.",
            "To arrange service, warranty, and recall work on a vehicle.",
            "To operate, secure, and improve this website.",
            "To send you information you asked for, and — only if you opt in — occasional dealership news. Every marketing message has an unsubscribe link.",
            "To meet legal, tax, safety, and recordkeeping obligations.",
          ],
        },
      ],
    },
    {
      id: "how-we-share",
      heading: "When we share information",
      blocks: [
        {
          kind: "p",
          text: "We share personal information only in these situations:",
        },
        {
          kind: "list",
          items: [
            "Lenders and financing sources you authorize us to work with.",
            "Manufacturers and warranty administrators, to register coverage and process claims.",
            "Service providers acting on our behalf — for example, hosting, analytics, document processing, and customer communication — under contracts that limit their use of the data.",
            "Government agencies and the DMV, for title, registration, and tax.",
            "Law enforcement or others when required by law, or to protect the safety, rights, or property of people or the dealership.",
            "A successor entity if the dealership is sold or merged, subject to this policy.",
          ],
        },
        {
          kind: "p",
          text: "We do not sell your personal information, and we do not share it with third parties for their own advertising.",
        },
      ],
    },
    {
      id: "your-choices",
      heading: "Your choices and rights",
      blocks: [
        {
          kind: "list",
          items: [
            "Access and correction — you can ask what personal information we hold about you and ask us to correct it.",
            "Deletion — you can ask us to delete information we are not required to keep for legal, lending, tax, or warranty reasons.",
            "Marketing — you can opt out of marketing email at any time using the unsubscribe link or by contacting us.",
            "New Jersey residents — you may contact us about the personal information practices described here; we will not discriminate against you for exercising any right.",
          ],
        },
        {
          kind: "p",
          text: "To make a request, email the address in the “How to reach us” section and tell us what you would like. We may need to verify your identity before we act.",
        },
        {
          kind: "sub",
          text: "Do Not Track",
        },
        {
          kind: "p",
          text: "Some browsers send a “Do Not Track” signal. There is no common industry standard for responding to it, so our site does not currently change its behavior based on that signal. You can still control cookies as described in the [Cookie Policy](/cookies).",
        },
      ],
    },
    {
      id: "data-security",
      heading: "How we protect information",
      blocks: [
        {
          kind: "p",
          text: "We use administrative, technical, and physical safeguards appropriate to the sensitivity of the information — encrypted transmission of application data, access controls, locked storage for paper files, vendor oversight, and staff training. No method of transmission or storage is perfectly secure, but we work to protect your information and to limit who can see it.",
        },
      ],
    },
    {
      id: "retention",
      heading: "How long we keep information",
      blocks: [
        {
          kind: "p",
          text: "We keep personal information for as long as needed to provide what you asked for and to meet legal, tax, lending, warranty, and recordkeeping requirements — which for vehicle sales and credit files can be several years. Inquiry and website data that we are not required to retain is kept for a shorter period and then deleted or de-identified.",
        },
      ],
    },
    {
      id: "childrens-privacy",
      heading: "Children’s privacy",
      blocks: [
        {
          kind: "p",
          text: "This site is intended for adults shopping for a vehicle. We do not knowingly collect personal information from children under 13. If you believe a child has provided us information, contact us and we will delete it.",
        },
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      blocks: [
        {
          kind: "p",
          text: "If we change this policy, we will update the “Last updated” date at the top of this page and, for significant changes, post a notice on the site. Continuing to use the site after an update means you accept the revised policy.",
        },
      ],
    },
    {
      id: "contact",
      heading: "How to reach us",
      blocks: [
        {
          kind: "contact",
          email: "privacy@bergencarcompany.com",
          text: `Questions about your privacy or a request about your information can go to our privacy contact, by email, phone, or mail at ${ADDRESS}. For anything else, the [Contact Us](/contact) page reaches the right department.`,
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ *
 * Terms of Service
 * ------------------------------------------------------------------ */
const terms: LegalDoc = {
  slug: "terms",
  title: "Terms of Service",
  updated: "2026-06-15",
  summary:
    "The rules for using this website. These terms cover the site itself — the sale of a vehicle is governed by the paperwork you sign at the dealership.",
  sections: [
    {
      id: "acceptance",
      heading: "Acceptance of these terms",
      blocks: [
        {
          kind: "p",
          text: "By using bergencarcompany.com you agree to these Terms of Service and to our [Privacy Policy](/privacy). If you do not agree, please do not use the site. We may update these terms; the “Last updated” date shows when they last changed, and continued use means you accept the current version.",
        },
      ],
    },
    {
      id: "site-use",
      heading: "Using the site",
      blocks: [
        {
          kind: "p",
          text: "You may use this site to browse inventory, research vehicles, and contact the dealership. You agree not to:",
        },
        {
          kind: "list",
          items: [
            "Use the site for any unlawful purpose or in violation of these terms.",
            "Scrape, harvest, or bulk-download listings, images, or content except as a search engine indexing public pages.",
            "Interfere with the site’s operation, security, or availability, or attempt to access areas you are not authorized to use.",
            "Submit false information, or someone else’s personal or financial information without their permission.",
          ],
        },
      ],
    },
    {
      id: "inventory-pricing",
      heading: "Vehicle listings, pricing, and availability",
      blocks: [
        {
          kind: "p",
          text: "We work to keep listings accurate, but the site is updated on a delay and errors happen. Vehicle descriptions, equipment, mileage, photos, pricing, and availability are provided for general information and are not guaranteed.",
        },
        {
          kind: "list",
          items: [
            "Every vehicle is offered subject to prior sale and may no longer be available.",
            "If a price, payment, or specification is posted in error, we may correct it and are not bound by the incorrect figure.",
            "Estimated monthly payments shown on the site are illustrations only — they assume a sample rate, term, and down payment and are not an offer of credit or a quote.",
            "Advertised prices exclude tax, title, registration, and a documentary fee, as noted on the vehicle and in the site footer.",
          ],
        },
        {
          kind: "note",
          title: "The in-person paperwork controls",
          text: "Nothing on this website is a binding offer to sell at a particular price or on particular terms. A sale is final only when both you and an authorized representative of Bergen Car Company sign a purchase agreement at the dealership. Those signed documents — not the website — govern the transaction.",
        },
      ],
    },
    {
      id: "vehicle-warranty",
      heading: "Vehicle warranty is separate",
      blocks: [
        {
          kind: "p",
          text: "Any warranty that comes with a vehicle, and any optional service contract, is described on the [Warranty](/warranty) page and in the documents you receive at purchase, including the FTC Buyers Guide posted in the vehicle. This website and its content are provided “as is” and carry no warranty of their own.",
        },
      ],
    },
    {
      id: "intellectual-property",
      heading: "Intellectual property",
      blocks: [
        {
          kind: "p",
          text: "The Bergen Car Company name, logo, site design, text, and original photography are owned by Bergen Car Company or its licensors and are protected by law. You may view and print pages for your personal, non-commercial use in shopping for a vehicle. Any other use — reproduction, republication, or commercial use — requires our written permission. Vehicle manufacturer names and marks are the property of their owners and are used for identification only.",
        },
      ],
    },
    {
      id: "third-party-links",
      heading: "Third-party links and services",
      blocks: [
        {
          kind: "p",
          text: "The site links to and embeds services we do not control — lenders, vehicle history reports, mapping, and analytics. We are not responsible for their content, availability, or practices. Your use of a third-party service is governed by that company’s terms and privacy policy.",
        },
      ],
    },
    {
      id: "disclaimers",
      heading: "Disclaimers",
      blocks: [
        {
          kind: "p",
          text: "The site is provided on an “as is” and “as available” basis. To the fullest extent permitted by law, we disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement, and we do not warrant that the site will be uninterrupted, error-free, or free of harmful components.",
        },
      ],
    },
    {
      id: "limitation-of-liability",
      heading: "Limitation of liability",
      blocks: [
        {
          kind: "p",
          text: "To the fullest extent permitted by law, Bergen Car Company and its owners and employees will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, profits, or goodwill, arising from your use of — or inability to use — this website. Nothing in these terms limits liability that cannot be limited under applicable law, or affects your rights as a consumer under New Jersey law.",
        },
      ],
    },
    {
      id: "indemnification",
      heading: "Indemnification",
      blocks: [
        {
          kind: "p",
          text: "You agree to indemnify and hold Bergen Car Company harmless from claims, damages, and reasonable legal costs arising out of your misuse of the site or your violation of these terms.",
        },
      ],
    },
    {
      id: "governing-law",
      heading: "Governing law and venue",
      blocks: [
        {
          kind: "p",
          text: "These terms are governed by the laws of the State of New Jersey, without regard to conflict-of-laws rules. Any dispute relating to the website that is not resolved informally will be brought in the state or federal courts located in Bergen County, New Jersey, and you consent to the jurisdiction of those courts. This provision addresses website disputes and does not change any dispute-resolution terms in a signed purchase or financing agreement.",
        },
      ],
    },
    {
      id: "changes",
      heading: "Changes to these terms",
      blocks: [
        {
          kind: "p",
          text: "We may revise these terms as our site or the law changes. Revisions take effect when posted with a new “Last updated” date. If a change materially reduces your rights, we will make reasonable efforts to flag it on the site.",
        },
      ],
    },
    {
      id: "contact",
      heading: "Questions about these terms",
      blocks: [
        {
          kind: "contact",
          email: "legal@bergencarcompany.com",
          text: `Legal questions about the website can go to the address above, by email, phone, or mail at ${ADDRESS}. For sales, service, or financing questions, use the [Contact Us](/contact) page.`,
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ *
 * Accessibility Statement
 * ------------------------------------------------------------------ */
const accessibility: LegalDoc = {
  slug: "accessibility",
  title: "Accessibility Statement",
  updated: "2026-07-01",
  summary:
    "Bergen Car Company is committed to making this website usable by everyone, including people who use assistive technology. Here is our conformance target, what we do, and how to get help.",
  sections: [
    {
      id: "our-commitment",
      heading: "Our commitment",
      blocks: [
        {
          kind: "p",
          text: "We believe every customer should be able to research a vehicle, get a price, and reach us without barriers. We treat digital accessibility as an ongoing obligation, not a one-time project, and we build and maintain this site with that in mind.",
        },
        {
          kind: "p",
          text: "If any part of this site is a barrier for you, tell us and we will fix it — and in the meantime, we will give you the same information or complete the same transaction with you directly, by phone or in person.",
        },
      ],
    },
    {
      id: "conformance-target",
      heading: "Conformance target",
      blocks: [
        {
          kind: "p",
          text: "Our target is conformance with the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA, published by the World Wide Web Consortium. WCAG 2.1 AA is the standard most commonly referenced for the Americans with Disabilities Act (ADA) and is the benchmark we measure this site against.",
        },
        {
          kind: "p",
          text: "We consider the site to be substantially conformant with WCAG 2.1 AA. “Substantially conformant” means most of the site meets the standard, with known exceptions listed below that we are actively working to resolve.",
        },
      ],
    },
    {
      id: "what-weve-done",
      heading: "Measures we take",
      blocks: [
        {
          kind: "list",
          items: [
            "Semantic HTML structure — real headings, landmarks, lists, and buttons — so screen readers can navigate the page.",
            "Full keyboard operability, with a visible focus indicator on every interactive element.",
            "Text alternatives for meaningful images, and empty alt text for decorative ones.",
            "Color contrast that meets the 4.5:1 ratio for body text and 3:1 for large text and interface elements.",
            "Layouts that reflow and stay usable at 200% zoom and on small screens.",
            "Form fields with associated labels, clear error messages, and instructions that do not rely on color alone.",
            "Support for the operating-system “reduce motion” setting — animations are minimized or removed when you enable it.",
            "Testing with screen readers (NVDA on Windows, VoiceOver on macOS and iOS) and with keyboard-only navigation.",
            "Automated accessibility checks in development, plus manual review of new pages and components.",
          ],
        },
      ],
    },
    {
      id: "known-limitations",
      heading: "Known limitations",
      blocks: [
        {
          kind: "p",
          text: "Despite our efforts, some content may not yet be fully accessible:",
        },
        {
          kind: "list",
          items: [
            "Third-party components — the financing pre-qualification widget, embedded maps, and vehicle-history reports are provided by outside vendors. We test them, report issues to the vendors, and provide an accessible alternative (call us) where a barrier remains.",
            "Older documents — a small number of archived PDFs may not be fully tagged. We will provide an accessible version of any document on request.",
            "User-generated content — quoted customer reviews are published as written and may contain informal formatting.",
          ],
        },
        {
          kind: "p",
          text: "If you hit one of these, contact us using the details below and we will get you the information another way, quickly.",
        },
      ],
    },
    {
      id: "report-an-issue",
      heading: "How to report an accessibility problem",
      blocks: [
        {
          kind: "p",
          text: "We welcome reports and take them seriously. Please tell us:",
        },
        {
          kind: "list",
          items: [
            "The page address (URL) where you had the problem.",
            "What you were trying to do, and what happened.",
            "The device, browser, and any assistive technology you were using (for example, “iPhone, Safari, VoiceOver”).",
          ],
        },
        {
          kind: "note",
          title: "Response time",
          text: "We aim to acknowledge accessibility reports within 3 business days and to give you a plan or a fix as quickly as we reasonably can. If you need the information right away, call us and we will read it to you, email it in an accessible format, or complete the transaction with you over the phone.",
        },
        {
          kind: "contact",
          email: "accessibility@bergencarcompany.com",
          text: `Reach our accessibility contact by email, by phone at ${PHONE} (ask for the accessibility contact), or by mail at ${ADDRESS}.`,
        },
      ],
    },
    {
      id: "formal-complaints",
      heading: "Formal complaints",
      blocks: [
        {
          kind: "p",
          text: "If you contact us about a barrier and are not satisfied with our response, you may ask that it be escalated to dealership management for a written reply. Using this process is not required and does not waive or limit any rights you have under the Americans with Disabilities Act, the New Jersey Law Against Discrimination, or other applicable law.",
        },
      ],
    },
    {
      id: "assessment-approach",
      heading: "How we assess this site",
      blocks: [
        {
          kind: "p",
          text: "We use a combination of self-evaluation during development and periodic review against the WCAG 2.1 AA success criteria, supplemented by outside expertise when we make significant changes. This statement was last reviewed on the “Last updated” date shown at the top of the page, and we revisit it at least annually.",
        },
      ],
    },
    {
      id: "contact",
      heading: "Accessibility contact",
      blocks: [
        {
          kind: "contact",
          email: "accessibility@bergencarcompany.com",
          text: `Our accessibility contact handles reports, questions, and requests for information in an alternate format. Email, call ${PHONE}, write to ${ADDRESS}, or use the [Contact Us](/contact) page and mark it for the accessibility contact.`,
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ *
 * Cookie Policy
 * ------------------------------------------------------------------ */
const cookies: LegalDoc = {
  slug: "cookies",
  title: "Cookie Policy",
  updated: "2026-06-15",
  summary:
    "What cookies and similar technologies this site uses, what they do, and how to control them. This policy is part of our Privacy Policy.",
  sections: [
    {
      id: "what-are-cookies",
      heading: "What cookies are",
      blocks: [
        {
          kind: "p",
          text: "A cookie is a small text file a website stores on your device. Sites also use related technologies — local storage, pixels, and software development kits — for similar purposes. In this policy “cookies” covers all of them. They let a site remember your actions and preferences, keep you signed in to a form, and measure how the site is used.",
        },
      ],
    },
    {
      id: "how-we-use",
      heading: "How we use cookies",
      blocks: [
        {
          kind: "p",
          text: "We use cookies to keep the site working, to remember your choices while you browse, and to understand — in aggregate — which pages and vehicles people find useful so we can improve them. We do not use cookies to build advertising profiles about you, and we do not sell information collected through cookies.",
        },
      ],
    },
    {
      id: "types",
      heading: "Types of cookies we use",
      blocks: [
        { kind: "sub", text: "Strictly necessary" },
        {
          kind: "p",
          text: "Required for the site to function — page security, load balancing, and holding the contents of a form (such as a financing or test-drive request) together while you complete it. These cannot be turned off through the site.",
        },
        { kind: "sub", text: "Preferences" },
        {
          kind: "p",
          text: "Remember choices you make so the site is more convenient — for example, inventory filters you last used, a notice you dismissed, or a light/dark display preference. These are stored on your device and are not shared.",
        },
        { kind: "sub", text: "Analytics" },
        {
          kind: "p",
          text: "Help us count visits and traffic sources, see which pages are viewed, and spot errors, so we can measure and improve performance. This data is aggregated. Where a provider processes it, it acts on our behalf under contract and is not permitted to use it for its own purposes.",
        },
      ],
    },
    {
      id: "third-party",
      heading: "Third-party cookies",
      blocks: [
        {
          kind: "p",
          text: "Some features rely on outside providers that may set their own cookies when you use them:",
        },
        {
          kind: "list",
          items: [
            "Analytics — our website analytics provider.",
            "Embedded maps and video — when a map or video loads on a page.",
            "Financing pre-qualification — the lender-facing widget used on the Financing page.",
          ],
        },
        {
          kind: "p",
          text: "These providers’ own privacy and cookie policies govern the cookies they set. See our [Privacy Policy](/privacy) for how we work with service providers.",
        },
      ],
    },
    {
      id: "your-choices",
      heading: "Managing cookies",
      blocks: [
        {
          kind: "p",
          text: "You can control cookies through your browser settings — every major browser lets you see what is stored, delete it, and block cookies from some or all sites. Search your browser’s help for “cookies” for step-by-step instructions.",
        },
        {
          kind: "note",
          title: "If you block cookies",
          text: "Blocking strictly necessary cookies may stop parts of the site from working — for example, submitting a form. Blocking preference or analytics cookies is fine; you may just see fewer remembered settings.",
        },
      ],
    },
    {
      id: "do-not-track",
      heading: "Do Not Track",
      blocks: [
        {
          kind: "p",
          text: "Because there is no agreed industry standard for how sites should respond to a browser “Do Not Track” signal, this site does not currently change its behavior based on it. You can still manage cookies using the browser controls described above.",
        },
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      blocks: [
        {
          kind: "p",
          text: "If our use of cookies changes, we will update this page and its “Last updated” date. Significant changes will be flagged on the site.",
        },
      ],
    },
    {
      id: "contact",
      heading: "Questions about cookies",
      blocks: [
        {
          kind: "contact",
          email: "privacy@bergencarcompany.com",
          text: `Questions about this Cookie Policy can go to our privacy contact by email, by phone at ${PHONE}, or by mail at ${ADDRESS}. The [Contact Us](/contact) page reaches us too.`,
        },
      ],
    },
  ],
};

export const LEGAL_DOCS = { privacy, terms, accessibility, cookies } as const;

export const LEGAL_NAV: { label: string; href: string }[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Cookie Policy", href: "/cookies" },
];
