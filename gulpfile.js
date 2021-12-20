const syntax = 'scss'; //Syntax: sass or scss

const gulp          = require('gulp'),
			gutil         = require('gulp-util'),
			sass          = require('gulp-sass'),
			cleancss      = require('gulp-clean-css'),
			browserSync   = require('browser-sync'),
			concat        = require('gulp-concat'),
			uglify        = require('gulp-uglify-es').default,
			rename        = require('gulp-rename'),
			autoprefixer  = require('gulp-autoprefixer'),
			del           = require('del'),
			notify        = require('gulp-notify'),
			imagemin      = require('gulp-imagemin'),
			pngquant      = require('imagemin-pngquant'),
			cache         = require('gulp-cache'),
			rsync         = require('gulp-rsync');

// BROWSER-SYNC
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

// STYLES
gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});


// JAVASCRIPT
gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/smooth-scroll/smooth-scroll.min.js',
		'app/libs/plugins-scroll/plugins-scroll.js',
		'app/libs/equalHeight/jquery.equalheights.min.js',
		'app/libs/wow/wow.min.js',
		// 'app/libs/bootstrap/js/bootstrap.bundle.min.js', // Bootstrap bundle.js opt
		'app/js/common.js' // Always at the end
	])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Minify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }));
});


// IMAGES COMPRESSION
gulp.task('img', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});


// BUILD PRODUCTION FOLDER
gulp.task('build', ['removedist', 'img', 'styles', 'js'], function() {
	let buildCss = gulp.src('app/css/**/*').pipe(gulp.dest('dist/css'));
	let buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));
	let buildJs = gulp.src('app/js/**/*').pipe(gulp.dest('dist/js'));
	let buildHtml = gulp.src('app/*.html').pipe(gulp.dest('dist'));
});

// REMOVE PREVIOUS BUILD
gulp.task('removedist', function() {
	return del.sync('dist');
});


// CLEAR CACHE
gulp.task('clearcache', function() {
	return cache.clearAll();
});


//RSYNC
gulp.task('rsync', function() {
	return gulp.src('dist/**').pipe(rsync({
		root: 'dist',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html',
		//include: ['*.htaccess'], //Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], //Exlclude files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}));
});


// WATCH FILES
gulp.task('watch', ['styles', 'js', 'browser-sync',], function() {
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload)
});


// DEFAULT TASK
gulp.task('default', ['watch']);
