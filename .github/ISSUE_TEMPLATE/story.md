---
name: Story
about: Story template
title: ''
labels: ''
assignees: ''

---

As [Passenger/Munazim/support engineer]  I want to 

**Description**
As a crop consultant creating a custom application work order,

I need to see a list of all the application fees that I have added to my custom application work order,

so that:

I can confirm which ones I still need to add.

I can see the details of the ones that I have already added.


**Acceptance Criteria**
GIVEN I am a crop consultant creating a custom application work order in the Unified Experience,

WHEN I DO have Service Fees added to my product payload for a Custom Application work order in the unified platform,

THEN those Service Fee line items are listed on the work order draft,

AND each product displays the following properties:

Fee Name

Fee Category

SKU

Quantity

Unit Price

Total Price

NOTES:
This is going to use the same design as the qty, price and total container for straight chem/fert Qty field.

This should go below the Price entry field.

It will use base selling unit of measure for the UOMs for quantity and price.

It starts out as – for each value that hasn’t had a user-entered value.

Once a user enters a value, it dynamically updates.

The Total calculates and displays once there is a qty AND price entered.  

If I delete either price or qty, the displayed value for qty and/or price goes back to --.

AND, the displayed Total goes back to --.

Here is the Figma design:

https://www.figma.com/file/w7WiXHsvEd5dm0Mf8WVHYI/Custom-App?node-id=2394%3A103256 - Connect to preview 

Here is how the UX Design looks:




Description
As a crop consultant placing a custom application work order in the unified hub,

I want the submit button to remain disabled until I have valid value in all of the required data fields,

so that I don’t inadvertently overlook a field that is required,

which could result in my customer’s work order sitting unprocessed in the backend system and therefore being delayed.


Acceptance Criteria
GIVEN that I am editing a custom application work order in the unified hub,

WHEN I DO NOT have valid values in all of the required data fields for a custom application work order,

THEN the Submit Work Order button is disabled.

AND WHEN I DO have valid values in all of the required data fields for a custom application work order,

THEN the Submit Work Order button is enabled.

The required data fields are:

Requested application date

Application type

Dilution

Job Acres

Crop

Add Field (at least one)

Add Product (at least one chem or fert)

Assumption:
We assume that the Bonsai buttons will allow for a disabled state.

### Considerations ✍

```
Initial design 
Available ideas 
```

⌘ New work discovered - stories to be created
- 


### Acceptance Criteria 👍

```
- Performance: Display progress when processing takes longer than the standard 3 second wait duration.
- Security: All calls to the backend must use a token
- Logging and Analytics: Log errors to data dog and analytics to google analytics
- Deployment: Automatic deployment using GitHub Actions
- Marketing and customer education: create a video for the feature and place the multi-language video as close to the customer as possible
- Long term vision: consideration
- Community outsourcing opportunity: explore opportunity 
```
❤ When done it will be used by ADMIN/TRAVELLER/USER as follows


## Outsourcing notes ☎

```
♛ About us:
We are small company building prototypes using Reactjs library, our prototypes consist of many React components whom must comply with the prerequisites below


💀 Pre-Requisites
-----------------
 - Material UI must be used for all UI elements (No other library ex. Ant)
 - Formik must be used for forms (including the formik Field, FieldArray)
 - Use <Field as={TextField}) instead of <TextField /> when Formik is used (Please follow our sample from Github below)
 - create-react-app with typescript template (do not eject the app)
 - Use typography as much as possible
 - pushed to a netlify
 - Pushed a Github public repo see accepted project here https://github.com/alialiayman/happy-employee
 - READ.md has project notes including netlify link and animated gif using screenToGif, in addition to screenshot showing successful build


✉ Project requirements
--------------------------
create-react-app with typescript if starting a new app, then in the App.tsx call the following functional  component

<App>               
   <ComponentName param={mainParam}/>
</App>


As you can see, this component receives a prop, which is an object. This object in details is attached to this job. Please check the attachment and examine all the object members before starting.

Your must use Material-UI only. Please align UI elements in a <Grid> and use Typography as much as possible

A primary design for this component is also attached. Please check the attachment and review the design and make any corrections or suggestions before proceeding. If you have a better design than the attached or you believe a totally new design works best, Please let us know in a message. and include a drawing. This phase is very important on the final review and possibly an additional tip at the end of the contract. 

To complete all the deliverers, the right developer will have experience in the following:
  - React, typescript, Material UI, Formik, git, github, netlify
 

👍 Acceptance Criteria
------------------------

We will accept the work when:

  1- We receive two links live demo and Github
  2- READ.me file with contents (confirming all pre-requisites are met, or explanation when not )
  3- We will validate that all pre-requisites are met
  4- We will read the code and approve if we have no issues
  5- If there is an issue, we will request modification


❣ Successful Projects
------------------------

If you want to see an example of an accepted project quickly, here are two GitHub urls. The first one if happy-employee and it shows Edit and view for an employee. The Edit form uses Formik exactly the same way we expect you to use Formik. The second url is for happy-user and it demonstrates how we expect you to use FieldArray if needed. Please check the READ.me for example how we expect the READ.me to look like

https://github.com/alialiayman/happy-employee
https://github.com/alialiayman/happy-user


⌚ Conclusion
--------------

In your proposal, please share a brief summary of your experience and tell us about a recent web app you worked on.

You are welcome to share your github username as well.

```
