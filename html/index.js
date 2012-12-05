/****************** Spin.js **************************/

//fgnass.github.com/spin.js#v1.2.5
(function(a,b,c){function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=c[e];return d}function h(a){for(var b=1,c=arguments.length;b<c;b++)a.appendChild(arguments[b]);return a}function j(a,b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";return e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1),g}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function m(a){for(var b=1;b<arguments.length;b++){var d=arguments[b];for(var e in d)a[e]===c&&(a[e]=d[e])}return a}function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}var d=["webkit","Moz","ms","O"],e={},f,i=function(){var a=g("style");return h(b.getElementsByTagName("head")[0],a),a.sheet||a.styleSheet}(),o={lines:12,length:7,width:5,radius:10,rotate:0,color:"#000",speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto"},p=function q(a){if(!this.spin)return new q(a);this.opts=m(a||{},q.defaults,o)};p.defaults={},m(p.prototype,{spin:function(a){this.stop();var b=this,c=b.opts,d=b.el=l(g(0,{className:c.className}),{position:"relative",zIndex:c.zIndex}),e=c.radius+c.length+c.width,h,i;a&&(a.insertBefore(d,a.firstChild||null),i=n(a),h=n(d),l(d,{left:(c.left=="auto"?i.x-h.x+(a.offsetWidth>>1):c.left+e)+"px",top:(c.top=="auto"?i.y-h.y+(a.offsetHeight>>1):c.top+e)+"px"})),d.setAttribute("aria-role","progressbar"),b.lines(d,b.opts);if(!f){var j=0,k=c.fps,m=k/c.speed,o=(1-c.opacity)/(m*c.trail/100),p=m/c.lines;!function q(){j++;for(var a=c.lines;a;a--){var e=Math.max(1-(j+a*p)%m*o,c.opacity);b.opacity(d,c.lines-a,e,c)}b.timeout=b.el&&setTimeout(q,~~(1e3/k))}()}return b},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c),this},lines:function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c+b.rotate)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:b.hwaccel?"translate3d(0,0,0)":"",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&h(d,l(e("#000","0 0 4px #000"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}}),!function(){function a(a,b){return g("<"+a+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',b)}var b=l(g("group"),{behavior:"url(#default#VML)"});!k(b,"transform")&&b.adj?(i.addRule(".spin-vml","behavior:url(#default#VML)"),p.prototype.lines=function(b,c){function f(){return l(a("group",{coordsize:e+" "+e,coordorigin:-d+" "+ -d}),{width:e,height:e})}function k(b,e,g){h(i,h(l(f(),{rotation:360/c.lines*b+"deg",left:~~e}),h(l(a("roundrect",{arcsize:1}),{width:d,height:c.width,left:c.radius,top:-c.width>>1,filter:g}),a("fill",{color:c.color,opacity:c.opacity}),a("stroke",{opacity:0}))))}var d=c.length+c.width,e=2*d,g=-(c.width+c.length)*2+"px",i=l(f(),{position:"absolute",top:g,left:g}),j;if(c.shadow)for(j=1;j<=c.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=c.lines;j++)k(j);return h(b,i)},p.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}):f=k(b,"animation")}(),a.Spinner=p})(window,document);

/****************** FastClick **************************/
// http://assanka.net/content/tech/2011/08/26/fastclick-native-like-tapping-for-touch-apps/

var FastClick=(function(){var a='ontouchstart' in window;return function(e){if(!(e instanceof HTMLElement)){throw new TypeError("Layer must be instance of HTMLElement")}if(a){e.addEventListener("touchstart",g,true);e.addEventListener("touchmove",f,true);e.addEventListener("touchend",i,true);e.addEventListener("touchcancel",b,true)}e.addEventListener("click",h,true);if(e.onclick instanceof Function){e.addEventListener("click",e.onclick,false);e.onclick=""}var d={x:0,y:0,scroll:0},c=false;function g(j){c=true;d.x=j.targetTouches[0].clientX;d.y=j.targetTouches[0].clientY;d.scroll=window.pageYOffset;return true}function f(j){if(c){if(Math.abs(j.targetTouches[0].clientX-d.x)>10||Math.abs(j.targetTouches[0].clientY-d.y)>10){c=false}}return true}function i(l){var k,j;if(!c||Math.abs(window.pageYOffset-d.scroll)>5){return true}k=document.elementFromPoint(d.x,d.y);if(k.nodeType===Node.TEXT_NODE){k=k.parentNode}if(!(k.className.indexOf("clickevent")!==-1&&k.className.indexOf("touchandclickevent")===-1)){j=document.createEvent("MouseEvents");j.initMouseEvent("click",true,true,window,1,0,0,d.x,d.y,false,false,false,false,0,null);j.forwardedTouchEvent=true;k.dispatchEvent(j)}if(!(k instanceof HTMLSelectElement)&&k.className.indexOf("clickevent")===-1){l.preventDefault()}else{return false}}function b(j){c=false}function h(l){if(!window.event){return true}var m=true;var k;var j=window.event.forwardedTouchEvent;if(a){k=document.elementFromPoint(d.x,d.y);if(!k||(!j&&k.className.indexOf("clickevent")==-1)){m=false}}if(m){return true}l.stopPropagation();l.preventDefault();l.stopImmediatePropagation();return false}}})();


// |------------------------------------------------|
// |-------------- Email.js version 5 --------------|
// |------------------------------------------------|


var tld_ = new Array()
tld_[0] = "com";
tld_[1] = "org";
tld_[2] = "net";
tld_[3] = "ws";
tld_[4] = "info";
tld_[10] = "co.uk";
tld_[11] = "org.uk";
tld_[12] = "gov.uk";
tld_[13] = "ac.uk";
var topDom_ = 13;
var m_ = "mailto:";
var a_ = "@";
var d_ = ".";

function mail(name, dom, tl, params)
{
	var s = compose_e(name,dom,tl);
	document.write('<a href="'+m_+s+params+'">'+s+'</a>');
}
function mail2(name, dom, tl, params, display)
{
	document.write('<a href="'+m_+compose_e(name,dom,tl)+params+'">'+display+'</a>');
}
function compose_e(name, dom, tl)
{
	var s = name+a_;
	if (tl!=-2)
	{
		s+= dom;
		if (tl>=0)
			s+= d_+tld_[tl];
	}
	else
		s+= swapper(dom);
	return s;
}

function swapper(d)
{
	var s = "";
	for (var i=0; i<d.length; i+=2)
		if (i+1==d.length)
			s+= d.charAt(i)
		else
			s+= d.charAt(i+1)+d.charAt(i);
	return s.replace(/\?/g,'.');
}


/*******************************************************/



function Defer(f)
{
	console.log(" -=<[ DEFER 15 ]>=- ");

	// setTimeout( f, 75 ); 

	setTimeout( f, 33 ); 
}

function Defer100(f)
{
	console.log(" -=<[ DEFER 100 ]>=- ");

	// setTimeout( f, 75 ); 

	setTimeout( f, 100 ); 
}

/********************** iOS ****************************/

function iPhone()
{
	return ( (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) );
}

function HideToolbarIfNeeded()
{
	if (iPhone())
		window.scrollTo(0, 1);
}

/************************ AUX *****************************/

function IsElementInPageVisibleArea(elem)
{
	if (!elem || elem.length == 0)
		return false;

    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = elem.offset().top;
    var elemBottom = elemTop + elem.height();

    // console.log("elemBottom: "    + elemBottom + 
    // 			" docViewBottom:" + docViewBottom +
    // 			" elemTop:" + elemTop +
    // 			" docViewTop:" + docViewTop);

    return (docViewBottom >= elemTop);

    // return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

/***********************************************************/



function DoNotLayout(element) { }

function ProgressIndicatorLayout(element) 
{
	AsimetricScaleWithFactor( element, Point(0.65, 0), Point(1.40, /*1.2*/ 1.16 ) );

	var progressBarWidth = $("#progress-bar").css("width");

	if ( PixelNumber(progressBarWidth) < 10 )
	{
		$("#progress-bar").css("width", "10px");		
	}
}

function ProgressTrackLayout(element) 
{
	var progressBarWidth = $("#progress-indicator").css("width");

	var progressBarWidthValue = PixelNumber(progressBarWidth);

	element.width( progressBarWidthValue - 4 + "px" );
}

function ProgressBarLabelLayout(element) 
{
	$("#progress-bar div[class='label']").css("width",  $("#progress-track div[class='label']").css("width") );
}

function WhiteSignupButtonLayout(element)
{
	ProportionalScaleWithFactor(element, 	
								0.60,
								Point( 1.41 , /*1.05*/ 1.025 ) );
}

function NotepadPaperTextLayout(element)
{
	ProportionalScaleWithFactor(element, 	
								0.70,
								Point( 1.58, 1.5 ) );	
}

function NotepadMessageLayout(element)
{
	ProportionalScaleWithFactor(element, 	
								0.9,
								Point( 1.03, 1.10 ) );	
}


function Line6Layout(element)
{
	ProportionalScaleWithFactor(element, 	
								1,
								Point( 2, 1.15 ) );	
}


function PhotosPileLayout(element)
{
	ProportionalScaleWithFactor(element, 	
								0.9,
								Point( 1.2, 1.4 ) );	
}


function PhotoFlapLayout(element)
{
	ProportionalScaleWithFactor(element, 	
								0.2,
								Point( 0.98, 1.42 ) );	
}

function PhotoFlapArrowLayout(element)
{
	ProportionalScaleWithFactor(element, 	
								0,
								Point( 1, 1 ) );	
}

function HelloLayout(element)
{
	ProportionalScaleWithFactor(element, 	
								0.5,
								Point( 3.5, 1.4 ) );	
}

function BalloonNineOclockLayout(element)
{
	ProportionalScaleWithFactor(element, 	
								0.5,
								Point( 2.1, 4 ) );	
}

function BalloonOneOclockLayout(element)
{
	ProportionalScaleWithFactor(element, 	
								0.25,
								Point( 0.75, 0 ) );	
}

function BalloonFiveOclockLayout(element)
{
	ProportionalScaleWithFactor(element, 	
								0.25,
								Point( 1.50, 1.3) );	
}

function LisaLoveBalloonLayout(element)
{
	ProportionalScaleWithFactor(element, 	
								0,
								Point(1.6, -8) );	
}

function LisaPartyBalloonLayout(element)
{
	ProportionalScaleWithFactor(element, 	
								0,
								Point(1.57, 26) );	
}


function LisaLoserBalloonLayout(element)
{
	ProportionalScaleWithFactor(element, 	
								0,
								Point(1.60, -13) );	
}

function LisaEndBalloonLayout(element)
{
	ProportionalScaleWithFactor(element, 	
								0,
								Point(1.45, -4.5) );	
}

function ShoeboxStageLayout(element)
{
	console.log("window.height " + $(window).height() );
	console.log("window.width "	 + $(window).width() );
	
	var windowWidth  = $(window).width();
	var windowHeight = $(window).height()

	var ratio = (windowWidth - windowHeight) / windowWidth;

	console.log("ratio: " + ratio );

	if( ratio > 0.33 && windowWidth < 500)
	{
		StageProportionalScale( element, 0.80 );
	}
	else
		StageProportionalScale( element, 1 );
}


var StageLayout = 
{	
	"shoebox-stage"					: ShoeboxStageLayout,

	"white-halo"					: DoNotLayout,
	
	"progress-indicator"			: ProgressIndicatorLayout,
	"progress-track"				: ProgressTrackLayout,
	"progress-bar"					: DoNotLayout,
	"progress-bar-label"			: ProgressBarLabelLayout,

	"white-signup-button"			: WhiteSignupButtonLayout,

	"notepad-message"				: NotepadMessageLayout,
	"notepad-paper-text"			: NotepadPaperTextLayout,
	"line6"							: Line6Layout,
	
	"photos-pile-top"				: PhotosPileLayout,
	"photos-pile-bottom"			: PhotosPileLayout,

	"photo-flap-container"			: PhotoFlapLayout,
	"photo-flap-arrow-container"	: PhotoFlapLayout,
	"photo-flap-arrow"				: PhotoFlapArrowLayout,

	"hello"							: HelloLayout,
	"balloon-nine-oclock"			: BalloonNineOclockLayout,
	"balloon-one-oclock"			: BalloonOneOclockLayout,
	"balloon-five-oclock"			: BalloonFiveOclockLayout,

	"lisa-love-balloon"				: LisaLoveBalloonLayout,
	"lisa-party-balloon"			: LisaPartyBalloonLayout,
	"lisa-loser-balloon"			: LisaLoserBalloonLayout,
	"lisa-end-balloon"				: LisaEndBalloonLayout,

	// "shoebox-color" : ShoeboxColorLayout
};


function ShoeboxScaleFactor()
{
	var shoeboxStageHeight = $("#shoebox-stage").height();
	return shoeboxStageHeight / 480;
}


function ShoeboxScaleNumber(value)
{
	var shoeboxScale = ShoeboxScaleFactor();
	return value * shoeboxScale;
}

function ShoeboxScalePixel(pxValue)
{
	return ShoeboxScaleNumber( PixelNumber(pxValue) ) + "px";
}

var gShowCornerTimer = undefined;

var _OpenShoeboxSemaphore = false;


function OpenShoeboxAction()
{
	OpenShoebox();

	Track("open-shoeboxify");
}


function OpenShoebox()
{
	console.log(arguments.callee.name)

	if (_OpenShoeboxSemaphore)
		return;

	_OpenShoeboxSemaphore = true;

	$("#over-the-fold button[class='white']").fadeOut();

	RemoveWrap( 
		function andWhenDone() {

			StartPhotoFlapArrowAnimation();

			LiftLid( 
				function LidDidLift()
				{
					$("#tmp-segue").show();

					Defer100(
						function() {
							AppendShoeboxSegue();
							/* setTimeout( StartPhotoFlapArrowAnimation, 3 * 1000 ); */     // Start after 3 seconds
							setTimeout( StopPhotoFlapArrowAnimation, 10 * 60 * 1000 ); // Stop after 10 minutes
						} );
				} );
		} );

	function RemoveWrap( doneFunction )
	{
		if ($.support.transition)
		{
			var animationStepLength = 1000;

			var wrapStep1Y = ShoeboxScaleNumber(-10);
			
			var wrapStep1RightX = ShoeboxScaleNumber(20);
			var wrapStep1LeftX  = ShoeboxScaleNumber(0);

			var wrapStep1PropertiesLeft = {	scale: 1.07,
										x: wrapStep1LeftX + "px",
										y: wrapStep1Y + "px",	
									};
			var wrapStep1PropertiesRight= {	scale: 1.07,
										x: wrapStep1RightX + "px",
										y: wrapStep1Y + "px",	
									};

			var animationStep1Length = 1250;

			var slideLeftY  = ShoeboxScaleNumber(650);
			var wrapStep2PropertiesDown = { y: "+=" + slideLeftY + "px" };
			var wrapStep2PropertiesUp   = { y: "-=" + slideLeftY + "px" };


			$("#wrap-front-flap").transition( wrapStep1PropertiesRight,		animationStep1Length)
								 .transition( wrapStep2PropertiesDown,	animationStep1Length, 
								 	function() { $(this).remove(); } );
			
			$("#wrap-back-flap").transition( wrapStep1PropertiesRight,		animationStep1Length)
								.transition( wrapStep2PropertiesDown,	animationStep1Length, 
								 	function() { $(this).remove(); } );

			$("#wrap-front-shoe").transition( wrapStep1PropertiesLeft,		animationStep1Length)
								.transition( wrapStep2PropertiesUp,		animationStep1Length, 
								 	function() { $(this).remove(); } );

			$("#wrap-back-shoe").transition( wrapStep1PropertiesLeft,		animationStep1Length)
								 .transition( wrapStep2PropertiesUp,	animationStep1Length,
								 	 function(){ 
										$(this).remove();

								 	 	if (doneFunction)
											doneFunction();
								 	} );
		}
		else
		{
			// TODO
		}
	}

	function LiftLid( doneFunction )
	{
		function LidAnimationCompleted() {
			console.log("Animation done"); 
			$("#lid").remove();

			if (doneFunction)
				doneFunction();
		}

		var liftUpY  = ShoeboxScaleNumber(-220);

		if ($.support.transition)
		{
			$("#lid").transition({	opacity: 0,
						 	 			  y: liftUpY +"px",
	    				 			  scale: 1.6,
								},
								2000,
								LidAnimationCompleted	);
		}
		else
		{
			$("#lid").animate({	opacity: 0,
						   			top: liftUpY*2 + "px",
							  },
							  2000,
							  LidAnimationCompleted	);
		}
	}
}

var _PhotoFlapArrowAnimation_Active = false;

function StopPhotoFlapArrowAnimation()
{
	_PhotoFlapArrowAnimation_Active = false;
}

function StartPhotoFlapArrowAnimation()
{
	_PhotoFlapArrowAnimation_Active = true;
	
	AnimateStep();

	function AnimateStep()
	{
		var arrowDOMElement = $("#photo-flap-arrow");

		if ( !_PhotoFlapArrowAnimation_Active || arrowDOMElement.length == 0 )
			return;
		else
		{
			var animationLength = 500;
			var arrowOpacity = arrowDOMElement.css("opacity");

			if (arrowOpacity > 0.9)
			{
				arrowDOMElement.transition( { opacity: 0 }, animationLength, AnimateStep);
			}
			else
			{
				arrowDOMElement.transition( { x: "-5px" }, 0 )
							   .transition( { x: 0, opacity: 1 }, animationLength, 
									function() {
										setTimeout(AnimateStep, animationLength * 2);	
									  } );
			}
		}
	}

}

function LoadShoeboxSegue(doneFunction)
{
	if ($("#shoebox-segue-wrapper").length == 0 ) 
	{
		console.error("Cannot find #shoebox-segue-wrapper element - Abort LoadShoeboxSegue()");
		return;
	}

	var shoeboxSegueBody = $("#shoebox-segue-wrapper").html();
	var shoeboxSegueImages = ImagesNeededToRenderElement( $(shoeboxSegueBody) );

	if (shoeboxSegueImages.length == 0)
		console.error("shoeboxSegueImages is empty");

	LoadImages(
		shoeboxSegueImages,
		undefined, 
		function WhenDone()
		{
			if (doneFunction)
				doneFunction();
		});
}


function AppendShoeboxSegue(doneFunction)
{
	Defer(
		function () {
			LoadShoeboxSegue(AppendSegue);
		} );

	function AppendSegue()
	{
		$("#tmp-segue").hide();
		
		UnwrapScriptTemplate( $("#shoebox-segue-wrapper") );

		$("#shoebox-segue").hide();
		
		SetupPage();

		RenderSprites( $("#shoebox-segue") );

		$("#shoebox-segue").fadeIn(1000);
		// HACK: workaround for corrupted yellow button bug in WebKit when resizing window
		// $("#shoebox-segue").css("transform", "none");

		$("html").css("overflow-y", "auto");

		if (doneFunction)
			doneFunction();

		LoadFacebookSDK();

		SwitchToSpinnerTab(false);

		$("#over-the-fold button[class='yellow']").fadeIn(1000);

		if (!IsMobilePage())
			$("#over-the-fold button[class='more']").fadeIn(1000);
	}
}


function ShoeboxStageLayoutSetup( element )
{
	if (!element)
		element = $("#shoebox-stage");

	InitLayoutSystem( element, StageLayout );
}

function SmoothScrollToTheTop( doneFunction )
{
	var element = $("html:not(:animated),body:not(:animated)");

	console.log( "-> scrollTop: " + $("html").scrollTop() );

	element.animate({ scrollTop: 0 }, 1000, doneFunction );
}

function StartShow()
{
	console.log(arguments.callee.name);

	SetupPageInit();

	SetupPage();
	
	ShoeboxStageLayoutSetup();

	SetProgressIndicatorState(_kZeroState);

	$("#header").css("visibility", "visible");
	$("#shoebox-stage").css("visibility", "visible");
	$("#designed-and-made").css("visibility", "visible");

	if (!IsMobilePage())
		window.scrollTo(0, 0);


	var supportsOrientationChange = "onorientationchange" in window;
	var resizeEvent = supportsOrientationChange ? "orientationchange" : "resize";
    
    window.addEventListener(resizeEvent, WindowIsResizing, false);

	$(window).resize(
		function()
		{
			WindowIsResizing()
		});

	Defer(
		function() {
			UnwrapShoeboxElementAndInsertAfter(
				$("#shoebox-gray-wrapper"),
				$("#gray-svg div"), 
				[ "gray-svg" ] );
			
			SetProgressIndicatorState( _kGrayState );

			// ----------------------
			// -- Debug Gray Phase --
			// return;
			// ----------------------

			LoadColorShoebox();
		});	
}

function WindowScaleFactor()
{
 	// console.log( " body.width = " + $("body").width() );

 	var result = $("body").width() / 750;

 	if (result < 1)
	 	return result;
	 else
	 	return 1;
}

var _delayedWindowResizingTimer;
var _windowResizing_once = false;

function WindowIsResizing()
{
	if (!_windowResizing_once)
	{
		SetupUI();
		_windowResizing_once = true;
	}

	if (_delayedWindowResizingTimer)
		clearTimeout(_delayedWindowResizingTimer);
		
	 _delayedWindowResizingTimer = setTimeout( SetupUI, 150 ); 

	 function SetupUI()
	 {
 		PeformLayoutForElement($("#shoebox-stage"));

 		SetupPage();

 		_windowResizing_once = false;
	 }
}


function SetupPageInit()
{
	$("#header").data( "padding-left-original", $("#header").css("padding-left") );
	$("#header").data( "width-original", 		$("#header").css("width") );
}


function SetupPage()
{
	var scale = WindowScaleFactor();
	var bodyWidth = $("body").width();

	SetupHeader();
	
	SetupOverTheFoldButtons();

	SetupDesignedAndMade();

	SetupSegue();

	function SetupHeader() 
	{
		// == HEADER ==
		var headerPaddingLeft = $("#header").data("padding-left-original");
		var newHeaderPaddingLeft = PixelNumber(headerPaddingLeft) * scale;
		$("#header").css("padding-left", Math.round(newHeaderPaddingLeft) + "px");
		
		var newHeaderWidth;

		if (scale < 1)
			newHeaderWidth = PixelNumber( $("body").width());
		else
			newHeaderWidth = PixelNumber($("#header").data("width-original"));

		newHeaderWidth -= newHeaderPaddingLeft;

		$("#header").css("width", newHeaderWidth + "px" );

		// == Title + Subtitle ==

		// Default
		var marginLeft	= "49px";
		var titleTop    = "35px";
		var subtitleTop = "70px";

		var titleFontSize    = "24px";
		var subtitleFontSize = "18px";

		 // Title has two lines
		if ( $("#header-page h1").height() > 32 ) {
			titleTop    = "18px";
			subtitleTop = "72px";

			// titleFontSize    = "20px";
			subtitleFontSize = "16px";
		}

		var headerTitle    = $("#header-page h1");
		var headerSubtitle = $("#header-page h2");
		var loadingTitle   = $("#header-loading div[class='title']");
		var loadingSubtitle= $("#header-loading-subtitle");

		headerTitle.css( "top", titleTop);
		loadingTitle.css("top", titleTop);
	
		headerSubtitle.css( "top", subtitleTop);
		// loadingSubtitle.css("top", PixelNumber(titleTop) + 32 + "px" );
		
		headerTitle.css(   "font-size", titleFontSize);
		loadingTitle.css(  "font-size", titleFontSize);

		headerTitle.css(   "line-height", titleFontSize);
		loadingTitle.css(  "line-height", titleFontSize);

		headerSubtitle.css( "font-size", subtitleFontSize);
		loadingSubtitle.css("font-size", subtitleFontSize);

		headerSubtitle.css( "line-height", subtitleFontSize);
		loadingSubtitle.css("line-height", subtitleFontSize);
	}

	function SetupOverTheFoldButtons()
	{
		var overTheFoldTop   = "68px";
		var overTheFoldRight = "14px";

		if ( IsMobilePage() )
		{
			overTheFoldTop   = "94px";
			overTheFoldRight = "6px";

			$("#over-the-fold button[class='more']").hide();
		}
		else if ( $("#over-the-fold button[class='yellow']").is(":visible") )
		{
			$("#over-the-fold button[class='more']").show();
		}

		$("#over-the-fold").css("top",   overTheFoldTop);
		$("#over-the-fold").css("right", overTheFoldRight);		
	}


	function SetupDesignedAndMade() 
	{
		if ( IsMobilePage() )
		{
			$("#designed-and-made").removeClass("designed-and-made-desktop");
			$("#designed-and-made").addClass("designed-and-made-mobile");
		}
		else
		{
			$("#designed-and-made").addClass("designed-and-made-desktop");
			$("#designed-and-made").removeClass("designed-and-made-mobile");
		}
	}

	function SetupSegue()
	{
		if ( IsMobilePage() ) // MOBILE VERSION
		{
			$("#cardboard").css("display", "none" );
			$("#cardboard-mobile").css("display", "block" );
			$("#cardboard-mobile-2").css("display", "block" );

			$("#barcode-mobile-container").css("display", "block" );

			$("#paper-shoe-sticker").appendTo( $("#cardboard-mobile div[class='paper-shoe-sticker-container']") );
			$("#paper-barcode-sticker").appendTo( $("#barcode-mobile-container") );

			$("#cartboard-extra-footer").children().appendTo( $("#mobile-extra-footer") );
			$("#mobile-extra-footer").show();

			$("#subcontent-body").appendTo( $("#subcontent-mobile") );

			if ( $("#subcontent").is(":visible") ) {
				$("#subcontent-mobile").show();
				$("#subcontent").hide();
			}

			$("#yellow-button-container").css( "margin-top", "4px" );
			$("#tmp-segue").css( "margin-top", "4px" );
		}
		else
		{
			$("#cardboard").css("display", "block" );
			$("#cardboard-mobile").css("display", "none" );
			$("#cardboard-mobile-2").css("display", "none" );

			$("#barcode-mobile-container").css("display", "none" );

			$("#paper-shoe-sticker").appendTo( $("#cardboard div[class='paper-shoe-sticker-container']") );
			$("#paper-barcode-sticker").appendTo( $("#paper-barcode-sticker-container") );

			$("#mobile-extra-footer").children().appendTo( $("#cartboard-extra-footer") );
			$("#mobile-extra-footer").hide();

			$("#subcontent-body").appendTo( $("#subcontent") );

			if ( $("#subcontent-mobile").is(":visible") ) {
				$("#subcontent").show();
				$("#subcontent-mobile").hide();
			}

			$("#yellow-button-container").css( "margin-top", "24px" );
			$("#tmp-segue").css( "margin-top", "24px" );

		}
	}
}

function IsMobilePage()
{
	return ( $("body").width() < 680 );
}

// ---------------- PROGRESS BAR ----------------

// PROGRESS BAR STATE

var _kZeroState = "kZeroState";
var _kGrayState = "kGrayState";

var _kColorDidLoadState     = "kColorDidLoadState";
var _kColorDidCompleteState = "kColorDidCompleteState";

var _kWrapDidLoadState		= "kWrapDidLoadState";
var _kWrapDidCompleteState	= "kWrapDidCompleteState";
var _kContentDidLoadState	  = "kContentDidLoadState";
var _kContentDidCompleteState = "kContentDidCompleteState";

var _kEndState = "kEndState";

var _ProgressIndicatorStatesArray = [
	_kZeroState,
	_kGrayState,
	_kColorDidLoadState,
	_kColorDidCompleteState,
	_kWrapDidLoadState,
	_kWrapDidCompleteState,
	_kContentDidLoadState,
	_kContentDidCompleteState,
	_kEndState
];

var _ProgressIndicatorStates = {};

_ProgressIndicatorStates[_kZeroState]    			= 0.00;

_ProgressIndicatorStates[_kGrayState]    			= 0.15;
_ProgressIndicatorStates[_kColorDidLoadState]	 	= 0.30;
_ProgressIndicatorStates[_kColorDidCompleteState]	= 0.50;
_ProgressIndicatorStates[_kWrapDidLoadState]		= 0.70;
_ProgressIndicatorStates[_kWrapDidCompleteState]	= 0.85;
_ProgressIndicatorStates[_kContentDidLoadState] 	= 0.90;
_ProgressIndicatorStates[_kContentDidCompleteState] = 0.95;

_ProgressIndicatorStates[_kEndState]				= 1.00;

var _ProgressIndicatorTimestamp = {};

function DictionaryKeys(dictionary)
{
	var keys = [];
	for (var key in dictionary) {
	  if (dictionary.hasOwnProperty(key)) {
	    keys.push(key);
	  }
	}

	return keys;
}

function ProgressIndicatorStateForValue(value)
{
	for (var key in _ProgressIndicatorStatesArray)
	{
		var state = _ProgressIndicatorStatesArray[key];
		var stateValue = _ProgressIndicatorStates[state];
		if ( Math.abs(stateValue - value) < 0.01 )
			return state;
	}

	return undefined;
}

function toFixed(value, precision) {
    var precision = precision || 0,
    neg = value < 0,
    power = Math.pow(10, precision),
    value = Math.round(value * power),
    integral = String((neg ? Math.ceil : Math.floor)(value / power)),
    fraction = String((neg ? -value : value) % power),
    padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');

    return precision ? integral + '.' +  padding + fraction : integral;
}

function ProgressIndicatorPrintTimestamps()
{
	var t0 = _ProgressIndicatorTimestamp[0];
	var t1 = _ProgressIndicatorTimestamp[1];
	var totalTime = (t1 - t0);

	var prevValue;

	var allKeys = DictionaryKeys(_ProgressIndicatorTimestamp);
	allKeys.sort();

	console.log("--- Loading Starts ---");
	for (var i=0;  i<allKeys.length; i++ )
	{
		var keyValue =  allKeys[i];	
		var value = _ProgressIndicatorTimestamp[keyValue];

		if (prevValue && value)
		{
			var delta = (value - prevValue);
			var logString = toFixed(keyValue, 2) + " : " + delta;
			var state = ProgressIndicatorStateForValue(keyValue);
			if (state)
				logString += " " + state;

			var segment = (delta / totalTime) * 100;
			logString += " len:" + Math.round(segment) + "%";

			var progress = ( (value - t0) / totalTime) * 100;

			logString += " all:" + Math.round(progress) + "%";


			console.log(logString);
		}

		prevValue = value;
	}

	console.log("--[ Total loading: " + totalTime + " ]--" );
}

function ProgressIndicatorValueForState(state)
{
	var r = _ProgressIndicatorStates[state];

	if (r == undefined) {
		console.error("Unknown state: " + state);

		console.log(_ProgressIndicatorStates);

		return 0;
	}

	return r;
}

function SetProgressIndicatorState(state)
{
	var value = ProgressIndicatorValueForState(state);

	console.log("========== [ " + state + " ] (" + value + ") ==========" );

	SetProgressIndicator( value );

	Track( "loading_"+ value );
}

function SetProgressIndicatorBetweenStates(startState, endState, progress)
{
	var progressValue = 0;

	if (progress < 0 && progress > 1) {
		console.error("invalid progress");
		return 0;		
	}

	var startStateValue = ProgressIndicatorValueForState(startState);
	var endStateValue   = ProgressIndicatorValueForState(endState);

	if ( endStateValue < startStateValue )
	{
		console.error("endState < startState");
		return 0;		
	}

	progressValue = startStateValue + (endStateValue - startStateValue) * progress;

	SetProgressIndicator( progressValue );
}

var _ProgressIndicatorValue = 0.0;

function ProgressIndicatorValue()
{
	return _ProgressIndicatorValue;
}

function SetProgressIndicator( floatValue /* [0, 1] */ )
{
	// console.log(arguments.callee.name + " " + floatValue );

	if ( typeof floatValue != "number") {
		console.error("floatValue is not a number (" + typeof floatValue + " : " + floatValue + ")" );
		return;		
	}

	var trackWidth = $("#progress-track").css("width");
	var newWidthValue = Math.round( PixelNumber(trackWidth) * floatValue ) + "px";

	SetCSSPropertyAndOverideBirthCSS( $("#progress-bar"), "width", newWidthValue);

	_ProgressIndicatorValue = floatValue;

	_ProgressIndicatorTimestamp[floatValue] = new Date().getTime();

	if (floatValue == 1)
		ProgressIndicatorPrintTimestamps();
}



function LoadColorShoebox()
{
	/********/
	/* MAIN */
	/********/	

	// console.log( arguments.callee.name );

	LoadImages( ColorImagesArray(), 	
				function LoadProgess( progressValue, path, image)
				{
					// console.log( "LoadColorShoebox -> " + arguments.callee.name );

					SetProgressIndicatorBetweenStates( _kGrayState, _kColorDidLoadState, progressValue );
				},
				function ImagesDidLoad()
				{
					// console.log( "LoadColorShoebox -> " + arguments.callee.name );

					SetProgressIndicatorState( _kColorDidLoadState );

					// Start loading resources right away...
					PreloadBoxContentImages();

					Defer( RevealColorShoebox );
				}
			);
	
	/*****************/
	/* AUX FUNCTIONS */
	/*****************/

	function ColorImagesArray() // array
	{
		var backgroundImagePath = BackgroundImagePath();

		var shoeboxBody = $("#shoebox-color-wrapper").html();
		var shoeboxImages = ImagesNeededToRenderElement( $(shoeboxBody) );

		var otherImages = [ backgroundImagePath ];

		return otherImages.concat(shoeboxImages);
	}

	function PreloadBoxContentImages()
	{
		var contentBody = $("#box-content-wrapper").html();
		var contentImages = ImagesNeededToRenderElement( $(contentBody) );

		LoadImages( contentImages, undefined, 
			function WhenDone()
			{
				console.log("#box-content-wrapper --> preloaded!");
			});
	}

	function RevealColorShoebox()
	{
		SetYellowBackground();

		UnwrapShoeboxElement( $("#shoebox-color-wrapper"), [ "shoebox-color" ]  );

		SetWrapInStartPosition();

		// return;

		ShoeboxGrayFadeOut(
			function andWhenDone() {
				console.log("ShoeboxGrayFadeOut + done");

				SetProgressIndicatorState( _kColorDidCompleteState );		

				AnimateWrapIn(
					function andWhenDone() {
						console.log("AnimateWrapIn + done");

						SetProgressIndicatorState(_kWrapDidCompleteState);
						
						LoadShoeboxContent(
							function andWhenDone() 
							{
								EndLoadingShow();
							});

					});
			});
	}
	
	function EndLoadingShow(doneFunction)
	{
		function PageTitleFadeIn()
		{
			var animationLength   = 1000;

			// Title
			$("#header-page h1").css("opacity", 0);
			$("#header-page h1").css("visibility", "visible");
			
			$("#header-page h1").transition( {opacity: 1},	animationLength);
			$("#header-loading *[class='title']").transition( {opacity: 0},	animationLength*2);
				
			// Subtitle
			$("#header-page h2").css("opacity", 0);
			$("#header-page h2").css("visibility", "visible");
			
			$("#header-loading-subtitle").transition( {opacity: 0},	animationLength);
			$("#header-page h2").transition( {opacity: 1}, animationLength);
		}

		function LoadingStickerFadeOut(doneFunction)
		{
			var animationLength = 500;

			$("#loading-cover").transition(	{ opacity:0 }, animationLength, 
				function() {
					$("#loading-cover").remove(); 
				});

			$("#progress-indicator-container").transition({ opacity:0 }, animationLength, 
				function() {
					$("#progress-indicator-container").remove();
					$("#lid").click(OpenShoeboxAction);
					$("#lid-click-area").click(OpenShoeboxAction);

					if (doneFunction)
						doneFunction();
				});			
		}
		
		function StartPulsingOpenLabel()
		{
			var timeoutCount = 0;

			function PulseSequence()
			{
				var animationLength = 1000;

				// var elementToPulse = $("#lid-barcode-sticker div[class='label']");
				var elementToPulse = $("#lid-barcode-sticker");

				if (_OpenShoeboxSemaphore || timeoutCount++ > 60 )
					elementToPulse.transition({ opacity: 1.0 });
				else
				{
					var currentOpacity = elementToPulse.css("opacity");
					var destinationOpacity = (currentOpacity < 0.75 ? 1 : 0.5);

					elementToPulse.transition({ opacity: destinationOpacity }, animationLength, "linear", PulseSequence);
				}
			}

			PulseSequence();
		}

		LoadShoeboxSegue();

		window.scrollTo(0, 0);

		PageTitleFadeIn();

		SetProgressIndicatorState(_kEndState );

		RenderSprites($("#over-the-fold"));
		
		$("#over-the-fold button[class='white']").fadeIn();

		LoadingStickerFadeOut(
			function() {
				if (doneFunction)
					doneFunction();
			}
		);
	}

	function ShoeboxGrayFadeOut(fadeOutDoneFunction)
	{
		console.log("ShoeboxGrayFadeOut");

		ShoeboxGrayElementFadeOut(Finalize);			

		function ShoeboxGrayElementFadeOut(doneFunction)
		{
			var animationLength = 1000;

			$("#progress-indicator").attr("class", "progress-indicator-color-theme");

			if ($.support.transition)
			{
				$("#shoebox-gray").transition   ( {opacity: 0}, animationLength, doneFunction );

				$("#loading-sticker").transition( {opacity: 1}, animationLength );

			}
			else
			{
				$("#shoebox-gray").fadeOut(animationLength, doneFunction);
				$("#loading-sticker").animate( {opacity: 1}, animationLength );
			}
			
			$("#designed-and-made").removeClass("footer-gray");
			$("#designed-and-made").addClass("footer-color");

			$("#header-loading-subtitle").attr("class", "subtitle-color");
			
			setTimeout( function(){ $("#lid-click-area").css("z-index", 5) }, animationLength/2 );			
		}

		function Finalize()
		{
			console.log("ShoeboxGrayFadeOutCompleted");

			$("#shoebox-gray").remove();
			// $("#gray-loading-sticker").remove();

			$("#designed-and-made").css("z-index", 0);
			$("#header-loading").css("z-index", 0);

			if (fadeOutDoneFunction)
				fadeOutDoneFunction();
		}
	}

	var wrapOffsetY = ShoeboxScaleNumber(-10);
	var wrapOffsetX = ShoeboxScaleNumber(5);

	function SetWrapInStartPosition()
	{
		var startOpacity = 0;

		// var travelDistance = 500;

		var startPropertiesUp   = { y: ShoeboxScaleNumber(-520)+ "px", 
									x: 0,
									scale: 1, 
									opacity: startOpacity
								};

		var startPropertiesDown = { y: ShoeboxScaleNumber(900) + "px", 
									x: ShoeboxScaleNumber(-5) + "px",
									scale: 1.025,
									opacity: startOpacity
								}; 

		$("#wrap-front-flap").transition( startPropertiesDown,	0)
		 $("#wrap-back-flap").transition ( startPropertiesDown,	0);

		$("#wrap-front-shoe").transition( startPropertiesUp, 0 );
		 $("#wrap-back-shoe").transition ( startPropertiesUp, 0 );

	}

	function AnimateWrapIn(doneFunction)
	{
		var properties = { y:0, opacity: 1 };

		var step1animationLength = 1500;

		function ShoeAnimationMoveIn() {
			$("#wrap-front-shoe").css("visibility", "visible");
			$( "#wrap-back-shoe").css("visibility", "visible");

			$( "#wrap-back-shoe").transition( properties, step1animationLength);
			
			$("#wrap-front-shoe").transition( properties, step1animationLength,
				function(){
					SetProgressIndicatorBetweenStates( _kWrapDidLoadState, _kWrapDidCompleteState, 0.5 );
				});


		}

		function FlapAnimationMoveIn() {

			$("#wrap-front-flap").css("visibility", "visible");
			$( "#wrap-back-flap").css("visibility", "visible");
		
			var finalProperties = { x:0, scale: 1 };

			$( "#wrap-back-flap").transition( properties, step1animationLength*1.25 )
								 .transition( finalProperties, step1animationLength / 4 );

			$("#wrap-front-flap").transition( properties, step1animationLength*1.25 )
								 .transition( finalProperties, step1animationLength / 4, 
									function() {
										if (doneFunction)
											doneFunction();
									});
		}
		
		ShoeAnimationMoveIn();

		setTimeout( FlapAnimationMoveIn, 250 );
		
		console.log("AnimateWrapIn");
	}

	function LoadShoeboxContent(doneFunction)
	{
		var contentBody = $("#box-content-wrapper").html();
		var contentImages = ImagesNeededToRenderElement( $(contentBody) );

		LoadImages( contentImages, 	
			function LoadProgess(value, path, image)
			{
				SetProgressIndicatorBetweenStates( _kWrapDidCompleteState, _kContentDidLoadState, value );
			},
			function WhenDone()
			{
				Defer( function() {
					UnwrapShoeboxElementAndInsertAfter(
						$("#box-content-wrapper"),
						$("#bottom-box"),
						[ "box-content-all" ] );

					SetProgressIndicatorState(_kContentDidCompleteState);

					if (doneFunction)
						doneFunction();
				} );
			} );
	}

}

var SnapAndHideCornerPhoto_Semaphore = false;

function SnapAndHideCornerPhoto(animationLength, animationDidCompleteFunction)
{
	console.log("SnapAndHideCornerPhoto");

	if (SnapAndHideCornerPhoto_Semaphore){
		console.log("SnapAndHideCornerPhoto_Semaphore ON");
		return;
	}
	SnapAndHideCornerPhoto_Semaphore = true;
	
	var bounceX = "+10px";
	var hideX = "-50px";
	var hideAnimationLength = animationLength*1.25;

	if ( $("#photo-flap-arrow").css("opacity") < 1 ) // photo-flap-arrow is animating...
		$("#photo-flap-arrow").remove();
	else
		$("#photo-flap-arrow").transition( { x: bounceX }, animationLength )
						  		.transition( { x: hideX, opacity: 0  }, hideAnimationLength,
						  		function() {
						  			$("#photo-flap-arrow").remove();
						  		});

	$("#corner-photo").transition( { x: bounceX }, animationLength, 
		function() {
			$("#corner-photo").transition( { x: hideX }, 		hideAnimationLength);
			$("#photo-flap-pocket").transition( { opacity: 0 },	hideAnimationLength );
	
			if (animationDidCompleteFunction)
				animationDidCompleteFunction();

			SnapAndHideCornerPhoto_Semaphore = false;
		} );
}


var isShowingCornerPhoto_Semaphore;

function ShowCornerPhoto(animationLength)
{
	console.log("ShowCornerPhoto");

	if (isShowingCornerPhoto_Semaphore) {
		console.log("isShowingCornerPhoto_Semaphore is showing already");
		return;
	}

	isShowingCornerPhoto_Semaphore = true;

	$("#corner-photo").transition( { x: 0 }, animationLength, function() { isShowingCornerPhoto_Semaphore = false; });
	// $("#photo-flap-arrow") gets removed the first time...
	$("#photo-flap-pocket").transition( { opacity: 1 }, animationLength/2 );
}

function UnwrapScriptTemplate(jqWrapper)
{
	var html = jqWrapper.html();

	jqWrapper.after(html);
	jqWrapper.remove();
}

function UnwrapShoeboxElementAndInsertAfter( jqWrapper, jqAfter, arrayOfElementIDToLayout )
{
	var html = jqWrapper.html();

	jqAfter.after(html);
	jqWrapper.remove();

	// console.log("ShoeboxStageLayoutSetup ELEMEMTS:");
	// console.log(elementsToLayout);

	if (arrayOfElementIDToLayout)
	{
		// console.log(arrayOfElementIDToLayout);

		arrayOfElementIDToLayout.forEach(
			function(elementID) {
				if (typeof elementID != "string") {
					console.error("Malformed arrayOfElementIDToLayout 'elementID' is not a string:");
					console.log(elementID);
					return;
				}
				
				var e = "#" + elementID;
									
				var jqElement = $(e);

				if (jqElement.length == 1)
				{

			 		ShoeboxStageLayoutSetup( jqElement ) ;
				}
				else
					console.error("Cannot find element with ID:" + elementID);
	
		 	}
		);
	}
	else
	{
		ShoeboxStageLayoutSetup();
	}
}

function UnwrapShoeboxElement( jqWrapper, arrayOfElementIDToLayout )
{
	UnwrapShoeboxElementAndInsertAfter( jqWrapper, jqWrapper, arrayOfElementIDToLayout );
}


function BackgroundImagePath()
{
	if ( IsMobilePage() )
		return "images/yellow-background-mobile2x.png";
	else
		return "images/yellow-background.png";
}

function SetYellowBackground()
{
	if ( IsMobilePage() )
	{
		$("body").removeClass("background-desktop");
		$("body").addClass("background-mobile");		
	}
	else
	{
		$("body").removeClass("background-mobile");		
		$("body").addClass("background-desktop");
	}
}

/* LINK ACTIONS */

var _subcontentAction_semaphore = false;

function _subcontentAction(element, doneFunction)
{
	if (_subcontentAction_semaphore)
	{
		console.log("_subcontentAction_semaphore is ON");
		return;
	}
	
	var mobile = IsMobilePage()

	var subcontentElement =  mobile ? $("#subcontent-mobile") : $("#subcontent");

	var animationLength = 500;
	
	var elementText;
	var shouldShowSubcontent;

	if (element) {
		elementText = $(element).text();
		shouldShowSubcontent = (elementText.length > 1);		
	}
	else
		shouldShowSubcontent = false;	

	if ( !shouldShowSubcontent )
	{
		if (! subcontentElement.is(":visible"))
		{
			return End();  // nothing to do
		}
		else // Hide
		{
			var footerHeightMagic = 78;
			var destination = $("#cardboard").offset().top + $("#cardboard").height() - $(window).height() + footerHeightMagic;

			$("html:not(:animated),body:not(:animated)").animate( {scrollTop: destination}, animationLength, 
				function() {
					Defer100( function() {
						subcontentElement.hide();
						End();
					});
				});

			return;
		}
	}

	_subcontentAction_semaphore = true;

	if (mobile)
		subcontentElement.transition( { opacity:0 },  0);
	else
		subcontentElement.transition( { opacity:0, y: "-10px" },  0);

	subcontentElement.show();

	ScrollToSubcontent();

	ShowSubcontent( 
		function() {
			_subcontentAction_semaphore = false;
			End();
		} );

	function End()
	{
		if (doneFunction)
			doneFunction();
	}

	function ScrollToSubcontent( doneFunction )
	{
		var destination;
		var scrollAnimationLength;

		if (mobile)
		{
			destination = $("#subcontent-mobile").offset().top - 16;
			scrollAnimationLength = animationLength * 2; 
		}
		else
		{
			destination = $("#paper-shoe-sticker").offset().top - 16;
			scrollAnimationLength = animationLength;
		}

		$("html:not(:animated),body:not(:animated)").animate( {scrollTop: destination}, scrollAnimationLength, doneFunction );
	}

	function ShowSubcontent(  doneFunction )
	{
		$("#subcontent-title").text( elementText ); 
		subcontentElement.transition( { opacity:1, y:0 }, animationLength, doneFunction);
	}
}


var enabledLabel;

function _SetShoeLabelState( label, state )
{
	var arrowElement = $( label + " canvas[class='arrow']" );
	var checkElement = $( label + " canvas[class='check']" );

	if (state) 
	{
		arrowElement.hide();
		checkElement.fadeIn();

		enabledLabel = label;
	}
	else
	{
		arrowElement.fadeIn();
		checkElement.hide();		
	}
}

function ZeroShoeStickerLabels()
{
	     $("#story").attr("class", "label-disabled");
	   $("#about").attr("class", "label-disabled");
	$("#feedback").attr("class", "label-disabled");

	enabledLabel = undefined;
}


function _LabelAction(label, element)
{
	console.log(arguments.callee.name);

	var currentEnabledLabel = enabledLabel;

	console.log("currentEnabledLabel: " + currentEnabledLabel );

	ZeroShoeStickerLabels();

	var labelElement = label;

	if (currentEnabledLabel != labelElement) 
	{
		// _SetShoeLabelState( labelElement, true );
		_subcontentAction(element);

		$(label).attr("class", "label-enabled");

		enabledLabel = label;

		SetupSubcontentMessageWithLabel(label);
	}
	else
	{
		_subcontentAction();
		enabledLabel = undefined;
	}

}

function SetupSubcontentMessageWithLabel(label)
{
	$("#subcontent-message").html(
		$(label+"-text-wrapper").html() );

}

function StoryAction(element)
{
	_LabelAction("#story", element);

	Track("story-click");
}

function AboutAction(element)
{
	_LabelAction("#about", element);

	Track("about-click");
}

function FeedbackEmail()
{
	return compose_e("feedback", "shoeboxify.com");
}

function JobsEmail()
{
	return compose_e("jobs", "shoeboxify.com");
}

function FeedbackAction(element)
{
	_LabelAction("#feedback", element);

	var email = FeedbackEmail();

	$("#feedback-email").html(email);

	Track("feedback-click");
}

function GiovanniDonelli()
{
	var urlToShare = "http://www.about.me/gdonelli";

	window.open(urlToShare);

	Track("gdonelli");
}


function SendMessageToShoeboxify()
{
	var urlToShare = "http://www.facebook.com/messages/shoeboxify";

	window.open(urlToShare);

	Track("feedback-send-fb");
}

function SendEmailToShoeboxify( account )
{
	var urlToShare = "mailto:" + compose_e( account, "shoeboxify.com" );
	
	window.location = urlToShare;

	Track("feedback-send-email");
}

function UpArrowAction()
{
	ZeroShoeStickerLabels();
	_subcontentAction(undefined);

	Track("uparrow-click");
}


function PrivacyAction(element)
{
	console.log(arguments.callee.name);
	
	ZeroShoeStickerLabels();

	SetupSubcontentMessageWithLabel("#privacy");

	_subcontentAction(element);

	Track("privacy-click");
}

function TermsAction(element)
{
	console.log(arguments.callee.name);
	
	ZeroShoeStickerLabels();

	SetupSubcontentMessageWithLabel("#terms");

	_subcontentAction(element);

	Track("terms-click");
}

function JobsAction(element)
{
	console.log(arguments.callee.name);
	
	ZeroShoeStickerLabels();

	SetupSubcontentMessageWithLabel("#jobs");

	_subcontentAction(element);

	$("#jobs-email").html( JobsEmail() );

	Track("jobs-click");
}

function ShareAction(element)
{
	var urlToShare = "http://www.shoeboxify.com";
	
	// var urlToShare = "http://www.facebook.com/shoeboxify";

	window.open(
		"http://www.facebook.com/sharer.php?u="+urlToShare, 
		"Share", 
		"location=0, status=0, scrollbars=0, width=660, height=340");

	Track("share-click");
}


function merge_options(obj1,obj2)
{
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}


function PopInElement( element, endProperties )
{
	var useTransition = $.support.transition;

	endProperties = merge_options( endProperties, { scale: 0.1, opacity: 0 } );

	var animationLength = 300;

	if (useTransition)
	{
		element.transition( endProperties, animationLength, 
			function() {
				element.css("visibility", "hidden");
				element.transition({	x: "0px",
							      		y: "0px",
							 	   rotate: "0deg",		     
							        scale: 1,
								  opacity: 1
								}, 0 );
		} );
	}
}


function PopOutElement( element, startProperties, doneFunction )
{
	var useTransition = $.support.transition;
	console.log("PopOutElement");

	element.css("visibility", "hidden");

	var orginalLeft = element.css("left");
	var orginalTop  = element.css("top");

	if (useTransition)
	{
		startProperties =  merge_options( startProperties,
									 {	opacity: 0,
										scale: 0.1	} );

		element.transition( startProperties, 0 );
	}
	else
	{
		element.css("opacity", 0);

		// console.log( "orginalLeft: " + orginalLeft);
		// console.log( "orginalTop : " + orginalTop );

		var newLeft = ( PixelNumber(orginalLeft) + PixelNumber(offsetX) / 2 ) + "px";
		var newTop  = ( PixelNumber(orginalTop)  + PixelNumber(offsetY) / 2 ) + "px";

		// console.log( "newLeft: " + newLeft);
		// console.log( "newTop : " + newTop );

		element.css("left",	newLeft);
		element.css("top",	newTop);
	}

	element.css("visibility", "visible");

// To DEBUG start position
// return;

	var animationLength = 300;

	element.transition( { 	  x: "0px",
						      y: "0px",
						 rotate: "0deg",		     
					      scale: 1.25,
						opacity: 1
								
						},
						animationLength )
		   .transition( {	
							scale: 1 
						}, 
						150,
						doneFunction );
}

function PopNineOClock(doneFunction)
{
	PopOutElement( $("#balloon-nine-oclock"), 
				   {		x: ShoeboxScalePixel("125px"),
							y: ShoeboxScalePixel("65px"),
				   			rotate: "10deg"
				   }, 
				   doneFunction );
}

function PopOneOClock(doneFunction)
{
	PopOutElement( $("#balloon-one-oclock"),
					{		x: ShoeboxScalePixel("-110px"),
							y: ShoeboxScalePixel("135px"),
							rotate: "10deg"
					},
					doneFunction );
}

function PopFiveOClock(doneFunction)
{
	PopOutElement(  $("#balloon-five-oclock"),
					{		x: ShoeboxScalePixel("-70px"), 
							y: ShoeboxScalePixel("-115px"),
							rotate: "10deg"
					},
					doneFunction );
}

function FirstLisaBalloonsPopOut( doneFunction )
{
	var timeInterval = 500;

	$("#pile-balloons").show();

	PopNineOClock(
		function(){
			PopOneOClock(
				function() {
					PopFiveOClock( doneFunction );
				});
		});	
/*
	setTimeout(function() { PopNineOClock();	}, 10 );
	setTimeout(function() { PopOneOClock();		}, timeInterval );
	setTimeout(
		function() { 
			PopFiveOClock();
			if (doneFunction)
				doneFunction();	
		}, timeInterval*2 ); */
}

function BoxContentAction()
{
	console.log("BoxContentAction");

	if (!HighlightActiveBalloon())
	{
	}
}

function BalloonsAction()
{
	console.log("BalloonsAction");

	 HighlightActiveBalloon();
}

function HighlightActiveBalloon(doneFunction)
{
	var popLength = 150;

	var balloonVisible = undefined;

	if ($("#lisa-loser-balloon").css("visibility") == "visible")
		balloonVisible = $("#lisa-loser-balloon");
	else if ($("#lisa-party-balloon").css("visibility") == "visible" )
		balloonVisible = $("#lisa-party-balloon");
	else if ($("#lisa-love-balloon").css("visibility") == "visible" )
		balloonVisible = $("#lisa-love-balloon");
	else if ($("#lisa-end-balloon").css("visibility") == "visible" )
		balloonVisible = $("#lisa-end-balloon");
	else if ($("#balloon-five-oclock").css("visibility") == "visible")
		balloonVisible = $("#balloon-five-oclock");

	if (balloonVisible) 
		balloonVisible.transition( { scale:1.1 }, popLength)
					  .transition( { scale:1.0 }, popLength/2, 
							function() {
								if (doneFunction)
									doneFunction();
							});	

	return balloonVisible;
}

var _PhotosPileAction_semaphore = false;

var _PhotosPileActionCount = -1;
var _BalloonBounceCount = 0;


function LisaTourTrack(value)
{
	var progressValue = "lisa-n" + _PhotosPileActionCount + "-" + value;

	Track( progressValue );
}

function PhotosPileAction()
{
	function TurnOffSemaphore()
	{
		_PhotosPileAction_semaphore = false;
	}

	if (_PhotosPileAction_semaphore) {
		console.log(arguments.callee.name + " semaphore ON - abort");
		return;		
	}


	_PhotosPileAction_semaphore = true;

	if (HighlightActiveBalloon(TurnOffSemaphore))
	{
		LisaTourTrack("bounce("+ (_BalloonBounceCount++) + ")" );
	}
	else
	{
		var anyPhotoVisible =	($("#lisa-kiss").css("visibility") == "visible")	||
								($("#lisa-smelling").css("visibility") == "visible")||
								($("#lisa-party").css("visibility") == "visible")	||
								($("#lisa-yawning").css("visibility") == "visible")	||
								($("#lisa-loser").css("visibility") == "visible")	;
		
		var isFlapVisible = ( $("#photo-flap-container").length > 0 );

		if (!anyPhotoVisible && isFlapVisible)
		{
			_PhotosPileActionCount++;

			LisaTourTrack("start");


			if (gShowCornerTimer)
				clearInterval(gShowCornerTimer);
			gShowCornerTimer=undefined;
			
			SnapAndHideCornerPhoto(250, 
				function()
				{ 
					setTimeout(
						function() {
							FirstLisaBalloonsPopOut(TurnOffSemaphore);
						}, 
						250	);
				} );
		}
	}
}

function LisaShowPhotoHide( jqElement, properties, animationLength)
{
	jqElement.transition (  properties, 
							animationLength, 
							 function() { 
								jqElement.css("visibility", "hidden");
							} );
}


function LisaRollInPhotoShow_shadow(jqPhotoA, jqPhotoB, 
									startPropertiesA, startPropertiesB,
									jqBalloon )
{
	function PopBalloon()
	{
		setTimeout( function()	{	PopOutElement(	jqBalloon,
													{	x: ShoeboxScaleNumber(-65) + "px", 
														y: ShoeboxScaleNumber(110) + "px",
														rotate: "-5deg"
													});
								}, 250 );
	}

	function SetupPhotoAndShadow( photo, shadow, startProperties, shadowOffset )
	{
		var shadowTop  = PixelNumber(photo.css("top"))  + shadowOffset.y;
		var shadowLeft = PixelNumber(photo.css("left")) + shadowOffset.x;

		shadow.css("top",  shadowTop +"px" );
		shadow.css("left", shadowLeft+"px" );

		LisaShowPhotoHide( photo,  startProperties, 0);

		LisaShowPhotoHide( shadow, startProperties, 0);
		LisaShowPhotoHide( shadow, { scale: 0.50 }, 0);

		photo.css( "visibility", "visible");
		shadow.css("visibility", "visible");

		shadow.insertBefore(photo);
	}

	var photoShadowOffsetA = { x: ShoeboxScaleNumber(-50), y: ShoeboxScaleNumber(10) };
	var photoShadowOffsetB = { x: ShoeboxScaleNumber(-25), y: ShoeboxScaleNumber(10) };

	var jqPhotoShadowA = $("#photo-shadow-A");
	var jqPhotoShadowB = $("#photo-shadow-B");

	// Setup Photos and Shadow

	SetupPhotoAndShadow( jqPhotoA, jqPhotoShadowA, startPropertiesA, photoShadowOffsetA);

	if (jqPhotoB && startPropertiesB)
		SetupPhotoAndShadow( jqPhotoB, jqPhotoShadowB, startPropertiesB, photoShadowOffsetB );


	var x = ShoeboxScaleNumber(15);
	var y = ShoeboxScaleNumber(-25);

	var moveOverPhotoPropertiesA	= { x: x+"px", y: y+"px", rotate: "+=10deg", opacity:1 };
	var moveOverShadowPropertiesA	= { x: x+"px", y: y+"px", rotate: "+=10deg", opacity:1, scale: 1.15};

	var photoEndProperties   = { x: 0, y: 0, rotate: 0, opacity:1, scale:1 };

	var shadowEndPropertiesA = {     x: (-photoShadowOffsetA.x)+"px", 
								     y: (-photoShadowOffsetA.y)+"px", 
								rotate: "0deg", opacity:1,  scale:0.65 };


	jqPhotoA.transition( moveOverPhotoPropertiesA,  1250  )
		    .transition( photoEndProperties,  		500, 
		    	function() {
		    		if (jqPhotoB == undefined)
		    			PopBalloon();
		    	} );

	jqPhotoShadowA.transition( moveOverShadowPropertiesA, 	1250  )
		    	  .transition( shadowEndPropertiesA,		500, 
		    	  		function() { jqPhotoShadowA.css("visibility", "hidden"); } 
		    	  );

	if (jqPhotoB) {
		var shadowEndPropertiesB = {     x: (-photoShadowOffsetB.x)+"px", 
									     y: (-photoShadowOffsetB.y)+"px", 
								rotate: "0deg", opacity:1,  scale:0.65 };


		var moveOverPhotoPropertiesB	= { x: x+"px", y: y+"px", rotate:  "+=5deg", opacity:1 };
		var moveOverShadowPropertiesB	= { x: x+"px", y: y+"px", rotate:  "+=5deg", opacity:1, scale: 1.15 };

		setTimeout(
			function() {
				jqPhotoB.transition ( moveOverPhotoPropertiesB,  900 )
						.transition ( photoEndProperties,  500, PopBalloon);

				jqPhotoShadowB.transition( moveOverShadowPropertiesB,	900  )
		    	 			  .transition( shadowEndPropertiesB,  		500, 
		    	  					function() { jqPhotoShadowB.css("visibility", "hidden"); } 
		    	  			  )
			}, 1000);		
	}
}


// Lisa Love Tour Photos





function _LisaKissPhotoStartProperties()
{
	var result = {		x: ShoeboxScalePixel("-324px"), 
						y: ShoeboxScalePixel("-4px"),
						rotate: "-0.5deg",
						scale: 1.15			};

	return result;
}

function _LisaSmellingPhotoStartProperties()
{
	var result = {	x: ShoeboxScalePixel("-225px"),
					y: ShoeboxScalePixel("-12px"), 
					rotate: "-2.5deg",
					scale: 1.15			};


	return result;
}

function LisaLoveHide(animationLength)
{
	LisaShowPhotoHide( $("#lisa-kiss"), 
						_LisaKissPhotoStartProperties(), 
						animationLength);

	LisaShowPhotoHide( $("#lisa-smelling"), 
						_LisaSmellingPhotoStartProperties(), 
						animationLength);
}

function LisaLoveShow()
{
	LisaRollInPhotoShow_shadow(	$("#lisa-kiss"),
								$("#lisa-smelling"),
								_LisaKissPhotoStartProperties(),
								_LisaSmellingPhotoStartProperties(),
								$("#lisa-love-balloon")	) ;
}

// Lisa Party Tour Photos

function _LisaPartyPhotoStartProperties()
{
	var result = {	x: ShoeboxScalePixel("-223px"),
					y: ShoeboxScalePixel("-21px"),
					rotate: "3deg",
					scale: 1.15			};
	return result;
}

function _LisaYawingPhotoStartProperties()
{
	var result = {	x: ShoeboxScalePixel("-319px"), 
					y: ShoeboxScalePixel("-26px"), 
					rotate: "0.5deg",
					scale: 1.15			};
	return result;
}

function LisaPartyHide(animationLength)
{
	LisaShowPhotoHide( $("#lisa-party"), 
						_LisaPartyPhotoStartProperties(), 
						animationLength);

	LisaShowPhotoHide( $("#lisa-yawning"), 
						_LisaYawingPhotoStartProperties(), 
						animationLength);
}

function LisaPartyShow()
{
	LisaRollInPhotoShow_shadow( $("#lisa-party"),
								$("#lisa-yawning"),
								_LisaPartyPhotoStartProperties(),
								_LisaYawingPhotoStartProperties(),
								$("#lisa-party-balloon") );
}

function _LisaLoserPhotoStartProperties()
{
	var result = {	x: ShoeboxScalePixel("-265px"),
					y: ShoeboxScalePixel("-17px"),
					rotate: "177deg",
					scale: 1.15	};
	return result;
} 	

function LisaLoserHide(animationLength)
{
	var properties = $.extend({}, _LisaLoserPhotoStartProperties()); 
	properties["rotate"] = "-3deg";

	LisaShowPhotoHide( $("#lisa-loser"), 
						properties, 
						animationLength);
}

function LisaLoserShow()
{
	LisaRollInPhotoShow_shadow($("#lisa-loser"), 
						undefined,
						_LisaLoserPhotoStartProperties(),
						undefined,
						$("#lisa-loser-balloon")
						) ;
}

function LisaEndShow()
{
	MovePhotosInPile();	
	setTimeout( RestoreNotepadMessage, 200);
	LisaTourTrack("end");

	function RestoreNotepadMessage()
	{
		// The #white-signup-button gets removed once it is used...
		var hasWhiteSignupButton = ( $("#white-signup-button").length > 0 );

		if (hasWhiteSignupButton && !IsMobilePage() ) {
		 	$("#line6").hide();
			$("#white-signup-button").show();
		}

 		var animationLength = 1000;

		if ($.support.transition) 
		{
	 		$("#notepad-message").transition( { opacity:1 }, animationLength );
		}
		else
			$("#notepad-message").fadeIn(animationLength);
	}

	function MovePhotosInPile()
	{
		var animationLength = 1500;

		LisaLoserHide( animationLength );
		LisaPartyHide( animationLength );
		LisaLoveHide( animationLength );

		var x = ShoeboxScalePixel("-250px");
		var y = ShoeboxScalePixel("-25px");

		$("#photo-shadow-A").transition( { x:x , y:y, scale: 0.7 }, animationLength,
			function() {this.css("visibility", "hidden"); } 
		);

		$("#photo-shadow-B").transition( { x:x, y:y, scale: 0.7 }, animationLength,
			function() {this.css("visibility", "hidden"); } 
		);

		if (!IsMobilePage())
			setTimeout(function() { ShowCornerPhoto(1000); }, 1000 );		
	}

}


function BalloonFiveOclockAction() // Start tour
{
	console.log("BalloonFiveOclockAction");
	
	StartTour();
	LisaTourTrack("love");

	function NotepadMessageFadeOut()
	{
		$("#notepad-message").transition({opacity:0}, 1500);
	}

	function FirstLisaBalloonsPopIn( animationDidCompleteFunction )
	{
		function _RestoreBalloons()
		{
			console.log("_RestoreBalloons");

			$("#pile-balloons").hide();

			$("#balloon-nine-oclock").css("visibility",	"hidden");
			$("#balloon-one-oclock").css("visibility",	"hidden");
			$("#balloon-five-oclock").css("visibility",	"hidden");

			if ($.support.transition)
				$("#pile-balloons").transition( {   scale: 1,
											 opacity: 1,
											  rotate: 0
											}, 0 );
			else
				$("#pile-balloons").css("opacity", 1);

			if (animationDidCompleteFunction)
				animationDidCompleteFunction();
		}

		var animationLength = 300;

		if ($.support.transition)
		{
			$("#pile-balloons").transition( {   scale: 0.1,
										 opacity: 0,
										 // rotate: "-10deg"
									}, 
									animationLength, 
									_RestoreBalloons );
		}
		else
		{
			$("#pile-balloons").animate(	{ opacity: 0 }, 
									animationLength,
									_RestoreBalloons	); 
		}
	}

	function StartTour()
	{
		FirstLisaBalloonsPopIn(
			function() { 
				NotepadMessageFadeOut();
				LisaLoveShow();
			}
		);

		// Hide flap arrow
		$("#photo-flap-arrow-container").hide();
	}
}


function LoveBalloonAction()
{
	console.log("LoveBalloonAction");
	
	PopInElement(	$("#lisa-love-balloon"), 
					{	x: ShoeboxScalePixel("-65px"), 
						y: ShoeboxScalePixel("110px"),
						rotate: "-5deg"
						} );

	LisaPartyShow();

	LisaTourTrack("party");
}

function PartyBalloonAction()
{
	console.log("PartyBalloonAction");

	PopInElement(	$("#lisa-party-balloon"), 
					{	x: ShoeboxScalePixel("-65px"), 
						y: ShoeboxScalePixel("110px"),
						rotate: "-5deg"
						} );

	LisaLoserShow();

	LisaTourTrack("loser");
}

function LoserBalloonAction()
{
	console.log("LoserBalloonAction");

	PopInElement(	$("#lisa-loser-balloon"), 
					{	x: ShoeboxScalePixel("-65px"), 
						y: ShoeboxScalePixel("110px"),
						rotate: "-5deg"
					} );

	SetupShadows();

	LiftPhotosUp(500);
	setTimeout( PopOutLisaEndBalloon,  300);

	LisaTourTrack("conclusion");

	function LiftPhotosUp( animationLength, doneFunction )
	{
		$("#lisa-kiss").transition( {	x: ShoeboxScalePixel("-56px"), 
										y: ShoeboxScalePixel("-12px"),
								   rotate: "-8deg",
									scale: 1.15 },
									animationLength );

		$("#lisa-smelling").transition( {	x: ShoeboxScalePixel("45px"), 
											y: ShoeboxScalePixel("-22px"),
									   rotate: "-4deg",
										scale: 1.15 },
									animationLength );

		$("#lisa-party").transition( {	x: ShoeboxScalePixel("49px"),
										y: ShoeboxScalePixel("-30px"),
								    rotate: "-10.5deg",
									scale: 1.15 },
									animationLength );

		$("#lisa-yawning").transition( {	x: ShoeboxScalePixel("-44px"), 
											y: ShoeboxScalePixel("-34px"),
									   rotate: "-8deg",
										scale: 1.15 },
									animationLength );

		$("#lisa-loser").transition( {	x: ShoeboxScalePixel("12px"), 
										y: ShoeboxScalePixel("-25px"), 
								   rotate: "-4.5deg",
									scale: 1.15 }, 
									animationLength,
									function() {
										if (doneFunction)
											doneFunction();
									} );

		$("#photo-shadow-A").transition( { rotate:"-4deg", scale: 1.15, opacity: 0.5 }, animationLength );
		$("#photo-shadow-B").transition( { rotate: "4deg", scale: 1.15, opacity: 0.5 }, animationLength );
	}

	function SetupShadows()
	{
		var  topCoord = $("#lisa-loser").css("top");
		var leftCoord = $("#lisa-loser").css("left");

		var shadowOffsetA = { x: ShoeboxScaleNumber(-40), y: ShoeboxScaleNumber(10) };
		var shadowOffsetB = { x: ShoeboxScaleNumber(25),  y: ShoeboxScaleNumber(10) };

		var xA = ( PixelNumber(leftCoord) + shadowOffsetA.x) + "px";
		var yA = ( PixelNumber(topCoord)  + shadowOffsetA.y) + "px";

		$("#photo-shadow-A").css("left", xA);
		$("#photo-shadow-A").css("top",  yA);

		var xB = (PixelNumber(leftCoord) + shadowOffsetB.x) + "px";
		var yB = (PixelNumber(topCoord)  + shadowOffsetB.y) + "px";

		$("#photo-shadow-B").css("left", xB);
		$("#photo-shadow-B").css("top",  yB);

		console.log("xA:" + xA + " " + "xB:" + xB);
		console.log("yA:" + yA + " " + "yB:" + yB);

		$("#photo-shadow-A").css("visibility", "visible");
		$("#photo-shadow-B").css("visibility", "visible");

		var zeroProperties = { x:0, y:0, rotate:0, scale:0.75 };
		$("#photo-shadow-A").transition( zeroProperties, 0 );
		$("#photo-shadow-B").transition( zeroProperties, 0 );

		$("#photo-shadow-A").insertBefore($("#lisa-kiss"));
		$("#photo-shadow-B").insertBefore($("#lisa-kiss"));
	}

	function PopOutLisaEndBalloon()
	{
		PopOutElement(	$("#lisa-end-balloon"), 
								{	x: ShoeboxScalePixel("-65px"), 
									y: ShoeboxScalePixel("110px"),
									rotate: "-5deg"
								} );
	}
}	

function LisaEndBalloonAction()
{
	console.log("LisaEndBalloonAction");

	PopInElement(	$("#lisa-end-balloon"), 
					{	x: ShoeboxScalePixel("-65px"), 
						y: ShoeboxScalePixel("110px"),
						rotate: "-5deg"
						} );

	setTimeout(	function() {
					LisaEndShow();
				}, 500);
}



function BalloonFiveOclockClick(event)
{
	event.stopImmediatePropagation();
}

function BalloonFiveOclockMouseDown()
{
	console.log("BalloonFiveOclockMouseDown");

	// console.log(e);

	return true;
}

function BalloonFiveOclockMouseUp()
{
	console.log("BalloonFiveOclockMouseUp");

	// console.log(e);

	return true;
}

function BalloonFiveOclockMouseMove()
{
	console.log("BalloonFiveOclockMouseMove");

	// console.log(e);

	return true;
}



/************************************************/
/**************** FaceBook Start ****************/
/************************************************/

var __FacebookSDKDidLoad = false;

function LoadFacebookSDK()
{
	__FacebookSDKDidLoad = false;

	window.fbAsyncInit = function() {
	    FB.init({
	      appId      : '299942050094388', // App ID
	      // channelUrl : '//www.shoeboxify.com/fb/channel.html', // Channel File
	      channelUrl : 'http://www.shoeboxify.com/fb/channel.html', // Channel File
	     
	      status    : true, // check login status
	      cookie    : true, // enable cookies to allow the server to access the session
	      xfbml     : true,  // parse XFBML
	      oauth		: true
	    });

		console.log("FB.getLoginStatus(FacebookStatusChange)");
		FB.getLoginStatus(FacebookStatusChange);
		
		console.log("FB.Event.subscribe('auth.statusChange...");
        FB.Event.subscribe('auth.statusChange', FacebookStatusChange);	
	};
	
	  // Load the SDK Asynchronously
	  (function(d){
	     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement('script'); js.id = id; js.async = true;
	     
	     // js.src = "//connect.facebook.net/en_US/all.js";
	     js.src = "http://connect.facebook.net/en_US/all.js";
	     ref.parentNode.insertBefore(js, ref);
	   }(document));
}

 // ==== FacebookStatusChange ===
 // Callback from the Facebook SDK
function FacebookStatusChange(response) 
{
	__FacebookSDKDidLoad = true;

	console.log(arguments.callee.name);
	console.log(response);
	
	if (response.authResponse)
	{
		FacebookDidLogin();
	}
	else
	{
		FacebookNotAuthorized();
	}
}

function FacebookDidLogin()
{
	console.log(arguments.callee.name);

	if (!FacebookLoginWasClicked) 
	{
		// Facebook App Was Authorized Already

		_once_SubscribeViaFacebook();
	}
}

function FacebookNotAuthorized()
{
	console.log(arguments.callee.name);
	SwitchToFacebookSignup();
}

function _aux_SubscribeWithFacebookProfile(meObject)
{
	console.log("SubscribeWithFacebookProfile meObj:");
	console.log(meObject);
	
	var envelopeData = {	first_name: meObject.first_name,
	 						 last_name: meObject.last_name,
	 				     	 	 email: meObject.email,
	 				     	 	gender: meObject.gender,
	 				       			id: meObject.id,
	 				       		  link: meObject.link,
	 			  		  double_optin: false // with Facebook no email confirmation sent
	 			};
	 
	SubscribeToMailChimp(envelopeData);

	mixpanel.people.identify(meObject.id);

	mixpanel.people.set({
		"$first_name" : meObject.first_name,
		 "$last_name" : meObject.last_name,
			 "$email" : meObject.email,
			
			"gender"  : meObject.gender,
			"fb-link" : meObject.link,

		"$last_login" : new Date()
	});

	mixpanel.name_tag(meObject.link);
}

function _do_SubscribeViaFacebook()
{
	FB.api( "/me", _aux_SubscribeWithFacebookProfile);
}

var __once_SubscribeViaFacebook = false;

function _once_SubscribeViaFacebook()
{
	if (__once_SubscribeViaFacebook)
		return;
	
	__once_SubscribeViaFacebook = true;

	_do_SubscribeViaFacebook();
}

var FacebookLoginWasClicked = false;

function FacebookLoginButtonAction()
{
	FacebookLoginWasClicked = true;

	$("#blue-box-content-footer").hide();
	$("#facebook-button").hide();
	SwitchToSpinnerTab(true);
	
	FB.login(	function(response)	 {
					console.log("Login-response:");
					console.log(response);
									
					if (response.authResponse)
					{
						_once_SubscribeViaFacebook();

						setTimeout(
							function() {
								Track( "facebook-login-OK" );
							},
							1000 );
                    }
                    else
                     {
                        //user cancelled login or did not grant authorization
                        console.log("user cancelled login or did not grant authorization");
                        
                        SwitchToFacebookSignup();

                        Track( "facebook-login-cancel" );
                    }
                }, 
                
                { scope:'email' }
            );

	Track("facebook-button");
}



function SubscribeToMailChimp(envelopeData, doneFunction)
{
	 console.log("envelopeData:");
	 console.log(envelopeData);
	
	 $.ajax({	url:	"mailchimp/subscribe.php",  
			   type:	"POST",        
			   data:	envelopeData,
			  cache:	false,
			  error: 	function(jqXHR, textStatus, errorThrown) 
			  			{
			  				console.log("AJAX called failed textStatus:" + textStatus + " errorThrown:");
			  				console.log(errorThrown);

			  				if (doneFunction)
			  					doneFunction();

			  				SignupBoxDisplayErrorMesssage(textStatus);
			  			},
	
			success:	function (json) 
						{  
							console.log("mailchimp/subscribe.php");
							console.log(json);
	
							if (doneFunction)
			  					doneFunction();

							var subscribeResult;

							try {
								subscribeResult= $.parseJSON(json);
							}
							catch(e) {
								SignupBoxDisplayErrorMesssage("Failed to parseJSON result from subscribe.php");
								return;
							}
			
							console.log(subscribeResult);
														
							if (subscribeResult.success)
							{
								var displayMessage = "Success! (but oddly no displayMessage given)";
								var displayTitle   = "Awesome (!)";

								if (subscribeResult.displayTitle) 
									displayTitle = subscribeResult.displayTitle;
								
								if (subscribeResult.displayMessage) 
									displayMessage = subscribeResult.displayMessage;
									
								SignupBoxDisplaySuccessMesssage(displayTitle, displayMessage)

								console.log("SwitchToTab -TabEnum.MessageTab: " + displayMessage);
							}
							else
							{
								var errorMessage =	"errorCode:" + subscribeResult.errorCode + 
													" errorMessage:" + subscribeResult.errorMessage ;

								SignupBoxDisplayErrorMesssage(errorMessage);
							}	
						}
		});

}

function SignupBoxDisplayErrorMesssage(displayMessage)
{
	console.error("DISPLAY ERROR: " + displayMessage );

	var atSymbol = "@";

	var errorMessage = "<p>" + displayMessage + "</p>";

	errorMessage += "<p>";

	errorMessage += "Please report this issue to ";
	errorMessage += "feedback";
	errorMessage += atSymbol;
	errorMessage += "shoeboxify.com ";

	errorMessage += "</p>";

	_SignupBoxDisplayMessage("Oops...", errorMessage);
}

function SignupBoxDisplaySuccessMesssage(title, message)
{
	_SignupBoxDisplayMessage( title, message );
}


function _SignupBoxDisplayMessage(title, messageHTML)
{
	if (!messageHTML)
		messageHTML = "";
	
	$("#blue-box-content-footer").hide();			
	$("#facebook-button").hide();
	$("#blue-box-content-center form[class='email-tab']").hide();
	SpinnerTabHide();

	$("#blue-box-content-center div[class='message-tab']").hide();
	$("#blue-box-content-center div[class='message-tab']").html(messageHTML);

	if (title)
	{
		$("#yellow-button div[class='label']").fadeOut(
			function() {
				$("#yellow-button div[class='label']").html(title);
				$("#yellow-button div[class='label']").fadeIn(MessageFadeIn);
			});		
	}
	else
		MessageFadeIn();

	function MessageFadeIn()
	{
		$("#blue-box-content-center div[class='message-tab']").fadeIn();		
	}
}


var __spinner;

function StopSpinner()
{
	console.log("Spinner ====> STOP");

	if (__spinner)
		__spinner.stop();
}

function StartSpinner()
{
	console.log("Spinner ====> START");

	if ( !__spinner )
		__spinner = CreateSpinner();

	__spinner.spin($("#spinner")[0]);
	
	function CreateSpinner()
	{
		var opts = {
		  lines: 12, // The number of lines to draw
		  length: 7, // The length of each line
		  width: 4, // The line thickness
		  radius: 9, // The radius of the inner circle
		  rotate: 0, // The rotation offset
		  color: '#fff', // #rgb or #rrggbb
		  speed: 1, // Rounds per second
		  trail: 60, // Afterglow percentage
		  shadow: false, // Whether to render a shadow
		  hwaccel: true, // Whether to use hardware acceleration
		  className: 'spinner', // The CSS class to assign to the spinner
		  zIndex: 0, // The z-index (defaults to 2000000000)
		  top: 0, // Top position relative to parent in px
		  left: 0 // Left position relative to parent in px
		};
		
		return new Spinner(opts);
	}
}

function SpinnerTabElement()
{
	return $("#blue-box-content-center div[class='spinner-tab']");
}

function SpinnerTabHide()
{
	SpinnerTabElement().hide();

	StopSpinner();
}

function SwitchToSpinnerTab( spin )
{
	console.log("SwitchToSpinnerTab");

	if (spin)
		StartSpinner();

	// setTimeout( StopSpinner, 60 * 1000 );
		
	SpinnerTabElement().show();
}

function MainButtonSignUpAction()
{
	SignUpAction();

	Track( "signup-main-button" );
}

function OverFoldWhiteButtonAction()
{
	OpenShoebox();

	Track("open-small");
}

function OverFoldMoreInfoButtonAction()
{
	function ScrollToMore( doneFunction )
	{
		var destination = $("#cardboard").offset().top - 16;
		
		var scrollAnimationLength = 1000;

		$("html:not(:animated),body:not(:animated)").animate( {scrollTop: destination}, scrollAnimationLength, doneFunction );
	}

	ScrollToMore();

	Track("more-info");
}

function OverFoldYellowButtonAction()
{
	var animationLength = 1000;

	CenterPageOverSignUp( animationLength,
		function(){
			setTimeout(
				function()
				{
					if (!IsSignUpExpanded())
						SignUpAction();

				}, 500);
		});

	Track("signup-small-button");

	function CenterPageOverSignUp( animationLength, doneFunction )
	{	
		var destination = $("#yellow-button-container").offset().top + $("#yellow-button-container").height()/2;
		var windowHeight = $(window).height();

		$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination-windowHeight/2}, animationLength, doneFunction);
	}
}

function WhiteSignUpAction()
{
	var animationLength = 1000;

	CenterPageOverSignUp( animationLength,
		function(){
			setTimeout(
				function()
				{
					if (IsSignUpExpanded())
						FadeLine6In();
					else
						SignUpAction( FadeLine6In );

				}, 500);
		});

	$("#white-signup-button").fadeOut(animationLength, 
		function() {
			$("#white-signup-button").remove();
	});

	Track("white-box-signup");

	function CenterPageOverSignUp( animationLength, doneFunction )
	{
		var destination = $("#yellow-button-container").offset().top + $("#yellow-button-container").height()/2;
		var windowHeight = $(window).height();

		$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination-windowHeight/2}, animationLength, doneFunction);
	}

	function FadeLine6In()
	{
		$("#line6").fadeIn(animationLength);
	}

}


var _SignUpAction_semaphore = false;

function IsSignUpExpanded()
{
	return ( $("#yellow-button-container").height() > 150 );
}

function SignUpAction( doneFunction )
{
	if (_SignUpAction_semaphore) {
		console.log("_SignUpAction_semaphore ON")
		return;
	}
	_SignUpAction_semaphore = true;

	function whenDone() {
		_SignUpAction_semaphore = false;
		if (doneFunction) doneFunction();		
	}

	if ( IsSignUpExpanded() )
		_SignUpActionCollapse( whenDone );
	else
		_SignUpActionExpand( whenDone );
}


function _SignUpActionExpand(doneFunction)
{
	console.log(arguments.callee.name);

    var containerWidth   = 335;
	var containerHeight  = 185;
	var yellowButtonTop  = 24;
	var contentFooterTop = 125;

	// Small screen (iPhone)
    if ($("body").width() < 350) 
    {
    	containerWidth  = 280;
    	containerHeight = containerHeight * 0.9;
    	yellowButtonTop = 16;
    	contentFooterTop = 118;
    }

	var animationLength = 1000;

	$("#blue-gradient-bezel").transition( { opacity: 1 }, animationLength );

	$("#yellow-button").transition( { top: yellowButtonTop } , animationLength );
	$("#yellow-button div[class='label']").transition( { color: "white", "text-shadow": "0px 1px 4px black" }, animationLength );

	var buttonCanvasProperties = { opacity: 0 };
	$("#yellow-button canvas[class='up']").transition( buttonCanvasProperties, animationLength );
	$("#yellow-button canvas[class='down']").transition( buttonCanvasProperties, animationLength );

	
	var facebookTop = (containerHeight - 8)/2 - $("#blue-box-content-center").height()/2;

	$("#blue-box-content-center").transition( { top: facebookTop + "px" }, animationLength );
	$("#blue-box-content-footer").transition( { top: contentFooterTop   }, animationLength );

	var destination = $("#yellow-button-container").offset().top;
	var windowHeight = $(window).height();

    $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination-windowHeight/2 + containerHeight/2}, animationLength );

	$("#yellow-button-container").transition( { width: containerWidth, height: containerHeight+"px" } , animationLength, doneFunction);

	if (SpinnerTabElement().is(":visible"))
		StartSpinner();
}

function _SignUpActionCollapse(doneFunction)
{
	console.log(arguments.callee.name);

	var emailTabTextField = SignupEmail_TextField();
	emailTabTextField.blur();


	var animationLength = 1000;
	var boxHeight = 36;

	$("#blue-gradient-bezel").transition( { opacity: 0 }, animationLength );

	$("#yellow-button").transition( { top: 0 } , animationLength );
	$("#yellow-button div[class='label']").transition( { color: "#263c4a", "text-shadow": "0px 1px rgba(255, 255, 255, 0.90)" }, animationLength );

	var buttonCanvasProperties = { opacity: 1 };
	$("#yellow-button canvas[class='up']").transition(   buttonCanvasProperties, animationLength );
	$("#yellow-button canvas[class='down']").transition( buttonCanvasProperties , animationLength );

	$("#blue-box-content-center").transition(	{ top: "0px" }, animationLength );
	$("#blue-box-content-footer").transition(	{ top: "0px" }, animationLength );

	var destination = $("#yellow-button-container").offset().top;
	var windowHeight = $(window).height();

    $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination-windowHeight/2 + boxHeight/2 }, animationLength );

	$("#yellow-button-container").transition( { width: "223px", height: boxHeight+"px"  } , animationLength, doneFunction);

	StopSpinner();
}


function SignupEmail_TextField()
{
	return $("#blue-box-content-center form[class='email-tab'] input[class='text-field']");
}

function SignupEmail_Button()
{
	return $("#blue-box-content-center form[class='email-tab'] button");
}

function SwitchToEmailSignup()
{
	console.log(arguments.callee.name);

	var emailTabTextField = SignupEmail_TextField();
	var emailTabButton    = SignupEmail_Button();

	emailTabTextField.val("");
	ValidateEmailAndUpdateUI();

	emailTabTextField.bind("input propertychange", ValidateEmailAndUpdateUI);
	emailTabTextField.keyup(ValidateEmailAndUpdateUI);

	$("#blue-box-content-footer a[class='email-link']").fadeOut();
	$("#facebook-button").fadeOut();

	$("#blue-box-content-footer a[class='fb-link']").fadeIn();
	$("#blue-box-content-center form[class='email-tab']").fadeIn(
		function() {	
			emailTabTextField.focus();
		});

	function ValidateEmailAndUpdateUI()
	{
		var disabledValue = "disabled";

		var inputFieldValue = emailTabTextField.val();

		if (!inputFieldValue)
			console.error("inputFieldValue is undefined");
		else if (EmailValid(inputFieldValue))
			disabledValue = false;

		emailTabButton.attr( "disabled", disabledValue );

		//  console.log("email -disabled: " + disabledValue);
	}
}

function EmailValid(email)
{ 
	var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return email.match(regex);
} 

var _EmailSignUpSubmitAction_semaphore = false;

function EmailSignUpSubmitAction(event)
{
	if (_EmailSignUpSubmitAction_semaphore)
	{
		console.log(arguments.callee.name + " - semaphore ON" );
		return;
	}	
	
	console.log(arguments.callee.name);

	// Prevent multiple submit...
	SignupEmail_TextField().blur();
	SignupEmail_TextField().attr( "disabled", "disabled" );
	SignupEmail_Button().attr( "disabled", "disabled" );


	var emailFieldValue = SignupEmail_TextField().val();
	
	if ( EmailValid(emailFieldValue) )
    {
		SignupEmail_Button().attr( "disabled", "disabled" );
	
		var envelopeData = {	email: emailFieldValue,
		 				     	double_optin: true
		 				   };
		
		SubscribeToMailChimp(envelopeData, function andWhenDone() { _EmailSignUpSubmitAction_semaphore = false; } );
    
		mixpanel.people.identify(emailFieldValue);

		mixpanel.people.set({
				 "$email" : emailFieldValue,
			"$last_login" : new Date()
		});

		mixpanel.name_tag(emailFieldValue);

		setTimeout(
			function() {
				Track( "email-signup" );
			},
			1000 );
    }
    
    return false; // Prevents from submit being actually sent
}



function SwitchToFacebookSignup()
{
	console.log(arguments.callee.name);

	SpinnerTabHide();
	$("#blue-box-content-footer").show();

	$("#blue-box-content-footer a[class='email-link']").fadeIn(); 
	$("#facebook-button").fadeIn();

	$("#blue-box-content-footer a[class='fb-link']").fadeOut();
	$("#blue-box-content-center form[class='email-tab']").fadeOut();

	StopSpinner();
}




