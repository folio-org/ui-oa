# Change history for ui-oa

## 2.0.0 In progress
* Upgrade `stripes-acq-components` to `v4` and remove unneeded `react-redux`. Refs UIOA-204.
* Added enabled option to invoice hooks to prevent fetches with undefined values
* Updated max length props for mainEmail and alternateEmails from 36 characters to 255 to reflect database data type. Refs UIOA-205/206
* Added ability for journal typedown to be searched by matching ISSNs. Refs UIOA-210.
* Upgraded 'stripes-kint-components' to 'v 4.4.0' 
* Removed validateNoSpecialCharacters validation from checklist item definition label field. Refs UIOA-211
* Changed publication title fields max length to 4096. Refs UIOA-212
* Added 'Exact title match' to journal QueryTypedown for filtering by journal title. Refs UIOA-213
* Fixed journal typedown list item formatting


## 1.0.0 2023-01-10

* Add Request, Parties, Journals, Charges and Correspondence Forms
* Added Requests, Parties and Jourals list views
* Added Request, Party and Journal detail view
* Added Correspondence and Charges views to requests
* Added Invoice linking to request charges
* Added Checklist view for requests workflow
* Added Report generation form for Open APC reports