/* paulineviroux/RIA/egzamen
 *
 * gulpfile.js - gulp tasks
 *
 * coded by paulineviroux!
 * started at 21/01/2017
 */

 /* eslint-disable */

"use strict";

var sUser = process.env.USER,
    gulp = require( "gulp" ), // Task runner : automatiseur de taches. Il lance pour nous des bouts de scripts
    gSass = sUser !== "vagrant" && require( "gulp-sass" ),
    gESLint = require( "gulp-eslint" ), // identifie et indique les erreurs
    gBabel = require( "gulp-babel" ),
    gUtil = require( "gulp-util" ),
    Mongo = require( "mongodb" ),
    browserify = require( "browserify" ), // permet d'utiliser le systeme de module de node.js dans le navigateur. Il regroupe nos dépendances
    babelify = require( "babelify" ), //compile de ES6 vers de ES5 pour les nav qui ne supportent pas ES6
    sourceStream = require( "vinyl-source-stream" ),
    buffer = require( "vinyl-buffer" ), //buffer: zone mémoire de taille limitée servant à stocker des données, mémoire tampon.
    gRename = require( "gulp-rename" ), //renommer les fichiers facilement
    gUglify = require( "gulp-uglify" ), //minimer les fichiers
    ObjectID = Mongo.ObjectID,
    MongoClient = Mongo.MongoClient;


// NOTE: As we see in class, gulp-sass cause somes issues when you try to run the reset-db task from inside the vagrant.
// As we know that this will be the only task to run from vagrant, we put it inside an if, then add a return : from inside the vagrant, only the reset-db task will be accessible.
if ( sUser === "vagrant" ) {
    gulp.task( "reset-db", function( fNext ) {
        // Check if we are inside vagrant
        if ( process.env.USER !== "vagrant" ) {
            gUtil.beep();
            gUtil.log( gUtil.colors.red( "This task must be runned from INSIDE the vagrant box!" ) );
            return fNext();
        }   
        // Connection to mongodb
        MongoClient.connect( "mongodb://127.0.0.1:27017/egzamen", function( oError, oDB ) {

            if ( oError ) {
                gUtil.beep();
                return fNext( oError );
            }

            // drop database
            oDB.dropDatabase()
                .then( function() {
                    return oDB.collection( "fastfoods" ).insertMany( require( __dirname + "/data/export.json" ) );
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

    return;
}

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
        .src( [ "src/**/*.js", "static/modules/**/*.js" ] )
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

gulp.task( "modules", function() {
    browserify( "static/modules/main.js" )
        .transform( babelify, {
            "presets": [ "es2015" ],
        } )
        .bundle()
        .pipe( sourceStream( "app.js" ) )
        .pipe( gulp.dest( "static/js/" ) )
        .pipe( buffer() )
        .pipe( gRename( "app.min.js" ) )
        .pipe( gUglify().on( "error", console.log ) )
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