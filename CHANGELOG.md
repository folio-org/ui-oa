# Change history for ui-oa

## 3.1.0 IN PROGRESS

## 3.0.0 2025-03-14
  * UIOA-247 *BREAKING* Stripes v10 dependencies update (#491)
    * Updated all stripes-* dependencies for the stripes v10 upgrade along with react-intl and formatjs/cli

## 2.2.0 2024-12-04
* UIOA-241 Update module license and guidance for ui-oa

## 2.1.0 2024-11-07
* UIOA-242 Update menus to only offer functionality user has permission to access
* UIOA-240 Review and cleanup Module Descriptor for ui-oa
* UIOA-238 Remove sort options from ISSN(Print) and ISSN(Electronic) columns on Journal sort
* UIOA-233 Add "charge" permissions and other permission updates
* UIOA-228 React v19: refactor ui-oa away from default props for functional components
* UIOA-224 Number generator openAccess not considering sequence information output template and format
* UIOA-221 Remove explicit typescript version
* ERM-3184 Make use of shared NumberField from stripes-kint-components
* FOLIO-4086 Fix GitHub Actions workflow not running for tags
* Translations updated
* Permissions and module decriptor overhaul (Eureka)

## 2.0.2 2024-09-12
* UIOA-229 UI uses non-existent permission oa.work.manage
* UIOA-230 Payers' amounts lose decimal separator with non-English locale

## 2.0.1 2024-04-26
* UIOA-222 Charges - Decimal separator ignored when saving with non-english locale
* UIOA-215 Calculations on OA charges can result in invalid values
* Updated translations

## 2.0.0 2023-11-02
* Upgraded ui-oa to React v18
  * Update to react 18 Tweak tests to make use of changed stripes-erm-testing shape
  * Changed github actions node_version to 18 Removed node engines from package.json
* Upgrade to Grails 5 (including Hibernate 5.6.x) for Poppy
  * Added okapi interface dependency on new erm interface 6.0
* UIOA-220 Updated dependencies to their react v18-/stripes v9-compatible versions
* UIOA-219 Fixed Incorrect id for formatted message in charge form
* UIOA-218 *BREAKING* bump `react-intl` to `v6.4.4`

## 1.1.0 2023-03-20
* Added enabled option to invoice hooks to prevent fetches with undefined values
* Added path to interaction styles within checklist hidden header
* Added ability for journal typedown to be searched by matching ISSNs. Refs UIOA-210.
* Added 'Exact title match' to journal QueryTypedown for filtering by journal title. Refs UIOA-213
* Changed publication title fields max length to 4096. Refs UIOA-212
* Fixed journal typedown list item formatting
* Updated max length props for mainEmail and alternateEmails from 36 characters to 255 to reflect database data type. Refs UIOA-205/206
* Upgraded `stripes-acq-components` to `v4` and remove unneeded `react-redux`. Refs UIOA-204.
* Upgraded 'stripes-kint-components' to 'v 4.5.0'
* Removed validateNoSpecialCharacters validation from checklist item definition label field. Refs UIOA-211

## 1.0.0 2023-01-10
* Add Request, Parties, Journals, Charges and Correspondence Forms
* Added Requests, Parties and Jourals list views
* Added Request, Party and Journal detail view
* Added Correspondence and Charges views to requests
* Added Invoice linking to request charges
* Added Checklist view for requests workflow
* Added Report generation form for Open APC reports
