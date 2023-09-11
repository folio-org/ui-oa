# Change history for ui-oa

## 2.0.0 In progress
* Upgraded ui-oa to React v18
* *BREAKING* bump `react-intl` to `v6.4.4`. Refs UIOA-218

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
