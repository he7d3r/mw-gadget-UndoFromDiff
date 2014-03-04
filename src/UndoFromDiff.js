/**
 * Allow undoing parts of a change by pressing CTRL and double clicking in the parts of a diff
 * @author: [[User:Helder.wiki]]
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/UndoFromDiff.js]] ([[File:User:Helder.wiki/Tools/UndoFromDiff.js]])
 */
/*jshint browser: true, camelcase: true, curly: true, eqeqeq: true, immed: true, latedef: true, newcap: true, noarg: true, noempty: true, nonew: true, quotmark: true, undef: true, unused: true, strict: true, trailing: true, maxlen: 120, evil: true, onevar: true */
/*global jQuery, mediaWiki */
( function ( mw, $ ) {
'use strict';

function undo( e ){
	var $row = $( e.target ).closest( 'tr' ),
		oldText = $row.find( 'td.diff-deletedline' ).text(),
		newText = $row.find( 'td.diff-addedline' ).text(),
		$box = $( '#wpTextbox1' ),
		text = $box.val(),
		$diffButton,
		match,
		reNewText;
	if ( !e.ctrlKey ) {
		return;
	}
	if( !newText ){
		alert( 'The script is not able to undo this change (yet!).' );
		return;
	}
	reNewText = new RegExp( $.escapeRE( newText ), 'g' );
	match = text.match( reNewText );
	if( match.length !== 1 ){
		alert( 'This text appears more than once in the page, so it is safer to fix it manually.' );
		return;
	}
	$box.val( text.replace( reNewText, oldText ) );
	// Support for [[w:en:User:Js/ajaxPreview]]
	$diffButton = $( '#wpDiffLive' );
	if( !$diffButton.length ){
		$diffButton = $( '#wpDiff' );
	}
	$diffButton.click();
}

if( $.inArray( mw.config.get( 'wgAction' ), [ 'edit', 'submit' ] ) !== -1 ){
	$( function(){
		$( '#mw-content-text' ).on( 'dblclick', '.diff-deletedline, .diff-addedline', undo );
	} );
}

}( mediaWiki, jQuery ) );