/*
 * Datorama i18n plugin
 * @requires jQuery v1.1 or later
 * 
 * Licensed under the MIT license:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 
 * 	Version 0.9.1
 */
(function() {
	/*
	 * Translation utility
	 */
	var translationMap = null;
	var defaultTranslationMap = null;
	
	/*
	 * Location of .json translation files
	 * 
	 * File names should be: culture.json (i.e. en-US.json)
	 */
	var translationFilePath = "translations/";
	var defaultTranslation = "default.js";
	var debugMode = false;
	
	/*
	 * da.i18n()
	 * 
	 * Return translation of given key.
	 * If a translation does not exist for current culture, return from default file.
	 * If key does not exist in default, return original key.
	 * 
	 *  @param string key		: The key to translate
	 *  @param string[] args	: Array of additional arguments
	 *  
	 *  @return string			: Translated string
	 */
	var translate = function(key, args) {
		var result;

		if (translationMap && translationMap[key]) {
			result = translationMap[key];
		} else {
			result = defaultTranslationMap[key];
		}
		
		if (!result) {
			if (debugMode) {
				alert("No translation found for " + key);
			}
			
			return key;
		}
		
		return subArgs(result, args);
	};
	
	/*
	 * da.i18n.translateTemplate()
	 * 
	 * Translates a given template.
	 * Template should contain keys surrounded by {} (i.e. <b>{Welcome}</b>)
	 * 
	 * @param string template	: Template containing keys to translate
	 * 
	 * @return string			: Translated template
	 */
	translate.translateTemplate = function(template) {
		while (true) {
			if (template.indexOf('{') == -1) {
				break;
			}
			
			var start_pos = template.indexOf('{') + 1;
			var end_pos = template.indexOf('}',start_pos);
			var key = template.substring(start_pos,end_pos);
			
			template = template.replace(new RegExp("{" + key + "}", 'g'), this(key));
		}
		
		return template;
	};
	
	/*
	 * subArgs()
	 * 
	 * Looks for additional arguments in the format of {0}, {1}, etc.. and replaces them with the corresponding arguments
	 * 
	 * @param string str			: String to replace the arguments within
	 * @param string[] args			: Array of string to replace with 
	 */
	var subArgs = function(str, args) {
		if (!args) {
			return str;
		}
		
		for(var i = 0; i < args.length; i++) {
			str = str.replace(new RegExp("{[" + i.toString() + "]}", 'g'), args[i]);
		}
		
		return str;
	};
	
	/*
	 * da.i18n.setCulture()
	 * 
	 * Sets the translation dictionary with a new on based on the new culture
	 * 
	 * @param string newCulture		: Culture to use (Should have a file in the translationFilePath by the name of [newCulture].json
	 */
	translate.setCulture = function (newCulture) {
		translationMap = null;
		$.ajax({
			url: translationFilePath + newCulture + ".js?version=" + Date().toString(),
			dataType: "json",
			error: function() {
				console.log("No culture file");
			},
			success: function(data) {
				translationMap = data;
			}
		});
	};
	
	/*
	 * da.i18n.setDebug()
	 * 
	 * Sets debug mode on/off
	 * If debug mode is on, will show alerts when key doesn't exist in the dictionary
	 * 
	 * @param boolean isDebug		: Requested debug mode
	 */
	translate.setDebug = function(isDebug) {
		debugMode = isDebug;
	};
	
	(window).dai18n = translate;
	
	$.getJSON(translationFilePath + defaultTranslation + "?version=" + Date().toString(), function (data) {
		defaultTranslationMap = data;
	});
})();