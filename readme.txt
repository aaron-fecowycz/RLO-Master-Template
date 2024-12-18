RLO Master Template
========================

Minor Update: 20241218
Author: Aaron Fecowycz

Modfied CS/rlo-master.css to include addition of dark mode document top button text colour rule.

Minor Update: 20240111
Author: Aaron Fecowycz

Modified feedback.html to replace old JISC online survey with the V3 version and included a additional direct link to the feedback form to allow user to view directly (preventing iFrame usability issues).


Minor Update: 20231213
Author: Aaron Fecowycz

Modified the bootstrap CSS for the alert text colour to improve the small text colour contrast in response to feedback.


Minor Update: 20230606
Author: Aaron Fecowycz

Description:

Addditon of CSS color decleration to the theme selector legend as, even though it was hidden, was generating a contrast error in reviewing tools.

Minor Update: 20230216
Author: Aaron Fecowycz

Description:

Inclusion of dark mode feature. This includes the development of JavaScript, CSS and SVG icons to enable the template to respond to the users dark mode / light mode preferences or allow the user to override these preferences and save this choice for return visits to the resource. Dark mode styling has been created to provide a good user experience enhancing usability and accessibility.

Minor Update: 20221004
Author: Aaron Fecowycz

Addition of aria-label attribute to progress bar throughout. Modification of the ID attribute on the privacy setting button on base privacy statement to maintain unique naming requirements. Addition of title attribute to the rating feature iFrame.

Major Update: 20220218
Author: Aaron Fecowycz

Significant rework of the RLO template styling, template structure and integration of additional scripting to enhance accessibility, usability and functionality. This has been a response to extensive multi-browser, multi-device testing which has utilised several differing input methods. Testing using NVDA has also been undertaken to improve the experience for users of screen reading assistive technology.

- Confining the navigation elements to the central content area to prevent moving to physical extremes of large dimension viewports aiming to enhance usability.
- Restructuring base navigation feature to improve keyboard user experience.
- Introduction of script to confine keyboard focus within the flyout navigation and features menu (prevents keyboard focus leaving this menu area).
- Reorganising the ordering of menu button and flyout menu 'close' feature to make logical when traversing content using keyboard.
- Redesign of the flyout menu layout to improve screen use and usability.
- Introduction of title attributes to all included iFrames to enhance screen reader user experience.
- Inclusion of link to feedback form button below the embedded feedback form iFrame should the user wish to visit the feedback from directly.
- Reworked colour scheme to enhance contrast ratios throughout template.
- HTML and CSS approach utilised to remove need for image rendered text for introductory screens.
- Inclusion of 'focus' styling across the resource to enhance keyboard navigation user experience.
- Inclusion of link to HELM's  accessibility statement within template.
- Introduction of script to allow link and opening of terms of use information and resources information (using 'resources.html?terms=true' and 'resources.html?resources=true' url).
- Redeveloped the CSS styling provided should users have JavaScript disabled to ensure resource navigation is available and usable.
- Fix HTML structure of modal dialogues to enable keyboard navigation access.
- Host of minor code modifications to ensure validity of code.


Update: 20220211
Author: Aaron Fecowycz

Small modification to the main .js file to remove aria hidden attribute from the privacy panel, this was found to prevent keyboard navigation within the modal.


Update: 20210429
Author: Aaron Fecowycz

Modified the theme colour from original #009bbd to new #035e72. This will match the theme colour to the top bar colouration.


Update: 20201214
Author: Aaron Fecowycz

Modification of HTML template to modify structure of navigation panel and inclusion of new ARIA current page labels. Reworking of resources section to create ARIA labels for active panel including associated JavaScript. Minor modification of associated CSS rules.

Update: 20201116
Author: Aaron Fecowycz

Description:

Removal of bootstrap theme css and theme.css.map.min files and linkage within HTML files, modification to the bootstrap css and the main css to improve contrast ratios to meet WCAG 2.1 AA requirements.

Update: 20201001
Author: Aaron Fecowycz

Description:

Modification to Aria labels of the main menu and modification to privacy settings modal. There's a couple of CSS modifications to increase the contrast ratio of a couple of elements.

Update: 20200218
Author: Aaron Fecowycz

Description:

Addition of privacy controls which enable the user to accept or reject the use of cookies, local storage and or web tracking. These technologies are not enabled by default and require the user to actively accept their use before attempting to utilise within the resource.

There is an example activity which works in conjunction with these permissions.

Date: 20190206
Author: Aaron Fecowycz


Description:

RLO Master Template with example audio narration, images, and video (including subtitles)
