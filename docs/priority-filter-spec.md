# Equipment Request Priority Filter

## Goal

Help managers quickly find urgent equipment requests that still need attention and return to the full list whenever needed.

## User Need

As a manager, I want a Needs Attention view, a filter for each existing priority, and a count for each priority so I can decide which requests to address first.

## Functional Rules

- Open in **All Requests** with no priority filter applied. Offer **Needs Attention**, a filter for each existing priority, and **Clear filters**. Use one selection at a time.
- **Needs Attention** shows requests in High and Medium, the two highest priority levels. Exclude completed requests.
- Each individual priority filter shows every request assigned to that priority, including completed requests.
- **All Requests** includes completed requests and requests with missing or unrecognized priorities. Label missing or unrecognized priorities **Unassigned**. These requests are excluded from Needs Attention and the individual priority filters.
- Show a distinct text label and visual treatment for each priority. Give the highest priority extra visual emphasis.
- **Request Overview** shows counts for each priority and Unassigned across the full request list, including completed requests and categories with zero requests. Counts remain visible when a filter is active.
- When a filter matches no requests, display “No equipment requests currently match this priority. You're all caught up.” and offer **Clear filters**.
- **Clear filters** returns the app to All Requests and restores every equipment request to the visible list in its original order. Clearing a filter must preserve every request record and all of its field values.
- Refresh the visible list and overview immediately when a request is added or its priority changes through the starter app’s request controls. Keep the selected filter active and preserve the order produced by the existing request list.

## Constraints

- Use High, Medium, and Low in descending priority order. The starter app includes sample requests with Open or Completed status and stores request changes in this browser.
- Keep the feature usable without a login or database.
- Filtering must leave existing requests and their order intact.

## Acceptance Criteria

1. Open or reload the app with mixed requests. All Requests is selected and shows every request in the app's original order.
2. Select Needs Attention with incomplete and completed requests in each of the top two priority levels, plus incomplete requests in lower levels and with unknown priorities. Only incomplete requests in the top two levels appear, in their original relative order.
3. Select each existing priority in turn. The list shows only requests in that priority, including completed requests assigned to it.
4. Open All Requests with one missing priority and one unrecognized priority. Both rows are visible and labeled Unassigned. Every recognized priority has a distinct visual label, and the highest priority has extra visual emphasis.
5. Use a mix of recognized and unassigned priorities, completed requests, and at least one category with no requests. Compare each Request Overview count with the full list. Select another view and verify that the same counts remain visible.
6. Record the full request list, including each request's ID and field values. Select a filter with no matches, verify the exact empty-state message, and click Clear filters. Verify All Requests is selected and compare the restored records with the original list. Every ID and field value must match, and the order must be identical. Repeat the reset from a filter that has matches.
7. With a priority filter active, add a matching request and change an existing request’s priority so it stops matching, using the app’s existing request operations or a controlled test fixture. Verify that the added request appears, the changed request disappears, and the overview updates immediately without reloading or clearing the filter. Return to All Requests and verify both records are present in the order the app normally displays them.
8. Open the app without signing in or configuring a database. Verify that the overview and filter controls work with the app's existing request data.

## Out of Scope

New priority levels, request sorting or deletion, editing fields other than priority or changing completion status, accounts, and database storage.

## Verification Results

The checks ran the app logic and event handlers in Node with a simulated DOM and browser storage. HTML and CSS checks verified the message and badge styles in source. A live browser screenshot and visual confirmation remain pending.

| Criterion | Result | Evidence |
| --- | --- | --- |
| 1 | Pass | Fresh and reopened sessions defaulted to All Requests in source order. |
| 2 | Pass | Needs Attention returned only the open High and Medium requests. |
| 3 | Pass | Each priority filter returned the expected records, including completed matches. |
| 4 | Pass | Missing and unfamiliar priorities rendered Unassigned badges. CSS defines distinct treatments and extra weight and a border for High. |
| 5 | Pass | Counts included all requests and a zero category and stayed fixed across filters. |
| 6 | Pass | Both reset paths restored the full ordered list and preserved the stored records byte for byte. |
| 7 | Pass | Adding and reprioritizing requests refreshed the visible matches and counts while High stayed selected. |
| 8 | Pass | The app initialized and filtered with simulated browser storage and has no external dependencies. |
