import _ from "lodash";
export const nationalities = _.sortBy(
  JSON.parse(
    `[
        {
            "name": "",
            "arabicName": "",
            "code": "",
            "telCode": ""
        },
      {
          "name": "Ethiopia",
          "arabicName": "إثيوبيــــا",
          "code": "ETH",
          "telCode": "251"
      },
      {
          "name": "Aruba",
          "arabicName": "آروبا",
          "code": "ABW",
          "telCode": "297"
      },
      {
          "name": "Eritrea",
          "arabicName": "أريتيريا",
          "code": "ERI",
          "isArabic": true,
          "telCode": "291"
      },
      {
          "name": "Spain",
          "arabicName": "أسبانيا",
          "code": "ESP",
          "telCode": "34"
      },
      {
          "name": "Afghanistan",
          "arabicName": "أفغانستان",
          "code": "AFG",
          "isMission": true,
          "telCode": "93"
      },
      {
          "name": "Albania",
          "arabicName": "ألبانيا",
          "code": "ALB",
          "telCode": "355"
      },
      {
          "name": "Germany",
          "arabicName": "ألمانيا",
          "code": "D",
          "telCode": "49"
      },
      {
        "name": "Germany",
        "arabicName": "ألمانيا",
        "code": "DEU",
        "telCode": "49"
    },
      {
          "name": "Angola",
          "arabicName": "أنجولا",
          "code": "AGO",
          "telCode": "244"
      },
      {
          "name": "Anguilla",
          "arabicName": "أنجويلا",
          "code": "AIA",
          "telCode": "2641"
      },
      {
          "name": "Indonesia",
          "arabicName": "إندونسيا",
          "code": "IDN",
          "isMission": true,
          "telCode": "62"
      },
      {
          "name": "Uruguay",
          "arabicName": "أورجواى",
          "code": "URY",
          "telCode": "598"
      },
      {
          "name": "Uganda",
          "arabicName": "أوغندا",
          "code": "UGA",
          "telCode": "256"
      },
      {
          "name": "Azerbaijan",
          "arabicName": "اذربيجان",
          "code": "AZE",
          "telCode": "994"
      },
      {
          "name": "Armenia",
          "arabicName": "ارمينيا",
          "code": "ARM",
          "telCode": "374"
      },
      {
          "name": "Australia",
          "arabicName": "استراليا",
          "code": "AUS",
          "telCode": "61"
      },
      {
          "name": "Estonia",
          "arabicName": "استونيا",
          "code": "EST",
          "telCode": "372"
      },
      {
          "name": "Ukraine",
          "arabicName": "اكرانيا",
          "code": "UKR",
          "telCode": "380"
      },
      {
          "name": "United Arab Emirates",
          "arabicName": "الإمارات العربية المتحدة",
          "code": "ARE",
          "isArabic": true,
          "telCode": "971"
      },
      {
          "name": "Argentina",
          "arabicName": "الارجنتين",
          "code": "ARG",
          "telCode": "54"
      },
      {
          "name": "Jordan",
          "arabicName": "الاردن",
          "code": "JOR",
          "isArabic": true,
          "isMission": true,
          "telCode": "962"
      },
      {
          "name": "Ecuador",
          "arabicName": "الاكوادور",
          "code": "ECU",
          "telCode": "593"
      },
      {
          "name": "Bahrain",
          "arabicName": "البحرين",
          "code": "BHR",
          "isArabic": true,
          "telCode": "973"
      },
      {
          "name": "Brazil",
          "arabicName": "البرازيل",
          "code": "BRA",
          "telCode": "55"
      },
      {
          "name": "Portugal",
          "arabicName": "البرتغال",
          "code": "PRT",
          "telCode": "351"
      },
      {
          "name": "Bosnia and Herzegovina",
          "arabicName": "البوسنة",
          "code": "BIH",
          "telCode": "387"
      },
      {
          "name": "Gabon",
          "arabicName": "الجابون",
          "code": "GAB",
          "telCode": "241"
      },
      {
          "name": "MONTENEGRO",
          "arabicName": "الجبل الاسود",
          "code": "MNE",
          "telCode": "382"
      },
      {
          "name": "Algeria",
          "arabicName": "الجزائر",
          "code": "DZA",
          "isArabic": true,
          "isMission": true,
          "telCode": "213"
      },
      {
          "name": "Dominican",
          "arabicName": "الدمنيكان",
          "code": "DMA"
      },
      {
          "name": "Denmark",
          "arabicName": "الدنمارك",
          "code": "DNK",
          "telCode": "45"
      },
      {
          "name": "Salvador",
          "arabicName": "السلفادور",
          "code": "SLV",
          "telCode": "503"
      },
      {
          "name": "Senegal",
          "arabicName": "السنغال",
          "code": "SEN",
          "telCode": "221"
      },
      {
          "name": "Sudan",
          "arabicName": "السودان",
          "code": "SDN",
          "isArabic": true,
          "isMission": true,
          "telCode": "249"
      },
      {
          "name": "Sweden",
          "arabicName": "السويد",
          "code": "SWE",
          "telCode": "46"
      },
      {
          "name": "Somalia",
          "arabicName": "الصومال",
          "code": "SOM",
          "isArabic": true,
          "telCode": "252"
      },
      {
          "name": "China",
          "arabicName": "الصين",
          "code": "CHN",
          "telCode": "86"

      },
      {
          "name": "Iraq",
          "arabicName": "العراق",
          "code": "IRQ",
          "isArabic": true,
          "telCode": "964"
      },
      {
          "name": "Vatican City",
          "arabicName": "الفاتيكان",
          "code": "VAT",
          "telCode": "1039"
      },
      {
          "name": "Philippines",
          "arabicName": "الفلبين",
          "code": "PHL",
          "telCode": "63"
      },
      {
          "name": "Cameroon",
          "arabicName": "الكاميرون",
          "code": "CMR",
          "telCode": "237"
      },
      {
          "name": "Congo COG",
          "arabicName": "الكنغو",
          "code": "COG",
          "telCode": "243"
      },
      {
          "name": "Kuwait",
          "arabicName": "الكويت",
          "code": "KWT",
          "isArabic": true,
          "telCode": "965"
      },
      {
          "name": "Maldives",
          "arabicName": "المالديف",
          "code": "MDV",
          "telCode": "960"
      },
      {
          "name": "Hungary",
          "arabicName": "المجر",
          "code": "HUN",
          "telCode": "36"
      },
      {
          "name": "Morocco",
          "arabicName": "المغرب",
          "code": "MAR",
          "isArabic": true,
          "isMission": true,
          "telCode": "212"
      },
      {
          "name": "Mexico",
          "arabicName": "المكسيك‏",
          "code": "MEX",
          "telCode": "52"
      },
      {
          "name": "Kingdom Saudi Arabia",
          "arabicName": "المملكة العربية السعودية",
          "code": "SAU",
          "isArabic": true,
          "telCode": "966"
      },
      {
          "name": "United Kingdom",
          "arabicName": "المملكة المتحدة",
          "code": "GBR",
          "telCode": "44"
      },
      {
          "name": "Norway",
          "arabicName": "النرويج",
          "code": "NOR",
          "telCode": "47"
      },
      {
          "name": "Austria",
          "arabicName": "النمسا",
          "code": "AUT",
          "telCode": "43"
      },
      {
          "name": "Niger",
          "arabicName": "النيجر",
          "code": "NER",
          "isMission": true,
          "telCode": "227"
      },
      {
          "name": "India",
          "arabicName": "الهند",
          "code": "IND",
          "isMission": true,
          "telCode": "91"
      },
      {
          "name": "United States",
          "arabicName": "الولايات المتحدة الامريكية",
          "code": "USA",
          "telCode": "1"
      },
      {
          "name": "Japan",
          "arabicName": "اليابان",
          "code": "JPN",
          "telCode": "81"
      },
      {
          "name": "Yemen",
          "arabicName": "اليمن",
          "code": "YEM",
          "isArabic": true,
          "isMission": true,
          "telCode": "967"
      },
      {
          "name": "Greece",
          "arabicName": "اليونان",
          "code": "GRC",
          "telCode": "30"
      },
      {
          "name": "Antigua and Barbuda",
          "arabicName": "انتيجوا و باربودا",
          "code": "ATG",
          "telCode": "268"
      },
      {
          "name": "Andorra",
          "arabicName": "اندورا",
          "code": "AND",
          "telCode": "376"
      },
      {
          "name": "Uzbekistan",
          "arabicName": "اوزبكستان",
          "code": "UZB",
          "telCode": "998"
      },
      {
          "name": "Iran",
          "arabicName": "ايران",
          "code": "IRN",
          "telCode": "98"
      },
      {
          "name": "Ireland",
          "arabicName": "ايرلاندا",
          "code": "IRL",
          "telCode": "353"
      },
      {
          "name": "Iceland",
          "arabicName": "ايسلاندا",
          "code": "ISL",
          "telCode": "354"
      },
      {
          "name": "Italy",
          "arabicName": "ايطاليا",
          "code": "ITA",
          "telCode": "39"
      },
      {
          "name": "Papua New Guinea",
          "arabicName": "بابوا - نيو - جونييا",
          "code": "PNG",
          "telCode": "675"
      },
      {
          "name": "Paraguay",
          "arabicName": "باراجواى",
          "code": "PRY",
          "telCode": "595"
      },
      {
          "name": "Barbados",
          "arabicName": "باربادوس",
          "code": "BRB",
          "telCode": "1246"
      },
      {
          "name": "Barbados",
          "arabicName": "باربادوس",
          "code": "BRD",
          "telCode": "1246"
      },
      {
          "name": "Pakistan",
          "arabicName": "باكستان",
          "code": "PAK",
          "isMission": true,
          "telCode": "92"
      },
      {
          "name": "Palau",
          "arabicName": "بالو",
          "code": "PLW",
          "telCode": "680"
      },
      {
          "name": "Bermuda",
          "arabicName": "برمودا",
          "code": "BMU",
          "telCode": "441"
      },
      {
          "name": "Brunei",
          "arabicName": "بروناى",
          "code": "BRN",
          "telCode": "673"
      },
      {
          "name": "Belgium",
          "arabicName": "بلجيكا",
          "code": "BEL",
          "telCode": "32"
      },
      {
          "name": "Bulgaria",
          "arabicName": "بلغاريا",
          "code": "BGR",
          "telCode": "359"
      },
      {
          "name": "Belize",
          "arabicName": "بليز",
          "code": "BLZ",
          "telCode": "501"
      },
      {
          "name": "Bangladesh",
          "arabicName": "بنجلاديش",
          "code": "BGD",
          "telCode": "880"
      },
      {
          "name": "Panama",
          "arabicName": "بنما",
          "code": "PAN",
          "telCode": "507"
      },
      {
          "name": "Benin",
          "arabicName": "بنين",
          "code": "BEN",
          "telCode": "229"
      },
      {
          "name": "Bhutan",
          "arabicName": "بوتان",
          "code": "BTN",
          "telCode": "975"
      },
      {
          "name": "Botswana",
          "arabicName": "بوتسوانا",
          "code": "BWA",
          "telCode": "267"
      },
      {
          "name": "Puerto Rico",
          "arabicName": "بورتوريكو",
          "code": "PRI",
          "telCode": "1787"
      },
      {
          "name": "Burkina Faso",
          "arabicName": "بوركينا",
          "code": "BFA",
          "telCode": "226"
      },
      {
          "name": "Burundi",
          "arabicName": "بوروندى",
          "code": "BDI",
          "telCode": "257"
      },
      {
          "name": "Poland",
          "arabicName": "بولندا",
          "code": "POL",
          "telCode": "48"
      },
      {
          "name": "Bolivia",
          "arabicName": "بوليفيا",
          "code": "BOL",
          "telCode": "591"
      },
      {
          "name": "French Polynesia",
          "arabicName": "بولينيزيا الفرنسية",
          "code": "PYF",
          "isArabic": false,
          "telCode": "689"
      },
      {
          "name": "Peru",
          "arabicName": "بيرو",
          "code": "PER",
          "telCode": "51"
      },
      {
          "name": "Belarus",
          "arabicName": "بيلاروس",
          "code": "BLR",
          "telCode": "375"
      },
      {
          "name": "Thailand",
          "arabicName": "تايلاند",
          "code": "THA",
          "isMission": true,
          "telCode": "66"
      },
      {
          "name": "Taiwan",
          "arabicName": "تايوان",
          "code": "TWN",
          "telCode": "886"
      },
      {
          "name": "Turkmenistan",
          "arabicName": "تركمنستان",
          "code": "TKM",
          "telCode": "993"
      },
      {
          "name": "Turkey",
          "arabicName": "تركيا",
          "code": "TUR",
          "isMission": true,
          "telCode": "90"
      },
      {
          "name": "Trinidad and tobago",
          "arabicName": "ترينيداد وتوباجو",
          "code": "TTO",
          "telCode": "868"
      },
      {
          "name": "Chad",
          "arabicName": "تشاد",
          "code": "TCD",
          "telCode": "235"
      },
      {
          "name": "Chile",
          "arabicName": "تشيلي",
          "code": "CHL",
          "telCode": "56"
      },
      {
          "name": "Tanzania",
          "arabicName": "تنزانيا",
          "code": "TZA",
          "telCode": "2551"
      },
      {
          "name": "Togo",
          "arabicName": "توجو",
          "code": "TGO",
          "telCode": "228"
      },
      {
          "name": "Tuvalu",
          "arabicName": "توفالــــــــو",
          "code": "TUV",
          "telCode": "688"
      },
      {
          "name": "Tokelau",
          "arabicName": "توكيلاو",
          "code": "TKL",
          "telCode": "690"
      },
      {
          "name": "Tonga Islands",
          "arabicName": "تونجــا",
          "code": "TON",
          "telCode": "676"
      },
      {
          "name": "Tunisia",
          "arabicName": "تونس",
          "code": "TUN",
          "isArabic": true,
          "isMission": true,
          "telCode": "216"
      },
      {
          "name": "Jamaica",
          "arabicName": "جامايكا",
          "code": "JAM",
          "telCode": "876"
      },
      {
          "name": "Gambia",
          "arabicName": "جامبيا",
          "code": "GMB",
          "telCode": "220"
      },
      {
          "name": "Gibraltar",
          "arabicName": "جبل طــــارق",
          "code": "GIB",
          "telCode": "350"
      },
      {
          "name": "Green Land",
          "arabicName": "جرين لاند",
          "code": "GRL",
          "telCode": "299"
      },
      {
          "name": "Grenada",
          "arabicName": "جرينادا",
          "code": "GRD",
          "telCode": "473"
      },
      {
          "name": "Islands - Falkland",
          "arabicName": "جزر - فوكلاند",
          "code": "FLK",
          "telCode": "500"
      },
      {
          "name": "Bahamas",
          "arabicName": "جزر البهاما",
          "code": "BHS",
          "telCode": "1242"
      },
      {
          "name": "Comoros Islands",
          "arabicName": "جزر القمر",
          "code": "COM",
          "isArabic": true,
          "telCode": "2691"
      },
      {
          "name": "Turks and Caicos Islands",
          "arabicName": "جزر تركس وكايكوس",
          "code": "TCA",
          "telCode": "649"
      },
      {
          "name": "Solomon Islands",
          "arabicName": "جزر سليمــــان",
          "code": "SLB",
          "telCode": "677"
      },
      {
          "name": "US Virgin Islands",
          "arabicName": "جزر فرجين",
          "code": "VGB",
          "telCode": "340"
      },
      {
          "name": "British Virgin Islands",
          "arabicName": "جزر فيرجينيا",
          "code": "VIR",
          "telCode": "284"
      },
      {
          "name": "Cayman Islands",
          "arabicName": "جزر كايمان",
          "code": "CYM",
          "telCode": "345"
      },
      {
          "name": "Cook Islands",
          "arabicName": "جزر كوك",
          "code": "COK",
          "telCode": "682"
      },
      {
          "name": "Cocos Islands",
          "arabicName": "جزر كوكوس",
          "code": "CCK",
          "telCode": "2061"
      },
      {
          "name": "Marshall Islands",
          "arabicName": "جزر مارشال",
          "code": "MHN",
          "telCode": "692"
      },
      {
          "name": "Marshall Islands",
          "arabicName": "جزر مارشال",
          "code": "MHL",
          "telCode": "692"
      },
      {
          "name": "Christmas Island",
          "arabicName": "جزيرة كريسماس",
          "code": "CXR",
          "telCode": "1061"
      },
      {
          "name": "Norfolk Island",
          "arabicName": "جزيرة نورفولك",
          "code": "NFK",
          "telCode": "6722"
      },
      {
          "name": "South Sudan",
          "arabicName": "جمهوربة جنوب السودان",
          "code": "SSD",
          "isMission": true,
          "telCode": "211"
      },
      {
          "name": "Czech Republic",
          "arabicName": "جمهورية التشيك",
          "code": "CZE",
          "telCode": "420"
      },
      {
          "name": "Dominican Republic",
          "arabicName": "جمهورية الدمنيكان",
          "code": "DOM",
          "telCode": "767"
      },
      {
          "name": "Slovakia",
          "arabicName": "جمهورية سلوفاكيا",
          "code": "SVK",
          "telCode": "421"
      },
      {
          "name": "Moldavia",
          "arabicName": "جمهورية مالدوفا",
          "code": "MDA",
          "telCode": "373"
      },
      {
          "name": "Central African Republic",
          "ArabicName": "جمهورية وسط أفريقيا",
          "code": "CAF",
          "telCode": "236"
      },
      {
          "name": "South Africa",
          "arabicName": "جنوب أفريقيا",
          "code": "ZAF",
          "isMission": true,
          "telCode": "27"
      },
      {
          "name": "Guatemala",
          "arabicName": "جواتيمالا",
          "code": "GTM",
          "telCode": "502"
      },
      {
          "name": "Guam",
          "arabicName": "جوام",
          "code": "GUM",
          "telCode": "671"
      },
      {
          "name": "French Guiana",
          "arabicName": "جوانا الفرنسية",
          "code": "GUF",
          "telCode": "594"
      },
      {
          "name": "Georgia",
          "arabicName": "جورجيا",
          "code": "GEO",
          "telCode": "995"
      },
      {
          "name": "Guyana",
          "arabicName": "جويانا",
          "code": "GUY",
          "telCode": "592"
      },
      {
          "name": "Djibouti",
          "arabicName": "جيبوتى",
          "code": "DJI",
          "isArabic": true,
          "telCode": "253"
      },
      {
          "name": "Rwanda",
          "arabicName": "روانــــــــــدا",
          "code": "RWA",
          "telCode": "250"
      },
      {
          "name": "Russia",
          "arabicName": "روسيا الإتحادية",
          "code": "RUS",
          "telCode": "7002"
      },
      {
          "name": "Romania",
          "arabicName": "رومانيا",
          "code": "ROU",
          "telCode": "40"
      },
      {
          "name": "Zambia",
          "arabicName": "زامبيا",
          "code": "ZMB",
          "telCode": "260"
      },
      {
          "name": "Zimbabwe",
          "arabicName": "زيمبابوى",
          "code": "ZIM",
          "telCode": "263"
      },
      {
          "name": "Western Samoa",
          "arabicName": "ساموا",
          "code": "WSM",
          "telCode": "685"
      },
      {
          "name": "American Samoa",
          "arabicName": "ساموا الأمريكية",
          "code": "ASM",
          "telCode": "684"
      },
      {
          "name": "San Marino",
          "arabicName": "سان مارينو",
          "code": "SMR",
          "telCode": "378"
      },
      {
          "name": "St. Lucia",
          "arabicName": "ســانت لوتشــيا",
          "code": "LCA",
          "telCode": "758"
      },
      {
          "name": "Sri Lanka",
          "arabicName": "سريلانكا",
          "code": "LKA",
          "telCode": "94"
      },
      {
          "name": "Slovenia",
          "arabicName": "سلوفينيا",
          "code": "SVN",
          "telCode": "386"
      },
      {
          "name": "Singapore",
          "arabicName": "سنغافورة",
          "code": "SGP",
          "telCode": "65"
      },
      {
          "name": "Swaziland",
          "arabicName": "سوازيـلانـــــــــد",
          "code": "SWZ",
          "telCode": "2683"
      },
      {
          "name": "Syria",
          "arabicName": "سوريا",
          "code": "SYR",
          "isArabic": true,
          "isMission": true,
          "telCode": "963"
      },
      {
          "name": "Suriname",
          "arabicName": "سورينام",
          "code": "SUR",
          "telCode": "597"
      },
      {
          "name": "Switzerland",
          "arabicName": "سويسرا",
          "code": "CHE",
          "telCode": "41"
      },
      {
          "name": "Sierra Leone",
          "arabicName": "سيراليون",
          "code": "SLE",
          "telCode": "232"
      },
      {
          "name": "Seychelles",
          "arabicName": "سيشل",
          "code": "SYC",
          "telCode": "248"
      },
      {
          "name": "East Timor",
          "arabicName": "شرق تيمور",
          "code": "TMP",
          "telCode": "6701"
      },
      {
          "name": "Serbia",
          "arabicName": "صربيا",
          "code": "SRB",
          "telCode": "381"
      },
      {
          "name": "Tajikistan",
          "arabicName": "طاجكستان",
          "code": "TJK",
          "telCode": "992"
      },
      {
          "name": "Ghana",
          "arabicName": "غانـا",
          "code": "GHA",
          "telCode": "233"
      },
      {
          "name": "Guinea",
          "arabicName": "غينيا",
          "code": "GIN"
      },
      {
          "name": "Equatorial Guinea",
          "arabicName": "غينيا الأستوائية",
          "code": "GNQ",
          "telCode": "240"
      },
      {
          "name": "Guinea Bissau",
          "arabicName": "غينيا بيساو",
          "code": "GNB",
          "telCode": "245"
      },
      {
          "name": "Vanuatu",
          "arabicName": "فانواتو",
          "code": "VUT",
          "telCode": "678"
      },
      {
          "name": "France",
          "arabicName": "فرنسا",
          "code": "FRA",
          "telCode": "33"
      },
      {
          "name": "Palestine",
          "arabicName": "فلسطين",
          "code": "PSE",
          "isArabic": true,
          "isMission": true,
          "telCode": "970"
      },
      {
          "name": "Venezuela",
          "arabicName": "فنزويلا",
          "code": "VEN",
          "telCode": "58"
      },
      {
          "name": "Finland",
          "arabicName": "فنلاندا",
          "code": "FIN",
          "telCode": "358"
      },
      {
          "name": "Fiji",
          "arabicName": "فيجــــــى",
          "code": "FJI",
          "telCode": "679"
      },
      {
          "name": "Vietnam",
          "arabicName": "فييتنام",
          "code": "VNM",
          "telCode": "84"
      },
      {
          "name": "Cyprus",
          "arabicName": "قبرص",
          "code": "CYP",
          "telCode": "357"
      },
      {
          "name": "Kyrgyzstan",
          "arabicName": "قرغيزستان",
          "code": "KGZ",
          "telCode": "996"
      },
      {
          "name": "Qatar",
          "arabicName": "قطر",
          "code": "QAT",
          "isArabic": true,
          "telCode": "974"
      },
      {
          "name": "Cape Verde Islands",
          "arabicName": "كاب فيرد",
          "code": "CPV",
          "telCode": "238"
      },
      {
          "name": "Kazakhstan",
          "arabicName": "كاذاخستان",
          "code": "KAZ",
          "telCode": "7001"
      },
      {
          "name": "Cambodia",
          "arabicName": "كامبوديا",
          "code": "KHM",
          "telCode": "855"
      },
      {
          "name": "Croatia",
          "arabicName": "كرواتيا",
          "code": "HRV",
          "telCode": "385"
      },
      {
          "name": "Canada",
          "arabicName": "كندا",
          "code": "CAN",
          "telCode": "1112"
      },
      {
          "name": "Cuba",
          "arabicName": "كوبا",
          "code": "CUB",
          "telCode": "53"
      },
      {
          "name": "Cote Divoire",
          "arabicName": "كوت دي فوار",
          "code": "CIV",
          "isMission": true,
          "telCode": "225"
      },
      {
          "name": "South Korea",
          "arabicName": "كوريا الجنــوبية",
          "code": "KOR",
          "telCode": "82"
      },
      {
          "name": "North Korea",
          "arabicName": "كوريا الشمالية",
          "code": "PRK",
          "telCode": "850"
      },
      {
          "name": "Costa Rica",
          "arabicName": "كوستاريكا",
          "code": "CRI",
          "telCode": "506"
      },
      {
          "name": "Kosovo",
          "arabicName": "كوسوفا",
          "code": "RKS",
          "telCode": "550"
      },
      {
          "name": "Colombia",
          "arabicName": "كولومبيا",
          "code": "COL",
          "telCode": "57"
      },
      {
          "name": "Kiribati",
          "arabicName": "كيريباتيا",
          "code": "KIR",
          "telCode": "686"
      },
      {
          "name": "Kenya",
          "arabicName": "كينيا",
          "code": "KEN",
          "telCode": "254"
      },
      {
          "name": "Latvia",
          "arabicName": "لاتفيا",
          "code": "LVA",
          "telCode": "371"
      },
      {
          "name": "Laos",
          "arabicName": "لاوس",
          "code": "LAO",
          "telCode": "856"
      },
      {
          "name": "Lebanon",
          "arabicName": "لبنان",
          "code": "LBN",
          "isArabic": true,
          "telCode": "961"
      },
      {
          "name": "Lithuania",
          "arabicName": "لتوانيا",
          "code": "LTU",
          "telCode": "370"
      },
      {
          "name": "Luxembourg",
          "arabicName": "لوكسمبورج",
          "code": "LUX",
          "telCode": "352"
      },
      {
          "name": "Libya",
          "arabicName": "ليبيا",
          "code": "LBY",
          "isArabic": true,
          "telCode": "218"
      },
      {
          "name": "Liberia",
          "arabicName": "ليبيريا",
          "code": "LBR",
          "isMission": true,
          "telCode": "231"
      },
      {
          "name": "Lesotho",
          "arabicName": "ليسوتو",
          "code": "LSO",
          "telCode": "266"
      },
      {
          "name": "Macau",
          "arabicName": "ماكاو",
          "code": "MAC",
          "telCode": "853"
      },
      {
          "name": "Macedonia",
          "arabicName": "ماكيدونيا",
          "code": "MKD",
          "telCode": "389"
      },
      {
          "name": "Malawi",
          "arabicName": "مالاوى",
          "code": "MWI",
          "telCode": "265"
      },
      {
          "name": "Malta",
          "arabicName": "مالطا",
          "code": "MLT",
          "telCode": "356"
      },
      {
          "name": "Mali",
          "arabicName": "مالى",
          "code": "MLI",
          "isMission": true,
          "telCode": "223"
      },
      {
          "name": "Malaysia",
          "arabicName": "ماليزيا",
          "code": "MYS",
          "isMission": true,
          "telCode": "60"
      },
      {
          "name": "Mayotte",
          "arabicName": "مايوت",
          "code": "MYT",
          "telCode": "2692"
      },
      {
          "name": "Madagascar",
          "arabicName": "مدغـشقر",
          "code": "MDG",
          "telCode": "261"
      },
      {
          "name": "Egypt",
          "arabicName": "مصر",
          "code": "EGY",
          "isArabic": true,
          "isMission": true,
          "telCode": "20"
      },
      {
          "name": "Mongolia",
          "arabicName": "منغوليا",
          "code": "MNG",
          "telCode": "976"
      },
      {
          "name": "Mauritania",
          "arabicName": "موريتانيا",
          "code": "MRT",
          "isArabic": true,
          "isMission": true,
          "telCode": "222"
      },
      {
          "name": "Mauritius",
          "arabicName": "موريشيوس",
          "code": "MUS",
          "telCode": "230"
      },
      {
          "name": "Mozambique",
          "arabicName": "موزمبيق",
          "code": "MOZ",
          "telCode": "258"
      },
      {
          "name": "Monaco",
          "arabicName": "موناكو",
          "code": "MCO",
          "telCode": "377"
      },
      {
          "name": "Montserrat",
          "arabicName": "مونتسرات",
          "code": "MSR",
          "telCode": "664"
      },
      {
          "name": "Myanmar",
          "arabicName": "مينمار",
          "code": "MMR",
          "telCode": "95"
      },
      {
          "name": "Namibia",
          "arabicName": "نامبيا",
          "code": "NAM",
          "telCode": "2642"
      },
      {
          "name": "Nauru",
          "arabicName": "ناورو",
          "code": "NRU",
          "telCode": "674"
      },
      {
          "name": "Nepal",
          "arabicName": "نيبال",
          "code": "NPL",
          "telCode": "977"
      },
      {
          "name": "Nigeria",
          "arabicName": "نيجيريا",
          "code": "NGA",
          "isMission": true,
          "telCode": "234"
      },
      {
          "name": "Nicaragua",
          "arabicName": "نيكاراجوا",
          "code": "NIC",
          "telCode": "505"
      },
      {
          "name": "New Caledonia",
          "arabicName": "نيو - كاليدونيا",
          "code": "NCL",
          "telCode": "687"
      },
      {
          "name": "New Zealand",
          "arabicName": "نيوزيلاند",
          "code": "NZL",
          "telCode": "64"
      },
      {
          "name": "Niue",
          "arabicName": "نيوى جزر",
          "code": "NIU",
          "telCode": "683"
      },
      {
          "name": "Haiti",
          "arabicName": "هايتى",
          "code": "HTI",
          "telCode": "509"
      },
      {
          "name": "Honduras",
          "arabicName": "هندوراس",
          "code": "HND",
          "telCode": "504"
      },
      {
          "name": "Netherlands",
          "arabicName": "هولندا",
          "code": "NLD",
          "telCode": "31"
      },
      {
          "name": "St. Helena",
          "arabicName": "هيلينا",
          "code": "SHN",
          "telCode": "290"
      },
      {
          "name": "Yugoslavia",
          "arabicName": "يوغسلافيا",
          "code": "YUG",
          "telCode": "3812"
      },
      {
          "name": "Reunion",
          "arabicName": "ريونيون",
          "code": "REU",
          "telCode": "262"
      },
      {
          "name": "Zimbabwe ZWE",
          "arabicName": "زمبابوي",
          "code": "ZWE"
      },
      {
          "name": "United Kingdom GBO",
          "arabicName": "المملكة المتحدة",
          "code": "GBO"
      },
      {
          "name": "United Kingdom GBD",
          "arabicName": "المملكة المتحدة",
          "code": "GBD"
      },
      {
          "name": "United Kingdom GBS",
          "arabicName": "المملكة المتحدة",
          "code": "GBS"
      },
      {
          "name": "United Kingdom GBP",
          "arabicName": "المملكة المتحدة",
          "code": "GBP",
          "telCode": "44"
      },
      {
          "name": "United Kingdom GBN",
          "arabicName": "المملكة المتحدة",
          "code": "GBN"
      },
      {
          "name": "Dominican DMA",
          "arabicName": "جمهورية الدمنيكان",
          "code": "DMA"
      },
      {
          "name": "Stateless XXB",
          "code": "XXB"
      },
      {
          "name": "Stateless XXX",
          "code": "XXX"
      },
      {
          "name": "Serbia 381",
          "arabicName": "صربيا",
          "code": "SRB"
      },
      {
          "name": "Stateless XXA",
          "code": "XXA"
      },
      {
          "name": "Liechtenstein",
          "arabicName": "ليختنشتاين",
          "code": "LIE",
          "telCode": "423"
      },
      {
          "name": "Congo COD",
          "arabicName": "الكنغو",
          "code": "COD",
          "telCode": "242"
      }
  ]`
  ),
  "name"
);
