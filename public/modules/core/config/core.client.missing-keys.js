'use strict';

/**
 * This **is not**, in fact, a class, but rather a file for defining those
 * strings that
 * [angular-gettext](https://angular-gettext.rocketeer.be/) does not
 * automatically extract for translation using the `nggettext_extract` Grunt
 * task. The file is located at
 * `/public/modules/core/config/core.client.missing-keys.js`.
 *
 * If you've translated your text following the instructions in the README,
 * and you still see text prepended with `[MISSING:]` when you browse to
 * your application, you'll need to do the following:
 *
 * 1. Add all such strings to this file. In particular, add a separate call
 * to `gettext('Your string here');` following those you see in this file.
 * 2. Run the `nggettext_extract` task again.
 * 3. Proceed with the translation instructions as given in the
 * [README](index.html).
 *
 * As an example, if the following were the contents of the
 * `core.client.missing-keys.js` file, the strings, `'No Signal'`, `'Signal
 * OK'`, and `'Personal Details'`, would be extracted (along with all
 * other strings that are automatically extracted) by the
 * `nggettext_extract` Grunt task and included in the file at
 * `/po/template.pot` for your use in creating translations.
 *
 * @example
 *
 * angular.module('core').controller(['gettext',
 *    function (gettext) {
 *         gettext('No Signal');
 *         gettext('Signal OK');
 *         gettext('Personal Details');
 *     }
 * ]);
 *
 * @class Angular.MissingKeys
 * @memberof Angular
 */

angular.module('core').controller(['gettext',
    function (gettext) {
        gettext('No Signal');
        gettext('Signal OK');
        gettext('Personal Details');
        gettext('Gender');
        gettext('Male');
        gettext('Female');
        gettext('Nationality');
        gettext('Afghan');
        gettext('Albanian');
        gettext('Algerian');
        gettext('American');
        gettext('Andorran');
        gettext('Angolan');
        gettext('Antiguans');
        gettext('Argentinean');
        gettext('Armenian');
        gettext('Australian');
        gettext('Austrian');
        gettext('Azerbaijani');
        gettext('Bahamian');
        gettext('Bahraini');
        gettext('Bangladeshi');
        gettext('Barbadian');
        gettext('Barbudans');
        gettext('Batswana');
        gettext('Belarusian');
        gettext('Belgian');
        gettext('Belizean');
        gettext('Beninese');
        gettext('Bhutanese');
        gettext('Bolivian');
        gettext('Bosnian');
        gettext('Brazilian');
        gettext('British');
        gettext('Bruneian');
        gettext('Bulgarian');
        gettext('Burkinabe');
        gettext('Burmese');
        gettext('Burundian');
        gettext('Cambodian');
        gettext('Cameroonian');
        gettext('Canadian');
        gettext('Cape Verdean');
        gettext('Central African');
        gettext('Chadian');
        gettext('Chilean');
        gettext('Chinese');
        gettext('Colombian');
        gettext('Comoran');
        gettext('Congolese');
        gettext('Costa Rican');
        gettext('Croatian');
        gettext('Cuban');
        gettext('Cypriot');
        gettext('Czech');
        gettext('Danish');
        gettext('Djibouti');
        gettext('Dominican');
        gettext('Dutch');
        gettext('East Timorese');
        gettext('Ecuadorean');
        gettext('Egyptian');
        gettext('Emirian');
        gettext('Equatorial Guinean');
        gettext('Eritrean');
        gettext('Estonian');
        gettext('Ethiopian');
        gettext('Fijian');
        gettext('Filipino');
        gettext('Finnish');
        gettext('French');
        gettext('Gabonese');
        gettext('Gambian');
        gettext('Georgian');
        gettext('German');
        gettext('Ghanaian');
        gettext('Greek');
        gettext('Grenadian');
        gettext('Guatemalan');
        gettext('Guinea-Bissauan');
        gettext('Guinean');
        gettext('Guyanese');
        gettext('Haitian');
        gettext('Herzegovinian');
        gettext('Honduran');
        gettext('Hungarian');
        gettext('I-Kiribati');
        gettext('Icelander');
        gettext('Indian');
        gettext('Indonesian');
        gettext('Iranian');
        gettext('Iraqi');
        gettext('Irish');
        gettext('Israeli');
        gettext('Italian');
        gettext('Ivorian');
        gettext('Jamaican');
        gettext('Japanese');
        gettext('Jordanian');
        gettext('Kazakhstani');
        gettext('Kenyan');
        gettext('Kittian and Nevisian');
        gettext('Kuwaiti');
        gettext('Kyrgyz');
        gettext('Laotian');
        gettext('Latvian');
        gettext('Lebanese');
        gettext('Liberian');
        gettext('Libyan');
        gettext('Liechtensteiner');
        gettext('Lithuanian');
        gettext('Luxembourger');
        gettext('Macedonian');
        gettext('Malagasy');
        gettext('Malawian');
        gettext('Malaysian');
        gettext('Maldivan');
        gettext('Malian');
        gettext('Maltese');
        gettext('Marshallese');
        gettext('Mauritanian');
        gettext('Mauritian');
        gettext('Mexican');
        gettext('Micronesian');
        gettext('Moldovan');
        gettext('Monacan');
        gettext('Mongolian');
        gettext('Moroccan');
        gettext('Mosotho');
        gettext('Motswana');
        gettext('Mozambican');
        gettext('Namibian');
        gettext('Nauruan');
        gettext('Nepalese');
        gettext('New Zealander');
        gettext('Nicaraguan');
        gettext('Nigerian');
        gettext('Nigerien');
        gettext('North Korean');
        gettext('Northern Irish');
        gettext('Norwegian');
        gettext('Omani');
        gettext('Pakistani');
        gettext('Palauan');
        gettext('Panamanian');
        gettext('Papua New Guinean');
        gettext('Paraguayan');
        gettext('Peruvian');
        gettext('Polish');
        gettext('Portuguese');
        gettext('Qatari');
        gettext('Romanian');
        gettext('Russian');
        gettext('Rwandan');
        gettext('Saint Lucian');
        gettext('Salvadoran');
        gettext('Samoan');
        gettext('San Marinese');
        gettext('Sao Tomean');
        gettext('Saudi');
        gettext('Scottish');
        gettext('Senegalese');
        gettext('Serbian');
        gettext('Seychellois');
        gettext('Sierra Leonean');
        gettext('Singaporean');
        gettext('Slovakian');
        gettext('Slovenian');
        gettext('Solomon Islander');
        gettext('Somali');
        gettext('South African');
        gettext('South Korean');
        gettext('Spanish');
        gettext('Sri Lankan');
        gettext('Sudanese');
        gettext('Surinamer');
        gettext('Swazi');
        gettext('Swedish');
        gettext('Swiss');
        gettext('Syrian');
        gettext('Taiwanese');
        gettext('Tajik');
        gettext('Tanzanian');
        gettext('Thai');
        gettext('Togolese');
        gettext('Tongan');
        gettext('Trinidadian or Tobagonian');
        gettext('Tunisian');
        gettext('Turkish');
        gettext('Tuvaluan');
        gettext('Ugandan');
        gettext('Ukrainian');
        gettext('Uruguayan');
        gettext('Uzbekistani');
        gettext('Venezuelan');
        gettext('Vietnamese');
        gettext('Welsh');
        gettext('Yemenite');
        gettext('Zambian');
        gettext('Zimbabwean');
        gettext('Birth Year');
        gettext('Musical Background');
        gettext('Do you consider yourself a musician or to have specialist musical knowledge?');
        gettext('Yes');
        gettext('No');
        gettext('No expertise whatsoever');
        gettext('An expert');
        gettext('Do you have any visual impairments? (If so, you may still participate in the experiment!)');
        gettext('Select all of the following styles to which you regularly listen:');
        gettext('Rock');
        gettext('Pop');
        gettext('Classical');
        gettext('Jazz');
        gettext('Dance');
        gettext('HipHop');
        gettext('Folk');
        gettext('World');
        gettext('None');
        gettext('Media Questions');
        gettext('I was engaged with it and responding to it emotionally');
        gettext('How involved and engaged were you with what you have just heard?');
        gettext('Very negative');
        gettext('Very positive');
        gettext('How positive or negative did what you have just heard make you feel?');
        gettext('Very drowsy');
        gettext('Very lively');
        gettext('How active or passive did what you have just heard make you feel?');
        gettext('Weak (without control, submissive)');
        gettext('Empowered (in control of everything, dominant)');
        gettext('How in control did you feel?');
        gettext('Not at all engaged, my mind was elsewhere');
        gettext('Very drowsy');
        gettext('Very lively');
        gettext('Weak (without control, submissive)');
        gettext('Empowered (in control of everything, dominant)');
        gettext('How in control did you feel?');
        gettext('Not at all');
        gettext('Very tense');
        gettext('Very relaxed');
        gettext('How tense or relaxed did you feel while you were listening?');
        gettext('I hated it');
        gettext('I loved it');
        gettext('How much did you like/dislike what you have just heard?');
        gettext('I had never heard it before');
        gettext('I listen to it regularly');
        gettext('How familiar are you with what you have just heard?');
        gettext('Age');
        gettext('How would you rate your musical expertise?');
        gettext('Do you have any hearing impairments? (If so, you may still participate in the experiment!)');
        gettext('Additional Questions');
        gettext('How well do the following statements describe your personality?');
        gettext('I see myself as someone who is reserved.');
        gettext('Disagree strongly');
        gettext('Disagree a little');
        gettext('Neither agree nor disagree');
        gettext('Agree a little');
        gettext('Agree strongly');
        gettext('I see myself as someone who is generally trusting.');
        gettext('I see myself as someone who tends to be lazy.');
        gettext('I see myself as someone who is relaxed, handles stress well.');
        gettext('I see myself as someone who has few artistic interests.');
        gettext('I see myself as someone who is outgoing, sociable.');
        gettext('I see myself as someone who tends to find fault with others.');
        gettext('I see myself as someone who does a thorough job.');
        gettext('I see myself as someone who gets nervous easily.');
        gettext('I see myself as someone who has an active imagination.');
        gettext('This questionnaire uses some simple scales to find out how you responded to the media excerpt. We will compare your responses to the biosignals that we measured as you were listening.');
        gettext('Final Questions');
        gettext('How concentrated were you during this experiment?');
        gettext('Very distracted');
        gettext('Very concentrated');
        gettext('1');
        gettext('2');
        gettext('3');
        gettext('4');
        gettext('5');
        gettext('6');
        gettext('7');
        gettext('8');
        gettext('9');
        gettext('10');
        gettext('11');
        gettext('12');
        gettext('13');
        gettext('14');
        gettext('15');
        gettext('16');
        gettext('17');
        gettext('18');
        gettext('19');
        gettext('20');
        gettext('21');
        gettext('22');
        gettext('23');
        gettext('24');
        gettext('25');
        gettext('26');
        gettext('27');
        gettext('28');
        gettext('29');
        gettext('30');
        gettext('31');
        gettext('32');
        gettext('33');
        gettext('34');
        gettext('35');
        gettext('36');
        gettext('37');
        gettext('38');
        gettext('39');
        gettext('40');
        gettext('41');
        gettext('42');
        gettext('43');
        gettext('44');
        gettext('45');
        gettext('46');
        gettext('47');
        gettext('48');
        gettext('49');
        gettext('50');
        gettext('51');
        gettext('52');
        gettext('53');
        gettext('54');
        gettext('55');
        gettext('56');
        gettext('57');
        gettext('58');
        gettext('59');
        gettext('60');
        gettext('61');
        gettext('62');
        gettext('63');
        gettext('64');
        gettext('65');
        gettext('66');
        gettext('67');
        gettext('68');
        gettext('69');
        gettext('70');
        gettext('71');
        gettext('72');
        gettext('73');
        gettext('74');
        gettext('75');
        gettext('76');
        gettext('77');
        gettext('78');
        gettext('79');
        gettext('80');
        gettext('81');
        gettext('82');
        gettext('83');
        gettext('84');
        gettext('85');
        gettext('86');
        gettext('87');
        gettext('88');
        gettext('89');
        gettext('90');
        gettext('91');
        gettext('92');
        gettext('93');
        gettext('94');
        gettext('95');
        gettext('96');
        gettext('97');
        gettext('98');
        gettext('99');
        gettext('100');
        gettext('101');
        gettext('102');
        gettext('103');
        gettext('104');
        gettext('105');
        gettext('106');
        gettext('107');
        gettext('108');
        gettext('109');
        gettext('110');
        gettext('111');
        gettext('112');
        gettext('113');
        gettext('114');
        gettext('115');
        gettext('116');
        gettext('117');
        gettext('118');
        gettext('119');
        gettext('120');
        gettext('121');
        gettext('Begin Playback');
    }
]);