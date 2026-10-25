<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- All hotel facts live in `src/lib/hotel.ts`; only add data verified from the hotel's official site or confirmed by the hotel — unverified data stays hidden.
- Hotel photos are Lovable Assets pointers in `src/assets/hotel/`, resolved via `photo(name)`.
- Public language and document direction must match the current user-approved language; SEO/GEO metadata is emitted from each route’s `head()`.
- Public room/tour listings use shared photo-only cards; listing pages own their layout and filters. Keep verified translated hotel facts in hotel.ts and tour programmes in tours.ts.
- Booking remains a WhatsApp request pending hotel confirmation; do not present client-only flows as confirmed reservations or AI operations.
