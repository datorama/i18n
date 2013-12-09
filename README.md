About
-----

Datorama i18n is a JavaScript plugin for client-side translations.

Installation
------------

Download the latest [jQuery library](http://docs.jquery.com/Downloading_jQuery#Current_Release), and include it before _translator.js_ in your HTML source.

Creating translation files
--------------------------

The library uses _.json_ files as dictionaries to translate the requested text.
The files should be located in the _translations_ folder.
Each file contains key-value pairs for the language they translate.

The values can also contain argument placeholders in the form of {#argument_id} (i.e. "Welcome": "Welcome {0}")

Check out the _translations_ folder and the files within it for examples.

Translating
-----------

Without arguments:
```javascript
dai18n("Hello");
```

With arguments:
```javascript
dai18n("Welcome", ["David Krivushe"]);
```

Setting the current culture
---------------------------

To load the requested dictionary, you need to set the current culture.
The _.json_ file should match the culture name.
```javascript
dai18n.setCulture("fr-FR");
```

If a _.json_ file that matches the culture is not found, the default dictionary will be used.

All subsequent calls to _dai18n_ will return translations from the recently loaded dictionary.
If a translation is not found in the current culture's dictionary, the translation function will return the default translation.

Template translations
---------------------

You can translate an entire HTML template (or any other template/text) with the _translateTemplate_ function:
```javascript
dai18n.translateTemplate(templateString);
```

This will look for _{key}_ in the template and replace them with translations from the current culture.

Default translations
--------------------
If no translation is found - The key will be returned.

Debugging
---------

You can set debug mode on/off by calling the _setDebug_ function:
```javascript
dai18n.setDebug(true);
```

This will result in alerts popping up when no translation is found for a certain key.
