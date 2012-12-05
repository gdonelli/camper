#!/bin/bash

### SETUP ###

piecesFolder="design_pieces"

folders=( "shoebox" "wrap" "content" "lisa" "paper" )

standaloneFolder=$piecesFolder/standalone

spritesDestinationDirectory=../html/sprites
imagesDestinationDirectory=../html/images

### INTERNALs ###

tmpSheetsFolder=$piecesFolder/__all_sheets

numberOfFolders=${#folders[@]}

#echo ${folders[@]}

echo "===> Cleaning"

echo "rm -fR $tmpSheetsFolder"
rm -fR $tmpSheetsFolder
mkdir $tmpSheetsFolder

echo "rm -fR $spritesDestinationDirectory"
rm -fR $spritesDestinationDirectory
mkdir $spritesDestinationDirectory

echo "rm -fR $imagesDestinationDirectory"
rm -fR $imagesDestinationDirectory
mkdir $imagesDestinationDirectory

echo "===> Building Tools"

getmaskExe=getmask/build/Release/getmask
cd getmask
xcodebuild
cd ..

validatespriteExe=validatesprite/build/Release/validatesprite
cd validatesprite
xcodebuild
cd ..

blackoutExe=blackout/build/Release/blackout
cd blackout
xcodebuild
cd ..

echo "==="
echo "===> Copy Standalone Images"

cp -vR $standaloneFolder/* $imagesDestinationDirectory

echo "Optimizing background image"

pngnqExe=./pngnq/pngnq

$pngnqExe -n 128 $imagesDestinationDirectory/yellow-background.png
$pngnqExe -n 128 $imagesDestinationDirectory/yellow-background-mobile2x.png

mv $imagesDestinationDirectory/yellow-background-nq8.png $imagesDestinationDirectory/yellow-background.png
mv $imagesDestinationDirectory/yellow-background-mobile2x-nq8.png $imagesDestinationDirectory/yellow-background-mobile2x.png

echo "==="
echo "===> Manual Touch Ups"

rm -v	$piecesFolder/paper/yellow-button-down.png \
		$piecesFolder/paper/yellow-button-up.png \
		$piecesFolder/paper/facebook-button-down.png \
		$piecesFolder/paper/facebook-button-up.png \
		$piecesFolder/paper/arrow.png \
		$piecesFolder/paper/check.png \
		$piecesFolder/content/corner-photo-arrow.png \
		$piecesFolder/lisa/back-arrow.png \
		$piecesFolder/lisa/forward-arrow.png \
		$piecesFolder/content/yellow-button-small-up.png \
		$piecesFolder/content/yellow-button-small-down.png \
		$piecesFolder/content/white-button-small-up.png \
		$piecesFolder/content/white-button-small-down.png


echo "==="
echo "===> About to generate Sprites"

for (( i = 0; i < $numberOfFolders ; i++ ))
do
	folder_i=${folders[$i]}
	folderPath_i=$piecesFolder/$folder_i
	folderClonePath_i=$tmpSheetsFolder/$folder_i-clone
	piecesAndMaskPath=$tmpSheetsFolder/$folder_i

	echo ""	
	echo "***************************"	
	echo "********  $folder_i  ********"		
	echo "***************************"


	echo "cp -Rf $folderPath_i $folderClonePath_i"
	cp -Rf $folderPath_i $folderClonePath_i

	echo "=> $getmaskExe $folderClonePath_i/*"
	$getmaskExe $folderClonePath_i/*

	echo "mkdir $piecesAndMaskPath"
	mkdir $piecesAndMaskPath
	
	mv $folderClonePath_i/*-image.png  $piecesAndMaskPath
	mv $folderClonePath_i/*-mask.png   $piecesAndMaskPath
	cp $folderClonePath_i/*-nomask.png $piecesAndMaskPath
	rm -Rf $folderClonePath_i

	echo "==="
	echo "===> Creating Sprite Sheet using glue"

	glue $piecesAndMaskPath $tmpSheetsFolder

	echo "==="
	echo "===> Blacking Out Sprite Sheet"

	$blackoutExe $piecesAndMaskPath.png

#	convert $piecesAndMaskPath-blackout.png -interlace line -quality 88 $piecesAndMaskPath.jpg

#	echo "==="
#	echo "===> Creating JPEG using sips"

	jpegCompression=60

	rm -v $piecesFolder/$colorSheetName.jpeg
	sips -s format jpeg $piecesAndMaskPath-blackout.png\
			--setProperty formatOptions $jpegCompression\
			--setProperty artist "Giovanni Donelli"\
			--setProperty copyright "Shoeboxify"\
			--out $piecesAndMaskPath-sips.jpg

	jpegtran -optimize -progressive -copy none -outfile $piecesAndMaskPath.jpg  $piecesAndMaskPath-sips.jpg

	cp $piecesAndMaskPath.jpg $spritesDestinationDirectory
done

mkdir -p $tmpSheetsFolder/css
mv $tmpSheetsFolder/*.css $tmpSheetsFolder/css

echo "==="
echo "==========================================="
echo "===> Images"

$validatespriteExe $imagesDestinationDirectory/*

echo "===> Validating Sprites"

$validatespriteExe $spritesDestinationDirectory/*

echo "==========================================="

date

echo "Sprites CSS folder: $tmpSheetsFolder/css"

echo "==========================================="
