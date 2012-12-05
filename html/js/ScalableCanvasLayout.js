
/***************************************************************************/
/***************************************************************************/
/***************************************************************************/


function ErrorLog(str)
{
	console.error("ERROR: " + str);
}

function InfoLog(str)
{
	console.log("INFO: " + str);
}


function AssertException(message) { this.message = message; }
AssertException.prototype.toString = function () {
	return 'AssertException: ' + this.message;
}
function Assert(exp, message) {
	if (!exp) {
		throw new AssertException(message);
	}
}

/***************************************************************************/
/***************************************************************************/
/***************************************************************************/

function Point(theX, theY)
{
	return { x:theX, y:theY };
}

function FrameFromString(str)
{
	if (str == undefined)
		return undefined;

	var words = str.split(/\s+/);

	return	{	 x: words[0],
		 		 y: words[1],
		 	 width: words[2],
			height: words[3]	};
}

function SizeFromString(str)
{
	if (str == undefined)
		return undefined;

	var words = str.split(/\s+/);

	return	{
		 		 width: words[0],
				height: words[1]
			};
}

function PointFromString(str)
{
	if (str == undefined)
		return undefined;

	var words = str.split(/\s+/);

	return	{
		 		x: words[0],
				y: words[1]
			};
}

function NumberToPixel(n)
{
	return Math.round(n) + "px";
}


/***************************************************************************/


var LAYOUT_KEY		= "layout";
var BIRTH_CSS_KEY	= "birth css";


/***************************************************************************/


function AssertLayoutElement(element)
{
	if (!element) {
		console.log("element doesn't exist");
		return true;
	}
	else if (!element.data(LAYOUT_KEY)) {
		console.log('element.data(LAYOUT_KEY) doesnt exist');
		return true;
	}
	else if (!element.data(BIRTH_CSS_KEY)) {
		console.log('element.data(BIRTH_CSS_KEY) doesnt exist');
		return true;
	}
	
	return false;
}


function SetCSSPropertyAndOverideBirthCSS( jqElement, property, value)
{
	jqElement.css(property, value);

	var birthCSS = BirthCSSForElement(jqElement);

	if (!birthCSS)
		console.error("birthCSS is undefined for element: " + jqElement.attr('id') + ", was InitLayoutSystem called?");
	else
		birthCSS[property] = value;
}


function SetBirthCSSForElement(element, value)
{
	element.data(BIRTH_CSS_KEY, value);
}


function BirthCSSForElement(element)
{
	return element.data(BIRTH_CSS_KEY);
}

function PixelNumber( stringPx )
{
	if (typeof stringPx != "string")
		return stringPx;

	if (stringPx) {
		var string = stringPx.replace(/px$/, ''); 
		
		if (string)
			return Number(string);
	}
}


function LayoutFunctionForElement(element)
{
	var result = element.data(LAYOUT_KEY);
	
	if (result == undefined) {
		console.log("ERROR: element.data(LAYOUT_KEY) is null for element");
		console.log(element);
		return null;
	}
	return result;
}


function PeformLayoutForElement(element)
{
	if (!_ElegibleElementToLayout(element))
		return;
	
	var elementLayoutFunction = LayoutFunctionForElement(element);
	
	if (!elementLayoutFunction) {
		console.log("ERROR: no layoutFunc for " + element.id );
		return;
	}
	
	elementLayoutFunction(element);

	var elementTagName = ElementTagName(element);
	
	if (elementTagName == "div") {
		// Recursively apply layout to each children
		element.children().each(
			function() 
			{
				PeformLayoutForElement( $(this) ); 				
			}
		);
	}

}

function _ElegibleElementToLayout(element)
{
	if (element.length <= 0) {
		console.error("element.length is 0");
		return false;
	}

	var tagName = element[0].tagName;

	if (tagName)
		tagName = tagName.toLowerCase();
	else
	{
		console.error("tagName is undefined for element:");
		console.log(element);

		return false;
	}

	if ( tagName == "link"	|| 	tagName == "script" )
	{
		return false;
	}
	
	return true;	
}

function ElementTagName(jqE)
{
	return jqE[0].tagName.toLowerCase()
}

function CSSLayoutPropertiesForElement(theElement)
{
	var result = {};
	var applicableProperties;

	var positionProperties	= [ "top", "left", "bottom", "right" ];
	var sizeProperties		= [ "maxWidth", "width", "height", "fontSize", "lineHeight" ];

	if (ElementTagName(theElement) != "canvas")
	{
		applicableProperties = positionProperties.concat(sizeProperties);
	}
	else
		applicableProperties = positionProperties;

	for (var index in applicableProperties)
	{
		var property = applicableProperties[index];
		
		result[property] = theElement.css(property);
	}

	return result;
}


function SetupLayoutForElement( element, layout )
{
	if (!_ElegibleElementToLayout(element))
		return;

	if (layout)
	{
		if (element.data(BIRTH_CSS_KEY) == undefined)
		{
			var elementID = element.attr("id");
		
			var birthCSS =  CSSLayoutPropertiesForElement(element);

			var layoutFunction = layout[elementID] ? layout[elementID] : ProportionalScale;
			
			element.data(BIRTH_CSS_KEY,		birthCSS);
			element.data(LAYOUT_KEY,		layoutFunction);	
		}		
	}
	
	var elementTagName = ElementTagName(element);

	if (elementTagName == "canvas")
	{
		var _DEBUG_PERFORMANCE_RENDER_TIME_ = false;

		var startTime;
		
		if (_DEBUG_PERFORMANCE_RENDER_TIME_)		
			startTime = new Date().getTime();

		var kDidRenderKey = "didRender";

		if (element.data(kDidRenderKey) == undefined ||
			element.data(kDidRenderKey) == false  )
		{
			RenderCanvasElement( element[0] );		
			element.data(kDidRenderKey, true);

			if (_DEBUG_PERFORMANCE_RENDER_TIME_)
			{
				var end = new Date().getTime();
				var time = end - startTime;

				var elementID = element.attr("id");
				var elementName = "?";
				if (elementID)
					elementName = elementID + ("->canvas");
				else
				{
					var parentID = element.parent().attr("id");
					
					if (parentID)
						elementName = parentID;
	 			}

				console.log(elementName + " Render Time: " + time );
			}
		}
	}

	if ( __ValidChildDictiornary__[elementTagName] )
	{
		element.children().each(
			function() 
			{
				SetupLayoutForElement( $(this), layout); 
			} );
	}
}

var __ValidChildDictiornary__ = { 
	"div"	 : true,
	"li"	 : true,
	"ul"	 : true,
	"a"		 : true,
	"button" : true
}


function RenderSprites(inElement)
{
	SetupLayoutForElement( inElement, undefined );
}

function InitLayoutSystem(element, layout)
{
	var startTime = new Date().getTime();

	if (!element || element.length == 0 ) {
		console.error("InitLayoutSystem called with invalid element");
		return;
	}

	SetupLayoutForElement(element, layout);

	var endSetupTime = new Date().getTime();
	var setupTime = endSetupTime - startTime

	PeformLayoutForElement(element);
		
	var endTime = new Date().getTime();
	var layoutTime = endTime - endSetupTime;

	var totTime = endTime - startTime;

	var elementID = element.attr("id");

	console.log( arguments.callee.name + "(" + elementID + ")" + " time:" + totTime + " setup:" + setupTime + " layout:" + layoutTime );
}		

var delayedResizeTimer = null;
function DelayedLayoutSystem( element )
{
	if (delayedResizeTimer)
		clearTimeout(delayedResizeTimer);
		
	 delayedResizeTimer = setTimeout( function() { PeformLayoutForElement(element); }, 100 ); 
}


/***************************************************************************/
/***************************************************************************/
/***************************************************************************/



function FixedSizeScaleMargins(element)
{
	if (AssertLayoutElement(element)) return;
		
	var parentWidthScale  = ParentWidthScale(element);
	var parentHeightScale = ParentHeightScale(element);
		
	var birthCSS = BirthCSSForElement(element);
	
	ApplyLayout( element, { 
						 width: PixelNumber(birthCSS.width),
						  left: PixelNumber(birthCSS.left)  * parentWidthScale,
						 right: PixelNumber(birthCSS.right) * parentWidthScale,

						height: PixelNumber(birthCSS.height),
						   top: PixelNumber(birthCSS.top)    * parentHeightScale,
						bottom: PixelNumber(birthCSS.bottom) * parentHeightScale,

						} );

}


/***************************************/
/*************  S t a g e  *************/
/***************************************/

function StageProportionalScale(element, parentPercentageWidth)
{
	if (parentPercentageWidth == undefined)
		parentPercentageWidth = 1;
		
	if (AssertLayoutElement(element)) return;

	var birthCSS	= BirthCSSForElement(element);
	var layoutData = [];


	if (birthCSS.width != undefined && birthCSS.height != undefined) {
		var birthWidth  = PixelNumber(birthCSS.width);
		var birthHeight = PixelNumber(birthCSS.height);

		var heightWidthRatio = birthHeight / birthWidth;
		var maxWidth = (birthCSS.maxWidth == undefined || birthCSS.maxWidth <= 0 || birthCSS.maxWidth == "none" ? Number.MAX_VALUE :  PixelNumber(birthCSS.maxWidth));


		var newWidth  = Math.min( element.parent().width() * parentPercentageWidth, maxWidth );
		var newHeight = newWidth * heightWidthRatio;

		layoutData["width"]  = NumberToPixel(newWidth);
		layoutData["height"] = NumberToPixel(newHeight);
	}

	ApplyLayout( element, layoutData);
}


function ParentWidthScale(element)
{
	var parentElement	= element.parent();
	var parentBirthCSS	= BirthCSSForElement(parentElement);
	
	return parentElement.width() / PixelNumber(parentBirthCSS.width);
}


function ParentHeightScale(element)
{
	var parentElement	= element.parent();
	var parentBirthCSS	= BirthCSSForElement(parentElement);
	
	return parentElement.height() / PixelNumber(parentBirthCSS.height);
}


function _LinearValueScale( value, scale, factor )
{
	var inverseFactor = (1 - factor);
	
	var newValue = value * scale;
	newValue	+= value * inverseFactor;

	return Math.floor(newValue);
}


function _LinearScaleProperty( birthCSS, layoutData, property, cssProperty, scaleValue, factor )
{
	var birthCSSPropertyValue = birthCSS[property];

	if (birthCSSPropertyValue != undefined && 
		birthCSSPropertyValue != "auto"  && 
		birthCSSPropertyValue != "normal" )
	{
		var birthValue	= PixelNumber(birthCSSPropertyValue);
		var newValue = _LinearValueScale( birthValue, scaleValue, factor );

		layoutData[cssProperty] = NumberToPixel(newValue);
	}	

}

function IsNumberPixelValue( value )
{
	if (typeof value == "string")
		return (value.indexOf("px") > 0);

	return false
}

function ProportionalScaleWithFactor( element, sizeFactor, originFactorPoint /* expected { x:... y:... } */ )
{
	return AsimetricScaleWithFactor( element, { x:sizeFactor, y:sizeFactor }, originFactorPoint );
}

function AsimetricScaleWithFactor( element, sizeFactorPoint, originFactorPoint /* expected { x:... y:... } */ )
{
	if (AssertLayoutElement(element)) return;
	
	var layoutData = {};

	var inverseFactorFrame = {
		    x: (1 - originFactorPoint.x),
		    y: (1 - originFactorPoint.y),
		width: (1 - sizeFactorPoint.x),
	   height: (1 - sizeFactorPoint.y)
	};

	var elementParentWidthScale  = ParentWidthScale(element);
	var elementParentHeightScale = ParentHeightScale(element);

	var parentScaleFrame = {
			x: elementParentWidthScale  * originFactorPoint.x,
			y: elementParentHeightScale * originFactorPoint.y,
		width: elementParentWidthScale  * sizeFactorPoint.x,
	   height: elementParentHeightScale * sizeFactorPoint.y
	}

	var birthCSS = BirthCSSForElement(element);

	if (sizeFactorPoint.x > 0) {
		_LinearScaleProperty( birthCSS, layoutData, "width",	"width",  		parentScaleFrame.width,  sizeFactorPoint.x );
	}

	if (sizeFactorPoint.y > 0) {
		_LinearScaleProperty( birthCSS, layoutData, "height",		"height", 		parentScaleFrame.height, sizeFactorPoint.y );
		_LinearScaleProperty( birthCSS, layoutData, "fontSize",		"font-size",	parentScaleFrame.height, sizeFactorPoint.y );
		_LinearScaleProperty( birthCSS, layoutData, "lineHeight",	"line-height",	parentScaleFrame.height, sizeFactorPoint.y );
	}

	_LinearScaleProperty( birthCSS, layoutData, "left",		"left",  parentScaleFrame.x,  originFactorPoint.x );
	_LinearScaleProperty( birthCSS, layoutData, "right",	"right", parentScaleFrame.x,  originFactorPoint.x );
	_LinearScaleProperty( birthCSS, layoutData, "top",		"top",    	parentScaleFrame.y,  originFactorPoint.y );
	_LinearScaleProperty( birthCSS, layoutData, "bottom",	"bottom",	parentScaleFrame.y,  originFactorPoint.y )

	ApplyLayout( element, layoutData );
}


function ProportionalScale(element)
{
	ProportionalScaleWithFactor(element, 1, {x:1, y:1} );
}


function ApplyLayout( theElement, dimensions )
{
	var numberProperties = [ "width", "height", "top", "left", "bottom", "right", "font-size", "line-height" ];

	for (var index in numberProperties)
	{
		var property = numberProperties[index];
		var valueForProperty = dimensions[property];

		if (valueForProperty)
			theElement.css( property, valueForProperty);
	}	
} 



/***************************************************************************/
/********************************* CANVAS **********************************/
/***************************************************************************/

var _ImageCache = {};
var _ImageCacheOnLoadFunctions = {};

function PurgeImageCache()
{
	_ImageCache = {};
	_ImageCacheOnLoadFunctions = {};
}

function _LoadImage( path, doneFunction )
{
	var result = document.createElement('img');

	result.onerror = function imageDidFailToLoad() {
		console.error("LoadImage: failed to load " + path);		
		if (doneFunction)
			doneFunction(result);
	};

	result.onload = function imageDidLoad() {	
		if (doneFunction)
			doneFunction(result);
	}

	result.src = path;

	return result;
}

function _CacheLoadImage( path, doneFunction )
{
	var result = _ImageCache[path];

	function PushOnLoadFunction()
	{
		if (!_ImageCacheOnLoadFunctions[path])
			_ImageCacheOnLoadFunctions[path] = [];

		_ImageCacheOnLoadFunctions[path].push(doneFunction);		
	}

	function ExecuteAllOnLoadFunctions(imgResult)
	{
		var functionsArray = _ImageCacheOnLoadFunctions[path];

		functionsArray.forEach( function callOnLoadFunction(f) { f(imgResult); } );
	}

	if (result)  // Cache HIT
	{
		// console.log( arguments.callee.name + " Cache HIT:" + path );

		if (result.complete) // The image is fully loaded... Great...
		{
			// setTimeout( doneFunction, 1);

			doneFunction(result);
		}
		else // We have the image cached, however it isn't fully loaded. Append doneFunction
		{
			PushOnLoadFunction();
		}
	}
	else // Cache MISS
	{
		// console.log( arguments.callee.name + " Cache MISS:" + path );

		PushOnLoadFunction();

		result = _LoadImage( path,	ExecuteAllOnLoadFunctions );

		_ImageCache[path] = result;
	}

	return result;
}

function LoadImage( path, doneFunction )
{
	// console.log( arguments.callee.name + " path:" + path );

	return _CacheLoadImage( path, doneFunction );
}

function LoadImages( arrayOfPath, progressFunction /*(value, path, image) */, doneFunction  )
{
	var count = 0;
	var arrayCount = arrayOfPath.length;

	if (arrayCount == 0) {
		console.error(arguments.callee.name + ": empty array of path images");
		
		if (doneFunction)
			doneFunction();

		return;
	}


	arrayOfPath.forEach(
		function(path) {
			LoadImage( path, 
				function() {
					count++;

					if (progressFunction) {
						var progressValue = (count / arrayCount);
						progressFunction( progressValue, path, _ImageCache[path] );
					}

					if (count == arrayCount)
						if (doneFunction)
							doneFunction();
				}
			);
		}
	);

}



function LoadImageAndMask( imagePath, maskPath, onLoadFunction /* takes two args: [image, mask] */ )
{
	// console.log(arguments.callee.name + " imagePath:" + imagePath + " maskPath:" + maskPath );

	var count = 0;
	var numberOfImages = ( imagePath ? 1 : 0 ) + ( maskPath ? 1 : 0 );

	var image;
	var mask;

	function callOnLoadFunctionIfNeeded() {
		count++;
		if (count==numberOfImages) {
			// console.log(arguments.callee.name + " image:" + image + " mask:" + mask );
			onLoadFunction(image, mask);
		}
	}

	if (!imagePath && !maskPath) {
		onLoadFunction(undefined, undefined);
		return;
	}

	if (imagePath)
		LoadImage(	imagePath,
					function didLoadImage(loadedImage) {
						// console.log(arguments.callee.name + " loadedImage:" + loadedImage );

						image = loadedImage;
						callOnLoadFunctionIfNeeded();
					} 
				);

	if (maskPath)
		LoadImage(	maskPath,
					function(loadedImage) {
						mask = loadedImage;
						callOnLoadFunctionIfNeeded();
					} 
				);
}			

/***********************/
/*   Read CSS Sprite   */
/***********************/

function CSSSpriteInfoDictionary()
{
 	var resultDictionary = {};

 	for (var style_i=0; style_i<document.styleSheets.length; style_i++)
 	{
		var classes;

    	//  console.log( "style_i: " + style_i );

		try {
	 		var styleSheet_i = document.styleSheets[style_i];

		    if (styleSheet_i.rules)
		    	classes = styleSheet_i.rules;
		    else 
			    classes = styleSheet_i.cssRules;
		}
		catch(e) {
			// console.log("Exeption while interating through document.styleSheets");
			// console.log(e);
			continue;
		}

 		// trim leading and trailing spaces
 		function trim(s) {
			s = s.replace(/(^\s*)|(\s*$)/gi,"");
			s = s.replace(/[ ]{2,}/gi," ");
			s = s.replace(/\n /,"\n");
			return s;
		}

 		if (classes != undefined) {
		    for(var class_i=0; class_i<classes.length; class_i++)
		    {
		    	var selectorText_i = classes[class_i].selectorText;

		    	if (selectorText_i && selectorText_i.length > 0) {
				    var	allSelectors = selectorText_i.split(",");
				    allSelectors = $.map(allSelectors, function(string) { return string.replace(" ", ""); })

				    for (var selector_i=0; selector_i<allSelectors.length; selector_i++)
				    {
				    	var theSelector_i = allSelectors[selector_i];
				    	var  SPRITE_PREFIX = ".sprite";

				    	if (theSelector_i.slice(0, SPRITE_PREFIX.length) == SPRITE_PREFIX)
				    	{
				    		// console.log(theSelector_i + "|" + rawCSSLine_i );
					    	var rules = resultDictionary[theSelector_i];

					    	if (!rules)
					    		rules = {};

					    	var rawCSSLine_i   = (classes[class_i].cssText) ?  classes[class_i].cssText : classes[class_i].style.cssText ;
			    			var rawRules_i		= rawCSSLine_i.substring(rawCSSLine_i.indexOf("{")+1, rawCSSLine_i.indexOf("}") );

							var rawRuleLines = rawRules_i.split(";");			    			

							rawRuleLines.forEach(
								function(line) {
									var colonIndex	= line.indexOf(":");
									if (colonIndex>1) {
										var property	= line.substring(0, colonIndex);
										var value 		= line.substring(colonIndex+1, line.length);
										rules[trim(property)] = trim(value);
									}
								});

			    			resultDictionary[theSelector_i] = rules;
				    	}
				    }
		    	}
		    }
	    }
 	}

 	return resultDictionary;
}



var _CSSSpriteInfoDictionary;

function CSSDefinitionsForClass(className)
{
	if (!_CSSSpriteInfoDictionary) {
		_CSSSpriteInfoDictionary = CSSSpriteInfoDictionary();
		// console.log("_CSSSpriteInfoDictionary:");
		// console.log(_CSSSpriteInfoDictionary);
	}
		
	return _CSSSpriteInfoDictionary["." + className];
}


function isIE()
{
	var isMSIE = /*@cc_on!@*/0;

	if (isMSIE) {
	  return true;
	} else {
	  return false;
	}

}

function _SpriteFrameWithWithClassName(className)
{		
	var cssDefinitions = CSSDefinitionsForClass(className);

	if (cssDefinitions == undefined) {
		console.error("cssDefinitions is undefined");
		return undefined;
	}
	
	var width  = PixelNumber(cssDefinitions["width"]);
	var height = PixelNumber(cssDefinitions["height"]);

	var x, y;

	var bgPosition = cssDefinitions["background-position"];
	
	if (bgPosition != undefined) {
		var bgPositionArray = bgPosition.split(" ");

		if (bgPositionArray.length>=2) {
			if (bgPositionArray[0].length >=1) {
				x = PixelNumber(bgPositionArray[0]);
				y = PixelNumber(bgPositionArray[1]);
			}
			else // first element is empty
			{
				x = PixelNumber(bgPositionArray[1]);
				y = PixelNumber(bgPositionArray[2]);
			}
		}
	}
	else if (isIE()) // in IE the background-position is omitted when is 0 0
	{
		x = 0;
		y = 0;
	}
	else
		return undefined;

	var result = { x: -x, y: -y, width:width, height:height };

	if (result.x == undefined 		|| result.y == undefined || 
		result.width == undefined	|| result.height == undefined)
		console.error("Frame is not valid");

	return result;
}


function BackgroundImagePathWithClassName(className)
{
	var cssDefinitions = CSSDefinitionsForClass(className);

	if (!cssDefinitions)
		return undefined;

	var bgValue = cssDefinitions["background-image"];

	// for (var key in cssDefinitions)
	// {
	// 	console.log("key: '" + key + "'" );
	// }

	if (bgValue == undefined) {
		console.error("background-image is undefined");
		console.log(cssDefinitions);
		return undefined;
	}

	var openParentesisIndex = bgValue.indexOf("(");
	var closeParentesisIndex = bgValue.indexOf(")");

	var result = bgValue.substring(openParentesisIndex+1, closeParentesisIndex);

	var fstChar  = result.charAt(0);
	var lastChar = result.charAt(result.length-1);

	// console.log("fstChar: " + fstChar + "lastChar: " + lastChar);

	if (fstChar == lastChar && 
		((fstChar == "\"" && lastChar == "\"") || 
		 ( fstChar == "'" && lastChar == "'" ) ) )
		result = result.substring(1, result.length-1);		

	return result;
}

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function _RenderCanvasElement_CSS( canvasElement, drawFunction /* [ image, mask, srcImageFrame, srcMaskFrame] */ )
{
	var spriteName = $(canvasElement).attr("shoe:sprite");

	var imageClassName;
	var maskClassName;

	if (spriteName) {
		imageClassName = spriteName + "-image";
		maskClassName  = spriteName + "-mask";
	}

	var imageCSSDefinitions = CSSDefinitionsForClass(imageClassName);

	if (!imageCSSDefinitions) {

		var noMaskClassName = spriteName + "-nomask";
		imageCSSDefinitions = CSSDefinitionsForClass(noMaskClassName);

		if (!imageCSSDefinitions){
			console.error("No CSS class found for: " + imageClassName + " or: " + noMaskClassName);
			return;
		}
		else
		{
			imageClassName = noMaskClassName;
			maskClassName = undefined;
		}
		
	}

	var imagePath = BackgroundImagePathWithClassName(imageClassName); 


	if (!imagePath) {
		console.error("imagePath is undefined for imageCSSDefinitions:");
		console.log(imageCSSDefinitions);
	}

	var imageFrame = _SpriteFrameWithWithClassName(imageClassName);

	if (imageFrame == undefined){
		console.error("Sprite frame not valid for class: " + imageClassName);
		return;		
	}

	var maskPath;
	var maskFrame;

	if (maskClassName) {
		maskPath  = BackgroundImagePathWithClassName(maskClassName);
		maskFrame = _SpriteFrameWithWithClassName(maskClassName);
	}

	var canvasWidth = $(canvasElement).attr("width");
	var canvasHeight= $(canvasElement).attr("height");

	if (canvasWidth  != imageFrame.width && 
		canvasHeight != imageFrame.height )
	{

		if (canvasWidth  != undefined || 
			canvasHeight != undefined)
		{
			console.error("Canvas frame (current:" + 
							canvasWidth +"x" + 
							canvasHeight +") mismatch for sprite: "+
							spriteName+ "(" + imageFrame.width + "x" + imageFrame.height +")");
		}
		
		canvasElement.width  = imageFrame.width;
		canvasElement.height = imageFrame.height;

		var birthCSS = BirthCSSForElement( $(canvasElement) );

		if (birthCSS) {
			birthCSS.width =imageFrame.width;
			birthCSS.height=imageFrame.height;
		}

		var factor = spriteName.endsWith("2x") ? 2 : 1;

		if (factor == 2) {
			var width_x1  = (imageFrame.width / factor);
			var height_x1 = (imageFrame.height / factor);

			$(canvasElement).css("width",   width_x1  + "px" );
			$(canvasElement).css("height",  height_x1 + "px" );

			if (birthCSS) {
				birthCSS.width  = width_x1;
				birthCSS.height = height_x1;
			}
		}

		if (birthCSS)
			SetBirthCSSForElement($(canvasElement), birthCSS);
	}

	_LoadImagesAndDraw( imagePath, maskPath, imageFrame, maskFrame, drawFunction );
}


function _LoadImagesAndDraw( imagePath, maskPath, imageFrame, maskFrame, drawFunction )
{
	LoadImageAndMask( imagePath, maskPath,
		function DrawTheImageWithTheMask(image, mask) {
			if (imageFrame == undefined)
				if (image != undefined)
					imageFrame = { x:0, y:0, width:image.width, height:image.height };

			if (imageFrame == undefined)
				imageFrame = { x:0, y:0, width:canvasElement.width, height:canvasElement.height };

			if (maskFrame == undefined)
				if (mask != undefined)
					maskFrame = { x:0, y:0, width:mask.width, height:mask.height };

			if (maskPath == undefined && maskFrame != undefined)
				drawFunction(image, image, imageFrame, maskFrame);
			else
				drawFunction(image, mask,  imageFrame, maskFrame);
		});
}


function _RenderCanvasElement( canvasElement, drawFunction /* [ image, mask, srcImageFrame, srcMaskFrame] */ )
{
	Assert( canvasElement != undefined, "SetupCanvasElement: canvasElement is undefined");
	Assert( "canvas" === canvasElement.tagName.toLowerCase(), "SetupCanvasElement: canvasElement is not a canvas");

	if ( canvasElement.getAttribute("shoe:sprite") )
		_RenderCanvasElement_CSS( canvasElement, drawFunction);
	else
	{
		ErrorLog("can't find 'shoe:sprite' attribute for canvas element:");
		console.log(canvasElement);

		/*
		// lists all attributes
		for (var i = 0; i < canvasElement.attributes.length; i++) {
		  var attrib = canvasElement.attributes[i];
		  if (attrib.specified) {
		    console.log(attrib.name + " = " + attrib.value);
		  }
		}
		*/

	}
}

/*
	---------------------------------------------------------------------
	[ 3 ] The Best: Sprite argument (from which imageClass & maskClass are determined). 

	 				<canvas	sprite="sprite-color-sprites-shoebox-postit-0">	</canvas>	

*/


function RenderCanvasElement(theCanvas)
{
	_RenderCanvasElement(theCanvas,
		function RenderCanvasCoreEngine( image, mask, srcImageFrame, srcMaskFrame )
		{
			var outputCtx = theCanvas.getContext("2d");

			if (image) {
				var maxX = Number(srcImageFrame.x) + Number(srcImageFrame.width);
				var maxY = Number(srcImageFrame.y) + Number(srcImageFrame.height);

				if (theCanvas.width  != srcImageFrame.width || 
					theCanvas.height != srcImageFrame.height )
				{
					console.error("Canvas and Image mismatch ->  srcImageFrame("+
								srcImageFrame.width+"x"+
								srcImageFrame.height+") theCanvas("+
								theCanvas.width +"x" + theCanvas.height +")" );
				}

				if ( maxX > image.width ||	maxY > image.height)
				{
					console.error("imageFrame out of bounds for: " + theCanvas.getAttribute("id") );
					console.log( "maxX("+maxX+") "+" > image.width("+ image.width +")");
					console.log( "maxY("+maxY+") "+" > image.height("+ image.height +")");

					console.log( "srcImageFrame.y:" 	+ srcImageFrame.y + " + " +
								 "srcImageFrame.height:" + srcImageFrame.height + " > " + 
								 "image.height:" + image.height );

					outputCtx.fillStyle = "purple";
					outputCtx.fillRect(0, 0, theCanvas.width, theCanvas.height);
				}
				else
					outputCtx.drawImage(image, 
										srcImageFrame.x, srcImageFrame.y, srcImageFrame.width, srcImageFrame.height,
										0, 0, theCanvas.width, theCanvas.height);
			}
			else
			{
				console.error("No image to render canvas:");
				console.log(theCanvas);

				outputCtx.fillStyle = "red";

				outputCtx.fillRect(0, 0, theCanvas.width, theCanvas.height);

				outputCtx.fillText("No image ;-(", 10, 50);
			}

			// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			// !! Rendering Performance Bottle Neck !!
			// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			if (mask) 
			{
				 // theCanvasImageData;

				// var theCanvasImageData = outputCtx.getImageData(0, 0, theCanvas.width, theCanvas.height);

				
				alphaTmpCanvas.width  = theCanvas.width;
				alphaTmpCanvas.height = theCanvas.height;

				var alphaTmpCanvasCtx = alphaTmpCanvas.getContext("2d");
				alphaTmpCanvasCtx.drawImage(mask, 
											srcMaskFrame.x, srcMaskFrame.y, srcMaskFrame.width, srcMaskFrame.height,
											0, 0, theCanvas.width, theCanvas.height);

				var theCanvasImageData= outputCtx.getImageData(0, 0, theCanvas.width, theCanvas.height);
				var theCanvasPixels	 = theCanvasImageData.data;

				var alphaCanvasImageData= alphaTmpCanvasCtx.getImageData(0, 0, theCanvas.width, theCanvas.height);
				var alphaCanvasPixels	= alphaCanvasImageData.data;

				for (var i = 0, n = theCanvasPixels.length; i < n; i += 4) {
					theCanvasPixels[i+3] = alphaCanvasPixels[i];
				}
				
				outputCtx.putImageData(theCanvasImageData, 0, 0);				
			}
	} );
}

var alphaTmpCanvas = document.createElement("canvas");

// var _tmpAlphaCanvas = 

function _ImagesNeededToRenderElement( jqElement, dictionary )
{
	if (jqElement == undefined || jqElement.length == 0) {
		console.error( arguments.callee.name + " given undefined or empty element");
		return;		
	}

	// console.log(arguments.callee.name);
	// console.log(jqElement);

	var tagName = jqElement.attr("id");
	// console.log("tagName " + tagName);

	var imageClass;
	var maskClass;
	var spriteAttribute	= jqElement.attr("shoe:sprite");

	if (spriteAttribute) {
		imageClass= spriteAttribute + "-image";

		var cssDefinitions = CSSDefinitionsForClass(imageClass);

		if (cssDefinitions)
			maskClass = spriteAttribute + "-mask";
		else
		{
			imageClass= spriteAttribute + "-nomask";
		}
	}

	// console.log(spriteAttribute + " image: " + imageClass);
	// console.log(spriteAttribute + "  mask:  " + maskClass);

	if (imageClass != undefined) {
		var path = BackgroundImagePathWithClassName(imageClass);
		if (path==undefined)
			console.error("Cannot find image path for class: "+imageClass);
		else
			dictionary[path] = (dictionary[path] == undefined) ? 1 : dictionary[path]+1;
	}

	if (maskClass != undefined) {
		var path = BackgroundImagePathWithClassName(maskClass);
		if (path==undefined)
			console.error("Cannot find mask path for class: "+maskClass);
		else
			dictionary[path] = (dictionary[path] == undefined) ? 1 : dictionary[path]+1;
	}


	var children = jqElement.children();

	for (var index=0;  index < children.length; index++ )
	{
		_ImagesNeededToRenderElement( $(children[index]), dictionary );
	}

}

if(!Object.keys) Object.keys = function(o){
   if (o !== Object(o))
      throw new TypeError('Object.keys called on non-object');
   var ret=[],p;
   for(p in o) if(Object.prototype.hasOwnProperty.call(o,p)) ret.push(p);
   return ret;
}

function ImagesNeededToRenderElement(jqElement)
{
	var dictionary = {};

	_ImagesNeededToRenderElement( jqElement, dictionary );

	return Object.keys(dictionary);
}


