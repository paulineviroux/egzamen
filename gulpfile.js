/* paulineviroux/RIA/egzamen
 *
 * gulpfile.js - gulp tasks
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

 /* eslint-disable */

"use strict";

var gulp = require( "gulp" ),
    gSass = require( "gulp-sass" ),
    gESLint = require( "gulp-eslint" ),
    gBabel = require( "gulp-babel" ),
    gUtil = require( "gulp-util" ),
    Mongo = require( "mongodb" ),
    browserify = require( "browserify" ),
    babelify = require( "babelify" ),
    sourceStream = require( "vinyl-source-stream" ),
    ObjectID = Mongo.ObjectID,
    MongoClient = Mongo.MongoClient;

gulp.task( "styles", function() {
    return gulp
        .src( "static/sass/**/*.scss" )
        .pipe( gSass( {
            "includePaths": [
                require( "bourbon" ).includePaths,
            ],
        } ).on( "error", gSass.logError ) )
        .pipe( gulp.dest( "static/css" ) )
} );    

gulp.task( "lint", function() {
    return gulp
        .src( "src/**/*.js" )
        .pipe( gESLint() )
        .pipe( gESLint.format() );
} );

gulp.task( "build", function() {
    return gulp
        .src( "src/**/*.js" )
        .pipe( gBabel() )
        .pipe( gulp.dest( "bin" ) )
} );

gulp.task( "views", function() {
    return gulp
        .src( "src/views/**" )
        .pipe( gulp.dest( "bin/views" ) );
} );


gulp.task( "reset-db", function( fNext ) {
    // Check if we are inside vagrant
    if ( process.env.USER !== "vagrant" ) {
        gUtil.beep();
        gUtil.log( gUtil.colors.red( "This task must be runned from INSIDE the vagrant box!" ) );
        return fNext();
    }

    // Connection to mongodb
    MongoClient.connect( "mongodb://127.0.0.1:27017/kach", function( oError, oDB ) {
        var fDataParser;

        if ( oError ) {
            gUtil.beep();
            return fNext( oError );
        }

        // drop database
        oDB
            .dropDatabase()
            .then( function() {
                return oDB.collection( "fastfood" ).insertMany( require( __dirname + "/data/export.json" ) );
            } )
            .then( function() {
                oDB.close();
                gUtil.log( gUtil.colors.green( "DB has been resetted." ) );
                fNext();
            } )
            .catch( function( oError ) {
                oDB.close();
                fNext( oError );
            } );
    } );

} );

gulp.task( "modules", function() {
    browserify( "static/modules/main.js" )
        .transform( babelify, {
            "presets": [ "es2015" ],
        } )
        .bundle()
        .pipe( sourceStream( "app.js" ) )
        .pipe( gulp.dest( "static/js/" ) );
} );

gulp.task( "watch", function() {
    gulp.watch( "src/**/*.js", [ "build" ] );
    gulp.watch( "src/views/**", [ "views" ] );
    gulp.watch( "static/sass/**/*.scss", [ "styles" ] );
    gulp.watch( "static/modules/**/*.js", [ "modules" ] );
} );

gulp.task( "default", [ "build", "views", "styles", "modules" ] );

gulp.task( "work", [ "default", "watch" ] );