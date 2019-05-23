/**
 * Override window.onerror enhancement
 *
 * thx to Venerons
 * https://gist.github.com/Venerons/f54b7fbc17f9df4302cf
 */
(function (previousOnError) {
    // uh!...want to do something with previousOnError?
    // ...really?
    function reportError (error, message) {
        // console.debug(arguments);
        message = message || '';
        JMVC.debug(
            'ERROR: ' + message + ' [' + error.toString() + ']\n' +
            '\nName:\t\t' + (error.name || '-') +
            '\nMessage:\t' + (error.message || '-') +
            '\nFile:\t\t\t' + (error.fileName || '-') +
            '\nSource:\t\t' + ((error.toSource && error.toSource()) || '-') +
            '\nLine #:\t\t' + (error.lineNumber || '-') +
            '\nColumn #:\t' + (error.columnNumber || '-') +
            '\n\nStack:\n\n' + (error.stack || '-')
        );
    }

    window.onerror = function (message, filename, lineno, colno, error) {
        try {
            error.message = error.message || message || null;
            error.fileName = error.fileName || filename || null;
            error.lineNumber = error.lineNumber || lineno || null;
            error.columnNumber = error.columnNumber || colno || null;
        } catch (e) {}
        reportError(error, 'Uncatched Exception');
        JMVC.Errors.notify(error);
    };
})(W.onerror);
