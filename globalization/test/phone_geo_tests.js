// @@@LICENSE
//
//      Copyright (c) 2010-2013 LG Electronics, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// LICENSE@@@
/*globals Globalization, Assert, console */

var webos = IMPORTS.require("webos"); webos.include("test/loadall.js");

function PhoneGeoTests() {
}

PhoneGeoTests.prototype.testNANP = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "1",
		areaCode: "650",
		subscriberNumber: "6543210"
	};
	var expected = {
		country: {
			sn: "North America",
			ln: "North America and the Caribbean Islands",
			code: "us"
		},
		area: {
			sn: "California",
			ln: "Central California: San Mateo, Palo Alto, Redwood City, Menlo Park, Mountain View, southern San Francisco suburbs"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_us');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testNANPLocalNumber = function(){
	var location;
	var parsed = {
		subscriberNumber: "6543210"
	};
	var expected = {
		country: {
			sn: "North America",
			ln: "North America and the Caribbean Islands",
			code: "us"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_us');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testNANPServiceNumber = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "1",
		areaCode: "888",
		subscriberNumber: "6543210"
	};
	var expected = {
		country: {
			sn: "North America",
			ln: "North America and the Caribbean Islands",
			code: "us"
		},
		area: {
			sn: "Toll-free",
			ln: "Toll-free Telephone Service"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_us');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testNANPEmergencyLikeServiceNumber = function(){
	var location;
	var parsed = {
		serviceCode: "411"
	};
	var expected = {
		country: {
			sn: "North America",
			ln: "North America and the Caribbean Islands",
			code: "us"
		},
		area: {
			sn: "Service Number",
			ln: "Service Number"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_us');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testNANPEmergency = function(){
	var location;
	var parsed = {
		emergency: "911"
	};
	var expected = {
		country: {
			sn: "North America",
			ln: "North America and the Caribbean Islands",
			code: "us"
		},
		area: {
			sn: "Emergency Services Number",
			ln: "Emergency Services Number"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_us');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testNANPNoLocale = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "1",
		areaCode: "650",
		subscriberNumber: "6543210"
	};
	var expected = {
		country: {
			sn: "North America",
			ln: "North America and the Caribbean Islands",
			code: "us"
		},
		area: {
			sn: "California",
			ln: "Central California: San Mateo, Palo Alto, Redwood City, Menlo Park, Mountain View, southern San Francisco suburbs"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed);
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};
PhoneGeoTests.prototype.testNANPOtherLocale = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "1",
		areaCode: "650",
		subscriberNumber: "6543210"
	};
	var expected = {
		country: {
			sn: "Amérique du Nord",
			ln: "Amérique du Nord et Îles Caraïbes",
			code: "us"
		},
		area: {
			sn: "Californie",
			ln: "Californie centrale : San Mateo, Palo Alto, Redwood City, Menlo Park, Mountain View, banlieues du sud de San Francisco"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'fr_fr');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testNANPUnknownAreaCode = function(){
	var location;
	var parsed = {
		areaCode: "875",
		subscriberNumber: "6543210"
	};
	var expected = {
		country: {
			sn: "North America",
			ln: "North America and the Caribbean Islands",
			code: "us"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_us');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testDefaultCountry = function(){
	var location;
	var parsed = {
		areaCode: "650",
		subscriberNumber: "6543210"
	};
	var expected = {
		country: {
			sn: "North America",
			ln: "North America and the Caribbean Islands",
			code: "us"
		},
		area: {
			sn: "California",
			ln: "Central California: San Mateo, Palo Alto, Redwood City, Menlo Park, Mountain View, southern San Francisco suburbs"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_us');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

//for bug NOV-118981
PhoneGeoTests.prototype.testNANPInvalidNumber = function(){
	var location;
	var parsed = {
		trunkAccess: "1",
		areaCode: "234"
	};
	var expected = {
		country: {
			sn: "North America",
			ln: "North America and the Caribbean Islands",
			code: "us"
		},
		area: {
			sn: "Ohio",
			ln: "Ohio"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_us');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testDefaultDE = function(){
	var location;
	var parsed = {
		areaCode: "6224",
		subscriberNumber: "123456"
	};
	var expected = {
		country: {
			sn: "Deutschland",
			ln: "Deutschland",
			code: "de"
		},
		area: {
			sn: "Leimen",
			ln: "Leimen, Nußloch, Sandhausen"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'de_de');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testDEMobileNumber = function(){
	var location;
	var parsed = {
		trunkAccess: "0",
		mobilePrefix: "17",
		subscriberNumber: "12345678"
	};
	var expected = {
		country: {
			sn: "Deutschland",
			ln: "Deutschland",
			code: "de"
		},
		area: {
			sn: "Handynummer",
			ln: "Handynummer"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'de_de');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testDEServiceNumber = function(){
	var location;
	var parsed = {
		trunkAccess: "0",
		serviceCode: "12",
		subscriberNumber: "12345678"
	};
	var expected = {
		country: {
			sn: "Deutschland",
			ln: "Deutschland",
			code: "de"
		},
		area: {
			sn: "Dienstnummer",
			ln: "Dienstnummer"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'de_de');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testDEEmergency = function(){
	var location;
	var parsed = {
		emergency: "112"
	};
	var expected = {
		country: {
			sn: "Deutschland",
			ln: "Deutschland",
			code: "de"
		},
		area: {
			sn: "Notrufnummer",
			ln: "Notrufnummer"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'de_de');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testDELocal = function(){
	var location;
	var parsed = {
		subscriberNumber: "12345678"
	};
	var expected = {
		country: {
			sn: "Deutschland",
			ln: "Deutschland",
			code: "de"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'de_de');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testDefaultHK = function(){
	var location;
	var parsed = {
		trunkAccess: "0",
		areaCode: "663",
		subscriberNumber: "12345678"
	};
	var expected = {
		country: {
			sn: "中國",
			ln: "中華人民共和國",
			code: "cn"
		},
		area: {
			sn: "Jieyang",
			ln: "Jieyang 揭阳市"
		}
	};
	
	// give the prc mcc number so that this gives the right geo location
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'zh_hk', "460");
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testHKMobileNumber = function(){
	var location;
	var parsed = {
		mobilePrefix: "150",
		subscriberNumber: "05179573"
	};
	var expected = {
		country: {
			sn: "中國",
			ln: "中華人民共和國",
			code: "cn"
		},
		area: {
			sn: "Mobile Number",
			ln: "Mobile Number"
		}
	};

	// give the prc mcc number so that this gives the right geo location
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'zh_hk', "460");
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testDefaultCN = function(){
	var location;
	var parsed = {
		trunkAccess: "0",
		areaCode: "663",
		subscriberNumber: "12345678"
	};
	var expected = {
		country: {
			sn: "中国",
			ln: "中华人民共和国",
			code: "cn"  
		},
		area: {
			sn: "Jieyang",
			ln: "Jieyang 揭阳市"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'zh_cn');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testCNMobileNumber = function(){
	var location;
	var parsed = {
		mobilePrefix: "150",
		subscriberNumber: "05179573"
	};
	var expected = {
		country: {
			sn: "中国",
			ln: "中华人民共和国",
			code: "cn"
		},
		area: {
			sn: "手机号码",
			ln: "手机号码"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'zh_cn');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testUK = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "44",
		areaCode: "161",
		subscriberNumber: "1234567"
	};
	var expected = {
		country: {
			sn: "United Kingdom",
			ln: "United Kingdom, Guernsey, Isle of Man, Jersey",
			code: "gb"
		},
		area: {
			sn: "Manchester",
			ln: "Manchester"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_uk');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGB = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "44",
		areaCode: "161",
		subscriberNumber: "1234567"
	};
	var expected = {
		country: {
			sn: "United Kingdom",
			ln: "United Kingdom, Guernsey, Isle of Man, Jersey",
			code: "gb"
		},
		area: {
			sn: "Manchester",
			ln: "Manchester"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_gb');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testUKMobile = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "44",
		mobilePrefix: "75",
		subscriberNumber: "12345678"
	};
	var expected = {
		country: {
			sn: "United Kingdom",
			ln: "United Kingdom, Guernsey, Isle of Man, Jersey",
			code: "gb"
		},
		area: {
			sn: "Mobile Number",
			ln: "Mobile Number"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_gb');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testUKService = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "44",
		serviceCode: "303",
		subscriberNumber: "1234567"
	};
	var expected = {
		country: {
			sn: "United Kingdom",
			ln: "United Kingdom, Guernsey, Isle of Man, Jersey",
			code: "gb"
		},
		area: {
			sn: "Service Number",
			ln: "Service Number"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_gb');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testUKLocal = function() {
	var location;
	var parsed = {
		subscriberNumber: "1234567"
	};
	var expected = {
		country: {
			sn: "United Kingdom",
			ln: "United Kingdom, Guernsey, Isle of Man, Jersey",
			code: "gb"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_gb');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testFR = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "33",
		areaCode: "1",
		subscriberNumber: "12345678"
	};
	var expected = {
		country: {
			sn: "France",
			ln: "France",
			code: "fr"
		},
		area: {
			sn: "Paris",
			ln: "Paris (Île-de-France)"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'fr_fr');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testFRMobile = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "33",
		mobilePrefix: "6",
		subscriberNumber: "23456789"
	};
	var expected = {
		country: {
			sn: "France",
			ln: "France",
			code: "fr"
		},
		area: {
			sn: "Numéro de mobile",
			ln: "Numéro de mobile"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'fr_fr');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testFRService = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "33",
		serviceCode: "690",
		subscriberNumber: "123456"
	};
	var expected = {
		country: {
			sn: "France",
			ln: "France",
			code: "fr"
		},
		area: {
			sn: "Numéro de service",
			ln: "Numéro de service"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'fr_fr');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testFRDepartment = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "33",
		serviceCode: "262",
		subscriberNumber: "123456"
	};
	var expected = {
		country: {
			sn: "France",
			ln: "France",
			code: "fr"
		},
		area: {
			sn: "Réunion",
			ln: "Îles de la Réunion et de Mayotte"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'fr_fr');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testFRFreephone = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "33",
		serviceCode: "800",
		subscriberNumber: "123456"
	};
	var expected = {
		country: {
			sn: "France",
			ln: "France",
			code: "fr"
		},
		area: {
			sn: "Toll-free Number",
			ln: "Toll-free Services (Numéros Vert)"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'fr_fr');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testFRToll = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "33",
		serviceCode: "810",
		subscriberNumber: "123456"
	};
	var expected = {
		country: {
			sn: "France",
			ln: "France",
			code: "fr"
		},
		area: {
			sn: "Appel payant",
			ln: "Toll calls at local rates (Numéros Azur)"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'fr_fr');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testDE = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "49",
		areaCode: "6224",
		subscriberNumber: "123456"
	};
	var expected = {
		country: {
			sn: "Deutschland",
			ln: "Deutschland",
			code: "de"
		},
		area: {
			sn: "Leimen",
			ln: "Leimen, Nußloch, Sandhausen"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'de_de');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testIT = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "39",
		trunkAccess: "0",
		areaCode: "75",
		subscriberNumber: "12345678"
	};
	var expected = {
		country: {
			sn: "Italia",
			ln: "Italia, Città del Vaticano",
			code: "it"
		},
		area: {
			sn: "Perugia",
			ln: "Perugia"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'it_it');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

// for bug NOV-115337
PhoneGeoTests.prototype.testITIntl = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "39",
		trunkAccess: "0",
		areaCode: "39",
		subscriberNumber: "12345678"
	};
	var expected = {
		country: {
			sn: "Italia",
			ln: "Italia, Città del Vaticano",
			code: "it"
		},
		area: {
			sn: "Monza",
			ln: "Monza"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'it_it');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};
PhoneGeoTests.prototype.testITIntlMobile = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "39",
		mobilePrefix: "390",
		subscriberNumber: "12345678"
	};
	var expected = {
		country: {
			sn: "Italia",
			ln: "Italia, Città del Vaticano",
			code: "it"
		},
		area: {
			sn: "Numero cellulare",
			ln: "Numero cellulare"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'it_it');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testES = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "34",
		areaCode: "930",	
		subscriberNumber: "123456"
	};
	var expected = {
		country: {
			sn: "España",
			ln: "España",
			code: "es"
		},
		area: {
			sn: "Barcelona",
			ln: "Barcelona, Granollers, Mataro, Sabadell-Terrassa, Barcelona"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'es_es');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testMX = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "52",
		areaCode: "755",
		subscriberNumber: "1234567"
	};
	var expected = {
		country: {
			sn: "México",
			ln: "México",
			code: "mx"
		},
		area: {
			sn: "Guerrero",
			ln: "Ixtapa, Zihuatanejo, Guerrero"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'es_mx');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testMXLocal = function() {
	var location;
	var parsed = {
		subscriberNumber: "12345678"
	};
	var expected = {
		country: {
			sn: "México",
			ln: "México",
			code: "mx"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'es_mx');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testAU = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "61",
		areaCode: "8",	
		subscriberNumber: "92012345"
	};
	var expected = {
		country: {
			sn: "Australia",
			ln: "Australia, Christmas Island, Cocos Islands",
			code: "au"
		},
		area: {
			sn: "Perth",
			ln: "Wanneroo, Perth North/Northwest"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_au');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testAUMobile = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "61",
		mobilePrefix: "4",	
		subscriberNumber: "2012345"
	};
	var expected = {
		country: {
			sn: "Australia",
			ln: "Australia, Christmas Island, Cocos Islands",
			code: "au"
		},
		area: {
			sn: "Mobile Number",
			ln: "Mobile Number"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_au');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testAUUnknownAreaWithinACity = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "61",
		areaCode: "2",	
		subscriberNumber: "91202343"
	};
	var expected = {
		country: {
			sn: "Australia",
			ln: "Australia, Christmas Island, Cocos Islands",
			code: "au"
		},
		area: {
			sn: "Sydney",
			ln: "Sydney"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_au');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testAUUnknownAreaWithinCountry = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "61",
		areaCode: "3",	
		subscriberNumber: "12345678"
	};
	var expected = {
		country: {
			sn: "Australia",
			ln: "Australia, Christmas Island, Cocos Islands",
			code: "au"
		},
		area: {
			sn: "Southeast",
			ln: "Southeastern Australia (VIC, TAS)"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_au');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testNZ = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "64",
		areaCode: "3",	
		subscriberNumber: "96012345"
	};
	var expected = {
		country: {
			sn: "New Zealand",
			ln: "New Zealand",
			code: "nz"
		},
		area: {
			sn: "Christchurch",
			ln: "Christchurch"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_nz');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testNZWithDot = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "64",
		areaCode: "3",	
		subscriberNumber: "23312345"
	};
	var expected = {
		country: {
			sn: "New Zealand",
			ln: "New Zealand",
			code: "nz"
		},
		area: {
			sn: "Invercargill",
			ln: "Invercargill"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_nz');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testNZMobile = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "64",
		mobilePrefix: "21",	
		subscriberNumber: "2012345"
	};
	var expected = {
		country: {
			sn: "New Zealand",
			ln: "New Zealand",
			code: "nz"
		},
		area: {
			sn: "Mobile Number",
			ln: "Mobile Number"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_nz');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testNZUnknownAreaWithinACity = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "64",
		areaCode: "9",	
		subscriberNumber: "46202343"
	};
	var expected = {
		country: {
			sn: "New Zealand",
			ln: "New Zealand",
			code: "nz"
		},
		area: {
			sn: "Auckland",
			ln: "Auckland and Northland"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_nz');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testNZUnknownAreaWithinCountry = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "64",
		areaCode: "3",	
		subscriberNumber: "812345678"
	};
	var expected = {
		country: {
			sn: "New Zealand",
			ln: "New Zealand",
			code: "nz"
		},
		area: {
			sn: "South Island",
			ln: "South Island, Chatham Islands"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_nz');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testUnknown = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "506",
		areaCode: "20",
		subscriberNumber: "123456"
	};
	var expected = {
		country: {
			sn: "Costa Rica",
			ln: "Costa Rica",
			code: "cr"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_us');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testMobile = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "49",
		mobilePrefix: "16",
		subscriberNumber: "12345678"
	};
	var expected = {
		country: {
			sn: "Germany",
			ln: "Germany",
			code: "de"
		},
		area: {
			sn: "Mobile Number",
			ln: "Mobile Number"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_us');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testWithUSMCC = function(){
	var location;
	var parsed = {
		areaCode: "650",
		subscriberNumber: "1234567"
	};
	var expected = {
		country: {
			sn: "North America",
			ln: "North America and the Caribbean Islands",
			code: "us"
		},
		area: {
			sn: "California",
			ln: "Central California: San Mateo, Palo Alto, Redwood City, Menlo Park, Mountain View, southern San Francisco suburbs"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_us', '316');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testWithUSMCCNoLocale = function(){
	var location;
	var parsed = {
		areaCode: "650",
		subscriberNumber: "1234567"
	};
	var expected = {
		country: {
			sn: "North America",
			ln: "North America and the Caribbean Islands",
			code: "us"
		},
		area: {
			sn: "California",
			ln: "Central California: San Mateo, Palo Alto, Redwood City, Menlo Park, Mountain View, southern San Francisco suburbs"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, undefined, '316');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testDEMCCEnglishLocale = function(){
	var location;
	var parsed = {
		trunkAccess: "0",
		areaCode: "6224",
		subscriberNumber: "123456"
	};
	var expected = {
		country: {
			sn: "Germany",
			ln: "Germany",
			code: "de"
		},
		area: {
			sn: "Leimen",
			ln: "Leimen, Nußloch, Sandhausen"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_us', '262');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testDEMCCGermanLocale = function(){
	var location;
	var parsed = {
		trunkAccess: "0",
		areaCode: "6224",
		subscriberNumber: "123456"
	};
	var expected = {
		country: {
			sn: "Deutschland",
			ln: "Deutschland",
			code: "de"
		},
		area: {
			sn: "Leimen",
			ln: "Leimen, Nußloch, Sandhausen"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'de_de', '262');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testDEMCCFrenchLocaleUSCountryCode = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "1",
		areaCode: "650",
		subscriberNumber: "5551212"
	};
	var expected = {
		country: {
			sn: "Amérique du Nord",
			ln: "Amérique du Nord et Îles Caraïbes",
			code: "us"
		},
		area: {
			sn: "Californie",
			ln: "Californie centrale : San Mateo, Palo Alto, Redwood City, Menlo Park, Mountain View, banlieues du sud de San Francisco"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'fr_fr', '262');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};


// for NOV-108200
PhoneGeoTests.prototype.testBogusCountryCode = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "P1",
		areaCode: "650",
		subscriberNumber: "5551212"
	};
	var expected = {
		country: {
			sn: "North America",
			ln: "North America and the Caribbean Islands",
			code: "us"
		},
		area: {
			sn: "California",
			ln: "Central California: San Mateo, Palo Alto, Redwood City, Menlo Park, Mountain View, southern San Francisco suburbs"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_us');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};
PhoneGeoTests.prototype.testBogusAreaCode = function(){
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "1",
		areaCode: "650P",
		subscriberNumber: "5551212"
	};
	var expected = {
		country: {
			sn: "North America",
			ln: "North America and the Caribbean Islands",
			code: "us"
		},
		area: {
			sn: "California",
			ln: "Central California: San Mateo, Palo Alto, Redwood City, Menlo Park, Mountain View, southern San Francisco suburbs"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_us');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

// for bug NOV-115625
PhoneGeoTests.prototype.testNumberTooLongUS = function(){
	var location;
	var parsed = {
		areaCode: "941",
		subscriberNumber: "62719524"
	};
	var expected = {
		country: {
			sn: "North America",
			ln: "North America and the Caribbean Islands",
			code: "us"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_us');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

// no fixed length in Germany, so there should not be any numbers that are "too long"
PhoneGeoTests.prototype.testNumberTooLongDE = function(){
	var location;
	var parsed = {
		areaCode: "6224",
		subscriberNumber: "12345678901234567890"
	};
	var expected = {
		country: {
			sn: "Deutschland",
			ln: "Deutschland",
			code: "de"
		},
		area: {
			sn: "Leimen",
			ln: "Leimen, Nußloch, Sandhausen"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'de_de');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testInvalidNumber = function(){
	var location;
	var parsed = {
		trunkAccess: "1",
		areaCode: "234"
	};
	var expected = {
		country: {
			sn: "North America",
			ln: "North America and the Caribbean Islands",
			code: "us"
		},
		area: {
			sn: "Ohio",
			ln: "Ohio"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_us');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCode = function(){
	var country;
	var parsed = {
		iddPrefix: "+",
		countryCode: "49",
		areaCode: "6224",
		subscriberNumber: "12345678901234567890"
	};
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber(parsed);
	
	UnitTest.requireEqual('de', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCode2 = function(){
	var country;
	var parsed = {
		iddPrefix: "+",
		countryCode: "61",
		areaCode: "2",
		subscriberNumber: "12345678"
	};
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber(parsed);
	
	UnitTest.requireEqual('au', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCodeUndefined = function(){
	var country;
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber(undefined);
	
	UnitTest.require(undefined === country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCodeLocalNumber = function(){
	var country;
	var parsed = {
		trunkAccess: "0",
		areaCode: "6224",
		subscriberNumber: "12345678901234567890"
	};
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber(parsed, 'de_de');
	
	UnitTest.requireEqual('de', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCodeLocalNumberNoLocale = function(){
	var country;
	var parsed = {
		areaCode: "905",
		subscriberNumber: "5551212"
	};
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber(parsed);
	
	UnitTest.requireEqual('ca', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCodeLocalNumberNoLocaleDefault = function(){
	var country;
	var parsed = {
		areaCode: "650",
		subscriberNumber: "5551212"
	};
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber(parsed);
	
	UnitTest.requireEqual('us', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCodeLocalNumberNoAreaCode = function(){
	var country;
	var parsed = {
		trunkAccess: "0",
		mobilePrefix: "175",
		subscriberNumber: "12345678"
	};
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber(parsed, 'de_de');
	
	UnitTest.requireEqual('de', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCodeHaveCountryButNoAreaCode = function(){
	var country;
	var parsed = {
		iddPrefix: "+",
		countryCode: "49",
		mobilePrefix: "175",
		subscriberNumber: "12345678"
	};
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber(parsed, 'de_de');
	
	UnitTest.requireEqual('de', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCodeHaveCountryButNoAreaCodeFR = function(){
	var country;
	var parsed = {
		iddPrefix: "+",
		countryCode: "33",
		mobilePrefix: "6",
		subscriberNumber: "12345678"
	};
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber(parsed, 'fr_fr');
	
	UnitTest.requireEqual('fr', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCodeUS = function(){
	var country;
	var parsed = {
		iddPrefix: "+",
		countryCode: "1",
		areaCode: "408",
		subscriberNumber: "5551212"
	};
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber(parsed);
	
	UnitTest.requireEqual('us', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCodeCA = function(){
	var country;
	var parsed = {
		iddPrefix: "+",
		countryCode: "1",
		areaCode: "705",
		subscriberNumber: "5551212"
	};
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber(parsed);
	
	UnitTest.requireEqual('ca', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCodeCaribbean = function(){
	var country;
	var parsed = {
		iddPrefix: "+",
		countryCode: "1",
		areaCode: "876",
		subscriberNumber: "5551212"
	};
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber(parsed);
	
	UnitTest.requireEqual('jm', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCodeCaribbeanParse = function(){
	var country;
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber("1-876-555-1212");
	
	UnitTest.requireEqual('jm', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCodeCaribbean2 = function(){
	var country;
	var parsed = {
		iddPrefix: "+",
		countryCode: "1",
		areaCode: "284",
		subscriberNumber: "5551212"
	};
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber(parsed);
	
	UnitTest.requireEqual('vg', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCodeCaribbean2Parse = function(){
	var country;
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber("(284) 555-1212");
	
	UnitTest.requireEqual('vg', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCodeItalySanMarino = function(){
	var country;
	var parsed = {
		iddPrefix: "+",
		countryCode: "39",
		trunkAccess: "0",
		areaCode: "549",
		subscriberNumber: "87654321"
	};
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber(parsed);
	
	UnitTest.requireEqual('sm', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCodeItalyRome = function(){
	var country;
	var parsed = {
		iddPrefix: "+",
		countryCode: "39",
		trunkAccess: "0",
		areaCode: "6",
		subscriberNumber: "87654321"
	};
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber(parsed);
	
	UnitTest.requireEqual('it', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCodeFranceParis = function(){
	var country;
	var parsed = {
		iddPrefix: "+",
		countryCode: "33",
		trunkAccess: "0",
		areaCode: "1",
		subscriberNumber: "87654321"
	};
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber(parsed);
	
	UnitTest.requireEqual('fr', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCodeFranceReunion = function(){
	var country;
	var parsed = {
		iddPrefix: "+",
		countryCode: "33",
		trunkAccess: "0",
		serviceCode: "262",
		subscriberNumber: "654321"
	};
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber(parsed);
	
	UnitTest.requireEqual('re', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCodeFranceMartinique = function(){
	var country;
	var parsed = {
		iddPrefix: "+",
		countryCode: "33",
		trunkAccess: "0",
		serviceCode: "596",
		subscriberNumber: "654321"
	};
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber(parsed);
	
	UnitTest.requireEqual('mq', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testGetCountryCodeFranceMartiniqueParse = function(){
	var country;
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber("+33 596 654 321");
	
	UnitTest.requireEqual('mq', country);
	
	return UnitTest.passed;
};

// for bug NOV-118981
PhoneGeoTests.prototype.testInvalidNumber = function(){
	var country;
	var parsed = {
		trunkAccess: "1",
		areaCode: "234"
	};
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber(parsed);
	
	UnitTest.requireEqual('us', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testInvalidNumberParse = function(){
	var country;
	
	country = Globalization.Phone.getCountryCodeForPhoneNumber("1234");
	
	UnitTest.requireEqual('us', country);
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testSG = function() {
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "65",
		subscriberNumber: "25432102"
	};
	var expected = {
		country: {
			sn: "Singapore",
			ln: "Republic of Singapore",
			code: "sg"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_sg');
	
	UnitTest.require(objectEquals(expected, location));

	return UnitTest.passed;
};

PhoneGeoTests.prototype.testSGLocal = function() {
	var location;
	var parsed = {
		subscriberNumber: "25432102"
	};
	var expected = {
		country: {
			sn: "Singapore",
			ln: "Republic of Singapore",
			code: "sg"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_sg');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testSGMobile = function() {
	var location;
	var parsed = {
		subscriberNumber: "65432102"
	};
	var expected = {
		country: {
			sn: "Singapore",
			ln: "Republic of Singapore",
			code: "sg"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_sg');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testHK = function() {
	var location;
	var parsed = {
		iddPrefix: "+",
		countryCode: "852",
		subscriberNumber: "25432102"
	};
	var expected = {
		country: {
			sn: "Hong Kong",
			ln: "Hong Kong",
			code: "hk"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_hk');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testHKLocal = function() {
	var location;
	var parsed = {
		subscriberNumber: "25432102"
	};
	var expected = {
		country: {
			sn: "Hong Kong",
			ln: "Hong Kong",
			code: "hk"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_hk');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};

PhoneGeoTests.prototype.testHKMobile = function() {
	var location;
	var parsed = {
		subscriberNumber: "65432102"
	};
	var expected = {
		country: {
			sn: "Hong Kong",
			ln: "Hong Kong",
			code: "hk"
		}
	};
	
	location = Globalization.Phone.getGeoForPhoneNumber(parsed, 'en_hk');
	
	UnitTest.require(objectEquals(expected, location));
	
	return UnitTest.passed;
};
