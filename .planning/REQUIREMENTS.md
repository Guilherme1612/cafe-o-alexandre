# Requirements: Café o Alexandre

**Defined:** 2026-08-02
**Core Value:** A visitor can quickly find accurate café information and call, message, or get directions from a mobile phone.

## v1 Requirements

Requirements for the initial single-page release. Every requirement must preserve explicit placeholders until the café supplies verified values.

### Visitor Information and Contact

- [ ] **VIS-01**: Visitor can see “Café o Alexandre,” a short welcome sentence, the full address, a prominent Call Us action, and a Get Directions action in the hero.
- [ ] **VIS-02**: Visitor can find address, phone, WhatsApp, opening hours, and social links in a practical information section.
- [ ] **VIS-03**: A verified phone number is exposed as a native mobile `tel:` action with an accessible label.
- [ ] **VIS-04**: A verified WhatsApp number is exposed as a native WhatsApp action with an accessible label.
- [ ] **VIS-05**: Unavailable address, contact, hours, social, or map values remain visibly marked placeholders and do not produce broken actions.

### Café Story and Offerings

- [ ] **ABOUT-01**: Visitor can read a short About Us section populated from café-provided description text.
- [ ] **ABOUT-02**: Visitor can understand what the café offers from readable text without needing an image-only menu.
- [ ] **ABOUT-03**: The page does not invent business copy, menu items, services, or claims.

### Directions and Discovery

- [ ] **MAP-01**: Visitor can open a clear Google Maps directions link for the verified café destination.
- [ ] **MAP-02**: Directions remain available as readable text if an embedded map is unavailable or not used.

### Gallery and Visual Content

- [ ] **GALLERY-01**: Visitor can view a small responsive gallery made only from café-provided images.
- [ ] **GALLERY-02**: Gallery images include meaningful alt text, stable dimensions, and loading behavior that avoids avoidable layout shifts.
- [ ] **GALLERY-03**: Sponsor branding, sponsor logos, advertisement layout, and unapproved reference imagery are not presented as café content.

### Responsive, Accessible, and Visual Foundation

- [ ] **UX-01**: The page is mobile-first and remains readable and usable on narrow mobile, tablet, and desktop widths.
- [ ] **UX-02**: The page uses semantic headings and landmarks, strong text contrast, visible keyboard focus, descriptive labels, and comfortable touch targets.
- [ ] **UX-03**: The visual system uses burgundy red, charcoal black, warm gold, and cream in a warm, local, elegant composition with restrained motion.
- [ ] **UX-04**: The footer repeats the verified address and phone number in a simple, accessible layout.
- [ ] **UX-05**: The page remains useful with JavaScript disabled and with gallery images unavailable.

## v2 Requirements

Deferred to a future release; not included in the initial roadmap.

### Optional Enhancements

- **ENH-01**: Add an embedded map iframe after privacy, performance, API, and billing requirements are accepted.
- **ENH-02**: Add an accessible gallery lightbox after the basic gallery proves insufficient.
- **ENH-03**: Add a sticky mobile quick-action bar for call, WhatsApp, and directions.
- **ENH-04**: Add LocalBusiness structured data after all business facts are verified.
- **ENH-05**: Add a downloadable menu supplied and maintained by the café.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Online ordering or payments | The requested first version is informational. |
| Reservations or accounts | Not needed for the core local-visitor task. |
| CMS or owner dashboard | Adds operational complexity without a stated need. |
| Custom map/search system | A verified Google Maps link covers the directions goal. |
| Sponsor branding or advertisement recreation | The supplied image is visual inspiration only. |
| Invented address, phone, hours, social links, menu, or description | Incorrect business information is unacceptable. |
| Heavy animation or social-media widgets | Conflicts with the requested calm, accessible experience. |

## User Stories

- As a visitor on a phone, I can identify the café and call it immediately.
- As a visitor planning a visit, I can find the address, opening hours, and directions.
- As a visitor deciding whether to stop by, I can understand what the café offers and see real café photos.
- As a café owner, I can replace clearly marked placeholders with verified business content without reworking the page structure.

## Acceptance Criteria

- The first viewport exposes café identity, location, and the primary call/directions actions.
- Verified phone, WhatsApp, and Google Maps values work on mobile; placeholders remain non-actionable.
- All requested information sections, About Us content, gallery, and footer are present.
- Keyboard navigation, focus visibility, contrast, touch targets, responsive wrapping, and reduced-motion behavior are checked.
- No sponsor branding or unverified business facts appear in the rendered page.

## Definition of Done

- All v1 requirements are implemented and mapped to a roadmap phase.
- Static build completes successfully.
- Browser checks cover mobile and desktop layouts, contact links, directions, placeholders, keyboard access, and gallery behavior.
- The page remains useful without JavaScript and does not depend on an iframe for directions.
- Owner-provided content can replace placeholders without invented values being introduced.

## Traceability

Updated by roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| VIS-01 | Phase 2 | Pending |
| VIS-02 | Phase 2 | Pending |
| VIS-03 | Phase 2 | Pending |
| VIS-04 | Phase 2 | Pending |
| VIS-05 | Phase 1 | Pending |
| ABOUT-01 | Phase 2 | Pending |
| ABOUT-02 | Phase 2 | Pending |
| ABOUT-03 | Phase 1 | Pending |
| MAP-01 | Phase 2 | Pending |
| MAP-02 | Phase 2 | Pending |
| GALLERY-01 | Phase 3 | Pending |
| GALLERY-02 | Phase 3 | Pending |
| GALLERY-03 | Phase 3 | Pending |
| UX-01 | Phase 2 | Pending |
| UX-02 | Phase 2 | Pending |
| UX-03 | Phase 1 | Pending |
| UX-04 | Phase 2 | Pending |
| UX-05 | Phase 4 | Pending |

---
*Requirements are hypotheses until shipped and validated.*
